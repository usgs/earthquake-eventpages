'use strict';

//var config = require('./config');

var uglify = {
  options: {
    mangle: true,
    compress: true,
    report: 'gzip'
  },
  dist: {
    files: {
      //'<%= app.dist %>/htdocs/lib/requirejs/require.js':
      //    ['node_modules/requirejs/require.js']
    }
  }
};

module.exports = uglify;
