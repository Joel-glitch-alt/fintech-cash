// pipeline {
//     agent any

//     tools {
//         nodejs 'NodeJS-18' // 🔧 Name must match what you configured in Jenkins Global Tools
//     }

//     environment {
//         SONARQUBE = 'Jenkins-sonar-server' // ✅ Must match the SonarQube name from "Configure System"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Test') {
//             steps {
//                 sh 'ls -l ./node_modules/.bin/jest'
//                 sh 'chmod +x ./node_modules/.bin/jest'
//                 sh './node_modules/.bin/jest'
//             }
//         }

//         stage('Run Tests with Coverage') {
//             steps {
//                 script {
//                     def jestCmd = 'npx jest --coverage --verbose --detectOpenHandles --forceExit'
//                     if (fileExists('jest.config.js')) {
//                         jestCmd = 'npx jest --config=jest.config.js --coverage --verbose --detectOpenHandles --forceExit'
//                     }
//                     sh jestCmd
//                 }
//             }
//             post {
//                 always {
//                     script {
//                         if (fileExists('coverage/lcov.info')) {
//                             archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
//                             echo "✅ Coverage report archived"
//                         } else {
//                             echo "⚠️ No coverage report found"
//                         }
//                     }
//                 }
//             }
//         }

//         stage('SonarQube Analysis') {
//             steps {
//                 withSonarQubeEnv("${env.SONARQUBE}") {
//                     sh 'npx sonar-scanner'
//                 }
//             }
//         }

//         // stage('Quality Gate') {
//         //     steps {
//         //         timeout(time: 2, unit: 'MINUTES') {
//         //             waitForQualityGate abortPipeline: true
//         //         }
//         //     }
//         // }
//     }
// }



// Jenkinsfile (place this in your repository root)
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        SONARQUBE = 'Jenkins-sonar-server'
        BRANCH_NAME = "${env.BRANCH_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "🔄 Building branch: ${env.BRANCH_NAME}"
                    echo "📝 Commit: ${env.GIT_COMMIT}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'chmod +x ./node_modules/.bin/jest'
                sh './node_modules/.bin/jest'
            }
        }

        stage('Run Tests with Coverage') {
            steps {
                script {
                    def jestCmd = 'npx jest --coverage --verbose --detectOpenHandles --forceExit'
                    if (fileExists('jest.config.js')) {
                        jestCmd = 'npx jest --config=jest.config.js --coverage --verbose --detectOpenHandles --forceExit'
                    }
                    sh jestCmd
                }
            }
            post {
                always {
                    script {
                        if (fileExists('coverage/lcov.info')) {
                            archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'coverage/lcov-report',
                                reportFiles: 'index.html',
                                reportName: 'Coverage Report'
                            ])
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${env.SONARQUBE}") {
                    sh 'npx sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo "🚀 Deploying to DEV environment"
                        // sh 'npm run deploy:dev'
                    } else if (env.BRANCH_NAME == 'staging') {
                        echo "🚀 Deploying to STAGING environment"
                        // sh 'npm run deploy:staging'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully for ${env.BRANCH_NAME}"
            // Optional: Send success notification
        }
        failure {
            echo "❌ Pipeline failed for ${env.BRANCH_NAME}"
            // Optional: Send failure notification
        }
        always {
            cleanWs()
        }
    }
}