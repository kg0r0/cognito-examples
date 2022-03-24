import os
import boto3
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
client = boto3.client('cognito-idp', region_name=os.getenv('REGION_NAME'))
dst_input = input('[*] DestinationUser: ').split()
src_input = input('[*] SourceUser Info: ').split()
response = client.admin_link_provider_for_user(
    UserPoolId=os.getenv('USER_POOL_ID'),
    DestinationUser={
        'ProviderName': dst_input[0],
        'ProviderAttributeName': dst_input[1],
        'ProviderAttributeValue': dst_input[2]
    },
    SourceUser={
        'ProviderName': src_input[0],
        'ProviderAttributeName': src_input[1],
        'ProviderAttributeValue':src_input[2] 
    }
)
