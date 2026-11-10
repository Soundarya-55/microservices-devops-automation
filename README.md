# Microservices DevOps Automation
![Uploading image.png…]()

## Project Description

This project focuses on containerizing a three-microservice application and automating its build and validation process using Jenkins and Docker Compose.

The project contains three Node.js microservices: User Service, Product Service and Order Service. Nginx is configured as a reverse proxy to route requests to the respective services.

## Technologies Used

- Git and GitHub
- Jenkins
- Docker
- Docker Compose
- Node.js
- Nginx
- Prometheus
- Grafana
- Terraform
- AWS


## Microservices

### 1. User Service
Handles user-related application requests.

### 2. Product Service
Handles product-related application requests.

### 3. Order Service
Handles order-related application requests.

Each microservice has its own Dockerfile and Node.js application files.

## Docker Compose

Docker Compose manages the application containers and connects them through a custom bridge network named `app-network`.

Services configured:

- User Service – Port 3001 (internal)
- Product Service – Port 3002 (internal)
- Order Service – Port 3003 (internal)
- Nginx – Port 80 (host)

### Run the application

```bash
docker compose up -d --build
```

### Check running containers

```bash
docker compose ps
```

### View container logs

```bash
docker compose logs
```

### Stop containers

```bash
docker compose down
```

## Nginx Reverse Proxy

Nginx acts as the reverse proxy for the three microservices.

Configuration file:

`nginx/default.conf`

It routes incoming requests to the appropriate service.

## Jenkins CI/CD Pipeline

Jenkins automates the source code checkout, project verification, Docker image building and Docker Compose configuration validation.

### Pipeline stages

1. **Checkout** – Retrieves source code from GitHub.
2. **Verify Project** – Checks the project structure and Dockerfiles.
3. **Build Microservices** – Builds Docker images using Docker Compose.
4. **Validate Docker Compose** – Validates the Docker Compose configuration.

### Jenkins Configuration

- Job Name: `Microservices-CI-CD`
- Source Code: GitHub
- Branch: `main`
- Pipeline File: `Jenkinsfile`

## Monitoring Configuration

The project contains monitoring configuration files:

- `monitoring/prometheus.yml` – Prometheus configuration.
- `monitoring/grafana-datasource.yml` – Grafana datasource provisioning.

These files provide the configuration for integrating Prometheus and Grafana. Monitoring services and application metrics must be configured and verified separately.

## Terraform Infrastructure

The `terraform/` directory contains Infrastructure as Code files:

- `main.tf` – AWS resource definitions.
- `variables.tf` – Input variables.
- `outputs.tf` – Terraform output values.
- `versions.tf` – Terraform and AWS provider requirements.

These files define the planned AWS infrastructure for the application, including EC2, IAM, security groups and ECR repositories.

## GitHub Repository

https://github.com/Soundarya-55/microservices-devops-automation

## Project Objective

To implement practical DevOps workflows involving source code management, microservices containerization, CI pipeline automation, infrastructure as code and monitoring configuration.
