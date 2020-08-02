#!/bin/bash
aws cloudformation deploy --template-file ./cloudformation.yml --stack-name hosting-bucket --parameter-overrides BucketName=missionconnect
aws s3 sync . s3://missionconnect --delete
