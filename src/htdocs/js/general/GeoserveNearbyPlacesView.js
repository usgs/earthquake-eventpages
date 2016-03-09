'use strict';

var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');

var GeoserveNearyPlacesView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = options || {};
  _this = ContentView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.destroy = Util.compose(function () {
    _formatter = null;
    _this = null;
    _initialize = null;
  }, _this.destroy);

  _initialize(options);
  options = null;
  return _this;
};

module.export = GeoserveNearyPlacesView;
