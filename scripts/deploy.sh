#! /bin/bash
gcloud functions deploy handleGpt \
	--runtime=nodejs18 \
	--trigger-http \
	--region=asia-northeast1
