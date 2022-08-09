const AWS = require('aws-sdk');
require('dotenv').config();
const cognitoidp = new AWS.CognitoIdentityServiceProvider({ region: process.env.REGION_NAME });

(async () => {
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: '<value>'
  }
  const data = await cognitoidp.adminGetUser(params).promise()
  console.log(data);
})().catch(err => console.log(err));
