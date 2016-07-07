'use strict';

var BasicPinView = require('core/BasicPinView'),
    ShakeMapModule = require('shakemap/ShakeMapModule'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: ShakeMapModule
};

var ShakeMapPinView = function (options) {
  var _this;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);


  /**
   * Renders content for ShakeMapPinView
   */
  _this.renderPinContent = function () {
    var tvMap;

    tvMap = _this.model.getContent('download/tvmap.jpg') || null;

    if (tvMap !== null) {
      tvMap = '<div class="shakemap-tvmap">' +
          '<img src="' + tvMap.get('url') + '" alt="Intensity Map"/>' +
          '</div>';
    } else {
      tvMap = '<p>Map not available</p>';
    }

    _this.content.innerHTML = tvMap;
  };


  options = null;
  return _this;
};


module.exports = ShakeMapPinView;
