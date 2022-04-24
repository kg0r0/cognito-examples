from http import client
import os
import boto3
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))

username = input("[*] Enter Your Username: ")
response = client.admin_disable_user(
    UserPoolId=os.getenv("USER_POOL_ID"),
    Username=username
)
print("[*] Response: {}".format(response))
