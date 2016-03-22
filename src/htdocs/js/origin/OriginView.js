'use strict';

var ProductView = require('core/ProductView');

var OriginView = function (options) {

  var _this;

  _this = ProductView(options);

  _this.render = function () {
    _this.el.innerHTML = '<p>TODO :: port HypocenterView to OriginView</p>';
  };

  options = null;
  return _this;
};


module.exports = OriginView;
