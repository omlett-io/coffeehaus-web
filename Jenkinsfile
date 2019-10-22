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
           ' npm install'
        }
      }
    }

    stage('Build, Tag & Push Docker Image') {
      when {
        anyOf {
          branch 'develop'; branch 'master'
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

    stage('Helm Install') {
      when {
        anyOf {
          branch 'develop'; branch 'master'
        }
      }
      steps {
        container('helm') {
          sh 'ls -a && ' +
            ' helm init --client-only --service-account jenkins && ' +
            ' helm install --name coffeehaus-web ./charts/coffeehaus-web --namespace coffeehaus'
        }
      }
    }
  }
}