'use strict';

var ProductView = require('core/ProductView');


var TextProductView = function (options) {
  var _this;

  _this = ProductView(options);

  _this.render = function () {
    var bytes,
        content,
        contents;

    content = _this.model.getContent('');

    if (content) {
      contents = [];
      contents = _this.model.get('contents').data();
      bytes = content.get('bytes');

      _this.el.className = _this.model.get('type');
      _this.el.innerHTML = _this.replaceRelativePaths(bytes, contents);
    }
  };

  /**
   * Replace relative paths in text products with fully qualified URLs
   * based on the URLs found in the product's content collection
   *
   * @param bytes {string}
   *    byte data from the text product contents
   *
   * @param contents {array}
   *    array of content objects to check for relative paths that exist
   *    in the bytes data
   */
  _this.replaceRelativePaths = function (bytes, contents) {
    var content;

    for (var i = 0; i < contents.length; i++) {
      content = contents[i].get();
      if (content.id !== '') {
        bytes = bytes.replace(new RegExp('"' + content.id + '"', 'g'),
            '"' + content.url + '"');
      }
    }

    return bytes;
  };

  options = null;
  return _this;
};

module.exports = TextProductView;