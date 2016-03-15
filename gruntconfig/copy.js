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
    ],
    filter: 'isFile',
    options: {
      mode: true
    }
  },
  test: {
    expand: true,
    cwd: config.test,
    dest: config.build + '/' + config.test,
    src: [
      '**/*',
      '!**/*.js'
    ],
    filter: 'isFile'
  },
  dist: {
    expand: true,
    cwd: config.build + '/' + config.src,
    dest: config.dist,
    src: [
      '**/*',
      '!**/*.js',
      '!**/*.css'
    ],
    filter: 'isFile',
    options: {
      mode: true
    }
  },


  leaflet: {
    expand: true,
    cwd: 'node_modules/leaflet/dist',
    dest: config.build + '/' + config.src + '/htdocs/lib/leaflet-0.7.7',
    rename: function (dest, src) {
      var newName;

      // swap -src version to be default and add -min to compressed version
      // this is nice for debugging but allows production to use default
      // version as compressed
      newName = src.replace('leaflet.js', 'leaflet-min.js');
      newName = newName.replace('leaflet-src.js', 'leaflet.js');

      return dest + '/' + newName;
    },
    src: [
      '**/*'
    ]
  },
  locationview_images: {
    expand: true,
    cwd: 'node_modules/hazdev-location-view/src/locationview/images',
    dest: config.build + '/' + config.src + '/htdocs/modules/impact/images',
    src: [
      '*.png',
      '*.cur'
    ]
  }
};

module.exports = copy;
