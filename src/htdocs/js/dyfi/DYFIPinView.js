'use strict';


var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: {ID: '', TITLE: 'Module Title'}
};

var DYFIPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Render the histograms as DYFIPinView content
   */
  _this.renderPinContent = function () {
    _this.content.innerHTML = 'DYFIPinView content';
  };


  options = null;
  return _this;
};

module.exports = DYFIPinView;
