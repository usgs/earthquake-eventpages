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
      context: [
        '/arcgis/',
        '/archive/',
        '/data/',
        '/product/',
        '/realtime/',
        '/scenario/',
        '/scenarios/',
        '/ws/'
      ],
      headers: {
        host: OFFSITE_HOST
      },
      host: OFFSITE_HOST,
      port: 80
    }
  ],

  rules: [
    {
      from: '^' + MOUNT_PATH + '/unknown$',
      to: '/unknown.php'
    },
    {
      from: '^' + MOUNT_PATH + '/terms.php',
      to: '/terms.php'
    },
    {
      from: '^' + MOUNT_PATH + '/([^/]+)$',
      to: '/index.php?eventid=$1'
    },
    {
      from: '^' + MOUNT_PATH + '/(.*)$',
      to: '/$1'
    }
  ],


  dev: {
    options: {
      base: [
        config.build + '/' + config.src + '/htdocs'
      ],
      port: 8100,
      livereload: config.liveReloadPort,
      open: 'http://localhost:8100/earthquakes/eventpage/us10004u1y',
      middleware: addMiddleware
    }
  },

  dist: {
    options: {
      base: [
        config.dist + '/htdocs'
      ],
      port: 8102,
      keepalive: true,
      open: 'http://localhost:8102/earthquakes/eventpage/us10004u1y',
      middleware: addMiddleware
    }
  },

  example: {
    options: {
      base: [
        config.example,
        config.build + '/' + config.src + '/htdocs',
        config.etc
      ],
      middleware: addMiddleware,
      open: 'http://localhost:8104/example.php',
      port: 8104
    }
  },

  template: {
    options: {
      base: [
        'node_modules/hazdev-template/dist/htdocs'
      ],
      port: 8103,
      middleware: addMiddleware
    }
  },

  test: {
    options: {
      base: [
        config.build + '/' + config.src + '/htdocs',
        config.build + '/' + config.test,
        config.etc,
        'node_modules'
      ],
      port: 8101,
      open: 'http://localhost:8101/test.html'
    }
  }
};


module.exports = connect;
