'use strict';

var ProductView = require('core/ProductView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var NearbyPlacesView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = options || {};
  _this = ProductView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  /**
   * Gets the data
   */
  _this.fetchData = function () {
    Xhr.ajax({
      url: _this.model.get('url'),
      success: _this.onSuccess,
      error: _this.onError
    });
  };

  /**
   *
   * @param status {String}
   *      A description of the error that occurred.
   * @param xhr {XMLHttpRequest} Optional. Default undefined.
   *      The original request that lead to the error.
   */
  _this.onError = function (status/*, xhr*/) {
    _this.el.innerHTML = status;
  };

  _this.onSuccess = function (data) {
    var i,
        len,
        markup;

    len = data.length;
    markup = [];

    _this.el.className = 'nearby-places';
    markup.push('<h3>Nearby Places</h3>');
    // Formats nearby places
    for (i = 0; i < len; i++) {
      markup.push('<li>' +
          data[i].distance + ' km ' +
          '(' + Math.round(_formatter.kmToMi(data[i].distance)) + ' mi) ' +
          data[i].direction +
          ' of ' + data[i].name +
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
    _formatter = null;
    _this = null;
    _initialize = null;
  }, _this.destroy);

  _initialize(options);
  options = null;
  return _this;
};

module.exports = NearbyPlacesView;
