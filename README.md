# Snake Game CI/CD Project

## Overview

A containerized Snake Game application deployed on Kubernetes (K3s) using Helm and automated through a Jenkins Continuous Delivery pipeline. The project demonstrates containerization, Continuous Delivery, image management using AWS ECR, and Kubernetes deployments using Helm.

## Tech Stack

* GitHub
* Jenkins
* Docker
* AWS EC2
* AWS ECR
* Helm
* Kubernetes (K3s)

## Architecture

Developer
↓
GitHub Repository
↓
GitHub Webhook
↓
Jenkins Pipeline
↓
Docker Image Build
↓
AWS ECR (Store Docker Image)
↓
Manual Approval
↓
Helm Deployment
↓
K3s Kubernetes Cluster
↓
Snake Game Application

## Features

* Dockerized application deployment
* Jenkins Continuous Delivery pipeline
* GitHub Webhook integration
* AWS ECR image repository
* Manual approval before deployment
* Helm-based Kubernetes deployments
* K3s Kubernetes cluster deployment

## Deployment Flow

1. Developer pushes code to GitHub
2. GitHub webhook triggers Jenkins pipeline
3. Jenkins builds Docker image
4. Jenkins pushes image to AWS ECR
5. Manual approval stage is triggered
6. Helm deploys the latest image to K3s Kubernetes
7. Application becomes available to end users

## Project Structure

snake-game/
├── App/
├── docs/
├── screenshots/
├── Dockerfile
├── Jenkinsfile
├── README.md
└── helm/
├── Chart.yaml
├── values.yaml
└── templates/
├── deployment.yaml
└── service.yaml

## Screenshots

* Jenkins Pipeline Success
* Manual Approval Stage
* Continuous Delivery Pipeline
* Continuous Deployment Pipeline
* AWS ECR Repository
* Snake Game Application

## Application Access

http://<EC2-Public-IP>:30080
