pipeline{
    agent any
    stages{
        stage("Git pull"){
            steps{
                echo "Obtendo a versão mais recente do projeto"
                echo 'Mostrei acima'
                git url: 'https://github.com/rfabriciors/frontend-heroes.git', branch: 'dev'
                echo '${env.GIT_BRANCH}'
                echo '${env.BRANCH}'
                echo '${env.BRANCH_NAME}'
                echo '${env.GIT_BRANCH_NAME}'
            }
        }
        stage("Build Container Image"){
            steps{
                echo "Construindo a imagem Docker"
                script {
                    dockerapp = docker.build("rfabricio/frontend-heroes:v${env.BUILD_NUMBER}-${env.GIT_BRANCH}",
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
                    dockerapp.push("v${env.BUILD_NUMBER}-${env.GIT_BRANCH}")
                    }
                }
            }
        }
        stage("Deploy to Kubernetes Cluster"){
            agent {
                kubernetes {
                    cloud 'kubernetes'
                }
            }
            steps{
                echo "Fazendo o deploy da aplicação no cluster Kubernetes"
                kubernetesDeploy(configs: '**/k8s/**', kubeconfigId: 'kubeconfig', enableConfigSubstitution: true)
            }
        }  
    }
}