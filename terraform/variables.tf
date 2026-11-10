variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-north-1"
}

variable "project_name" {
  description = "Project name used for AWS resource names"
  type        = string
  default     = "microservices-devops"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "key_pair_name" {
  description = "Existing AWS EC2 key pair name"
  type        = string
}

variable "ssh_allowed_cidr" {
  description = "Your public IP address in CIDR format, for example 203.0.113.10/32"
  type        = string

  validation {
    condition     = can(cidrnetmask(var.ssh_allowed_cidr))
    error_message = "Enter a valid CIDR range, preferably your own public IP with /32."
  }
}
