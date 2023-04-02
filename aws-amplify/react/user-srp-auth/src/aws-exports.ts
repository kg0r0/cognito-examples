const Auth = {
  // Amazon Cognito Region
  region: 'XX-XXXX-X',
  // Amazon Cognito User Pool ID
  userPoolId: 'XX-XXXX-X_abcd1234',
  // Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
  // Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  authenticationFlowType: 'USER_SRP_AUTH',
}

export default Auth;