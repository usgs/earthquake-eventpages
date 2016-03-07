'use strict';

var ContentView = require('core/ContentView'),
    Util = require('util/Util');


var _DEFAULTS = {};


/**
 * Class info and constructor parameters.
 */
var ShakeMapInfoView = function (options) {
  var _this,
      _initialize;


  _this = ContentView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);
  };

  _this.render = function () {
    _this.el.innerHTML = 'ShakeMapInfoView content';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ShakeMapInfoView;
