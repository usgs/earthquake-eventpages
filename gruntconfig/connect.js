'use strict';

var config = require('./config');
var gateway = require('gateway');
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;


var MOUNT_PATH = config.ini.MOUNT_PATH;
var OFFSITE_HOST = config.ini.OFFSITE_HOST;


var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var mountPHP = function (dir, options) {
  options = options || {
    '.php': 'php-cgi',
    'env': {
      'PHPRC': process.cwd() + '/node_modules/hazdev-template/dist/conf/php.ini'
    }
  };
  return gateway(require('path').resolve(dir), options);
};


var connect = {
  options: {
    hostname: '*'
  },
  proxies: [
    {
      context: '/realtime',
      host: OFFSITE_HOST,
      port: 80,
      changeOrigin: true
    },
    {
      context: '/archive',
      host: OFFSITE_HOST,
      port: 80,
      changeOrigin: true
    },
    { // This last one can be deleted if not testing against COMCAT
      context: '/product',
      host: OFFSITE_HOST,
      port: 80,
      changeOrigin: true
    }
  ],
  rules: (function () {
    var rules = {};
    // template rewrite
    rules['^/theme/(.*)$'] = '/hazdev-template/dist/htdocs/$1';
    // event page rewrites
    rules['^' + MOUNT_PATH + '/unknown$'] = '/unknown.php';
    rules['^' + MOUNT_PATH + '/terms.php'] = '/terms.php';
    rules['^' + MOUNT_PATH + '/([^/]+)$'] = '/index.php?eventid=$1';
    rules['^' + MOUNT_PATH + '/(.*)$'] = '/$1';
    return rules;
  })(),
  dev: {
    options: {
      base: [config.src + '/htdocs'],
      port: 8100,
      livereload: true,
      open: 'http://localhost:8100/',
      middleware: function (connect, options) {
        return [
          rewriteRulesSnippet,
          proxySnippet,
          mountFolder(connect, config.tmp),
          mountPHP(options.base[0]),
          mountFolder(connect, options.base[0]),
          mountFolder(connect, 'node_modules')
        ];
      }
    }
  },
  test: {
    options: {
      base: [config.test],
      port: 8101,
      open: 'http://localhost:8101/',
      middleware: function (connect, options) {
        return [
          rewriteRulesSnippet,
          mountFolder(connect, config.tmp),
          mountFolder(connect, options.base[0]),
          mountFolder(connect, 'node_modules'),
          mountFolder(connect, config.src + '/htdocs/modules'),
          mountFolder(connect, config.src + '/htdocs/js'),
          // module css is relative to module root which is at '/' above
          mountFolder(connect, config.tmp + '/modules')
        ];
      }
    }
  },
  dist: {
    options: {
      base: [config.dist + '/htdocs'],
      port: 8102,
      keepalive: true,
      open: 'http://localhost:8102/',
      middleware: function (connect, options) {
        return [
          proxySnippet,
          mountPHP(options.base[0]),
          mountFolder(connect, options.base[0]),
          // add template
          rewriteRulesSnippet,
          mountFolder(connect, 'node_modules')
        ];
      }
    }
  }
};


module.exports = connect;
