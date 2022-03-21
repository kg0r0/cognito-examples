const AWS = require('aws-sdk')
const cognitoidp = new AWS.CognitoIdentityServiceProvider({ region: 'ap-northeast-1' })

const listAllActiveUsers = async () => {
  const params = {
    UserPoolId: '<YOUR-USER-POOL-ID>',
    Limit: 60,
    Filter: 'cognito:user_status="CONFIRMED"'
  }
  const data = await cognitoidp.listUsers(params).promise()
  const users = data.Users
  console.log(users)
}
listAllActiveUsers()