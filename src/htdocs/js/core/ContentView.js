'use strict';

var Util = require('util/Util'),
    View = require('mvc/View'),
    Xhr = require('util/Xhr');


/**
 * View for a specific Content.
 *
 * @param options {Object}
 *     all options are passed to mvc/View.
 */
var ContentView = function (options) {
  var _this,

      _xhr;

  _this = View(options);

  _this.destroy = Util.compose(function () {
    if (_xhr) {
      _xhr.abort();
      _xhr = null;
    }
    _this = null;
  }, _this.destroy);

  /**
   * Asynchronous method to fetch the data associated with _this.model {Content}
   * object. This method proceeds asynchronously regardless of whether
   * _this.model users `bytes` or `url` data. On success the _this.onSuccess
   * callback is invoked, on error, the _this.onError callback is invoked.
   *
   */
  _this.fetchData = function () {
    var data;

    data = _this.model.get('bytes');
    if (data !== null) {
      // force async
      setTimeout(function () {
        if (!_this) {
          // view was destroyed before next tick
          // simluate async abort
          return;
        }
        _this.onSuccess(data, null);
      }, 0);
    } else {
      _xhr = Xhr.ajax({
        url: _this.model.get('url'),
        success: _this.onSuccess,
        error: _this.onError,
        done: function () {
          _xhr = null;
        }
      });
    }
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

  /**
   * @APIMethod
   *
   * This method is called when data is successfully fetched from _this.model
   * {Content} object. It should complete the render of the fetched data
   * into _this.el container.
   *
   * @param data {String|JSON}
   *     The data for _this.model {Content} object.
   * @param xhr {XMLHttpRequest} Optional.
   *     The XMLHttpRequest object used to fetch the data. If _this.model
   *     uses `bytes` data, this parameter is `null`.
   */
  _this.onSuccess = function (data/*, xhr*/) {
    _this.el.innerHTML = data;
  };

  /**
   * Called when the model changes. Initially sets a loading message then starts
   * the data fetch process to render the actual content. Relies on browser
   * caches to avoid duplicate HTTP overhead.
   *
   */
  _this.render = function () {
    _this.el.innerHTML = '<p>Loading content&hellip;</p>';
    _this.fetchData();
  };


  options = null;
  return _this;
};


module.exports = ContentView;
