import os
import boto3
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

USER_POOL_ID = os.getenv("USER_POOL_ID")
CLIENT_ID = os.getenv("CLIENT_ID")

client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))

response = client.describe_user_pool_client(
    UserPoolId=USER_POOL_ID,
    ClientId=CLIENT_ID
)
print(response)