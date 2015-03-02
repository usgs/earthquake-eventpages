'use strict';

var config = require('./config');


var CWD = process.cwd(),
    NODE_MODULES = CWD + '/node_modules';


var browserify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        CWD + '/' + config.src + '/htdocs/js',
        CWD + '/' + config.src + '/htdocs/modules',
        NODE_MODULES + '/hazdev-accordion/src',
        NODE_MODULES + '/hazdev-location-view/src',
        NODE_MODULES + '/hazdev-question-view/src',
        NODE_MODULES + '/hazdev-svgimagemap/src',
        NODE_MODULES + '/hazdev-tablist/src',
        NODE_MODULES + '/hazdev-webutils/src',
        NODE_MODULES + '/quakeml-parser-js/src'
      ]
    }
  },

  // source bundles
  index: {
    src: config.src + '/htdocs/js/index.js',
    dest: config.build + '/' + config.src + '/htdocs/js/index.js'
  },
  unknown: {
    src: config.src + '/htdocs/js/unknown.js',
    dest: config.build + '/' + config.src + '/htdocs/js/unknown.js'
  },

  // test bundle
  test: {
    src: config.test + '/test.js',
    dest: config.build + '/' + config.test + '/test.js'
  }

};


module.exports = browserify;
