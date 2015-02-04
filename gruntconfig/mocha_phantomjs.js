'use strict';

var config = require('./connect').dev.options;

var mocha_phantomjs = {
  all: {
    options: {
      urls: [
        'http://localhost:' + config.port + '/index.html'
      ]
    }
  }
};

module.exports = mocha_phantomjs;
