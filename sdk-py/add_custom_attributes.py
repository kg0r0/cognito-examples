import os
import boto3
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
attr_name = input("[*] Enter Attribute Name: ")

USER_POOL_ID = os.getenv("USER_POOL_ID")

client = boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))

response = client.add_custom_attributes(
    UserPoolId=USER_POOL_ID,
    CustomAttributes=[
        {
            'Name': attr_name,
            # 'AttributeDataType': 'String'|'Number'|'DateTime'|'Boolean',
            'AttributeDataType': 'String',
            # 'DeveloperOnlyAttribute': True | False,
            'DeveloperOnlyAttribute': False,
            # 'Mutable': True | False,
            'Mutable': True,
            # 'Required': True | False,
            'Required': False,
            # 'NumberAttributeConstraints': {
            #    'MinValue': 'string',
            #    'MaxValue': 'string'
            # },
            # 'StringAttributeConstraints': {
            #    'MinLength': 'string',
            #    'MaxLength': 'string'
            # }
        },
    ]
)
print(response)
