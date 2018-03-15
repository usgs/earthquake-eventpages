ARG BUILD_IMAGE=usgs/node:8
ARG FROM_IMAGE=usgs/nginx


# Builder image is used to compile Angular source into webpack distribution
# bundle. This results are copied into the application image below ...
FROM ${BUILD_IMAGE} as buildenv

ARG BASE_HREF=event

COPY . /earthquake-eventpages
WORKDIR /earthquake-eventpages


RUN /bin/bash --login -c "\
    npm install --no-save && \
    npm run build -- --progress false --base-href /${BASE_HREF}/ && \
    ./writeServerConfig.sh ${BASE_HREF} > 00-server.conf \
  "


# Actual application image
FROM ${FROM_IMAGE}

ARG BASE_HREF=event

LABEL maintainer="Eric Martinez <emartinez@usgs.gov>"\
      dockerfile_version="v1.1.0"

RUN rm -rf /usr/share/nginx/html/ && \
    mkdir -p /usr/share/nginx/html/${BASE_HREF}

COPY --from=buildenv \
    /earthquake-eventpages/dist/ \
    /usr/share/nginx/html/${BASE_HREF}/

COPY --from=buildenv \
    /earthquake-eventpages/metadata.json \
    /usr/share/nginx/html/${BASE_HREF}/metadata.json

COPY --from=buildenv \
    /earthquake-eventpages/00-server.conf \
    /etc/nginx/default.d/00-server.conf


# Inherit CMD from FROM_IMAGE
