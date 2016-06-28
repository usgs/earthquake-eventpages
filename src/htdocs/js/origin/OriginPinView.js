'use strict';

var BasicPinView = require('core/BasicPinView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');


var OriginPinView = function (options) {
  var _this;

  options = Util.extend({}, options);
  _this = BasicPinView(options);

  _this.renderPinContent = function () {
    var depth,
        depthError,
        originTime,
        latitude,
        longitude,
        magnitude,
        magnitudeError,
        magnitudeType,
        product;

    product = _this.model;

    depth = product.getProperty('depth');
    depthError = product.getProperty('vertical-error');
    latitude = product.getProperty('latitude');
    longitude = product.getProperty('longitude');
    magnitude = product.getProperty('magnitude');
    magnitudeError = product.getProperty('magnitude-error');
    magnitudeType = product.getProperty('magnitude-type');
    originTime = product.getProperty('eventtime');

    _this.formatter = Formatter();

    _this.content.innerHTML =
      '<div>' +
        '<table class="origin-table">' +
          '<tbody>' +

            '<tr>' +
              '<th scope="row">Magnitude</th>' +
              '<td>' +
                _this.formatter.magnitude(
                    magnitude,
                    magnitudeType,
                    magnitudeError
                ) +
              '</td>' +
            '</tr>' +

            '<tr>' +
              '<th scope="row">Magnitude</th>' +
              '<td>' +
                _this.formatter.location(latitude, longitude) +
              '</td>' +
            '</tr>' +

            '<tr>' +
              '<th scope="row">Magnitude</th>' +
              '<td>' +
                _this.formatter.depth(depth, 'km', depthError) +
              '</td>' +
            '</tr>' +

            '<tr>' +
              '<th scope="row">Magnitude</th>' +
              '<td>' +
                _this.formatter.depth(depth, 'km', depthError) +
              '</td>' +
            '</tr>' +

          '</tbody>' +
        '</table>' +
      '</div>';
  };

  options = null;
  return _this;
};


module.exports = OriginPinView;
