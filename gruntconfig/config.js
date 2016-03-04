'use strict';

var fs = require('fs'),
    ini = require('ini');

var iniConfig = ini.parse(fs.readFileSync('./src/conf/config.ini', 'utf-8'));

var config = {
  build: '.build',
  dist: 'dist',
  etc: 'etc',
  example: 'example',
  ini: iniConfig,
  lib: 'lib',
  src: 'src',
  test: 'test',
  liveReloadPort: 8109
};

module.exports = config;
