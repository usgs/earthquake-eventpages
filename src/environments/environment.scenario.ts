export const environment = {
  production: false,
  scenario: true,

  CONTRIBUTOR_SERVICE:
    'https://earthquake.usgs.gov/data/comcat/contributor/index.json.php',

  DELETED_EVENT_SERVICE:
    'https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?' +
    'includedeleted=true',

  EVENT_SERVICE:
    'https://earthquake.usgs.gov/fdsnws/scenario/1/query?format=geojson&eventid={eventid}',

  GEOSERVE_SERVICE: 'https://earthquake.usgs.gov/ws/geoserve',

  siteUrl: 'localhost.localdomain'
};
