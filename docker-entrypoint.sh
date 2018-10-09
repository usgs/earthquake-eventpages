#!/bin/bash -e

##
# This is the startup script run when the Docker container is started. It
# prepares the installation runtime based on the startup environment.
# Specifically it ...
#   - Writes an NGINX configuration file for the current BASE_HREF
#   - Writes a healthcheck script
#   - Modifies the built code to recognize the current BASE_HREF
#   - Starts NGINX
##
pushd $(dirname $0) > /dev/null 2>&1;

if [ -z $BASE_HREF ]; then
  BASE_HREF='event';
fi

if [ -z $NGINX_CONF_DIR ]; then
  NGINX_CONF_DIR='.';
fi

if [ -z $HEALTHCHECK_SCRIPT ]; then
  HEALTHCHECK_SCRIPT='./healthcheck.sh';
fi

if [ -z $DOCUMENT_ROOT ]; then
  DOCUMENT_ROOT='.';
fi

for hook in /startup-hooks/*; do
  echo -n "Found startup hook ${hook} ... ";

  if [ -x "/startup-hooks/${hook}" ]; then
    echo "executing.";
    /startup-hooks/${hook};
  else
    echo "not executable. Skipping.";
  fi
done

# Write configuration file for NGINX
cat <<-EO_CONFIG> ${NGINX_CONF_DIR}/00-server.conf
location  /${BASE_HREF}  {
  add_header  'X-Frame-Options'  'DENY';
  add_header  'X-Content-Type-Options'  'nosniff';
  add_header  'X-XSS-Protection'  '1; mode=block';

  expires 15m;
  add_header 'Cache-Control' 'public';

  try_files \$uri \$uri/ \$uri.html \$uri/index.html @angular-fallback;
}

location  @angular-fallback {
  rewrite  ^(.*)\$  /${BASE_HREF}/index.html last;
}

#
# Proxy back to production earthquake site for data. These are useful when
# container is running anywhere other than earthquake website
#

location  /archive  {
  proxy_pass  https://earthquake.usgs.gov;
}

location  /data/comcat  {
  proxy_pass  https://earthquake.usgs.gov;
}

location  /earthquakes/feed  {
  proxy_pass  https://earthquake.usgs.gov;
}

location  /earthquakes/map  {
  proxy_pass  https://earthquake.usgs.gov;
}

location  /fdsnws {
  proxy_pass  https://earthquake.usgs.gov;
}

location  /realtime  {
  proxy_pass  https://earthquake.usgs.gov;
}

location  /ws/geoserve  {
  proxy_pass  https://earthquake.usgs.gov;
}
EO_CONFIG


# Write healthcheck script for Docker
cat <<-EO_HEALTHCHECK > ${HEALTHCHECK_SCRIPT}
#!/bin/bash

status=\$(curl \
  -s -o /dev/null \
  -w "%{http_code}" \
  http://localhost:8080/${BASE_HREF}/metadata.json \
);


if [ \$status -eq 200 ]; then
  exit 0;
else
  exit 1;
fi
EO_HEALTHCHECK

chmod +x ${HEALTHCHECK_SCRIPT};

# Update bundles to be BASE_HREF aware
SED_SANITIZED_HREF=${BASE_HREF//\//\\/};
sed "s/BASE_HREF/${SED_SANITIZED_HREF}/" \
  ${DOCUMENT_ROOT}/BASE_HREF/index.html \
  > ${DOCUMENT_ROOT}/BASE_HREF/index-base-href.html;

mv ${DOCUMENT_ROOT}/BASE_HREF/index-base-href.html \
  ${DOCUMENT_ROOT}/BASE_HREF/index.html

mkdir -p ${DOCUMENT_ROOT}/$(dirname ${BASE_HREF});
ln -sf ${DOCUMENT_ROOT}/BASE_HREF ${DOCUMENT_ROOT}/${BASE_HREF};


# Start NGINX
_term () {
  echo 'Caught SIGTERM';
  kill -TERM "$child";
}
trap _term SIGTERM

nginx -g "daemon off;" &

child=$!;
wait "$child";


