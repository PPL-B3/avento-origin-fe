#!/bin/bash

# Exit on error
set -e

# Default values
PROJECT_ID="ppl-fe-455515"
SERVICE_NAME="avento-origin-fe"
REGION="asia-southeast2"
MAX_INSTANCES=5
MEMORY="512Mi"
CPU=1
DOCKER_USERNAME="cybersleeper"

# Get version from version.txt or use v0.0.0 as default
VERSION=$(cat version.txt 2>/dev/null || echo "v0.0.0")

# Default environment variables
NEXT_PUBLIC_BASE_URL=""
NEXT_PUBLIC_API_URL=""
LOGROCKET_ID=""

# Convert env vars to comma-separated format for Cloud Run
ENV_VARS="NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL,LOGROCKET_ID=$LOGROCKET_ID"

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --project-id) PROJECT_ID="$2"; shift ;;
        --service-name) SERVICE_NAME="$2"; shift ;;
        --region) REGION="$2"; shift ;;
        --max-instances) MAX_INSTANCES="$2"; shift ;;
        --memory) MEMORY="$2"; shift ;;
        --cpu) CPU="$2"; shift ;;
        --version) VERSION="$2"; shift ;;
        --next-public-base-url) NEXT_PUBLIC_BASE_URL="$2"; shift ;;
        --next-public-api-url) NEXT_PUBLIC_API_URL="$2"; shift ;;
        --logrocket-id) LOGROCKET_ID="$2"; shift ;;
        --env-vars) ENV_VARS="$2"; shift ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Check if project ID is provided
if [ -z "$PROJECT_ID" ]; then
    echo "Error: --project-id is required"
    exit 1
fi

# Define versioned names
IMAGE_NAME_VERSIONED="$DOCKER_USERNAME/$SERVICE_NAME:$VERSION"

echo "Building Docker image with version: $VERSION"
# Pass environment variables as build arguments to Docker
docker build \
  --build-arg NEXT_PUBLIC_BASE_URL="$NEXT_PUBLIC_BASE_URL" \
  --build-arg NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" \
  --build-arg LOGROCKET_ID="$LOGROCKET_ID" \
  -t "$IMAGE_NAME_VERSIONED" .

# Log in to Docker Hub (will prompt for password if not logged in)
echo "Logging in to Docker Hub..."
docker login --username "$DOCKER_USERNAME"

# Push to Docker Hub
echo "Pushing images to Docker Hub"
docker push "$IMAGE_NAME_VERSIONED"

# Prepare the environment variables flag if provided
ENV_FLAG="--set-env-vars=$ENV_VARS"

# Login to Google Cloud
echo "Logging in to Google Cloud..."
gcloud auth login
gcloud config set project "$PROJECT_ID"

# debug env
echo "Debugging environment variables..."
echo "ENV: $ENV_FLAG"

# Deploy to Cloud Run using the versioned Docker Hub image
echo "Deploying to Cloud Run using versioned image: $IMAGE_NAME_VERSIONED"
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_NAME_VERSIONED" \
  --platform managed \
  --region "$REGION" \
  --max-instances "$MAX_INSTANCES" \
  --memory "$MEMORY" \
  --cpu "$CPU" \
  --allow-unauthenticated \
  $ENV_FLAG \
  --project "$PROJECT_ID"

echo "Deployment complete! Your app version $VERSION is now running at:"
gcloud run services describe "$SERVICE_NAME" --platform managed --region "$REGION" --project "$PROJECT_ID" --format="value(status.url)"
