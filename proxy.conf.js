const PROXY_CONFIG = [
  {
    context: [
      '/archive',
      '/data/comcat',
      '/earthquakes/feed',
      '/earthquakes/map',
      '/fdsnws',
      '/realtime',
      '/ws/geoserve'
    ],
    target: 'https://earthquake.usgs.gov',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
