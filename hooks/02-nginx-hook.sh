#!/bin/bash

if [ -z "${BASE_HREF}" ]; then
  BASE_HREF='event';
fi

if [ -z "${NGINX_CONF_DIR}" ]; then
  NGINX_CONF_DIR='.';
fi

# Write configuration file for NGINX
cat <<-EO_CONFIG> ${NGINX_CONF_DIR}/00-server.conf
location  /${BASE_HREF}  {
  add_header  'X-Frame-Options'  'DENY';
  add_header  'X-Content-Type-Options'  'nosniff';
  add_header  'X-XSS-Protection'  '1; mode=block';

  add_header 'Cache-Control' 'public';

  # most files expire soon
  expires 5m;

  # images are not hash-stamped, but change infrequently
  location ~* /${BASE_HREF}/assets/.*\\.(?:jpg|png|svg)\$ {
    expires 1d;
  }

  # css/js are hash-stamped, and url will change if content changes
  location ~* /${BASE_HREF}/.*\\.(?:css|js)\$ {
    expires 1y;
  }

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
  proxy_ssl_server_name on;
  proxy_pass  https://earthquake.usgs.gov;
}

location  /data/comcat  {
  proxy_ssl_server_name on;
  proxy_pass  https://earthquake.usgs.gov;
}

location  /earthquakes/feed  {
  proxy_ssl_server_name on;
  proxy_pass  https://earthquake.usgs.gov;
}

location  /earthquakes/map  {
  proxy_ssl_server_name on;
  proxy_pass  https://earthquake.usgs.gov;
}

location  /fdsnws {
  proxy_ssl_server_name on;
  proxy_pass  https://earthquake.usgs.gov;
}

location  /realtime  {
  proxy_ssl_server_name on;
  proxy_pass  https://earthquake.usgs.gov;
}

location  /ws/geoserve  {
  proxy_ssl_server_name on;
  proxy_pass  https://earthquake.usgs.gov;
}

EO_CONFIG

