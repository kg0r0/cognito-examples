const AWS = require('aws-sdk');

const ACCESS_TOKEN = '<access token>';
const ACCESS_TOKEN_SECRET = '<access token secret>';
(
  async () => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: '<identity pool id>',
      Logins: {
        'api.twitter.com': `${ACCESS_TOKEN};${ACCESS_TOKEN_SECRET}`,
      }
    },
      {
        region: '<region>',
      })
    const s3 = new AWS.S3;
    console.log('You are now logged in.');
  }
)().catch(err => console.log(err));