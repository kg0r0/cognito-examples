import os
import boto3
import json
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
pool_name = input("[*] Enter Pool Name: ")

client=boto3.client("cognito-idp", region_name=os.getenv("REGION_NAME"))
response = client.create_user_pool(
    PoolName=pool_name,
    Policies={
        'PasswordPolicy': {
            'MinimumLength': 8,
            'RequireUppercase': True,
            'RequireLowercase': True,
            'RequireNumbers': True,
            'RequireSymbols': True,
            'TemporaryPasswordValidityDays': 123
        }
    },
#    LambdaConfig={
#        'PreSignUp': 'string',
#        'CustomMessage': 'string',
#        'PostConfirmation': 'string',
#        'PreAuthentication': 'string',
#        'PostAuthentication': 'string',
#        'DefineAuthChallenge': 'string',
#        'CreateAuthChallenge': 'string',
#        'VerifyAuthChallengeResponse': 'string',
#        'PreTokenGeneration': 'string',
#        'UserMigration': 'string',
#        'CustomSMSSender': {
#            'LambdaVersion': 'V1_0',
#            'LambdaArn': 'string'
#        },
#        'CustomEmailSender': {
#            'LambdaVersion': 'V1_0',
#            'LambdaArn': 'string'
#        },
#        'KMSKeyID': 'string'
#    },
#    AutoVerifiedAttributes=[
#        'phone_number'|'email',
#    ],
#    AliasAttributes=[
#        'phone_number'|'email'|'preferred_username',
#    ],
#    UsernameAttributes=[
#        'phone_number'|'email',
#    ],
#    SmsVerificationMessage='string',
#    EmailVerificationMessage='string',
#    EmailVerificationSubject='string',
#    VerificationMessageTemplate={
#        'SmsMessage': 'string',
#        'EmailMessage': 'string',
#        'EmailSubject': 'string',
#        'EmailMessageByLink': 'string',
#        'EmailSubjectByLink': 'string',
#        'DefaultEmailOption': 'CONFIRM_WITH_LINK'|'CONFIRM_WITH_CODE'
#    },
#    SmsAuthenticationMessage='string',
    MfaConfiguration='OFF',
#    UserAttributeUpdateSettings={
#        'AttributesRequireVerificationBeforeUpdate': [
#            'phone_number'|'email',
#        ]
#    },
#    DeviceConfiguration={
#        'ChallengeRequiredOnNewDevice': True|False,
#        'DeviceOnlyRememberedOnUserPrompt': True|False
#    },
#    EmailConfiguration={
#        'SourceArn': 'string',
#        'ReplyToEmailAddress': 'string',
#        'EmailSendingAccount': 'COGNITO_DEFAULT'|'DEVELOPER',
#        'From': 'string',
#        'ConfigurationSet': 'string'
#    },
#    SmsConfiguration={
#        'SnsCallerArn': 'string',
#        'ExternalId': 'string',
#        'SnsRegion': 'string'
#    },
#    UserPoolTags={
#        'string': 'string'
#    },
#    AdminCreateUserConfig={
#        'AllowAdminCreateUserOnly': True|False,
#        'UnusedAccountValidityDays': 123,
#        'InviteMessageTemplate': {
#            'SMSMessage': 'string',
#            'EmailMessage': 'string',
#            'EmailSubject': 'string'
#        }
#    },
#    Schema=[
#        {
#            'Name': 'string',
#            'AttributeDataType': 'String'|'Number'|'DateTime'|'Boolean',
#            'DeveloperOnlyAttribute': True|False,
#            'Mutable': True|False,
#            'Required': True|False,
#            'NumberAttributeConstraints': {
#                'MinValue': 'string',
#                'MaxValue': 'string'
#            },
#            'StringAttributeConstraints': {
#                'MinLength': 'string',
#                'MaxLength': 'string'
#            }
#        },
#    ],
#    UserPoolAddOns={
#        'AdvancedSecurityMode': 'OFF'|'AUDIT'|'ENFORCED'
#    },
#    UsernameConfiguration={
#        'CaseSensitive': True|False
#    },
#    AccountRecoverySetting={
#        'RecoveryMechanisms': [
#            {
#                'Priority': 123,
#                'Name': 'verified_email'|'verified_phone_number'|'admin_only'
#            },
#        ]
#    }
)
print(response)