import os
import boto3
from getpass import getpass
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

REGION_NAME = os.getenv("REGION_NAME")
CLIENT_ID = os.getenv("CLIENT_ID")
USER_POOL_ID = os.getenv("USER_POOL_ID")

client = boto3.client("cognito-idp", region_name=REGION_NAME)
username = input("[*] Enter Your Email Address: ")
password = getpass("[*] Enter Your Password: ")
response = client.initiate_auth(
    ClientId=CLIENT_ID,
    AuthFlow="USER_PASSWORD_AUTH",
    AuthParameters={"USERNAME": username, "PASSWORD": password},
)
access_token = response["AuthenticationResult"]["AccessToken"]
refresh_token = response["AuthenticationResult"]["RefreshToken"]
assert access_token is not None
assert refresh_token is not None
print("[*] Issued Access Token and Refresh Token")

result = client.admin_user_global_sign_out(
    UserPoolId=USER_POOL_ID,
    Username=username
)
assert result["ResponseMetadata"]["HTTPStatusCode"] == 200 
print("[*] Successful GlobalSignOut")

try:
    client.initiate_auth(
        ClientId=CLIENT_ID,
        AuthFlow="REFRESH_TOKEN_AUTH",
        AuthParameters={"USERNAME": username, "REFRESH_TOKEN": refresh_token},
    )
except client.exceptions.NotAuthorizedException as e:
    assert "Refresh Token has been revoked" in str(e)
    print("[*] Refresh Token has been revoked")
print("[*] All done!")
