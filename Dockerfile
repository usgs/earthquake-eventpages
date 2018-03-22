ARG BUILD_IMAGE=usgs/node:8
ARG FROM_IMAGE=usgs/nginx

##
# Builder image is used to compile Angular source into webpack distribution
# bundle. This results are copied into the application image below ...
##
FROM ${BUILD_IMAGE} as buildenv


COPY . /earthquake-eventpages
WORKDIR /earthquake-eventpages

#
# Note : Installing git-all to provide Git CLI so long as NPM depends on
#        unreleased package versions referencing Git repos.
#

RUN /bin/bash --login -c "\
    npm install --no-save && \
    npm run build -- --progress false --base-href /BASE_HREF/ \
  "


##
# Actual application image
##
FROM ${FROM_IMAGE}

ARG BASE_HREF=event

# Set environment variables for use by docker-entrypoint.sh
ENV BASE_HREF="${BASE_HREF}" \
    NGINX_CONF_DIR="/etc/nginx/default.d" \
    HEALTHCHECK_SCRIPT="/usr/share/nginx/healthcheck.sh" \
    DOCUMENT_ROOT="/usr/share/nginx/html"

LABEL maintainer="Eric Martinez <emartinez@usgs.gov>"\
      dockerfile_version="v1.1.0"

RUN rm -rf /usr/share/nginx/html/ && \
    mkdir -p /usr/share/nginx/html/BASE_HREF

COPY --from=buildenv \
    /earthquake-eventpages/dist/ \
    /usr/share/nginx/html/BASE_HREF/

COPY --from=buildenv \
    /earthquake-eventpages/metadata.json \
    /usr/share/nginx/html/BASE_HREF/metadata.json

COPY --from=buildenv \
    /earthquake-eventpages/docker-entrypoint.sh \
    /usr/share/nginx/docker-entrypoint.sh


HEALTHCHECK \
    --interval=20s \
    --timeout=5s \
    --start-period=1m \
    --retries=2 \
  CMD \
    ${HEALTHCHECK_SCRIPT}


# Inherit CMD from FROM_IMAGE
WORKDIR /usr/share/nginx
EXPOSE 80
CMD [ "/usr/share/nginx/docker-entrypoint.sh" ]
