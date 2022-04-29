import os
import boto3
import pyotp
from getpass import getpass
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
username = input("[*] Enter Your Email Address: ")
password = getpass("[*] Enter Your Password: ")

client.admin_create_user(
    UserPoolId=os.getenv("USER_POOL_ID"),
    Username=username,
    TemporaryPassword=password,
    UserAttributes=[{"Name": "email", "Value": username},
                    {"Name": "email_verified", "Value": "true"}],
    MessageAction="SUPPRESS"
)

response = client.admin_initiate_auth(
    UserPoolId=os.getenv("USER_POOL_ID"),
    ClientId=os.getenv("CLIENT_ID"),
    AuthFlow="ADMIN_NO_SRP_AUTH",
    AuthParameters={"USERNAME": username, "PASSWORD": password},
)
session = response["Session"]

response = client.admin_respond_to_auth_challenge(
    UserPoolId=os.getenv("USER_POOL_ID"),
    ClientId=os.getenv("CLIENT_ID"),
    ChallengeName="NEW_PASSWORD_REQUIRED",
    ChallengeResponses={"USERNAME": username, "NEW_PASSWORD": password},
    Session=session
)

response = client.admin_initiate_auth(
    UserPoolId=os.getenv("USER_POOL_ID"),
    ClientId=os.getenv("CLIENT_ID"),
    AuthFlow="ADMIN_NO_SRP_AUTH",
    AuthParameters={"USERNAME": username, "PASSWORD": password},
)
access_token = response["AuthenticationResult"]["AccessToken"]

response = client.associate_software_token(
  AccessToken=access_token,
)
secret_code = response["SecretCode"]
print("[*] Issued Secret Code: {}".format(secret_code))
totp = pyotp.TOTP(secret_code)
response=client.verify_software_token(
  AccessToken=access_token,
  UserCode=totp.now(),
)
response=client.admin_set_user_mfa_preference(
  SoftwareTokenMfaSettings={
    "Enabled": True,
    "PreferredMfa": True,
  },
  UserPoolId=os.getenv("USER_POOL_ID"),
  Username=username,
)
print("[*] MFA Enabled")