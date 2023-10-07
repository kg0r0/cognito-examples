package main

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider/types"
)

var (
	region     string = "<region>"
	userpoolid string = "<userpoolid>"
	clientid   string = "<clientid>"
)

func main() {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(region))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	svc := cognitoidentityprovider.NewFromConfig(cfg)
	resp, err := svc.AdminInitiateAuth(context.TODO(), &cognitoidentityprovider.AdminInitiateAuthInput{
		UserPoolId:     &userpoolid,
		AuthFlow:       types.AuthFlowTypeAdminUserPasswordAuth,
		AuthParameters: map[string]string{"USERNAME": "<username>", "PASSWORD": "<password>"},
		ClientId:       &clientid,
	})
	if err != nil {
		log.Fatalf("%+v\n", err)
	}
	log.Printf("%+v\n", resp.AuthenticationResult)
}
