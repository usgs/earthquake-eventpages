'use strict';

var config = require('./config');

var watch = {
  scripts: {
    files: [config.src + '/htdocs/**/*.js'],
    tasks: ['concurrent:scripts', 'mocha_phantomjs'],
    options: {
      livereload: true
    }
  },
  scss: {
    files: [config.src + '/htdocs/**/*.scss'],
    tasks: ['copy:leaflet', 'copy:modalview', 'compass:dev']
  },
  tests: {
    files: [
      config.test + '/*.html',
      config.test + '/**/*.js'
    ],
    tasks: ['concurrent:tests', 'mocha_phantomjs'],
    options: {
      livereload: true
    }
  },
  livereload: {
    options: {
      livereload: true
    },
    files: [
      config.src + '/htdocs/**/*.php',
      config.src + '/htdocs/**/*.html',
      config.src + '/htdocs/img/**/*.{png,jpg,jpeg,gif}',
      config.tmp + '/**/*.css',
      config.src + '/' + config.lib + '/inc/**/*.php'
    ]
  },
  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntconfig/**/*.js'
    ],
    tasks: ['jshint:gruntfile']
  }
};

module.exports = watch;
