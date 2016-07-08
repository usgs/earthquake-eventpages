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
      img = _this.model.getContent(code + '_ciim.jpg');
    }

    if (img) {
      _this.content.innerHTML = '<img src="' + img.get('url') +
          '" class="dyfi-intensity-map" alt="DYFI Intensity Map"/>';
    } else {
      _this.content.innerHTML = '<p class="alert warning">Could not load ' +
          'DYFI intensity map</p>';
    }
  };

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

module.exports = DYFIPinView;
