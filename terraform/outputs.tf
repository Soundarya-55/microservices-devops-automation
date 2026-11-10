output "application_server_public_ip" {
  description = "Public IP address of application EC2"
  value       = aws_instance.app_server.public_ip
}

output "application_server_public_dns" {
  description = "Public DNS of application EC2"
  value       = aws_instance.app_server.public_dns
}

output "user_service_ecr_url" {
  value = aws_ecr_repository.user_service.repository_url
}

output "product_service_ecr_url" {
  value = aws_ecr_repository.product_service.repository_url
}

output "order_service_ecr_url" {
  value = aws_ecr_repository.order_service.repository_url
}
