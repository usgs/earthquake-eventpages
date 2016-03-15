'use strict';

var ProductView = require('core/ProductView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


/**
 * View for losspager product.
 *
 * @param options {object}
 *    all options are passed to ProductView.
 */
var PAGERView = function (options) {
  var _this,
      _initialize,

      _errorMessage;

  _this = ProductView(options);


  _initialize = function () {
    _errorMessage = options.errorMessage;

  };


  /**
   * Destroy all the things.
   */
  _this.destroy = Util.compose(function () {
    _errorMessage = null;
    _this = null;
    _initialize = null;
  }, _this.destroy);

  _this.fetchData = function () {
    var content;

    content = _this.model.getContent('pager.xml');

    if(!content) {
      _this.onError();
      return;
    }

    Xhr.ajax({
      url: content.get('url'),
      success: _this.onSuccess,
      error: _this.onError
    });
  };

  /**
   * This method is called when there is a problem.
   *
   * @param errorMessage {String}
   *    A description of the error that occurred.
   */
  _this.onError = function () {
    _this.el.innerHTML = _errorMessage;
  };

  /**
   * This method is called when Xhr is successful and calles all methods
   * that render pager content.
   */
  _this.onSuccess = function (data) {
    var thumbnail;
    console.log(data);
    thumbnail = _this.model.getContent('exposure.png');

    _this.el.innerHTML = 'Loading content&hellip;';

    _this.el.innerHTML =
      '<div class="alert-wrapper row"></div>' +
      '<div class="row pager-content">' +
        '<div class="column one-of-two">' +
          '<h3>Estimated Population Exposure to Earthquake Shaking</h3>' +
          '<div class="map-wrapper">' +
            (thumbnail ?
                '<figure>' +
                  '<img src="' + thumbnail.url +
                      '" alt="Population Exposure Map"/>' +
                  '<figcaption>' +
                    'Population per ~1 sq. km. from LandScan' +
                  '</figcaption>' +
                '</figure>'
                : '&ndash;') +
          '</div>' +
          '<div class="exposure-wrapper"></div>' +
        '</div>' +
        '<div class="column one-of-two">' +
          '<div class="comment-wrapper"></div>' +
          '<div class="city-wrapper"></div>' +
        '</div>' +
      '</div>';
  };

  /**
   * Called when the model changes. Initially sets a loading message
   *
   *
   */
  _this.render = function () {
    _this.el.innerHTML = 'Loading content&hellip;';
    _this.fetchData();
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = PAGERView;
