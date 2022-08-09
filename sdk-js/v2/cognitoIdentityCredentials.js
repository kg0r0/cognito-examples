const AWS = require('aws-sdk');
require('dotenv').config();

const ACCESS_TOKEN = '<access token>';
const ACCESS_TOKEN_SECRET = '<access token secret>';
(
  async () => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.IDENTITY_POOL_ID,
      Logins: {
        'api.twitter.com': `${ACCESS_TOKEN};${ACCESS_TOKEN_SECRET}`,
      }
    },
      {
        region: process.env.REGION_NAME,
      })
    const s3 = new AWS.S3;
    console.log('You are now logged in.');
  }
)().catch(err => console.log(err));