#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ACCOUNT_ID="454921778591"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found."
  echo "Create it with your AWS credentials:"
  echo "  AWS_ACCESS_KEY_ID=your-key"
  echo "  AWS_SECRET_ACCESS_KEY=your-secret"
  exit 1
fi

# Strip Windows CRLF characters before sourcing to avoid hidden \r in secrets.
source <(tr -d '\r' < "$ENV_FILE")

if [ -z "${AWS_ACCESS_KEY_ID:-}" ] || [ -z "${AWS_SECRET_ACCESS_KEY:-}" ]; then
  echo "ERROR: Missing AWS credentials in $ENV_FILE."
  echo "Both AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are required."
  exit 1
fi

export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION=us-east-1
export AWS_REGION=us-east-1
export AWS_SHARED_CREDENTIALS_FILE=/dev/null
export AWS_CONFIG_FILE=/dev/null
export AWS_SDK_LOAD_CONFIG=0
unset AWS_PROFILE AWS_SESSION_TOKEN AWS_SECURITY_TOKEN

ACTUAL_ACCOUNT="$(aws sts get-caller-identity --query Account --output text 2>/dev/null || true)"
if [ -z "$ACTUAL_ACCOUNT" ] || [ "$ACTUAL_ACCOUNT" = "None" ]; then
  echo "ERROR: Unable to validate AWS credentials from $ENV_FILE."
  echo "Run: aws sts get-caller-identity"
  exit 1
fi

if [ "$ACTUAL_ACCOUNT" != "$EXPECTED_ACCOUNT_ID" ]; then
  echo "ERROR: WRONG AWS ACCOUNT! Expected $EXPECTED_ACCOUNT_ID but got $ACTUAL_ACCOUNT"
  echo "Update $ENV_FILE with keys from account $EXPECTED_ACCOUNT_ID."
  exit 1
fi

exec terraform "$@"
