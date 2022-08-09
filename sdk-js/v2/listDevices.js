const AWS = require('aws-sdk');
require('dotenv').config();
const cognitoidp = new AWS.CognitoIdentityServiceProvider({ region: process.env.REGION_NAME });
const params = {
  AccessToken: 'STRING_VALUE', /* required */
  Limit: 60,
  //PaginationToken: 'STRING_VALUE'
};
(async () => {
  const data = await cognitoidp.listDevices(params).promise();
  console.log(data);
})();