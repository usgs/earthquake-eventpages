// The file contents for the current environment will overwrite these
// during build. The build system defaults to the dev environment which uses
// `environment.ts`, but if you do `ng build --env=prod` then
// `environment.prod.ts` will be used instead. The list of which env maps to
// which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  CONTRIBUTOR_SERVICE:
    'https://earthquake.usgs.gov/data/comcat/contributor/index.json.php',

  DELETED_EVENT_SERVICE:
    'https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?' +
    'includedeleted=true',

  EVENT_SERVICE: 'https://dev-earthquake.cr.usgs.gov/earthquakes/feed/v1.0/detail',

  GEOSERVE_SERVICE: 'https://earthquake.usgs.gov/ws/geoserve'
};
