def ssh(remoteCommand){
    return sh(returnStdout: true, script: "ssh $SSH_TARGET $remoteCommand")
}

def silentSh(cmd){
    sh '#!/bin/sh -e\n' + cmd
}

pipeline {

    agent any

    stages {
       
       stage('Checkout') {
            steps {
                git "https://github.com/jffourmond/slactor.git"
            }
       }       
       
       stage('Edit files') {
            steps {
                silentSh "sed -ie s/SLACK_TOKEN/$SLACK_TOKEN/ server.js"
                silentSh "sed -ie s/SLACTOR_PASSWORD/$SLACTOR_PASSWORD/ server.js"
            }
       }
       
       stage('Build image'){
            steps {                 
                echo "Building new image $APP_NAME ..."
                sh "docker build -t $APP_NAME ."
                sh "docker tag $APP_NAME $DOCKER_REGISTRY/$APP_NAME"
                sh "docker push $DOCKER_REGISTRY/$APP_NAME"
            }
       }       
       
       stage('Stop old container') {
            steps {
                script {
                    def containerId = ssh "sudo docker ps -a -q --filter name=$APP_NAME --format=\"{{.ID}}\" "
                    echo "Container Id to stop : $containerId"
                    if (containerId){
                            echo "Stopping old container $containerId ..."
                            ssh "sudo docker stop $containerId"
                            echo "Deleting old container $containerId ..."
                            ssh "sudo docker rm $containerId"
                    } 
                }
            }
       }
       
       stage('Run new container') {
           steps {
                script {
                    ssh "sudo docker pull $DOCKER_REGISTRY/$APP_NAME"
                    ssh "sudo docker run -d -p 3000:3000 --name $APP_NAME -t $APP_NAME"
                }
           }
       }       
       
    }   
}    