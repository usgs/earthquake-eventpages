'use strict';

var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');

var GeoserveNearbyPlacesView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = options || {};
  _this = ContentView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.onSuccess = function (data) {
    var i,
        len,
        markup,
        countryOrState;

    data = data.geonames.features;
    len = data.length;
    markup = [];

    _this.el.classname = 'geoserve-nearby-places';

    markup.push('<h3>Nearby Places</h3>');

    for (i = 0; i < len; i++) {
      // Checks to see if location is inside the US or not if it is in the US
      // the format uses the state name but if the location is outside the US
      // the country name is used.
      if (data[i].properties.country_code === 'US') {
        countryOrState = data[i].properties.admin1_name;
      } else {
        countryOrState = data[i].properties.country_name;
      }

      // Formats the nearby places info
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
   * Destroy all the things.
   */
  _this.destroy = Util.compose(function () {
    _formatter = null;
    _this = null;
    _initialize = null;
  }, _this.destroy);

  _initialize(options);
  options = null;
  return _this;
};

module.exports = GeoserveNearbyPlacesView;
