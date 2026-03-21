variable "aws_region" {
  description = "AWS region for S3 bucket and other resources (CloudFront is global)"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Root domain name (e.g. ramirezcleaningservices.com)"
  type        = string
}
