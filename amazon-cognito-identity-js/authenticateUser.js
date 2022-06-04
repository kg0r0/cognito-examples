const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

(async () => {

  const username = '<username>';
  const password =  '<password>';
  const userPoolId = '...'; // Your user pool id here
  const clientId =  '...'; // Your client id here
  const region = '<region>';
  const identityPoolId =  '...'; // your identity pool id here

  const authenticationData = {
    Username: username,
    Password: password,
  };
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  const poolData = {
    UserPoolId: userPoolId, // Your user pool id here
    ClientId: clientId, // Your client id here
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      const accessToken = result.getAccessToken().getJwtToken();

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = region;

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId, // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: result
            .getIdToken()
            .getJwtToken(),
        },
      });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh(error => {
        if (error) {
          console.error(error);
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
          console.log('Successfully logged!');
        }
      });
    },

    onFailure: function (err) {
      console.error(err.message || JSON.stringify(err));
    },
  });
})().catch(err => console.error(err));
