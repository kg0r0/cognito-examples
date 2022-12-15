import os
import boto3
from getpass import getpass
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
USER_POOL_ID = os.getenv("USER_POOL_ID")
CLIENT_ID = os.getenv("CLIENT_ID")

username = input("[*] Enter Your Email Address: ")
password = getpass("[*] Enter Your Password: ")
response = client.initiate_auth(
    ClientId=CLIENT_ID,
    AuthFlow="USER_PASSWORD_AUTH",
    AuthParameters={"USERNAME": username, "PASSWORD": password},
)

access_token = response["AuthenticationResult"]["AccessToken"]

previous_password = getpass("[*] Enter Your Previous Password: ")
proposed_password = getpass("[*] Enter Your Proposed Password: ")

try:
    response = client.change_password(
        PreviousPassword=previous_password,
        ProposedPassword=proposed_password,
        AccessToken=access_token
    )
    print(response)
except Exception as e:
    print(e)