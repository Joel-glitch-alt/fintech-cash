pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18' // Make sure this mat 
    }

    stages {
        stage('Checkout') {
            steps {
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
                sh 'ls -l ./node_modules/.bin/jest'
                sh 'chmod +x ./node_modules/.bin/jest'
                sh './node_modules/.bin/jest'
            }
        }
    }
}
