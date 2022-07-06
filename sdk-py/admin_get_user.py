import os
import boto3
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
username = input("[*] Enter User Name: ")

USER_POOL_ID = os.getenv("USER_POOL_ID")

client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))

response = client.admin_get_user(
    UserPoolId=USER_POOL_ID,
    Username=username,
)
print(response)
