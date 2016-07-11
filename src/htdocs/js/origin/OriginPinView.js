'use strict';

var BasicPinView = require('core/BasicPinView'),
    Formatter = require('core/Formatter'),
    OriginModule = require('origin/OriginModule'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: OriginModule
};


var OriginPinView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.destroy = Util.compose(function () {
    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Renders Origin content
   */
  _this.renderPinContent = function () {
    var depth,
        magnitude,
        magnitudeType,
        product,
        reviewStatus,
        time;

    product = _this.model;

    depth = product.getProperty('depth');
    magnitude = product.getProperty('magnitude');
    magnitudeType = product.getProperty('magnitude-type');
    reviewStatus = product.getProperty('review-status');
    time = product.getProperty('eventtime');

    depth = _formatter.depth(depth, 'km');
    magnitude = _formatter.magnitude(magnitude, magnitudeType);
    reviewStatus = (reviewStatus === null) ? '&ndash;' :
        reviewStatus.toUpperCase();
    time = (time === null ? '&ndash;' :
        '<time datetime="' + time + '">' +
          time.replace('T', '<br />').replace('Z', ' (UTC)') +
        '</time>');

    _this.content.innerHTML =
        '<dl class="no-style origin-pin-view">' +
          '<dt>Review Status:</dt>' +
            '<dd class="origin-pin-review-status">' + reviewStatus + '</dd>' +
          '<dt>Magnitude:</dt>' +
            '<dd class="origin-pin-magnitude">' + magnitude + '</dd>' +
          '<dt>Depth:</dt>' +
            '<dd class="origin-pin-depth">' + depth + '</dd>' +
          '<dt>Time:</dt>' +
            '<dd class="origin-pin-time">' + time + '</dd>' +
        '</dl>';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = OriginPinView;
