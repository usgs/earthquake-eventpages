'use strict';

var Model = require('mvc/Model'),
    Util = require('util/Util');


/**
 * Check if attribute is valid.
 *
 * @param attrs {Object}
 *     object with keys/values.
 * @param attr {String}
 *     attribute name.
 * @return
 *     true, when `attrs` hsa a property named `attr`
 *     with a value that is not undefined; false, otherwise.
 */
var __attrIsValid = function (attrs, attr) {
  var value;

  if (attrs.hasOwnProperty(attr)) {
    value = attrs[attr];

    if (value !== null && typeof value !== 'undefined') {
      return true;
    }
  }

  return false;
};

/**
 * Product content.
 *
 * @param options {Object}
 * @param options.bytes {String}
 *     content as a string.
 *     Content should have `url` or `bytes`, but not both.
 * @param options.contentType {String}
 *     mime type, default 'text/plain'.
 * @param options.id {String}
 *     unique identifier, default null.
 * @param options.lastModified {Number}
 *     millisecond epoch time stamp, default new Date().getTime().
 * @param options.length {String}
 *     reported length of content.
 * @param options.url {String}
 *     url where content is available.
 *     Content should have `url` or `bytes`, but not both.
 */
var Content = function (options) {
  var _this,
      _initialize;


  _this = Model(Util.extend({
    bytes: null,
    contentType: 'text/plain',
    id: null,
    lastModified: (new Date()).getTime(),
    length: 0,
    url: null
  }, options));

  _initialize = function (/*options*/) {
    var bytes = _this.get('bytes'),
        url = _this.get('url');

    if (bytes === null && url === null) {
      throw new Error('Invalid product contents. Must have one of bytes or ' +
          'url.');
    }

    if (bytes !== null && bytes.length !== _this.get('length')) {
      console.log('Invalid product contents. Actual length and claimed ' +
          'length differ.');
    }
  };

  /**
   * Override set method to ensure only one of `url` or `bytes` is set.
   *
   * @param attributes {Object}
   *     attributes to set.
   */
  _this.set = Util.compose(function (attributes) {
    var hasBytes,
        hasUrl;

    hasBytes = attributes.hasOwnProperty('bytes');
    hasUrl = attributes.hasOwnProperty('url');

    // Content has either bytes, or url, but not both. If one is set,
    // clear the other...
    if (hasUrl && attributes.url !== null) {
      attributes.bytes = null;
    } else if (hasBytes && attributes.bytes !== null) {
      attributes.url = null;
    }

    return attributes;
  }, _this.set);

  /**
   * Validate content attributes.
   *
   * Checks that content has an `id` and one of `url` or `bytes` attributes.
   *
   * @throws {Error}
   *     when content is invalid
   */
  _this.validate = function () {
    var attrs;

    attrs = _this.get();

    if (!__attrIsValid(attrs, 'id')) {
      throw new Error('Product content must have a valid id');
    } else if (!__attrIsValid(attrs, 'url') && !__attrIsValid(attrs, 'bytes')) {
      throw new Error('Product content must have content');
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = Content;
