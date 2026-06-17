pipeline {
agent any

```
environment {
    AWS_REGION = 'ap-south-1'
    ECR_REPO = '524140443570.dkr.ecr.ap-south-1.amazonaws.com/snake-game'
    IMAGE_TAG = "${BUILD_NUMBER}"
}

stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
            url: 'https://github.com/krishnaa-gupta/snake-game.git'
        }
    }

    stage('Build Docker Image') {
        steps {
            sh '''
            docker build -t snake-game:${IMAGE_TAG} .
            docker tag snake-game:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}
            '''
        }
    }

    stage('Login To ECR') {
        steps {
            withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'aws-creds'
            ]]) {
                sh '''
                aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin 524140443570.dkr.ecr.ap-south-1.amazonaws.com
                '''
            }
        }
    }

    stage('Push Image To ECR') {
        steps {
            sh '''
            docker push ${ECR_REPO}:${IMAGE_TAG}
            '''
        }
    }

    stage('Deploy To K3s') {
        steps {
            sh '''
            sed -i "s/tag:.*/tag: ${IMAGE_TAG}/" helm/values.yaml

            export KUBECONFIG=$HOME/.kube/config

            helm upgrade --install snake-game ./helm
            '''
        }
    }
}
```

}
