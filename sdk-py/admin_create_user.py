import os
import boto3
from getpass import getpass
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
username = input("[*] Enter Your Email Address: ")
password = getpass("[*] Enter Your Password: ")

USER_POOL_ID = os.getenv("USER_POOL_ID")
CLIENT_ID = os.getenv("CLIENT_ID")

cognito_idp = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))

cognito_idp.admin_create_user(
    UserPoolId=USER_POOL_ID,
    Username=username,
    TemporaryPassword=password,
    UserAttributes=[{"Name": "email", "Value": username},
                    {"Name": "email_verified", "Value": "true"}],
    MessageAction="SUPPRESS"
)

response = cognito_idp.admin_initiate_auth(
    UserPoolId=USER_POOL_ID,
    ClientId=CLIENT_ID,
    AuthFlow="ADMIN_NO_SRP_AUTH",
    AuthParameters={"USERNAME": username, "PASSWORD": password},
)
session = response["Session"]

response = cognito_idp.admin_respond_to_auth_challenge(
    UserPoolId=USER_POOL_ID,
    ClientId=CLIENT_ID,
    ChallengeName="NEW_PASSWORD_REQUIRED",
    ChallengeResponses={"USERNAME": username, "NEW_PASSWORD": password},
    Session=session
)
