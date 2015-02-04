'use strict';

var fs = require('fs'),
    ini = require('ini');

var iniConfig = ini.parse(fs.readFileSync('./src/conf/config.ini', 'utf-8'));

var config = {
  dist: 'dist',
  ini: iniConfig,
  lib: 'lib',
  src: 'src',
  test: 'test',
  tmp: '.tmp'
};

module.exports = config;
