ARG BASE_IMAGE=nginx:latest
FROM ${BASE_IMAGE}

RUN rm -rf /usr/share/nginx/html/ && \
    mkdir -p /usr/share/nginx/html/beta/earthquakes/eventpage
COPY dist/ /usr/share/nginx/html/beta/earthquakes/eventpage/
COPY 00-server.conf /etc/nginx/default.d/


# Inherit CMD from BASE_IMAGE
