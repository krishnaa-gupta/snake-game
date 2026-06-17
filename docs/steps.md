# Project Setup Steps

## Step 1: Clone Repository

```bash
git clone https://github.com/<username>/snake-game.git
cd snake-game
```

---

## Step 2: Build Docker Image

```bash
docker build -t snake-game:latest .
```

---

## Step 3: Run Docker Container

```bash
docker run -d -p 8090:80 --name snake-game snake-game:latest
```

Verify:

```bash
curl http://localhost:8090
```

---

## Step 4: Push Image to AWS ECR

Login to ECR:

```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <ecr-url>
```

Tag Image:

```bash
docker tag snake-game:latest <ecr-url>:latest
```

Push Image:

```bash
docker push <ecr-url>:latest
```

---

## Step 5: Setup K3s Cluster

Install K3s:

```bash
curl -sfL https://get.k3s.io | sh -
```

Verify:

```bash
kubectl get nodes
```

---

## Step 6: Deploy Using Helm

Validate Chart:

```bash
helm lint ./helm
```

Install Application:

```bash
helm install snake-game ./helm
```

Upgrade Deployment:

```bash
helm upgrade snake-game ./helm
```

---

## Step 7: Configure Jenkins

* Install required plugins
* Configure AWS credentials
* Create Pipeline Job
* Configure GitHub Webhook

---

## Step 8: Configure GitHub Webhook

Webhook URL:

```text
http://<EC2-Public-IP>:8080/github-webhook/
```

Event:

```text
Push Events
```

---

## Step 9: Continuous Delivery Pipeline

Pipeline Flow:

Developer
→ GitHub
→ Jenkins
→ Docker Build
→ AWS ECR
→ Manual Approval
→ Helm Deployment
→ K3s Kubernetes
→ Application

---

## Step 10: Verify Deployment

Pods:

```bash
kubectl get pods
```

Services:

```bash
kubectl get svc
```

Helm Releases:

```bash
helm list
```

Application:

```text
http://<EC2-Public-IP>:30080
```
