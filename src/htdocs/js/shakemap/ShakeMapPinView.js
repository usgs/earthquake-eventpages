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
    var img,
        markup;

    img = _this.model.getContent('pin-thumbnail.png');
    if (!img) {
      img = _this.model.getContent('download/tvmap.jpg');
    }

    if (img) {
      markup = '<div class="shakemap-tvmap">' +
          '<img src="' + img.get('url') + '" alt="Intensity Map"/>' +
          '</div>';
    } else {
      markup = '<p class="alert warning">Map not available</p>';
    }

    _this.content.innerHTML = markup;
  };

  /**
   * Render header for ShakeMapPinView with impact bubble
   *
   */
  _this.renderPinHeader = Util.compose(_this.renderPinHeader, function () {
    _this.header.insertAdjacentHTML('beforeend',
        _formatter.intensity(_this.model.getProperty('maxmmi'), null));
  });

  _initialize(options);
  options = null;
  return _this;
};


module.exports = ShakeMapPinView;
