exports.handler = (event, context, callback) => {

  if (event.triggerSource == "UserMigration_Authentication") {
    const mockAuthenticateUser = (username, password) => {
      return {
        emailAddress: username
      }
    }

    // authenticate the user with your existing user directory service
    //user = authenticateUser(event.userName, event.request.password);
    const user = mockAuthenticateUser(event.userName, event.request.password);
    if (user) {
      event.response.userAttributes = {
        "email": user.emailAddress,
        "email_verified": "true"
      };
      event.response.finalUserStatus = "CONFIRMED";
      event.response.messageAction = "SUPPRESS";
      context.succeed(event);
    }
    else {
      // Return error to Amazon Cognito
      callback("Bad password");
    }
  }
  else if (event.triggerSource == "UserMigration_ForgotPassword") {
    const mockLookupUser = (username, password) => {
      return {
        emailAddress: username
      }
    }

    // Lookup the user in your existing user directory service
    const user = mockLookupUser(event.userName);
    if (user) {
      event.response.userAttributes = {
        "email": user.emailAddress,
        // required to enable password-reset code to be sent to user
        "email_verified": "true"
      };
      event.response.messageAction = "SUPPRESS";
      context.succeed(event);
    }
    else {
      // Return error to Amazon Cognito
      callback("Bad password");
    }
  }
  else {
    // Return error to Amazon Cognito
    callback("Bad triggerSource " + event.triggerSource);
  }
};
