const AWS = require('aws-sdk');
require('dotenv').config();
const cognitoidp = new AWS.CognitoIdentityServiceProvider({ region: process.env.REGION_NAME });

(async () => {
  console.log(await cognitoidp.adminDisableProviderForUser({
    User: {
      ProviderAttributeName: 'Cognito_Subject',
      ProviderAttributeValue: '<id, sub, or user_id value found in the social identity provider token>',
      ProviderName: 'Google',
    },
    UserPoolId: process.env.USER_POOL_ID,
  }).promise());
})().catch(err => console.log(err));