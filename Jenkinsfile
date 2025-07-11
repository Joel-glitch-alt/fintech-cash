pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Get code from GitHub
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    
    }
}
