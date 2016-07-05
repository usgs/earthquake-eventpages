'use strict';


var BasicPinView = require('core/BasicPinView'),
    DYFIFormModule = require('dyfi/DYFIFormModule'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: DYFIFormModule
};


var DYFIFormPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Render the histograms as DYFIFormPinView content
   *
   */
  _this.renderPinContent = function () {
    _this.content.innerHTML = 'DYFIFormPinView content';
  };


  options = null;
  return _this;
};

module.exports = DYFIFormPinView;
