'use strict';


var ContentView = require('core/ContentView'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var ForecastView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ContentView(options);

  _initialize = function (/*options*/) {

  };


  _this.destroy = Util.compose(function () {

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.onError = function (/*status, xhr*/) {
    _this.el.innerHTML = '<p class="alert error">' +
        'Failed to load forecast data.</p>';
  };

  _this.onSuccess = function (data/*, xhr*/) {
    _this.forecast = data;
    _this.render();
    _this.trigger('forecast', _this.forecast);
  };

  _this.render = function () {
    if (!_this.forecast) {
      _this.el.innerHTML = '<p>Loading content&hellip;</p>';
      _this.fetchData();
    } else {
      _this.renderForecast();
    }
  };

  _this.renderForecast = function () {
    _this.el.innerHTML = JSON.stringify(_this.forecast);
  };

  _this.setForecast = function (forecast) {
    _this.forecast = forecast;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ForecastView;
