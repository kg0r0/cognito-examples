const AWS = require('aws-sdk');
require('dotenv').config();
const cognitoidp = new AWS.CognitoIdentityServiceProvider({ region: process.env.REGION_NAME });

(async () => {
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Limit: 60,
    Filter: 'cognito:user_status="CONFIRMED"'
  }
  const data = await cognitoidp.listUsers(params).promise()
  const users = data.Users
  console.log(users)
})();