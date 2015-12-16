'use strict';

var autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    calc = require('postcss-calc'),
    postcssImport = require('postcss-import'),
    precss = require('precss');


var config = require('./config'),
    CWD = '.',
    NODE_MODULES = CWD + '/node_modules';


var postcss = {

  build: {
    options: {
      map: true,
      processors: [
        postcssImport({
          path: [
              CWD + '/' + config.src + '/htdocs',
              NODE_MODULES + '/hazdev-accordion/src',
              NODE_MODULES + '/hazdev-geoserve-ws/src/htdocs/css',
              NODE_MODULES + '/hazdev-location-view/src',
              NODE_MODULES + '/hazdev-question-view/src',
              NODE_MODULES + '/hazdev-svgimagemap/src',
              NODE_MODULES + '/hazdev-tablist/src',
              NODE_MODULES + '/hazdev-template/src',
              NODE_MODULES + '/hazdev-webutils/src',
              NODE_MODULES + '/quakeml-parser-js/src',
              NODE_MODULES + '/leaflet/dist'
          ]
        }),
        precss(),
        calc(),
        autoprefixer({'browsers': 'last 3 versions'})
      ]
    },
    expand: true,
    cwd: config.src + '/htdocs',
    src: [
      '**/*.scss',
      '!**/_*.scss'
    ],
    dest: config.build + '/' + config.src + '/htdocs',
    ext: '.css',
    extDot: 'last'
  },

  dist: {
    options: {
      processors: [
        cssnano({zindex: false})
      ]
    },
    expand: true,
    cwd: config.build + '/' + config.src + '/htdocs',
    src: [
      '**/*.css'
    ],
    dest: config.dist + '/htdocs'
  }
};

module.exports = postcss;
