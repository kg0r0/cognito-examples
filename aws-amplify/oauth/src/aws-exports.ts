const Auth = {
  // Amazon Cognito Region
  region: 'XX-XXXX-X',
  // Amazon Cognito User Pool ID
  userPoolId: 'XX-XXXX-X_abcd1234',
  // Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
  // Hosted UI configuration
  oauth: {
    domain: 'your_cognito_domain',
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:3000/cb',
    redirectSignOut: 'http://localhost:3000/cb',
    responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
  }
}

export default Auth;