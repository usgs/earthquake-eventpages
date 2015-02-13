'use strict';

var config = require('./config');

var copy = {
  build: {
    expand: true,
    cwd: config.src,
    dest: config.build + '/' + config.src,
    src: [
      '**/*',
      '!**/*.js',
      '!**/*.scss',
      '!**/*.orig'
    ]
  },
  test: {
    expand: true,
    cwd: config.test,
    dest: config.build + '/' + config.test,
    src: [
      '**/*',
      '!**/*.js'
    ]
  },
  dist: {
    expand: true,
    cwd: config.build + '/' + config.src,
    dest: config.dist,
    src: [
      '**/*',
      '!**/*.js',
      '!**/*.css'
    ]
  },


  leaflet: {
    expand: true,
    cwd: 'node_modules/leaflet/dist',
    dest: config.dist + '/htdocs/lib/leaflet',
    src: [
      'leaflet.js',
      'leaflet.css',
      'images/**'
    ]
  },
  locationview_images: {
    expand: true,
    cwd: 'node_modules/hazdev-location-view/src',
    dest: config.dist + '/htdocs/modules/impact/0-0-1/css',
    src: [
      '*.png',
      '*.cur'
    ]
  },
  locationview_images_dev: {
    expand: true,
    cwd: 'node_modules/hazdev-location-view/src',
    dest: config.build + '/htdocs/modules/impact/0-0-1/css',
    src: [
      '*.png',
      '*.cur'
    ]
  }
};

module.exports = copy;
