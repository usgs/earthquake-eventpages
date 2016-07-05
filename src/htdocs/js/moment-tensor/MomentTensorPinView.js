'use strict';

var BasicPinView = require('core/BasicPinView'),
    BeachBallView = require('moment-tensor/BeachBallView'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util');

var _DEFAULTS = {
  fillColor: '#6ea8ff',
  module: {ID: 'moment-tensor', TITLE: 'Moment Tensor'}
};

var MomentTensorPinView = function (options) {
  var _this;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);
  _this.fillColor = options.fillColor;
  _this.tensor = Tensor.fromProduct(_this.model);

  _this.renderPinContent = function () {
    var beachball;

    _this.content.innerHTML = '<div class="row moment-tensor-pin-beachball">' +
      '<div class="column one-of-two"></div>' +
      '<div class="column one-of-two"></div>' +
    '</div>';

    beachball = _this.content.querySelector('.column + column');

    beachball = BeachBallView({
      el: beachball,
      fillColor: _this.fillColor,
      size: 320,
      tensor: _this.tensor
    });

    beachball.render();
  };

  options = null;
  return _this;
};

module.exports = MomentTensorPinView;
