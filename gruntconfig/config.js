'use strict';

var fs = require('fs'),
    ini = require('ini');

var iniConfig = ini.parse(fs.readFileSync('./src/conf/config.ini', 'utf-8'));

var config = {
  build: '.build',
  dist: 'dist',
  ini: iniConfig,
  lib: 'lib',
  src: 'src',
  test: 'test'
};

module.exports = config;
