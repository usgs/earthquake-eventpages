'use strict';

var Formatter = require('core/Formatter'),
    NearbyPlacesView = require('general/NearbyPlacesView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _DEFAULTS = {
  url: 'http://earthquake.usgs.gov/ws/geoserve/'
};


/**
 * View for a geoserve nearby-cities Product.
 *
 * @param options {Object}
 *    all options are passed to ProductView.
 */
var GeoserveNearbyPlacesView = function (options) {
  var _this,
      _initialize,

      _formatter,
      _url,
      _xhr;


  options = Util.extend({}, _DEFAULTS, options);
  _this = NearbyPlacesView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
    _url = options.url || null;
    _this.el.classList.add('geoserve-nearby-places');
  };


  /**
   * Gets data
   */
  _this.fetchData = function () {
    _xhr = Xhr.ajax({
      url: _url + 'places.json',
      success: _this.onSuccess,
      error: _this.onError,
      data: {
        latitude: _this.model.getProperty('latitude'),
        longitude: _this.model.getProperty('longitude'),
        type: 'event'
      },
      done: function () {
        _xhr = null;
      }
    });
  };

  /**
   * Displays message followed by the url requested on error
   */
  _this.onError = function () {
    _this.el.innerHTML = 'Unable to load geoserve web service, URL: ' + _url;
    _this.trigger('places-error');
  };

  /**
   * This method is called when data is successfully fetched from _this.model
   * {Content} object.
   *
   * @param data {String|JSON}
   *     The data for _this.model {Content} object.
   */
  _this.onSuccess = Util.compose(function (data) {
    return data.event.features.map(function (item) {
      var azimuth,
          countryOrState;

      azimuth = _formatter.backAzimuth(item.properties.azimuth);

      // Checks to see if location is inside the US or not if it is in the US
      // the state name is used if the location is outside the US
      // the country name is used.
      if (item.properties.country_code === 'US') {
        countryOrState = item.properties.admin1_name;
      } else {
        countryOrState = item.properties.country_name;
      }

      return {
        distance: item.properties.distance,
        direction: _formatter.compassWinds(azimuth),
        name: item.properties.name + ', ' + countryOrState,
        population: item.properties.population
      };
    });
  }, _this.onSuccess);

  /**
   * Called when the model changes. Initially sets a loading message then starts
   * the data fetch process to render the actual content. Relies on browser
   * caches to avoid duplicate HTTP overhead.
   */
  _this.render = function () {
    _this.el.innerHTML = 'Loading content&hellip;';
    _this.fetchData();
  };

  /**
   * Destroy all the things.
   */
  _this.destroy = Util.compose(function () {
    if (_xhr) {
      _xhr.abort();
      _xhr = null;
    }
    _url = null;
    _formatter = null;
    _initialize = null;
    _this = null;
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};

module.exports = GeoserveNearbyPlacesView;
