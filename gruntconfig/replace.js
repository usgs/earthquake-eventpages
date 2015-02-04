'use strict';

var config = require('./config');

var replace = {
  leaflet_shim_dist: {
    src: [
      config.dist + '/htdocs/js/index.js',
      config.dist + '/htdocs/js/unknown.js',
      config.dist + '/htdocs/modules/impact/0-0-1/css/index.css',
      config.dist + '/htdocs/modules/summary/0-0-1/css/index.css',
    ],
    overwrite: true,
    replacements: [
      {
        from: 'leaflet/dist',
        to: 'lib/leaflet'
      },
      {
        from: 'leaflet-src',
        to: 'leaflet'
      }
    ]
  }
};

module.exports = replace;