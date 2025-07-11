pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18' // 👈 use the name you added in Jenkins
    }

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
