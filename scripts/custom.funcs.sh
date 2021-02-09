# This file contains any custom functions / hooks for the
# earthquake-eventpages deployment process.

preStackDeployHook () {
  downloadAssetsList;
  writeYmlFile;
}

postStackDeployHook () {
  removeOldAssetsConfig;
}

##
# HELPER FUNCTIONS
##

##
# Downloads the list of known assets from the currently running service.
# Places this list into $ASSETS_FILE (See: custom.config.sh).
#
##
downloadAssetsList () {
  local serviceName="${STACK_NAME}_web";
  local port=$(getPublishedPort ${serviceName});
  local hostname=${TARGET_HOSTNAME:-'localhost'};

  set +e;
  status=$(curl \
    -s -o ${ASSETS_FILE} \
    -w "%{http_code}" \
    http://${hostname}:${port}/${BASE_HREF}/assets.txt \
  );

  if [[ $? -ne 0 || $status -ne 200 ]]; then
    echo '# No assets to download...' > ${ASSETS_FILE};
  fi
  set -e;
}

##
# Removes the old configurations from the swarm. Any config still attached to
# the service will refuse to be removed, that's okay but the others will still
# get deleted.
#
##
removeOldAssetsConfig () {
  set +e; # Do not die, the next command may partially fail, but that is okay
  docker config ls --format {{.Name}} \
    | grep ${STACK_NAME} \
    | xargs docker config rm \
    > /dev/null 2>&1;
  set -e; # Now die on errors again
}

##
# Write a customized YML file for deploying the stack. Necessary because
# by default, YML files do not allow variables for defining configs.
#
##
writeYmlFile () {
  local ymlFileName="${APP_NAME}.yml";
  local configName="assets-$(date +%H%M%S)-$$";

  cat <<-EO_YML > ${ymlFileName}
version: "3.5"
services:
  # Do not change the name of the "web" service without also updating the
  # custom.funcs.sh and the custom.config.sh as well. Probably just do not
  # ever do this...
  web:
    image: ${REGISTRY}/${IMAGE_NAME}
    deploy:
      restart_policy:
        condition: any
        delay: 5s
        max_attempts: 3
        window: 120s
      replicas: 3
      update_config:
        order: start-first
        parallelism: 3
    ports:
      - 8080
    environment:
      - BASE_HREF=${BASE_HREF}
      - EVENT_TYPE=${EVENT_TYPE}
      - SITE_URL=${SITE_URL}
      - ASSET_HOSTNAME=${TARGET_HOSTNAME}
      - OLD_ASSETS=/${ASSETS_FILE}
    configs:
      - source: ${configName}
        target: /${ASSETS_FILE}
configs:
  ${configName}:
    file: ${ASSETS_FILE}
EO_YML
}
