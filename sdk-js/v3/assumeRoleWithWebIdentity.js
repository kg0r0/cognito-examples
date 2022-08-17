import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoIdentityClient, GetIdCommand, GetOpenIdTokenCommand } from '@aws-sdk/client-cognito-identity';
import { STSClient, AssumeRoleWithWebIdentityCommand, STSClient } from '@aws-sdk/client-sts';

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
    const getIdCommand = new GetIdCommand({
      AccountId: '<accountid>',
      IdentityPoolId: '<identitypoolid>',
      Logins: {
        [providerName]: idtoken
      }
    });
    const getIdResult = await idClient.send(getIdCommand);
    const identityId = getIdResult.IdentityId
    const getOpenIdTokenCommand = new GetOpenIdTokenCommand({
      IdentityId: identityId,
      Logins: {
        [providerName]: idtoken
      }
    });
    const getOpenIdTokenResult = await idClient.send(getOpenIdTokenCommand);
    const STSClient = new STSClient({
      region: '<region>'
    });
    const assumeRoleWithWebIdentityCommand = new AssumeRoleWithWebIdentityCommand({
      RoleArn: '<rolearn>',
      RoleSessionName: '<rolesessionname>',
      WebIdentityToken: getOpenIdTokenResult.Token,
      DurationSeconds: 900
    });
    const assumeRoleWithWebIdentityResult = await STSClient.send(assumeRoleWithWebIdentityCommand);
    console.log(assumeRoleWithWebIdentityResult);
  }
)().catch(err => console.log(err));