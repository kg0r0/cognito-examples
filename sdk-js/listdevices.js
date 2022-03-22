const AWS = require('aws-sdk');
const cognitoidp = new AWS.CognitoIdentityServiceProvider({ region: '<region>' });
const params = {
  AccessToken: 'STRING_VALUE', /* required */
  Limit: 60,
  //PaginationToken: 'STRING_VALUE'
};
(async () => {
  const data = await cognitoidp.listDevices(params).promise();
  console.log(data);
})();