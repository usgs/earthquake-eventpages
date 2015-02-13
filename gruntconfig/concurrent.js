'use strict';

var concurrent = {
  scripts: [
    'browserify:index',
    'browserify:unknown',
    'browserify:test',
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
