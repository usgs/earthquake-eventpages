earthquake-eventpages
==============

Web application for displaying earthquake event pages.

Getting Started
---------------

[Use git to clone earthquake-eventpages from git repository](readme_git_install.md)

[Install needed dependencies and run them](readme_dependency_install.md)


### Machine specific setup ###
1. run ./src/lib/pre-install to setup config.ini
   1. URL Path for application: leave as default for now.
   1. URL stub for event detail GEOJSON web service:
      enter http://earthquake.usgs.gov/earthquakes/eventpage/%s.geojson
   1. URL stub for event detail ATOM web service: leave as default for now.

### Testing. ###
1. Run grunt from the install directory.
1. In the browser URL Change localhost:8080 to localhost:8080/?eventid=EVENTID
   where EVENTID is the id of a specific event. Examples can be found by
   going to earthquake.usgs.gov and clicking on any earthquake under significant
   earthquakes, then pulling the id from the URL.
   EXAMPLE: localhost:8080/?eventid=usb000kw1x









