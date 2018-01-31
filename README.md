earthquake-eventpages
==============

Web application for displaying earthquake event pages.

Getting Started
---------------

[Use git to clone earthquake-eventpages from git repository](readme_git_install.md)

[Install needed dependencies and run them](readme_dependency_install.md)


### Configure the Project ###
1. run ./src/lib/pre-install to setup config.ini
   1. URL Path for application: leave as default for now.
   1. URL stub for event detail GEOJSON web service:
      enter https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/%s.geojson
   1. URL stub for event detail ATOM web service: leave as default for now.

### Example Usage ###
1. Run grunt from the install directory.
1. In the browser URL
   Change localhost:8100 to localhost:8100/?eventid=EVENTID
   where EVENTID is the id of a specific event. Examples can be found by
   going to earthquake.usgs.gov and clicking on any earthquake under significant
   earthquakes, then pulling the id from the URL.
   EXAMPLE: localhost:8100/?eventid=usb000kw1x

### Notes ###
1. This application uses the earthquake responsive template found at
   https://github.com/usgs/hazdev-template.git
   The responsive template dependency is not bundled during build, so sites
   can configure their theme, and must be installed before this application
   is deployed.

### Implementing Modules and Module Pages

[Read more about creating modules and pages](MODULE.md)


Running in Docker
-----------------

### Build container ###

        docker build -t usgs/earthquake-eventpages:latest .

### Run container ###

        docker run --rm -it -p 8000:80 -e OFFSITE_HOST="earthquake.usgs.gov" usgs/earthquake-eventpages:latest

    Then open a browser to view http://localhost:8000/earthquakes/eventpage/us2000cmy3

    > The `OFFSITE_HOST` environment variable determines how data is loaded.
    > When not configured, data is loaded based on the HTTP `Host` header.
    > See https://github.com/usgs/earthquake-eventpages/blob/master/src/lib/configure.inc.php#L73
    > for other configuration options.
