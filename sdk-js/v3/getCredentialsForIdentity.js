import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand, GetCredentialsForIdentityCommand } from '@aws-sdk/client-cognito-identity'

(
  async () => {
    const idpClient = new CognitoIdentityProviderClient({
      region: '<region>'
    });
    const initiateAuthCommand = new InitiateAuthCommand({
      ClientId: '<clientid>',
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: '<username>',
        PASSWORD: '<password>'
      }
    });
    const response = await idpClient.send(initiateAuthCommand);
    const idtoken = response.AuthenticationResult.IdToken;
    const idClient = new CognitoIdentityClient({
      region: '<region>'
    });
    const providerName = 'cognito-idp.<region>.amazonaws.com/<userpoolid>'
    const params = {
      AccountId: '<accountid>',
      IdentityPoolId: '<identitypoolid>',
      Logins: {
        [providerName]: idtoken
      }
    };
    const getIdCommand = new GetIdCommand (params);
    const getIdResult = await idClient.send(getIdCommand);
    const getCredentialsForIdentityCommand = new GetCredentialsForIdentityCommand({
      IdentityId: getIdResult.IdentityId,
      Logins: {
        [providerName]: idtoken
      }
    });
    const getCredentialsForIdentityResult = await idClient.send(getCredentialsForIdentityCommand);
    console.log(getCredentialsForIdentityResult);
  }
)().catch(err => console.log(err));