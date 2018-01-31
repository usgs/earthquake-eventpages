ARG FROM_IMAGE="usgs/hazdev-base-images:latest-php"

FROM ${FROM_IMAGE} as build
# install node, grunt
RUN yum install -y bzip2 epel-release openssl && \
    yum install -y nodejs && \
    npm install -g grunt-cli && \
    mkdir /earthquake-eventpages
# install npm dependencies
WORKDIR /earthquake-eventpages
COPY package.json /earthquake-eventpages/package.json
RUN npm install phantomjs-prebuilt && \
    npm install
# copy project, build
COPY / /earthquake-eventpages
RUN src/lib/pre-install --non-interactive && \
    grunt builddist


FROM ${FROM_IMAGE}
RUN mkdir -p /var/www/apps
# install template
COPY --from=build /earthquake-eventpages/node_modules/hazdev-template/dist/ /var/www/apps/hazdev-template/
RUN /var/www/apps/hazdev-template/lib/pre-install --non-interactive && \
    ln -s /var/www/apps/hazdev-template/conf/httpd.conf /etc/httpd/conf.d/hazdev-template.conf
# install app, copy leaflet to docroot
COPY --from=build /earthquake-eventpages/dist/ /var/www/apps/earthquake-eventpages/
RUN /var/www/apps/earthquake-eventpages/lib/pre-install --non-interactive && \
    ln -s /var/www/apps/earthquake-eventpages/conf/httpd.conf /etc/httpd/conf.d/earthquake-eventpages.conf && \
    cp /var/www/apps/earthquake-eventpages/htdocs/_config.inc.php /var/www/html/
# add config for external resources
COPY --from=build /earthquake-eventpages/src/conf/docker.conf /etc/httpd/conf.d/docker.conf
