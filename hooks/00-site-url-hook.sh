#!/bin/bash

if [ -n "${SITE_URL}" ]; then
  sed --in-place \
    "s|siteUrl:\"[^\"]*\"|siteUrl:\"${SITE_URL}\"|g" \
    /usr/share/nginx/html/BASE_HREF/main.*.js;
fi
