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
