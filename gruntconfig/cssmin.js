'use strict';

var config = require('./config');

var cssmin = {
  options: {
    report: 'min',
    root: config.dist + '/htdocs',
    processImport: false,
    noRebase: true
  },
  dist: {
    expand: true,
    cwd: config.build + '/' + config.src,
    dest: config.dist,
    src: '**/*.css'
  }
};

module.exports = cssmin;
