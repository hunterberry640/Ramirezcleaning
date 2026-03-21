#!/usr/bin/env bash
set -euo pipefail

# Deploys the static site to S3 and invalidates the CloudFront cache.
# Prerequisites: AWS CLI configured, Terraform already applied.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INFRA_DIR="$SCRIPT_DIR/infra"

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
