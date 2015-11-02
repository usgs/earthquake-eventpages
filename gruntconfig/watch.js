'use strict';

var config = require('./config');

var watch = {
  static: {
    files: [
      config.src + '/htdocs/**/*.php',
      config.src + '/htdocs/**/*.html',
      config.src + '/htdocs/img/**/*.{png,jpg,jpeg,gif}',
      config.src + '/' + config.lib + '/inc/**/*.php'
    ],
    tasks: [
      'copy:build'
    ]
  },
  scripts: {
    files: [config.src + '/htdocs/**/*.js'],
    tasks: [
      'jshint:scripts',
      'browserify',
      'mocha_phantomjs'
    ]
  },
  scss: {
    files: [config.src + '/htdocs/**/*.scss'],
    tasks: [
      'postcss:build'
    ]
  },
  tests: {
    files: [
      config.test + '/*.html',
      config.test + '/**/*.js'
    ],
    tasks: [
      'jshint:tests',
      'browserify:test',
      'mocha_phantomjs'
    ]
  },
  livereload: {
    options: {
      livereload: config.liveReloadPort
    },
    files: [
      config.build + '/' + config.src + '/**/*'
    ]
  },
  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntconfig/**/*.js'
    ],
    tasks: [
      'jshint:gruntfile'
    ]
  }
};

module.exports = watch;
