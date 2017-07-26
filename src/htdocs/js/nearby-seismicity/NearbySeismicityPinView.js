'use strict';

var BasicPinView = require('core/BasicPinView'),
    CatalogEvent = require('pdl/CatalogEvent'),
    Formatter = require('core/Formatter'),
    NearbySeismicity = require('nearby-seismicity/NearbySeismicity'),
    Util = require('util/Util');

var _DEFAULTS;

_DEFAULTS = {
  module: {
    TITLE: 'View Nearby Seismicity'
  }
};

var NearbySeismicityPinView = function (options) {
  var _this,
      _initialize;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _this.event = options.event || CatalogEvent();
    _this.nearbySeismicity = NearbySeismicity();
    _this.params = _this.nearbySeismicity.getNearbySeismicityParams(
        _this.event.getSummary());
    _this.formatter = options.formatter || Formatter();
  };

  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getLinkUrl = function () {
    var summary;

    summary = _this.event.getSummary();

    return _this.nearbySeismicity.getLatestEarthquakesLink({
      eventid: summary.id,
      params: _this.params
    });
  };

  /**
   * Renders Nearby seismicity content
   */
  _this.renderPinContent = function () {
    var formatter,
        maxRadiusKm,
        minMagnitude,
        params,
        timeRange;

    formatter = _this.formatter;
    params = _this.params;

    maxRadiusKm = formatter.distance(params.maxradiuskm, 'km');
    minMagnitude = '&ge; ' + formatter.magnitude(params.minmagnitude);
    timeRange = '&plusmn; Three Weeks';

    _this.content.innerHTML =
      '<ul class="flex-image-grid nearby-seismicity-pin-view no-style">' +
        '<li>' +
          '<div class="image-container">' +
            '<img class="pin-icon" src="images/nearby-seismicity/time.png" />' +
          '</div>' +
          '<div class="text-container">' +
            '<h4>Time Range</h4>' +
            '<span>' + timeRange + '</span>' +
          '</div>' +
        '</li>' +
        '<li>' +
          '<div class="image-container">' +
            '<img class="pin-icon" src="images/nearby-seismicity/radius.png" />' +
          '</div>' +
          '<div class="text-container">' +
            '<h4>Search Radius</h4>' +
            '<span>' + maxRadiusKm + '</span>' +
          '</div>' +
        '</li>' +
        '<li>' +
          '<div class="image-container">' +
            '<img class="pin-icon" src="images/nearby-seismicity/magnitude.png" />' +
          '</div>' +
          '<div class="text-container">' +
            '<h4>Magnitude Range</h4>' +
            '<span>' + minMagnitude + '</span>' +
          '</div>' +
        '</li>' +
      '</ul>';
  };

  /**
   * Render the footer section of the pin.
   */
   _this.renderPinFooter = function () {
     _this.footer.innerHTML = 'ANSS ComCat';
   };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = NearbySeismicityPinView;
