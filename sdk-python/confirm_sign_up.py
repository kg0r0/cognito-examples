import os
import boto3
import json
from dotenv import load_dotenv, find_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

client=boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
username = input("[*] Enter Your Email Address: ")
confirm_code = input("[*] Enter Your Confirmation Code: ")
response = client.confirm_sign_up(
    ClientId=os.getenv("COGNITO_CLIENT_ID"),
    Username=username,
    ConfirmationCode=confirm_code,
)

print(json.dumps(response))