'use strict';

var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: {ID: 'origin', TITLE: 'Origin'}
};


var OriginPinView = function (options) {
  var _this;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Renders Origin content
   */
  _this.renderPinContent = function () {
    var magnitude,
        magnitudeType,
        product,
        reviewStatus;

    product = _this.model;

    magnitude = product.getProperty('magnitude');
    magnitudeType = product.getProperty('magnitude-type');
    reviewStatus = product.getProperty('review-status') || 'AUTOMATIC';

    if (reviewStatus !== 'AUTOMATIC') {
      reviewStatus = 'MANUAL';
    }

    _this.content.innerHTML =
      '<div class="origin-pin-badge" ' +
          'title="Origin magnitude">' +
        '<strong class="origin-magnitude">' +
          magnitude +
        '</strong>' +
        '<br />' +
        '<abbr class="origin-magnitude-type" title="Magnitude type">' +
          magnitudeType +
        '</abbr>' +
      '</div>' +
      '<div class="origin-review-status">' +
        reviewStatus +
      '</div>';
  };

  options = null;
  return _this;
};


module.exports = OriginPinView;
