const amplifyconfig = ''' {
  "UserAgent": "aws-amplify-cli/2.0",
  "Version": "1.0",
  "auth": {
    "plugins": {
      "awsCognitoAuthPlugin": {
        "IdentityManager": {
          "Default": {}
        },
        "CredentialsProvider": {
          "CognitoIdentity": {
            "Default": {
              "PoolId": "[COGNITO IDENTITY POOL ID]",
              "Region": "[REGION]"
            }
          }
        },
        "CognitoUserPool": {
          "Default": {
            "PoolId": "[COGNITO USER POOL ID]",
            "AppClientId": "[COGNITO USER POOL APP CLIENT ID]",
            "Region": "[REGION]"
          }
        },
        "Auth": {
          "Default": {
            "authenticationFlowType": "USER_SRP_AUTH",
            "socialProviders": [],
            "usernameAttributes": [],
            "signupAttributes": [
              "email"
            ],
            "passwordProtectionSettings": {
              "passwordPolicyMinLength": 8,
              "passwordPolicyCharacters": []
            },
            "OAuth": {
              "WebDomain": "[YOUR COGNITO DOMAIN ]",
              "AppClientId": "[COGNITO USER POOL APP CLIENT ID]",
              "SignInRedirectURI": "[CUSTOM REDIRECT SCHEME AFTER SIGN IN, e.g. myapp://]",
              "SignOutRedirectURI": "[CUSTOM REDIRECT SCHEME AFTER SIGN OUT, e.g. myapp://]",
              "Scopes": [
                "phone",
                "email",
                "openid",
                "profile",
                "aws.cognito.signin.user.admin"
              ]
            }
          }
        }
      }
    }
  }
}''';