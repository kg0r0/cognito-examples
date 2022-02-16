from getpass import getpass
import os
import boto3
from getpass import getpass
from dotenv import load_dotenv, find_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
client=boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
username = input("[*] Enter Your Email Address: ")
password = getpass("[*] Enter Your Password: ")

response = client.sign_up(
    ClientId=os.getenv("COGNITO_CLIENT_ID"),
    Username=username,
    Password=password,
    UserAttributes=[{"Name": "email", "Value": username}],
)
