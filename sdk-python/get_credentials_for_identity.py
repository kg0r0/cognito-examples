import os
import boto3
from getpass import getpass
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
idp_client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
username = input("[*] Enter Your Email Address: ")
password = getpass("[*] Enter Your Password: ")

REGION_NAME = os.getenv("REGION_NAME")
CLIENT_ID = os.getenv("CLIENT_ID")
USER_POOL_ID = os.getenv("USER_POOL_ID")
ACCOUNT_ID = os.getenv("ACCOUNT_ID")
IDENTITY_POOL_ID = os.getenv("IDENTITY_POOL_ID")
PROVIDER_NAMES = f"cognito-idp.{REGION_NAME}.amazonaws.com/{USER_POOL_ID}"

response = idp_client.initiate_auth(
    ClientId=CLIENT_ID,
    AuthFlow="USER_PASSWORD_AUTH",
    AuthParameters={"USERNAME": username, "PASSWORD": password},
)
id_token = response["AuthenticationResult"]["IdToken"]
id_client = boto3.client(
    "cognito-identity", region_name=REGION_NAME)
identity_id = id_client.get_id(
    AccountId=ACCOUNT_ID,
    IdentityPoolId=IDENTITY_POOL_ID,
    Logins={
        PROVIDER_NAMES: id_token
    }
)["IdentityId"]
credentials = id_client.get_credentials_for_identity(
    IdentityId=identity_id,
    Logins={
        PROVIDER_NAMES: id_token
    }
)["Credentials"]
print(f"[*] Credentials: {credentials}")
