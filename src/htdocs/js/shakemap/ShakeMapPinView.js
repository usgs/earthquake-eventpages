'use strict';

var BasicPinView = require('core/BasicPinView'),
    Formatter = require('core/Formatter'),
    ShakeMapModule = require('shakemap/ShakeMapModule'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: ShakeMapModule
};

var ShakeMapPinView = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);


  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  /**
   * Frees resources associated with this view.
   *
   */
  _this.destroy = Util.compose(function () {
    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Renders content for ShakeMapPinView
   *
   */
  _this.renderPinContent = function () {
    var tvMap;

    tvMap = _this.model.getContent('pin-thumbnail.png');
    if (!tvMap) {
      tvMap = _this.model.getContent('download/tvmap.jpg');
    }

    if (tvMap) {
      tvMap = '<div class="shakemap-tvmap">' +
          '<img src="' + tvMap.get('url') + '" alt="Intensity Map"/>' +
          '</div>';
    } else {
      tvMap = '<p class="alert warning">Map not available</p>';
    }

    _this.content.innerHTML = tvMap;
  };

  /**
   * Render header for ShakeMapPinView with impact bubble
   *
   */
  _this.renderPinHeader = function () {
    var display,
        maxmmi;

    // Use module ID and TITLE to create a link
    display = _this.module.TITLE;
    maxmmi = _this.model.get('properties').maxmmi;

    _this.header.innerHTML = [
      '<a href="', _this.getLinkUrl(), '">', display, '</a>',
      _formatter.intensity(maxmmi, null)
    ].join('');
  };

  _initialize(options);
  options = null;
  return _this;
};


module.exports = ShakeMapPinView;
