exports.handler = (event, context, callback) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  // Return to Amazon Cognito
  callback(null, event);
};