#!/usr/bin/env groovy

pipeline {
  agent {
    kubernetes {
      yaml """
        apiVersion: v1
        kind: Pod
        spec:
          serviceAccountName: jenkins
          containers:
          - name: node
            image: node:8.16.2
            tty: true
          - name: docker
            image: docker:latest
            tty: true
            volumeMounts:
              - name: dockersock
                mountPath: "/var/run/docker.sock"
          - name: helm
            image: dtzar/helm-kubectl:2.14.3
            tty: true
          volumes:
            - name: dockersock
              hostPath:
                path: /var/run/docker.sock
      """
    }
  }

  parameters {
      booleanParam(name: 'FORCE_DOCKER_PUBLISH', defaultValue: false,
        description: 'Force docker to build, push')

      booleanParam(name: 'FORCE_HELM_PUBLISH', defaultValue: false,
        description: 'Force helm to push, install')
    }

  stages {
    stage('Checkout from GitHub') {
      steps {
        checkout(
          [
            $class: 'GitSCM',
            branches: scm.branches,
            extensions: scm.extensions + [[$class: 'LocalBranch', localBranch: '**']],
            userRemoteConfigs: scm.userRemoteConfigs
          ]
        )
      }
    }

    stage('Test') {
      when {
        not {
          branch 'develop'
        }
      }
      steps {
        container('node') {
          sh 'echo \'i need to write tests\' && ' +
           ' echo npm install'
        }
      }
    }

    stage('Build, Tag & Push Docker Image') {
      when {
        anyOf {
          branch 'develop'; branch 'master'
          expression {
            return params.FORCE_DOCKER_PUBLISH
          }
        }
      }
      steps {
        container('docker') {
          withCredentials([file(credentialsId: 'jenkins-gcr', variable: 'DOCKER_GOOGLE_CREDENTIALS')]) {
            sh 'cat $DOCKER_GOOGLE_CREDENTIALS | docker login -u _json_key --password-stdin https://us.gcr.io && ' +
              ' docker image build -t \'us.gcr.io/omlett-platform/coffeehaus-web\' . && ' +
              ' docker push us.gcr.io/omlett-platform/coffeehaus-web'
          }
        }
      }
    }

    stage('Publish & Deploy Helm Chart') {
      when {
        anyOf {
          branch 'develop'; branch 'master'
          expression {
            return params.FORCE_HELM_PUBLISH
          }
        }
      }
      steps {
        container('helm') {
          withCredentials([string(credentialsId: 'chartmuseum-secret', variable: 'CHARTMUSEUM_CREDENTIALS')]) {
            sh 'helm init --client-only && ' +
              ' helm plugin install https://github.com/chartmuseum/helm-push && ' +
              ' helm repo add chartmuseum https://chartmuseum.omlett.io/ --username=admin --password=$CHARTMUSEUM_CREDENTIALS && ' +
              ' helm repo update && ' +
              ' helm push -f ./charts/coffeehaus-web chartmuseum && ' +
              ' helm repo update && ' +
              ' helm upgrade coffeehaus-web chartmuseum/coffeehaus-web --namespace coffeehaus --recreate-pods'
          }
        }
      }
    }
  }
}