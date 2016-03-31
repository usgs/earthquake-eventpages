'use strict';

var config = require('./config');

var clean = {
  build: [
    config.build
  ],
  dist: [config.dist]
};

module.exports = clean;
