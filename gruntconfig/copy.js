'use strict';

var config = require('./config');

var copy = {
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
  app: {
    expand: true,
    cwd: config.src + '/htdocs',
    dest: config.dist + '/htdocs',
    src: [
      'img/**/*.{png,gif,jpg,jpeg}',
      '**/*.php'
    ]
  },
  conf: {
    expand: true,
    cwd: config.src + '/conf',
    dest: config.dist + '/conf',
    src: [
      '**/*',
      '!**/*.orig'
    ]
  },
  lib: {
    expand: true,
    cwd: config.src + '/lib',
    dest: config.dist + '/lib',
    src: [
      '**/*'
    ],
    options: {
      mode: true
    }
  },
  modalview: {
    src: 'node_modules/hazdev-webutils/src/mvc/ModalView.css',
    dest: 'node_modules/hazdev-webutils/src/mvc/_ModalView.scss'
  },
  downloadview: {
    src: 'node_modules/hazdev-webutils/src/mvc/DownloadView.css',
    dest: 'node_modules/hazdev-webutils/src/mvc/_DownloadView.scss'
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
    dest: config.tmp + '/modules/impact/0-0-1/css',
    src: [
      '*.png',
      '*.cur'
    ]
  }
};

module.exports = copy;
