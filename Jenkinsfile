
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code'
                checkout scm
            }
        }

        stage('Verify Project') {
            steps {
                sh 'ls -la'
                sh 'test -f docker-compose.yml'
                sh 'test -f services/user-service/Dockerfile'
                sh 'test -f services/product-service/Dockerfile'
                sh 'test -f services/order-service/Dockerfile'
            }
        }

        stage('Build Microservices') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Validate Docker Compose') {
            steps {
                sh 'docker compose config -q'
                echo 'Docker Compose configuration is valid'
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline completed successfully!'
        }
        failure {
            echo 'CI Pipeline failed. Check console output.'
        }
    }
}
