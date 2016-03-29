'use strict';

var ProductView = require('core/ProductView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _DEFAULTS = {
  url: 'http://earthquake.usgs.gov/ws/geoserve/regions.json'
};


/**
 * View for a geoserve tectonic summary Product.
 *
 * @param options {Object}
 *    all options are passed to ProductView.
 */
var GeoserveRegionSummaryView = function (options) {
  var _this,
      _initialize,

      _url,
      _xhr;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  _initialize = function (options) {
    _this.el.classList.add('geoserve-region-summary');
    _url = options.url;
  };


  /**
   * Gets data
   */
  _this.fetchData = function () {
    _xhr = Xhr.ajax({
      url: _url,
      success: _this.onSuccess,
      error: _this.onError,
      data: {
        latitude: _this.model.getProperty('latitude'),
        longitude: _this.model.getProperty('longitude'),
        type: 'tectonic'
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
    _this.el.innerHTML = '<p class="alert error">' +
        'Error loading region tectonic summary' +
        '</p>';
  };

  /**
   * This method is called when data is successfully fetched from _this.model
   * {Content} object.
   *
   * @param data {String|JSON}
   *     The data for _this.model {Content} object.
   */
  _this.onSuccess = function (data) {
    var features;

    features = data.tectonic.features;
    if (features.length > 0) {
      _this.el.innerHTML = features[0].properties.summary;
    } else {
      _this.el.innerHTML = '<p class="alert info">' +
          'No region summary available for this location' +
          '</p>';
    }
  };

  /**
   * Called when the model changes. Initially sets a loading message then starts
   * the data fetch process to render the actual content. Relies on browser
   * caches to avoid duplicate HTTP overhead.
   */
  _this.render = function () {
    _this.el.innerHTML = '<p>Loading content&hellip;</p>';
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
    _initialize = null;
    _this = null;
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};

module.exports = GeoserveRegionSummaryView;
