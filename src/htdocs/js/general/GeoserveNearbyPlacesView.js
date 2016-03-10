'use strict';

var ProductView = require('core/ProductView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var GeoserveNearbyPlacesView = function (options) {
  var _this,
      _initialize,

      _formatter,
      _url;

  options = options || {};
  _this = ProductView(options);

  _initialize = function (options) {
    var latitude,
        longitude;

    _formatter = options.formatter || Formatter();

    if (options.eventConfig &&
        options.eventConfig.hasOwnProperty('GEOSERVE_WS_URL')) {
      latitude = _this.model.getProperty('latitude');
      longitude = _this.model.getProperty('longitude');
      _url = options.eventConfig.GEOSERVE_WS_URL;
      _url = _url + 'places.json?type=event&latitude=' + latitude +
          '&longitude=' + longitude;
    }
  };

  /**
   * Gets data
   */
  _this.fetchData = function () {
    Xhr.ajax({
      url: _url,
      success: _this.onSuccess,
      error: _this.onError
    });
  };

  /**
   * Displays message followed by the url requested on error
   */
  _this.onError = function () {
    _this.el.innerHTML = 'Unable to load geoserve web service, URL: ' + _url;
  };

  /**
   * This method is called when data is successfully fetched from _this.model
   * {Content} object. It should complete the render of the fetched data
   * into _this.el container.
   *
   * @param data {String|JSON}
   *     The data for _this.model {Content} object.
   */
  _this.onSuccess = function (data) {
    var i,
        len,
        markup,
        countryOrState;

    data = data.event.features;
    len = data.length;
    markup = [];

    _this.el.classname = 'geoserve-nearby-places';

    markup.push('<h3>Nearby Places</h3>');

    for (i = 0; i < len; i++) {
      // Checks to see if location is inside the US or not if it is in the US
      // the state name is used if the location is outside the US
      // the country name is used.
      if (data[i].properties.country_code === 'US') {
        countryOrState = data[i].properties.admin1_name;
      } else {
        countryOrState = data[i].properties.country_name;
      }

      // Formats nearby places/cities info
      markup.push('<li>' +
          data[i].properties.distance + ' km ' +
          '(' + Math.round(_formatter.kmToMi(data[i].properties.distance)) +
          ' mi) ' + _formatter.compassWinds(data[i].properties.azimuth) +
          ' of ' + data[i].properties.name +
          ', ' + countryOrState +
          '</li>');
    }

    _this.el.innerHTML = '<ul class="no-style">' + markup.join('') + '</ul>';
  };

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
