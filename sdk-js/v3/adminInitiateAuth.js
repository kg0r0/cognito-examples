import { CognitoIdentityProviderClient, AdminInitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

(
  async () => {
    const client = new CognitoIdentityProviderClient({
      region: '<region>'
    });
    const adminInitiateAuthCommand = new AdminInitiateAuthCommand({
      UserPoolId: '<user-pool-id>',
      ClientId: '<client-id>',
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: '<username>',
        PASSWORD: '<passowrd>'
      }
    });
    const response = await client.send(adminInitiateAuthCommand);
    console.log(response);
  }
)().catch(err => console.log(err));