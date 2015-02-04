'use strict';

var concurrent = {
  scripts: [
    'jshint:scripts',
    'mocha_phantomjs'
  ],
  tests: [
    'jshint:tests',
    'mocha_phantomjs'
  ],
  predist: [
    'jshint:scripts',
    'jshint:tests'
  ],
  dist: [
    'cssmin:dist',
    'cssmin:leaflet',
    'htmlmin:dist',
    'uglify'
  ]
};

module.exports = concurrent;
