import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

(
  async () => {
    const client = new CognitoIdentityProviderClient({
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
    const response = await client.send(initiateAuthCommand);
    console.log(response);
  }
)().catch(err => console.log(err));