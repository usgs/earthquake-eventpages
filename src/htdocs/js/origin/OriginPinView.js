'use strict';

var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util'),
    View = require('mvc/View');

var _DEFAULTS = {

};

var OriginPinView = function (options) {
  var _this;

  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _this.destroy = Util.compose(function () {
    _this = null;
  }, _this.destroy);

  _this.renderPinContent = function () {

  };

  options = null;
  return _this;
};


module.exports = OriginPinView;
