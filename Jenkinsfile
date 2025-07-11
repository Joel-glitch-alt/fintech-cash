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
// pipeline {
//     agent any

//     tools {
//         nodejs 'NodeJS-18'
//     }

//     environment {
//         SONARQUBE = 'Jenkins-sonar-server'
//         BRANCH_NAME = "${env.BRANCH_NAME}"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 script {
//                     echo "🔄 Building branch: ${env.BRANCH_NAME}"
//                     echo "📝 Commit: ${env.GIT_COMMIT}"
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Test') {
//             steps {
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
//                             publishHTML([
//                                 allowMissing: false,
//                                 alwaysLinkToLastBuild: true,
//                                 keepAll: true,
//                                 reportDir: 'coverage/lcov-report',
//                                 reportFiles: 'index.html',
//                                 reportName: 'Coverage Report'
//                             ])
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

//         stage('Deploy') {
//             steps {
//                 script {
//                     if (env.BRANCH_NAME == 'dev') {
//                         echo "🚀 Deploying to DEV environment"
//                         // sh 'npm run deploy:dev'
//                     } else if (env.BRANCH_NAME == 'staging') {
//                         echo "🚀 Deploying to STAGING environment"
//                         // sh 'npm run deploy:staging'
//                     }
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             echo "✅ Pipeline completed successfully for ${env.BRANCH_NAME}"
//             // Optional: Send success notification
//         }
//         failure {
//             echo "❌ Pipeline failed for ${env.BRANCH_NAME}"
//             // Optional: Send failure notification
//         }
//         always {
//             cleanWs()
//         }
//     }
// }

//////////////////////
//Jenkinsfile - Progressive Pipeline (dev → staging → master)
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
        stage('Branch Info') {
            steps {
                script {
                    echo "🔄 Building branch: ${env.BRANCH_NAME}"
                    echo "📝 Commit: ${env.GIT_COMMIT}"
                    echo "🏗️ Build: ${env.BUILD_NUMBER}"
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

        // stage('Quality Gate') {
        //     steps {
        //         timeout(time: 2, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }

        stage('Deploy to Environment') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo "🚀 Deploying to DEV environment"
                        // Add your dev deployment commands here
                        // sh 'npm run deploy:dev'
                        
                    } else if (env.BRANCH_NAME == 'staging') {
                        echo "🚀 Deploying to STAGING environment"
                        // Add your staging deployment commands here
                        // sh 'npm run deploy:staging'
                        
                    } else if (env.BRANCH_NAME == 'master') {
                        echo "🚀 Deploying to PRODUCTION environment"
                        // Add your production deployment commands here
                        // sh 'npm run deploy:production'
                    }
                }
            }
        }

        // 🔥 AUTOMATIC PROMOTION STAGES
        stage('Promote to Staging') {
            when {
                branch 'dev'
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    echo "✅ DEV build successful! Promoting to STAGING..."
                    
                    // Method 1: Merge dev into staging
                    sh '''
                        git config user.name "Jenkins Auto-Promotion"
                        git config user.email "jenkins@yourcompany.com"
                        
                        # Fetch latest changes
                        git fetch origin
                        
                        # Switch to staging branch
                        git checkout staging
                        git pull origin staging
                        
                        # Merge dev into staging
                        git merge origin/dev --no-ff -m "Auto-promote: Merge dev into staging (Build #${BUILD_NUMBER})"
                        
                        # Push to staging
                        git push origin staging
                    '''
                    
                    echo "🎉 Code promoted to STAGING branch!"
                    echo "📢 This will trigger a new build for staging branch"
                }
            }
        }

        stage('Promote to Master') {
            when {
                branch 'staging'
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    echo "✅ STAGING build successful! Promoting to MASTER..."
                    
                    // Method 1: Merge staging into master
                    sh '''
                        git config user.name "Jenkins Auto-Promotion"
                        git config user.email "jenkins@yourcompany.com"
                        
                        # Fetch latest changes
                        git fetch origin
                        
                        # Switch to master branch
                        git checkout master
                        git pull origin master
                        
                        # Merge staging into master
                        git merge origin/staging --no-ff -m "Auto-promote: Merge staging into master (Build #${BUILD_NUMBER})"
                        
                        # Create a release tag
                        git tag -a "release-${BUILD_NUMBER}" -m "Release build #${BUILD_NUMBER}"
                        
                        # Push to master with tags
                        git push origin master
                        git push origin --tags
                    '''
                    
                    echo "🎉 Code promoted to MASTER branch!"
                    echo "🏷️ Release tag created: release-${BUILD_NUMBER}"
                    echo "📢 This will trigger a new build for master branch"
                }
            }
        }
    }

    post {
        success {
            script {
                def message = "✅ Pipeline completed successfully for ${env.BRANCH_NAME}"
                if (env.BRANCH_NAME == 'dev') {
                    message += " - Code promoted to STAGING"
                } else if (env.BRANCH_NAME == 'staging') {
                    message += " - Code promoted to MASTER"
                } else if (env.BRANCH_NAME == 'master') {
                    message += " - PRODUCTION deployment complete"
                }
                echo message
            }
        }
        failure {
            echo "❌ Pipeline failed for ${env.BRANCH_NAME} - promotion stopped"
        }
        always {
            cleanWs()
        }
    }
}