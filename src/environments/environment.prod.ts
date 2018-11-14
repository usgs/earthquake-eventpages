export const environment = {
  production: true,
  scenario: false,

  CONTRIBUTOR_SERVICE: '/data/comcat/contributor/index.json.php',
  DELETED_EVENT_SERVICE: '/fdsnws/event/1/query.geojson?includedeleted=true',
  EVENT_SERVICE: '/earthquakes/feed/v1.0/detail/{eventid}.geojson',
  GEOSERVE_SERVICE: '/ws/geoserve',
  SCENARIO_SERVICE: '/scenarios/feed/v1.0/detail/{eventid}.geojson',
  siteUrl: 'earthquake.usgs.gov'
};
