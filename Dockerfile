ARG BUILD_IMAGE=usgs/node:10
ARG FROM_IMAGE=usgs/nginx

##
# Builder image is used to compile Angular source into webpack distribution
# bundle. This results are copied into the application image below ...
##
FROM ${BUILD_IMAGE} as buildenv


COPY --chown=usgs-user:usgs-user . /earthquake-eventpages
WORKDIR /earthquake-eventpages

# Re-build within image. Comment out if pre-built externally
# (i.e. for quick dev builds)
RUN /bin/bash --login -c "\
    npm install --no-save && \
    npm run build -- --progress false --base-href /BASE_HREF/ \
    "

##
# Actual application image
##
FROM ${FROM_IMAGE}

ARG BASE_HREF=event

# Set environment variables for use by startup hooks
ENV BASE_HREF="${BASE_HREF}" \
    NGINX_CONF_DIR="/etc/nginx/default.d" \
    HEALTHCHECK_SCRIPT="/healthcheck.sh" \
    DOCUMENT_ROOT="/usr/share/nginx/html"

LABEL maintainer="Eric Martinez <emartinez@usgs.gov>"

USER root
RUN rm -rf ${DOCUMENT_ROOT}/ && \
    mkdir -p ${DOCUMENT_ROOT}/BASE_HREF && \
    chown usgs-user:usgs-user ${HEALTHCHECK_SCRIPT} && \
    chown -R usgs-user:usgs-user /usr/share/nginx && \
    chown -R usgs-user:usgs-user /etc/nginx
USER usgs-user

COPY --chown=usgs-user:usgs-user hooks /startup-hooks/

COPY --from=buildenv \
    --chown=usgs-user:usgs-user \
    /earthquake-eventpages/dist/ \
    ${DOCUMENT_ROOT}/BASE_HREF/

COPY --from=buildenv \
    --chown=usgs-user:usgs-user \
    /earthquake-eventpages/metadata.json \
    ${DOCUMENT_ROOT}/BASE_HREF/metadata.json

RUN cd ${DOCUMENT_ROOT}/BASE_HREF && \
    ls *.{js,css} > ${DOCUMENT_ROOT}/BASE_HREF/assets.txt

WORKDIR /usr/share/nginx
