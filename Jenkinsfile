pipeline {
  agent {
    docker { image 'mcr.microsoft.com/playwright:v1.65.1-noble' }
  }

  environment {
    CI = 'true'
    BASE_URL = 'https://practicesoftwaretesting.com'
    API_URL = 'https://api.practicesoftwaretesting.com'
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Quality checks') {
      steps {
        sh 'npm run lint'
        sh 'npm run format:check'
        sh 'npx tsc --noEmit'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**, allure-results/**', allowEmptyArchive: true
    }
  }
}