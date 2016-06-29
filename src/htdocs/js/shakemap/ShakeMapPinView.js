'use strict';

var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');

var ShakeMapPinView = function (options) {
  var _this;

  options = Util.extend({}, options);
  _this = BasicPinView(options);

  _this.renderPinContent = function () {
    _this.content.innerHTML = '';
  };

  options = null;
  return _this;
};

module.exports = ShakeMapPinView;
