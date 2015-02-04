'use strict';

var config = require('./config');

var compass = {
  dev: {
    options: {
      sassDir: config.src + '/htdocs',
      cssDir: config.tmp,
      environment: 'development'
    }
  }
};

module.exports = compass;
