pipeline {
agent any


environment {
    AWS_REGION = 'ap-south-1'
    ECR_REPO = '524140443570.dkr.ecr.ap-south-1.amazonaws.com/snake-game'
    IMAGE_TAG = "${BUILD_NUMBER}"
    KUBECONFIG = '/var/lib/jenkins/.kube/config'
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

    stage('Login to ECR') {
        steps {
            withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'aws-creds'
            ]]) {
                sh '''
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin 524140443570.dkr.ecr.ap-south-1.amazonaws.com
                '''
            }
        }
    }

    stage('Push Image to ECR') {
        steps {
            sh '''
            docker push ${ECR_REPO}:${IMAGE_TAG}
            '''
        }
    }

    stage('Deploy to K3s') {
        steps {
            sh '''
            helm upgrade --install snake-game ./helm \
            --set image.repository=${ECR_REPO} \
            --set image.tag=${IMAGE_TAG}
            '''
        }
    }

    stage('Verify Deployment') {
        steps {
            sh '''
            kubectl get pods
            kubectl get svc
            '''
        }
    }
}


}
