#  To create a SecretHash value

When a user pool app client is configured with a client secret in the user pool, a SecretHash value is required in the API's query argument.

## Usage

```
$ python3 secret_hash.py <username> <app_client_id> <app_client_secret>
```

## References
- [How do I troubleshoot "Unable to verify secret hash for client <client-id>" errors from my Amazon Cognito user pools API?](https://aws.amazon.com/premiumsupport/knowledge-center/cognito-unable-to-verify-secret-hash/)