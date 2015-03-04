'use strict';

var config = require('./config');


var MOUNT_PATH = config.ini.MOUNT_PATH;
var OFFSITE_HOST = config.ini.OFFSITE_HOST;


var addMiddleware = function (connect, options, middlewares) {
  middlewares.unshift(
    require('compression')({
      filter: function (req, res) {
        var type = res.getHeader('Content-Type');
        return (type+'').match(/(css|javascript)/);
      }
    }),
    require('grunt-connect-rewrite/lib/utils').rewriteRequest,
    require('grunt-connect-proxy/lib/utils').proxyRequest,
    require('gateway')(options.base[0], {
      '.php': 'php-cgi',
      'env': {
        'PHPRC': 'node_modules/hazdev-template/dist/conf/php.ini'
      }
    })
  );
  return middlewares;
};


var connect = {
  options: {
    hostname: '*'
  },

  proxies: [
    {
      context: '/theme/',
      host: 'localhost',
      port: 8103,
      rewrite: {
        '^/theme': ''
      }
    },
    {
      context: '/realtime/',
      host: OFFSITE_HOST,
      port: 80,
      changeOrigin: true
    },
    {
      context: '/archive/',
      host: OFFSITE_HOST,
      port: 80,
      changeOrigin: true
    },
    {
      context: '/product/',
      host: OFFSITE_HOST,
      port: 80,
      changeOrigin: true
    }
  ],

  rules: (function () {
    var rules = {};
    // event page rewrites
    rules['^' + MOUNT_PATH + '/unknown$'] = '/unknown.php';
    rules['^' + MOUNT_PATH + '/terms.php'] = '/terms.php';
    rules['^' + MOUNT_PATH + '/([^/]+)$'] = '/index.php?eventid=$1';
    rules['^' + MOUNT_PATH + '/(.*)$'] = '/$1';
    return rules;
  })(),


  dev: {
    options: {
      base: [config.build + '/' + config.src + '/htdocs'],
      port: 8100,
      livereload: true,
      open: 'http://localhost:8100/index.php',
      middleware: addMiddleware
    }
  },
  test: {
    options: {
      base: [
        config.build + '/' + config.src + '/htdocs',
        config.build + '/' + config.test,
        'node_modules'
      ],
      port: 8101,
      open: 'http://localhost:8101/test.html'
    }
  },
  dist: {
    options: {
      base: [config.dist + '/htdocs'],
      port: 8102,
      keepalive: true,
      open: 'http://localhost:8102/',
      middleware: addMiddleware
    }
  },
  template: {
    options: {
      base: ['node_modules/hazdev-template/dist/htdocs'],
      port: 8103
    }
  }
};


module.exports = connect;
