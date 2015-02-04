'use strict';

var config = require('./config');

var cssmin = {
  options: {
    report: 'min',
    root: config.dist + '/htdocs',
    processImport: false,
    noRebase: true
  },
  dist: {
    expand: true,
    cwd: config.tmp,
    dest: config.dist + '/htdocs',
    src: '**/*.css'
  },
  leaflet: {
    dest: config.dist + '/htdocs/lib/leaflet/leaflet.css',
    src: 'node_modules/leaflet/dist/leaflet.css'
  }
};

module.exports = cssmin;
