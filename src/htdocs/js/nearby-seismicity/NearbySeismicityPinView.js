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
        params;

    formatter = _this.formatter;
    params = _this.params;


    maxRadiusKm = formatter.distance(params.maxradiuskm, 'km');
    minMagnitude = formatter.magnitude(params.minmagnitude);

    _this.content.innerHTML =
        '<dl class="nearby-seismicity-pin-view">' +
          '<dt>Time Range</dt>' +
            '<dd class="nearby-seismicity-pin-time">&plusmn; Three Weeks</dd>' +
          '<dt>Search Radius</dt>' +
            '<dd class="nearby-seismicity-pin-maxradiuskm">' +
              maxRadiusKm +
            '</dd>' +
          '<dt>Magnitude Range</dt>' +
            '<dd class="nearby-seismicity-pin-min-magnitude">&gt;= ' +
              minMagnitude +
            '</dd>' +
        '</dl>';
  };

  /**
   * Render the footer section of the pin.
   */
   _this.renderPinFooter = function () {
     _this.footer.innerHTML = [
       '<a href="', _this.getLinkUrl(), '">Nearby Seismicity</a>'
     ].join('');
   };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = NearbySeismicityPinView;
