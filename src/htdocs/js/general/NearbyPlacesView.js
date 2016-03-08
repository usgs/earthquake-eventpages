'use strict';

var ProductView = require('core/ProductView');

var NearbyPlacesView = function (options) {
  var _this,
      _initialize,

      _formatter;

  _this = ProductView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.render = function () {
    _this.el.className = 
  };
};

module.exports = NearbyPlacesView;
