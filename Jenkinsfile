node {

  stage('Checkout') {
    git url: 'https://github.com/menkemon/sgp-frontent.git',branch: 'dev'
  }
   stage('npm install') {
    bat 'npm install'
  }
  
  stage('Build') {
    bat 'npm run build
  }
  
}