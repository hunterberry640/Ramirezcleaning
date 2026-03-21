#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INFRA_DIR="$SCRIPT_DIR/infra"
ENV_FILE="$INFRA_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found."
  echo "Create it with your AWS credentials:"
  echo "  AWS_ACCESS_KEY_ID=your-key"
  echo "  AWS_SECRET_ACCESS_KEY=your-secret"
  exit 1
fi

source "$ENV_FILE"
export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY
export AWS_SHARED_CREDENTIALS_FILE=/dev/null
export AWS_CONFIG_FILE=/dev/null
unset AWS_PROFILE AWS_SESSION_TOKEN AWS_SECURITY_TOKEN

EXPECTED_ACCOUNT="454921778591"
ACTUAL_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
if [ "$ACTUAL_ACCOUNT" != "$EXPECTED_ACCOUNT" ]; then
  echo "ERROR: WRONG AWS ACCOUNT! Expected $EXPECTED_ACCOUNT but got $ACTUAL_ACCOUNT"
  echo "The credentials in $ENV_FILE belong to account $ACTUAL_ACCOUNT, not $EXPECTED_ACCOUNT."
  exit 1
fi
echo "Confirmed: deploying to account $ACTUAL_ACCOUNT"

# Get outputs from Terraform
BUCKET=$(cd "$INFRA_DIR" && terraform output -raw s3_bucket_name)
DISTRIBUTION_ID=$(cd "$INFRA_DIR" && terraform output -raw cloudfront_distribution_id)

echo "Deploying to S3 bucket: $BUCKET"

# Sync site files (exclude infra, node_modules, git, etc.)
aws s3 sync "$SCRIPT_DIR" "s3://$BUCKET" \
  --delete \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude ".cursor/*" \
  --exclude "node_modules/*" \
  --exclude "infra/*" \
  --exclude "deploy.sh" \
  --exclude ".gitignore" \
  --exclude "*.md" \
  --exclude "package.json" \
  --exclude "package-lock.json" \
  --exclude "vite.config.js" \
  --exclude ".nojekyll" \
  --exclude "CNAME" \
  --cache-control "public, max-age=86400"

# Set shorter cache for HTML files (so updates propagate faster)
aws s3 cp "s3://$BUCKET" "s3://$BUCKET" \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=300" \
  --content-type "text/html"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --no-cli-pager

echo "Deploy complete! Site is live at https://$(cd "$INFRA_DIR" && terraform output -raw site_url | sed 's|https://||')"
