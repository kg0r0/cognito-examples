exports.handler = (event, context, callback) => {
  if (event.callerContext.clientId === "user-pool-app-client-id-to-be-blocked") {
    var error = new Error("Cannot authenticate users from this user pool app client");

    // Return error to Amazon Cognito
    callback(error, event);
  }

  // Return to Amazon Cognito
  callback(null, event);
};