pipeline {
agent any


stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
            url: 'https://github.com/krishnaa-gupta/snake-game.git'
        }
    }

    stage('Test') {
        steps {
            sh 'pwd'
            sh 'ls -la'
            sh 'docker --version'
            sh 'helm version'
            sh 'kubectl --kubeconfig=/var/lib/jenkins/.kube/config get nodes'
        }
    }
}

}
