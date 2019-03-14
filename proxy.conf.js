const PROXY_CONFIG = [
  {
    context: [
      '/archive',
      '/data/comcat',
      '/data/dyfi',
      '/data/finitefault',
      '/earthquakes/feed',
      '/earthquakes/map',
      '/fdsnws',
      '/lib',
      '/realtime',
      '/scenarios',
      '/theme',
      '/ws/geoserve'
    ],
    target: 'https://earthquake.usgs.gov',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
