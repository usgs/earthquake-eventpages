'use strict';


var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Product = require('pdl/Product');


var _NO_CONTENT_MESSAGE = 'No download content available.';


/**
 * This class extends the {ContentView} class and is specifically used
 * for rendering "contents.xml" for a given product. The `options.model` should
 * be of type {Content}.
 *
 *
 * @param options {Object}
 *     An object containing configuration options for this view.
 *
 * @param options.product {Product}
 *     The product for which to render contents.xml.
 * @param options.formatter {Formatter}
 *     The formatter object to use for formatting intrinsic values.
 */
var DownloadView = function (options) {
  var _this,
      _initialize,

      _formatter,
      _product;

  options = options || {};
  _this = ContentView(options);

  /**
   * @Constructor
   *
   * Initializes the view. See class level documentation for details.
   */
  _initialize = function (options) {
    _product = options.product || Product();

    _this.el.classList.add('download-view');
    _formatter = options.formatter || Formatter();
  };


  /**
   * Renders the default error message. Called if an error occurs during the
   * data fetch.
   *
   */
  _this.onError = function (/*status, xhr*/) {
    _this.el.innerHTML = _NO_CONTENT_MESSAGE;
  };

  /**
   * Renders the list of downloads. Called when data is successfully fetched.
   *
   */
  _this.onSuccess = function (responseText, xhr) {
    try {
      _this.el.innerHTML = '<ul class="no-style">' +
        _this.parse(xhr.responseXML).map(_this.renderFile).join('') +
      '</ul>';
    } catch (e) {
      _this.onError('Failed to render content.');
    }
  };

  /**
   * Parses an XMLDocument `data` into an array of file data structures.
   *
   * @param data {XMLDocument}
   *     The data fetched from the server, in XML format.
   */
  _this.parse = function (data) {
    return Array.prototype.map.call(
        data.querySelectorAll('contents > file'), _this.parseFile);
  };

  /**
   * Parse an XMLElement into a structured data object representing a file.
   *
   * @param file {XMLElement}
   *     The file element to parse.
   *
   * @return {Object}
   *     A file object with the following keys:
   *     - `id` {String}
   *     - `title` {String}
   *     - `caption` {String}
   *     - `formats` {Array}
   */
  _this.parseFile = function (file) {
    var caption,
        content,
        el,
        els,
        format,
        formats,
        href,
        i,
        id,
        len,
        title,
        type;

    if (file.getAttribute('refid')) {
      throw new Error('file element with refid');
    }

    id = file.getAttribute('id');
    title = file.getAttribute('title');
    caption = file.querySelector('caption');
    caption = (caption ? caption.textContent : null);
    formats = [];

    els = file.querySelectorAll('format');
    for (i = 0, len = els.length; i < len; i++) {
      el = els[i];
      href = el.getAttribute('href');
      type = el.getAttribute('type');

      try {
        format = {
          href: href,
          type: type,
          url: null,
          length: 0
        };

        content = _product.getContent(href);

        format.url = content.get('url');
        format.length = content.get('length');
      } catch (e) {
        if (console && console.log) {
          console.log(e.stack);
        }
      } finally {
        formats.push(format);
      }
    }

    return {
      id: id,
      title: title,
      caption: caption,
      formats: formats
    };
  };

  /**
   * Creates markup representing the give file object.
   *
   * @param file {Object}
   *     The file object to render.
   *
   * @return {String}
   *     The markup representing the given file object.
   */
  _this.renderFile = function (file) {
    return [
      '<li class="download-file">',
        '<span class="download-title">', file.title ,'</span>',
        '<span class="download-caption">', file.caption, '</span>',
        '<ul class="download-formats">',
          file.formats.map(_this.renderFormat).join(''),
        '</ul>',
      '</li>'
    ].join('');
  };

  /**
   * Creates markup representing the give format object.
   *
   * @param format {Object}
   *     The format object to render.
   *
   * @return {String}
   *     The markup representing the given format object.
   */
  _this.renderFormat = function (format) {
    var extension,
        size;

    extension = format.href.split('.').slice(-1).join('').toUpperCase();
    size = _formatter.fileSize(format.length);

    return [
      '<li class="format">',
        '<a href="', format.url, '" ',
            'title="', extension, ' (', format.href, ')">',
          extension, ' (', size, ')',
        '</a>',
      '</li>'
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


DownloadView.NO_CONTENT_MESSAGE = _NO_CONTENT_MESSAGE;

module.exports = DownloadView;
