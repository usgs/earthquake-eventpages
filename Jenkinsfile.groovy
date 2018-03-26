#!/usr/bin/env groovy

node {
  // Used for consistency between other variables
  def APP_NAME = 'earthquake-eventpages'
  // Base group from where general images may be pulled
  def DEVOPS_REGISTRY = "${GITLAB_INNERSOURCE_REGISTRY}/devops/images"
  // Flag to capture exceptions and mark build as failure
  def FAILURE = null
  // What version to tag built image as
  def IMAGE_VERSION = null
  // Set by "checkout" step below
  def SCM_VARS = [:]


  // Name of image to use as basis when building LOCAL_IMAGE/DEPLOY_IMAGE
  def BASE_IMAGE = "${DEVOPS_REGISTRY}/usgs/nginx:latest"

  // Used to install dependencies and build distributables
  def BUILDER_CONTAINER = "${APP_NAME}-${BUILD_ID}-BUILDER"
  def BUILDER_IMAGE = "${DEVOPS_REGISTRY}/usgs/node:8"

  // Name of image to deploy (push) to registry
  def DEPLOY_IMAGE = "${GITLAB_INNERSOURCE_REGISTRY}/ghsc/hazdev/earthquake-eventpages"
  def DOCKER_HUB_IMAGE = "usgs/earthquake-eventpages"

  // Run application locally for testing security vulnerabilities
  def LOCAL_CONTAINER = "${APP_NAME}-${BUILD_ID}-PENTEST"
  def LOCAL_IMAGE = "local/${APP_NAME}:${BUILD_ID}"

  // Runs zap.sh as daemon and used to execute zap-cli calls within
  def OWASP_CONTAINER = "${APP_NAME}-${BUILD_ID}-OWASP"
  def OWASP_IMAGE = "${DEVOPS_REGISTRY}/owasp/zap2docker-stable"
  def OWASP_REPORT_DIR = "${WORKSPACE}/owasp-data"


  // Used to run linting, unit tests, coverage, and e2e within this container
  def TESTER_IMAGE = "${DEVOPS_REGISTRY}/trion/ng-cli-e2e"

  // Queue up tasks that can be run in parallel
  def SECURITY_CHECKS = [:]

  try {
    stage('Initialize') {
      // Clean workspace before building
      cleanWs()

      // Clone latest source
      SCM_VARS = checkout scm
      sh "git fetch --tags origin"

      if (GIT_BRANCH != '') {
        // Check out the specified branch
        sh "git checkout --detach ${GIT_BRANCH}"

        // Update relevant SCM_VARS
        SCM_VARS.GIT_BRANCH = GIT_BRANCH
        SCM_VARS.GIT_COMMIT = sh(
          returnStdout: true,
          script: "git rev-parse HEAD"
        )
      }

      // Determine image tag to use
      if (SCM_VARS.GIT_BRANCH != 'origin/master') {
        IMAGE_VERSION = SCM_VARS.GIT_BRANCH.split('/').last().replace(' ', '_')
      } else {
        IMAGE_VERSION = 'latest'
      }
    }

    stage('Build Image') {
      def info = [:]
      def pkgInfo = readJSON file: 'package.json'

      info.version = pkgInfo.version
      info.branch = SCM_VARS.GIT_BRANCH
      info.commit = SCM_VARS.GIT_COMMIT
      info.image = IMAGE_VERSION

      // Convert from Map --> JSON
      info = readJSON text: groovy.json.JsonOutput.toJson(info)
      writeJSON file: 'metadata.json', pretty: 4, json: info

      // Build candidate image for later penetration testing
      ansiColor('xterm') {
        sh """
          docker build \
            --build-arg BUILD_IMAGE=${BUILDER_IMAGE} \
            --build-arg FROM_IMAGE=${BASE_IMAGE} \
            -t ${LOCAL_IMAGE} \
            .
        """
      }
    }

    stage('Unit Tests') {
      // Note that running angular tests destroys the "dist" folder that was
      // originally created in Install stage. This is not needed later, so
      // okay, but just be aware ...

      // Run linting, unit tests, and end-to-end tests
      docker.image(TESTER_IMAGE).inside ("-u root") {
          ansiColor('xterm') {
            sh """
              npm install --no-save
            """
            sh """
              ng lint
            """
            sh """
              ng test --single-run --code-coverage --progress false
            """
            sh """
              npm run e2e -- --progress false
            """
          }
      }

      // Publish results
      cobertura(
        autoUpdateHealth: false,
        autoUpdateStability: false,
        coberturaReportFile: '**/cobertura-coverage.xml',
        conditionalCoverageTargets: '70, 0, 0',
        failUnhealthy: false,
        failUnstable: false,
        lineCoverageTargets: '80, 0, 0',
        maxNumberOfBuilds: 0,
        methodCoverageTargets: '80, 0, 0',
        onlyStable: false,
        sourceEncoding: 'ASCII',
        zoomCoverageChart: false
      )
    }

    SECURITY_CHECKS['Scan Dependencies'] = {
      // Analyze dependencies
      ansiColor('xterm') {
        dependencyCheckAnalyzer(
          datadir: '',
          hintsFile: '',
          includeCsvReports: false,
          includeHtmlReports: true,
          includeJsonReports: false,
          includeVulnReports: false, // Abbreviated version of includeHtmlReport
          isAutoupdateDisabled: false,
          outdir: 'dependency-check-data',
          scanpath: "${WORKSPACE}/package.json",
          skipOnScmChange: false,
          skipOnUpstreamChange: false,
          suppressionFile: 'suppression.xml',
          zipExtensions: ''
        )
      }

      // Put summary on landing page for this build
      dependencyCheckPublisher(
        canComputeNew: false,
        defaultEncoding: '',
        healthy: '',
        pattern: '**/dependency-check-report.xml',
        unHealthy: ''
      )

      // Full analysis of this build, linked in side navigation
      publishHTML (target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'dependency-check-data',
        reportFiles: 'dependency-check-report.html',
        reportName: 'Dependency Analysis'
      ])
    }

    SECURITY_CHECKS['Penetration Tests'] = {
      def ZAP_API_PORT = '8090'

      // Ensure report output directory exists
      sh """
        if [ ! -d "${OWASP_REPORT_DIR}" ]; then
          mkdir -p ${OWASP_REPORT_DIR}
          chmod 777 ${OWASP_REPORT_DIR}
        fi
      """

      // Start a container to run penetration tests against
      sh """
        docker run --rm --name ${LOCAL_CONTAINER} \
          -d ${LOCAL_IMAGE}
      """

      // Start a container to execute OWASP PENTEST
      sh """
        docker run --rm -d -u zap \
          --name=${OWASP_CONTAINER} \
          --link=${LOCAL_CONTAINER}:application \
          -v ${OWASP_REPORT_DIR}:/zap/reports:rw \
          -i ${OWASP_IMAGE} \
          zap.sh \
          -daemon \
          -port ${ZAP_API_PORT} \
          -config api.disablekey=true
      """

      // Wait for OWASP container to be ready, but not for too long
      timeout(
        time: 20,
        unit: 'SECONDS'
      ) {
        echo 'Waiting for OWASP container to finish starting up'
        sh """
          set +x
          status='FAILED'
          while [ \$status != 'SUCCESS' ]; do
            sleep 1;
            status=`\
              (\
                docker exec -i ${OWASP_CONTAINER} \
                  curl -I localhost:${ZAP_API_PORT} \
                  > /dev/null 2>&1 && echo 'SUCCESS'\
              ) \
              || \
              echo 'FAILED'\
            `
          done
        """
      }

      // Run the penetration tests
      ansiColor('xterm') {
        sh """
          PENTEST_IP='application'

          docker exec ${OWASP_CONTAINER} \
            zap-cli -v -p ${ZAP_API_PORT} spider \
            http://\$PENTEST_IP/

          docker exec ${OWASP_CONTAINER} \
            zap-cli -v -p ${ZAP_API_PORT} active-scan \
            http://\$PENTEST_IP/

          docker exec ${OWASP_CONTAINER} \
            zap-cli -v -p ${ZAP_API_PORT} report \
            -o /zap/reports/owasp-zap-report.html -f html

          docker stop ${OWASP_CONTAINER} ${LOCAL_CONTAINER}
        """
      }

      // Publish results
      publishHTML (target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: OWASP_REPORT_DIR,
        reportFiles: 'owasp-zap-report.html',
        reportName: 'OWASP ZAP Report'
      ])
    }

    stage('Security') {
      parallel SECURITY_CHECKS
    }

    stage('Publish Image') {
      // Re-tag candidate image as internal image name and push to registry
      docker.withRegistry(
        "https://${GITLAB_INNERSOURCE_REGISTRY}",
        'innersource-hazdev-cicd'
      ) {
        ansiColor('xterm') {
          sh """
            docker tag \
              ${LOCAL_IMAGE} \
              ${DEPLOY_IMAGE}:${IMAGE_VERSION}
          """

          sh """
            docker push ${DEPLOY_IMAGE}:${IMAGE_VERSION}
          """
        }
      }

      // Re-tag candidate image as public image name and push to docker hub
      docker.withRegistry('', 'usgs-docker-hub-credentials') {
        ansiColor('xterm') {
          sh """
            docker tag \
              ${LOCAL_IMAGE} \
              ${DOCKER_HUB_IMAGE}:${IMAGE_VERSION}
          """

          sh "docker push ${DOCKER_HUB_IMAGE}:${IMAGE_VERSION}"
        }
      }
    }

    stage('Trigger Deploy') {
      build(
        job: 'deploy',
        parameters: [
          string(name: 'IMAGE_VERSION', value: IMAGE_VERSION)
        ],
        propagate: false,
        wait: false
      )
    }
  } catch (e) {
    mail to: 'gs-haz_dev_team_group@usgs.gov',
      from: 'noreply@jenkins',
      subject: 'Jenkins: earthquake-eventpages',
      body: "Project build (${BUILD_TAG}) failed '${e}'"

    FAILURE = e
  } finally {
    stage('Cleanup') {
      sh """
        set +e;

        # Cleaning up any leftover containers...
        docker container rm --force \
          ${BUILDER_CONTAINER} \
          ${OWASP_CONTAINER} \
          ${LOCAL_CONTAINER} \
        ;

        # Cleaning up any leftover images...
        docker image rm --force \
          ${DOCKER_HUB_IMAGE}:${IMAGE_VERSION} \
          ${DEPLOY_IMAGE}:${IMAGE_VERSION} \
          ${LOCAL_IMAGE} \
        ;

        exit 0;
      """

      if (FAILURE) {
        currentBuild.result = 'FAILURE'
        throw FAILURE
      }
    }
  }
}
