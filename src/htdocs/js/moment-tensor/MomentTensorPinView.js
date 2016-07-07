'use strict';

var BasicPinView = require('core/BasicPinView'),
    BeachBallView = require('moment-tensor/BeachBallView'),
    MomentTensorModule = require('moment-tensor/MomentTensorModule'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util');


var _DEFAULTS = {
  className: 'moment-tensor-pin-beachball',
  fillColor: '#6ea8ff',
  module: MomentTensorModule
};


var MomentTensorPinView = function (options) {
  var _this,
      _initialize,

      _beachballView,
      _className,
      _fillColor,
      _tensor;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _className = options.className;
    _fillColor = options.fillColor;
    _tensor = Tensor.fromProduct(_this.model);
  };

  _this.destroy = Util.compose(function () {
    if (_beachballView) {
      _beachballView.destroy();
    }

    _beachballView = null;
    _className = null;
    _fillColor = null;
    _tensor = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Creats pin content
   */
  _this.renderPinContent = function () {
    Util.empty(_this.content);

    _beachballView = BeachBallView({
      fillColor: _fillColor,
      labelAxes: false,
      labelPlanes: false,
      size: 200,
      tensor: _tensor
    });

    _beachballView.el.classList.add(_className);
    _this.content.appendChild(_beachballView.el);
    _beachballView.render();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = MomentTensorPinView;
