exports.handler = (event, context, callback) => {

  // Send post authentication data to Cloudwatch logs
  console.log ("Authentication successful");
  console.log ("Trigger function =", event.triggerSource);
  console.log ("User pool = ", event.userPoolId);
  console.log ("App client ID = ", event.callerContext.clientId);
  console.log ("User ID = ", event.userName);

  // Return to Amazon Cognito
  callback(null, event);
};