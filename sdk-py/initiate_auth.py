import os
import boto3
from getpass import getpass
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
username = input("[*] Enter Your Email Address: ")
password = getpass("[*] Enter Your Password: ")

response = client.initiate_auth(
    ClientId=os.getenv("CLIENT_ID"),
    AuthFlow="USER_PASSWORD_AUTH",
    AuthParameters={"USERNAME": username, "PASSWORD": password},
)
print(response)

access_token = response["AuthenticationResult"]["AccessToken"]
response = client.get_user(AccessToken=access_token)
print(response)
