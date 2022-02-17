import express, { ErrorRequestHandler } from 'express';
import session from 'express-session';
import crypto from 'crypto';
import { Issuer, TokenSet, generators } from 'openid-client';
const config: Config = require('../config.json');

interface Config {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  region: string;
  poolid: string;
}

declare module 'express-session' {
  export interface SessionData {
    tokenSet: TokenSet;
    state: string;
    codeVerifier: string;
    nonce: string;
    originalUrl: string;
    authorized: boolean;
    loggedIn: boolean;
  }
}

const app: express.Express = express()
const PORT = 3000

app.use(session({
  name: 'SESSION',
  secret: [crypto.randomBytes(32).toString('hex')],
  resave: false,
  saveUninitialized: true
}))

/**
 * routes
 */
app.get('/', async (req: express.Request, res: express.Response) => {
  if (req.session.tokenSet) {
    console.log('received and validated tokens %j', req.session.tokenSet);
    return res.send('OK');
  }
  const issuer = await Issuer.discover(`https://cognito-idp.${config.region}.amazonaws.com/${config.poolid}`)
  const client = new issuer.Client({
    client_id: config.client_id,
    client_secret: config.client_secret,
    redirect_uris: [config.redirect_uri],
    response_types: ['code']
  })
  const state = generators.state();
  req.session.state = state;

  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);
  req.session.codeVerifier = codeVerifier;

  const url = client.authorizationUrl({
    scope: 'openid',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })
  req.session.originalUrl = req.originalUrl;
  req.session.authorized = true;
  return res.redirect(url);
});

app.get('/cb', async (req: express.Request, res: express.Response) => {
  if (!req.session.authorized) {
    return res.status(403).send('NG');
  }
  const issuer = await Issuer.discover(`https://cognito-idp.${config.region}.amazonaws.com/${config.poolid}`)
  const client = new issuer.Client({
    client_id: config.client_id,
    client_secret: config.client_secret,
    redirect_uris: [config.redirect_uri],
    response_types: ['code']
  })
  const state = req.session.state;
  const codeVerifier = req.session.codeVerifier;
  const params = client.callbackParams(req);
  const tokenSet = await client.callback(
    config.redirect_uri,
    params,
    {
      state,
      code_verifier: codeVerifier
    });
  req.session.tokenSet = tokenSet;
  return res.redirect(req.session.originalUrl!);
});

app.listen(PORT, () => {
  console.log(`listen port: ${PORT}`);
});