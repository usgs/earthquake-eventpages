export const environment = {
  production: false,
  scenario: true,

  CONTRIBUTOR_SERVICE:
    'https://earthquake.usgs.gov/data/comcat/contributor/index.json.php',

  DELETED_EVENT_SERVICE:
    'https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?' +
    'includedeleted=true',

  EVENT_SERVICE:
    'https://earthquake.usgs.gov/fdsnws/scenario/1/query?' +
    'format=geojson&eventid={eventid}',

  GEOSERVE_SERVICE: 'https://earthquake.usgs.gov/ws/geoserve',

  SCENARIO_SERVICE:
    'https://earthquake.usgs.gov/scenarios/feed/v1.0/detail/' +
    '{eventid}.geojson',

  DYFI_RESPONSE_URL: '/data/dyfi/form/response.php',

  siteUrl: 'localhost.localdomain'
};
