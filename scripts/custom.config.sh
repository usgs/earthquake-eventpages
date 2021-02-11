export ASSETS_FILE='old_assets.txt';
export BASE_HREF=${BASE_HREF:-'earthquakes/eventpage'};
export EVENT_TYPE=${EVENT_TYPE:-'actual'};
export SITE_URL="${SITE_URL_PREFIX}earthquake${SITE_URL_SUFFIX}";
export SERVICE_MAP=(
  "/${BASE_HREF}":'web'
);
