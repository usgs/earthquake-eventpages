'use strict';

var config = require('./config');

var htmlmin = {
  dist: {
    options: {
      collapseWhitespace: true
    },
    files: [{
      expand: true,
      cwd: config.src,
      src: '**/*.html',
      dest: config.dist
    }]
  }
};

module.exports = htmlmin;
