'use strict';

var BasicPinView = require('core/BasicPinView'),
    BeachBallView = require('moment-tensor/BeachBallView'),
    MomentTensorModule = require('moment-tensor/MomentTensorModule'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util');


var _DEFAULTS = {
  fillColor: '#6ea8ff',
  module: MomentTensorModule
};


var MomentTensorPinView = function (options) {
  var _this,
      _initialize,

      _fillColor,
      _tensor;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _fillColor = options.fillColor;
    _tensor = Tensor.fromProduct(_this.model);
  };

  _this.destroy = Util.compose(function () {
    _fillColor = null;
    _tensor = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Creats pin content
   */
  _this.renderPinContent = function () {
    var beachball;

    _this.content.innerHTML = '<div class="moment-tensor-pin-beachball"></div>';

    beachball = _this.content.querySelector('.moment-tensor-pin-beachball');

    beachball = BeachBallView({
      el: beachball,
      fillColor: _fillColor,
      labelPlanes: false,
      size: 320,
      tensor: _tensor
    });

    beachball.render();
    beachball.destroy();
    beachball = null;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = MomentTensorPinView;
