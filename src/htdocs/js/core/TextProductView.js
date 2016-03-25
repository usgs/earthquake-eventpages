'use strict';

var ContentView = require('core/ContentView'),
    ProductView = require('core/ProductView'),
    Util = require('util/Util');


var _DEFAULTS = {
  contentPath: ''
};


var TextProductView = function (options) {
  var _this,
      _initialize,

      _content,
      _contentView;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  /**
   * Constructor
   *
   * Initializes the view. Checks the configured `contentPath` (empty string
   * by default). If it exists, creates a {ContentView} to which future
   * rendering is delegated.
   *
   * @param options {Object}
   *     Confiuguration options for this view. In addition to options specified
   *     in {ProductView}, this may include the following:
   *
   * @param options.contentPath {String} Optional. Default ''.
   *     The path for the content to render for this TextProductView.
   *
   * @see mvc/View
   */
  _initialize = function (options) {
    _this.el.classList.add(_this.model.get('type'));

    _content = _this.model.getContent(options.contentPath);

    if (_content) {
      _contentView = ContentView({
        el: _this.el,
        model: _content
      });

      _contentView.onSuccess = _this.onSuccess;
      _contentView.onError = _this.onError;
    }
  };


  /**
   * Frees resources associated with this view. In particular, if a
   * {ContentView} was created, it is destroyed.
   *
   */
  _this.destroy = Util.compose(function () {
    if (_contentView) {
      _contentView.destroy();
    }

    _content = null;
    _contentView = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Callback method if the content fails to fetch its data. Displays a
   * basic error message.
   *
   */
  _this.onError = function () {
    _this.el.innerHTML =
        '<p class="alert error">No text content to render.</p>';
  };

  /**
   * Callback method when the content successfully fetches its data. Displays
   * the result in `_this.el` but replaces paths to relative resources based
   * on other content in `_this.model`.
   *
   * @param data {String}
   *     The data to render.
   */
  _this.onSuccess = function (data) {
    _this.el.innerHTML = _this.replaceRelativePaths(data,
        _this.model.get('contents').data());
  };

  /**
   * If {Content} was found during initialization, delegates to the created
   * {ContentView}, otherwise displays the stock error message.
   *
   * @see ContentView#render
   * @see TextProductView#onError
   */
  _this.render = function () {
    _this.el.innerHTML = '<p class="alert info">Loading...</p>';
    if (_contentView) {
      _contentView.render();
    } else {
      _this.onError();
    }
  };

  /**
   * Replace relative paths in text products with fully qualified URLs
   * based on the URLs found in the product's content collection
   *
   * @param bytes {String}
   *    byte data from the text product contents
   *
   * @param contents {Array}
   *    array of content objects to check for relative paths that exist
   *    in the bytes data
   */
  _this.replaceRelativePaths = function (bytes, contents) {
    var content,
        i,
        len;

    len = contents.length;

    for (i = 0; i < len; i++) {
      content = contents[i].get();
      if (content.id !== '') {
        bytes = bytes.replace(new RegExp('"' + content.id + '"', 'g'),
            '"' + content.url + '"');
      }
    }

    return bytes;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = TextProductView;
