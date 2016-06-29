'use strict';

var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');


var OriginPinView = function (options) {
  var _this;

  options = Util.extend({}, options);
  _this = BasicPinView(options);

  _this.renderPinContent = function () {
    var magnitude,
        magnitudeType,
        product,
        reviewStatus;

    product = _this.model;

    magnitude = product.getProperty('magnitude');
    magnitudeType = product.getProperty('magnitude-type');
    reviewStatus = product.getProperty('review-status') || 'automatic';

    _this.content.innerHTML =
      '<div>' +
        '<div class="origin-pin-badge">' +
          '<a href="#phase-data" title="Origin magnitude">' +
            '<strong class="origin-magnitude">' +
              magnitude +
            '</strong>' +
            '<br />' +
            '<abbr title="Magnitude type">' +
              magnitudeType +
            '</abbr>' +
          '</a>' +
        '</div>' +
        '<div class="origin-review-status">' +
          '<strong>' +
            reviewStatus +
          '</strong>' +
          '<br />' +
          '<abbr title="Review Status">status</abbr>' +
        '</div>' +
      '</div>';
  };

  options = null;
  return _this;
};


module.exports = OriginPinView;
