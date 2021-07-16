pipeline{
    agent any

    stages{
        stage("Git pull"){
            steps{
                echo "Obtendo a versão mais recente do projeto"
                git url: 'https://github.com/rfabriciors/frontend-heroes.git', branch: 'dev'
            }
        }
        stage("Build Container Image"){
            steps{
                echo "Construindo a imagem Docker"
                script {
                    dockerapp = docker.build("rfabricio/frontend-heroes:v${env.BUILD_NUMBER}-dev",
                    '-f ./Dockerfile .')
                }
            }
        }
        stage("Push container to Docker Hub"){
            steps{
                echo "Executando o push das imagens para o Docker Hub"
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerapp.push("latest")
                        dockerapp.push("v${env.BUILD_NUMBER}-dev")
                    }
                }
            }
        }       
    }
}