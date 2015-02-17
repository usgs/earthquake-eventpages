'use strict';

var concurrent = {
  scripts: [
    'browserify',
    'jshint:scripts'
  ],
  tests: [
    'browserify:test',
    'jshint:tests'
  ],
  build: [
    'browserify',
    'compass:dev',
    'copy:build',
    'copy:test',
    'copy:leaflet',
    'copy:locationview_images',
    'jshint:scripts',
    'jshint:tests'
  ],
  dist: [
    'copy:dist',
    'cssmin',
    'uglify'
  ]
};

module.exports = concurrent;
