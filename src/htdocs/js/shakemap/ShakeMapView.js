'use strict';

var Formatter = require('core/Formatter'),
    ProductView = require('core/ProductView');

var ShakeMapView = function (options) {
  var _this,
      _initialize,

      _formatter;

  _this = ProductView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.render = function () {
    _this.el.innerHTML = '<p>ShakeMapView Output</p>';
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = ShakeMapView;