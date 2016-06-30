'use strict';

var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: {ID: 'moment-tensor', TITLE: 'Moment Tensor'}
};

var MomentTensorPinView = function (options) {
  var _this;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _this.renderPinContent = function () {
    _this.content.innerHTML = '';
  };

  options = null;
  return _this;
};

module.exports = MomentTensorPinView;
