'use strict';

var config = require('./config');

var clean = {
  dist: [config.dist],
  dev: [
    config.tmp,
    '.sass-cache'
  ]
};

module.exports = clean;