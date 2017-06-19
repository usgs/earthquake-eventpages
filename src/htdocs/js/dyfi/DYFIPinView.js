'use strict';


var BasicPinView = require('core/BasicPinView'),
    DYFIModule = require('dyfi/DYFIModule'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: DYFIModule
};

var DYFIPinView = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  /**
   * Render the content section of the pin. This loads a DYFI image
   *
   */
  _this.renderPinContent = function () {
    var code,
        img;

    code = _this.model.get('code');
    img = _this.model.getContent('pin-thumbnail.png');
    if (!img) {
      img = _this.model.getContent(code + '_ciim_geo.jpg');
    }

    if (img) {
      _this.content.innerHTML = '<img src="' + img.get('url') +
          '" class="dyfi-intensity-map" alt="DYFI Intensity Map"/>';
    } else {
      _this.content.innerHTML = '<p class="alert warning">Could not load ' +
          'DYFI intensity map</p>';
    }
  };

  /**
   * Render header for DYFIPinView with impact bubble
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

module.exports = DYFIPinView;
