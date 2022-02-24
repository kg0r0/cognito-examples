"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const crypto_1 = __importDefault(require("crypto"));
const openid_client_1 = require("openid-client");
const config = require('../config.json');
const app = express_1.default();
const PORT = 3000;
app.use(express_session_1.default({
    name: 'SESSION',
    secret: [crypto_1.default.randomBytes(32).toString('hex')],
    resave: false,
    saveUninitialized: true
}));
/**
 * routes
 */
app.get('/*', async (req, res) => {
    if (req.session.isLoggedIn && req.session.isRedirected) {
        console.log('received and validated tokens %j', req.session.tokenSet);
        return res.send('OK');
    }
    const issuer = await openid_client_1.Issuer.discover(`https://cognito-idp.${config.region}.amazonaws.com/${config.poolid}`);
    const client = new issuer.Client({
        client_id: config.client_id,
        client_secret: config.client_secret,
        redirect_uris: [config.redirect_uri],
        response_types: ['code']
    });
    if (req.session.isRedirected) {
        const state = req.session.state;
        const codeVerifier = req.session.codeVerifier;
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(config.redirect_uri, params, {
            state,
            code_verifier: codeVerifier
        });
        req.session.tokenSet = tokenSet;
        req.session.isLoggedIn = true;
        return res.redirect(req.session.originalUrl);
    }
    const state = openid_client_1.generators.state();
    req.session.state = state;
    const codeVerifier = openid_client_1.generators.codeVerifier();
    const codeChallenge = openid_client_1.generators.codeChallenge(codeVerifier);
    req.session.codeVerifier = codeVerifier;
    const url = client.authorizationUrl({
        scope: 'openid',
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
    });
    req.session.originalUrl = req.originalUrl;
    req.session.isRedirected = true;
    return res.redirect(url);
});
app.listen(PORT, () => {
    console.log(`listen port: ${PORT}`);
});
//# sourceMappingURL=index.js.map