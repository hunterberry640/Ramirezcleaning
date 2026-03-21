# Infrastructure — AWS Deployment

Terraform configuration to deploy the Ramirez Cleaning Services static site to AWS.

## Architecture

```
User → Route 53 (DNS) → CloudFront (CDN + HTTPS) → S3 (Static Files)
```

**Resources created:**

- **S3 bucket** — Stores HTML, CSS, JS, and image files
- **CloudFront distribution** — Global CDN with HTTPS, caching, and gzip compression
- **ACM certificate** — Free SSL/TLS certificate for the domain (auto-renewed)
- **Route 53 records** — A/AAAA records for apex (`ramirezcleaningservices.com`) and `www`
- **CloudFront function** — Rewrites `/en/` to `/en/index.html` for clean URLs

## Prerequisites

1. [Terraform](https://developer.hashicorp.com/terraform/install) installed (>= 1.5)
2. [AWS CLI](https://aws.amazon.com/cli/) installed and configured (`aws configure`)
3. Route 53 hosted zone already created for `ramirezcleaningservices.com`

## First-Time Setup

```bash
cd infra

# Initialize Terraform (downloads providers)
terraform init

# Preview what will be created
terraform plan

# Create all resources (takes ~5-10 min, mostly waiting for ACM cert + CloudFront)
terraform apply
```

Type `yes` when prompted. The ACM certificate validation and CloudFront distribution creation can take 5-15 minutes.

## Deploy Site Files

After Terraform has created the infrastructure, deploy the site:

```bash
# From the project root
chmod +x deploy.sh
./deploy.sh
```

This syncs all site files to S3 and invalidates the CloudFront cache.

## Updating the Site

After making changes to HTML/CSS/JS, just re-run:

```bash
./deploy.sh
```

Changes propagate in ~1-5 minutes (CloudFront cache invalidation).

## Tear Down

To destroy all AWS resources:

```bash
cd infra
terraform destroy
```

## Costs

For a low-traffic static site, expect **~$0.50-2.00/month**:

- S3: ~$0.01/month (a few MB of storage)
- CloudFront: Free tier covers 1TB/month data transfer + 10M requests
- Route 53: $0.50/month per hosted zone
- ACM certificate: Free
