export ASSETS_FILE='old_assets.txt';
export BASE_HREF='earthquakes/event-dev';
export SITE_URL="${SITE_URL_PREFIX}earthquake${SITE_URL_SUFFIX}";
export SERVICE_MAP=(
  "/${BASE_HREF}":'web'
);
export INTERNAL_IMAGE_NAME=${INTERNAL_IMAGE_NAME:-'usgs/earthquake-eventpages'}
