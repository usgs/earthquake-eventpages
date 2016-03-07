'use strict';

var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var DownloadView = function (options) {
  var _this,
      _initialize,

      _formatter,
      _product;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ContentView(options);

  _initialize = function (options) {
    _product = options.product;

    _this.el.classList.add('download-view');
    _formatter = options.formatter || Formatter();
  };


  _this.onError = function (/*status, xhr*/) {
    _this.el.innerHTML = 'No download content available.';
  };

  _this.onSuccess = function (responseText, xhr) {
    try {
      _this.el.innerHTML = '<ul class="no-style">' +
        _this.parse(xhr.responseXML).map(_this.renderFile).join('') +
      '</ul>';
    } catch (e) {
      _this.onError('Failed to render content.');
    }
  };

  _this.parse = function (data) {
    return Array.prototype.map.call(
        data.querySelectorAll('contents > file'), _this.parseFile);
  };

  _this.parseFile = function (file) {
    var caption,
        content,
        el,
        els,
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
        content = _product.getContent(href);

        formats.push({
          href: href,
          type: type,
          url: content.get('url'),
          length: content.get('length')
        });
      } catch (e) {
        if (console && console.log) {
          console.log(e.stack);
        }
      }
    }

    return {
      id: id,
      title: title,
      caption: caption,
      formats: formats
    };
  };

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

module.exports = DownloadView;
