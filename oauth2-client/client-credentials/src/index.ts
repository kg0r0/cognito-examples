import express from 'express';
import session from 'express-session';
import crypto from 'crypto';
import { Issuer, TokenSet } from 'openid-client';
const config: Config = require('../config.json');

interface Config {
  client_id: string;
  client_secret: string;
  region: string;
  poolid: string;
}

declare module 'express-session' {
  export interface SessionData {
    tokenSet: TokenSet;
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

app.get('/', async (req: express.Request, res: express.Response) => {
  if (req.session.tokenSet) {
    console.log('received and validated tokens %j', req.session.tokenSet);
    return res.send('OK');
  }
  const issuer = await Issuer.discover(`https://cognito-idp.${config.region}.amazonaws.com/${config.poolid}`)
  const client = new issuer.Client({
    client_id: config.client_id,
    client_secret: config.client_secret,
  })

  const tokenSet = await client.grant({
    grant_type: 'client_credentials',
    //scope: 'test/test'
  })
  console.log('received and validated tokens %j', tokenSet);
  req.session.tokenSet = tokenSet;
  return res.send('OK');
});

app.listen(PORT, () => {
  console.log(`listen port: ${PORT}`);
});