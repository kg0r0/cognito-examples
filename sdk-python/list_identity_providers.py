import os
import boto3
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
response = client.list_identity_providers(
    UserPoolId=os.getenv("USER_POOL_ID"),
)
print(f"[*] List Identity Providers: {response}")
