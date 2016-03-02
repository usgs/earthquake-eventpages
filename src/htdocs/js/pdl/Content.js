'use strict';

var Model = require('mvc/Model'),
    Util = require('util/Util');


var _attr_is_valid = function (attrs, attr) {
  var value;

  if (attrs.hasOwnProperty(attr)) {
    value = attrs[attr];

    if (value !== null && typeof value !== 'undefined') {
      return true;
    }
  }

  return false;
};

var Content = function (options) {
  var _this,
      _initialize;


  _this = Model(Util.extend({
    contentType: 'text/plain',
    id: null,
    lastModified: (new Date()).getTime(),
    length: 0
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

  _this.validate = function () {
    var attrs,
        error;

    attrs = _this.get();

    if (!_attr_is_valid(attrs, 'id')) {
      error = new Error('Product content must have a valid path');
    } else if (!_attr_is_valid(attrs, 'url') &&
        !_attr_is_valid(attrs, 'bytes')) {
      error = new Error('Product content must have either direct upload ' +
          'content or file upload content.');
    }

    if (error) {
      throw error;
    }
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = Content;
