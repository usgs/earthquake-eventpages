const PROXY_CONFIG = [
  {
    context: [
      '/archive',
      '/data/comcat',
      '/data/dyfi',
      '/earthquakes/feed',
      '/earthquakes/map',
      '/fdsnws',
      '/lib',
      '/realtime',
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
