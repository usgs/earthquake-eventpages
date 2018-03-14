#!/bin/bash -e

pushd $(dirname $0) > /dev/null 2>&1;

BASE_HREF=$1

cat <<-EO_CONFIG
location  /${BASE_HREF}  {
  add_header  'X-Frame-Options'  'DENY';
  add_header  'X-Content-Type-Options'  'nosniff';
  add_header  'X-XSS-Protection'  '1';

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
