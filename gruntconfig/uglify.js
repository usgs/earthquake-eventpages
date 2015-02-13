'use strict';

var config = require('./config');

var uglify = {
  options: {
    mangle: true,
    compress: true,
    report: 'gzip'
  },
  dist: {
    cwd: config.build + '/' + config.src,
    src: '**/*.js',
    dest: config.dest
  }
};

module.exports = uglify;
