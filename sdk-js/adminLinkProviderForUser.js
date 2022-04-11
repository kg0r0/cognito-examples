const AWS = require('aws-sdk');
const cognitoidp = new AWS.CognitoIdentityServiceProvider({ region: '<region>' });

(async () => {
  console.log(await cognitoidp.adminLinkProviderForUser({
    DestinationUser: {
      ProviderAttributeValue: '<user id of the cognito user-password user>',
      ProviderName: 'Cognito',
    },
    SourceUser: {
      ProviderAttributeName: 'Cognito_Subject',
      ProviderAttributeValue: '<id, sub, or user_id value found in the social identity provider token>',
      ProviderName: 'Google',
    },
    UserPoolId: '<poolid>',
  }).promise());

  console.log(await cognitoidp.adminDisableProviderForUser({
    User: {
      ProviderAttributeName: 'Cognito_Subject',
      ProviderAttributeValue: '<id, sub, or user_id value found in the social identity provider token>',
      ProviderName: 'Google',
    },
    UserPoolId: '<poolid>',
  }).promise());
})().catch(err => console.log(err));