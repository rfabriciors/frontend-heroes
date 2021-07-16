pipeline{
    agent any
    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'dev', name: 'BRANCH', type: 'PT_BRANCH'
    }

    stages{
        stage("Git pull"){
            steps{
                echo "Obtendo a versão mais recente do projeto"
                git url: 'https://github.com/rfabriciors/frontend-heroes.git', branch: '${params.BRANCH}'
            }
        }
        stage("Build Container Image"){
            steps{
                echo "Construindo a imagem Docker"
                script {
                    dockerapp = docker.build("rfabricio/frontend-heroes:v${env.BUILD_NUMBER}-${params.BRANCH}",
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
                    dockerapp.push("v${env.BUILD_NUMBER}-${params.BRANCH}")
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