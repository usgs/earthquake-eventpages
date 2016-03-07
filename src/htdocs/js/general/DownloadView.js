'use strict';

var Formatter = require('core/Formatter'),
    ProductView = require('core/ProductView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _DEFAULTS = {

};


var DownloadView = function (options) {
  var _this,
      _initialize,

      _formatter,
      _listEl,

      _createViewSkeleton,
      _fetchData,
      _onData,
      _parse,
      _parseFile,
      _renderFile,
      _renderFiles,
      _renderFormat,
      _renderNoData;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
    _createViewSkeleton();
  };


  _createViewSkeleton = function () {
    _this.el.innerHTML = [
      '<h4 class="type">',
        _this.model.get('type'),
        '<small>(', _this.model.get('code'), ')</small>',
      '</h4>',
      '<small class="attribution">',
        'Contributed by ', _this.model.get('source'), // TODO :: Use generalized attribution
      '</small>',
      '<ul class="download-files"></ul>'
    ].join('');

    _listEl = _this.el.querySelector('.download-files');
  };

  /**
   * Asynchronous method to fetch data from `_this.model` {Content} object.
   * If the current {Content} model uses byte content, these bytes are read
   * directly off the `this._model`, otherwise, the URL is used to make an AJAX
   * call for the data. Either way, the result is passed to the `callback`
   * asynchronously. If data is unavailable or an error occurs, the `callback`
   * is invoked with `null`.
   *
   * @param callback {Function}
   *     A callback method to invoke. If data if fetched successfully, the
   *     data is passed to the callback, if any error occurs, the callback
   *     is invoked with `null`.
   */
  _fetchData = function (callback) {
    var content,
        data;

    // try plain old content bytes first
    content = this._model.getContent('contents.xml');
    if (content) {
      data = content.get('bytes');
      if (data !== null) {
        // force async
        setTimeout(function () { callback(data); }, 0);
      } else {
        Xhr.ajax({
          url: _this.model.get('url'),
          success: function (response) {
            callback(response);
          },
          error: function () {
            callback(null);
          }
        });
      }
    } else {
      // No contents.xml
      callback(null);
    }
  };

  _onData = function (data) {
    if (!data) {
      _renderNoData();
    } else {
      _renderFiles(_parse(data));
    }
  };

  _parse = function (data) {
    return Array.prototype.map.apply(
        data.querySelectorAll('contents > file'), _parseFile);
  };

  _parseFile = function (file) {
    var caption,
        content,
        el,
        els,
        errors,
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
    caption = file.getQuerySelector('caption');
    caption = (caption ? caption.textContent : null);
    formats = [];
    errors = [];

    els = file.querySelectorAll('format');
    for (i = 0, len = els.length; i < len; i++) {
      el = els[i];
      href = el.getAttribute('href');
      type = el.getAttribute('type');
      content = _this.model.getContent(href);
      if (content) {
        formats.push({
          href: href,
          type: type,
          url: content.url,
          length: content.length
        });
      } else {
        errors.push({
          href: href,
          type: type
        });
      }
    }

    return {
      id: id,
      title: title,
      caption: caption,
      formats: formats,
      errors: errors
    };
  };

  _renderFile = function (file) {
    var formats;

    formats = [];
    file.formats.forEach(function (format) {
      formats.push(_renderFormat(format));
    });

    return [
      '<dd class="file">',
        '<span class="title">', file.title ,'</span>',
        '<span class="caption">', file.caption, '</span>',
        '<ul class="formats">',
          formats.join(''),
        '</ul>',
      '</dd>'
    ].join('');
  };

  _renderFiles = function (files) {
    var markup;

    markup = [];

    files.forEach(function (file) {
      markup.push(_renderFile(file));
    });

    _listEl.innerHTML = markup.join('');
  };

  _renderFormat = function (format) {
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

  _renderNoData = function () {
    _this.el.innerHTML = 'No download content available.';
  };


  _this.render = function () {
    _fetchData(_onData);
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = DownloadView;
