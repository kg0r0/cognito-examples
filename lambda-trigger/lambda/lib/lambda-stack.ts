import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
      code: new lambda.AssetCode('src'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });

    const servicePrincipal = new iam.ServicePrincipal('cognito-idp.amazonaws.com');
    const sourceArn = '<your user pool ARN';
    const sourceAccount = '<your account number>';
    const servicePrincipalWithConditions = servicePrincipal.withConditions({
      ArnLike: {
        'aws:SourceArn': sourceArn,
      },
      StringEquals: {
        'aws:SourceAccount': sourceAccount,
      },
    });
    lambdaFunction.grantInvoke(servicePrincipalWithConditions);
    lambdaFunction.addPermission('my-service Invocation', {
      principal: servicePrincipal,
      sourceArn: sourceArn,
      sourceAccount: sourceAccount,
    });
  }
}
