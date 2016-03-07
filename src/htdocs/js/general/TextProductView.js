'use strict';

var ProductView = require('core/ProductView');


var TextProductView = function (options) {
  var _this;

  _this = ProductView(options);

  _this.render = function () {
    var content;
    content = _this.model.getContent('');
    if (content) {
      _this.el.className = _this.model.get('type');
      _this.el.innerHTML = content.get('bytes');
    }
  };

  options = null;
  return _this;
};

module.exports = TextProductView;