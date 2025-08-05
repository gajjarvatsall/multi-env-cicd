# Multi-Environment CI/CD Pipeline with GitOps

[![CI/CD Pipeline](https://github.com/gajjarvatsall/multi-env-cicd/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/gajjarvatsall/multi-env-cicd/actions/workflows/ci-cd.yml)
[![Docker Hub](https://img.shields.io/docker/v/gajjarvatsall/multi-env-cicd?label=Docker%20Hub)](https://hub.docker.com/r/gajjarvatsall/multi-env-cicd)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A comprehensive DevOps project demonstrating modern CI/CD practices with multi-environment deployments using GitHub Actions, Docker, Kubernetes, and GitOps methodology.

## 🏗️ Architecture Overview

This project showcases a production-ready CI/CD pipeline that automatically builds, tests, and deploys a Node.js application across multiple environments using GitOps principles.

<img width="1469" height="682" alt="Screenshot 2025-08-05 at 2 54 57 PM" src="https://github.com/user-attachments/assets/b459f6f4-742a-4675-87b9-1aca3a1249bf" />

## 🚀 Features

### DevOps Practices Implemented

- **Continuous Integration**: Automated testing on every push and pull request
- **Continuous Deployment**: Automatic deployment to multiple environments
- **GitOps Methodology**: Infrastructure and application configuration as code
- **Multi-Environment Strategy**: Separate dev and staging environments
- **Container Orchestration**: Kubernetes deployment with health checks
- **Infrastructure as Code**: Kubernetes manifests and Docker configurations
- **Automated Testing**: Jest-based unit and integration tests
- **Security Best Practices**: Secrets management and least privilege access

### Technical Stack

- **Application**: Node.js with Express.js
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes (kind for local development)
- **CI/CD**: GitHub Actions with automated workflows
- **Image Registry**: Docker Hub with automated pushes
- **GitOps**: Separate repository for environment configurations
- **Testing**: Jest with Supertest for API testing
- **Monitoring**: Health checks and readiness probes

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # GitHub Actions CI/CD pipeline
├── k8s/
│   └── deployment.yaml         # Kubernetes deployment manifests
├── app.js                      # Express.js application
├── app.test.js                 # Jest test suite
├── Dockerfile                  # Multi-stage Docker build
├── package.json                # Node.js dependencies and scripts
├── kind-config.yaml            # Local Kubernetes cluster config
└── README.md                   # Project documentation
```

## 🔄 CI/CD Pipeline

### Pipeline Stages

1. **Test Stage**

   - Checkout source code
   - Setup Node.js environment
   - Install dependencies with `npm ci`
   - Run automated test suite
   - Generate test reports

2. **Build Stage**

   - Build Docker image with multi-architecture support (AMD64/ARM64)
   - Tag images with branch name, commit SHA, and 'latest'
   - Push to Docker Hub registry
   - Generate build artifacts

3. **Deploy Stage**
   - **Development**: Auto-deploy on `develop` branch
   - **Staging**: Auto-deploy on `main` branch
   - Update GitOps repository with new image tags
   - Trigger ArgoCD/Flux sync (in GitOps repo)

### Branch Strategy

- `main`: Production-ready code → Staging environment
- `develop`: Development code → Development environment
- Feature branches: Pull requests trigger testing

## 🐳 Docker Configuration

### Multi-Stage Dockerfile

```dockerfile
# Build stage for dependencies
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

### Image Tagging Strategy

- `latest`: Latest stable version
- `main-<sha>`: Staging environment builds
- `develop-<sha>`: Development environment builds

## ☸️ Kubernetes Deployment

### Resource Configuration

- **Replicas**: 2 instances for high availability
- **Resource Limits**: CPU (100m) and Memory (128Mi)
- **Health Checks**: Liveness and readiness probes
- **Service**: NodePort for external access
- **Environment**: Production-specific configurations

### Health Monitoring

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## 🔧 Local Development Setup

### Prerequisites

- Node.js 18+
- Docker Desktop
- kubectl
- kind (Kubernetes in Docker)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/gajjarvatsall/multi-env-cicd.git
cd multi-env-cicd

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Build Docker image
docker build -t my-app:latest .

# Create local Kubernetes cluster
kind create cluster --config kind-config.yaml --name cicd-cluster

# Load image into cluster
kind load docker-image my-app:latest --name cicd-cluster

# Deploy to Kubernetes
kubectl apply -f k8s/deployment.yaml

# Check deployment status
kubectl get pods
kubectl get services

# Access application
curl http://localhost:30080
```

## 🧪 Testing

### Test Coverage

- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **Health Check Tests**: Application monitoring

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

## 📊 Monitoring & Observability

### Application Endpoints

- `GET /` - Main application endpoint
- `GET /health` - Health check endpoint
- `GET /version` - Version information

### Metrics Exposed

- Application uptime
- Environment information
- Version details
- Health status

## 🔐 Security Features

- **Secrets Management**: GitHub Secrets for sensitive data
- **Image Scanning**: Automated vulnerability scanning
- **Least Privilege**: Minimal container permissions
- **Non-root User**: Container runs with non-privileged user
- **Resource Limits**: Prevent resource exhaustion attacks

## 🌍 Environment Management

### Development Environment

- **Trigger**: Push to `develop` branch
- **Image Tag**: `develop-<commit-sha>`
- **Auto-deployment**: Enabled
- **Purpose**: Feature testing and integration

### Staging Environment

- **Trigger**: Push to `main` branch
- **Image Tag**: `main-<commit-sha>` and `latest`
- **Auto-deployment**: Enabled
- **Purpose**: Pre-production validation

## 📈 Future Enhancements

- [ ] Production environment with manual approval
- [ ] Helm charts for advanced Kubernetes management
- [ ] ArgoCD integration for GitOps
- [ ] Prometheus monitoring and Grafana dashboards
- [ ] ELK stack for centralized logging
- [ ] Slack/Teams integration for notifications
- [ ] Blue-green deployment strategy
- [ ] Automated rollback mechanisms
- [ ] Security scanning with Trivy/Snyk
- [ ] Performance testing with k6

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vatsal Gajjar**

- GitHub: [@gajjarvatsall](https://github.com/gajjarvatsall)
- LinkedIn: [Your LinkedIn Profile]
- Portfolio: [Your Portfolio URL]

---

## 🏆 DevOps Skills Demonstrated

This project showcases proficiency in:

- **CI/CD Pipelines**: GitHub Actions, automated testing and deployment
- **Containerization**: Docker, multi-stage builds, image optimization
- **Orchestration**: Kubernetes, deployments, services, health checks
- **GitOps**: Infrastructure as code, configuration management
- **Cloud Native**: 12-factor app principles, microservices patterns
- **Monitoring**: Health checks, observability, logging
- **Security**: Secrets management, vulnerability scanning
- **Automation**: End-to-end deployment automation
- **Infrastructure**: Kind, kubectl, container registry management
- **Testing**: Automated testing, TDD practices

_This project is part of my DevOps portfolio demonstrating modern cloud-native development and deployment practices._
