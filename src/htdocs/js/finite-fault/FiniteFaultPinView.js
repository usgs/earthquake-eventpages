'use strict';


var BasicPinView = require('core/BasicPinView'),
    FiniteFaultModule = require('finite-fault/FiniteFaultModule'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: FiniteFaultModule
};

var FiniteFaultPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Render the content section of the pin. This loads the smaller version
   * of the finite-fault basemap.png
   *
   */
  _this.renderPinContent = function () {
    var code,
        img,
        markup;

    try {
      code = _this.model.get('properties').eventsourcecode;
      img = _this.model.getContent('web1/' + code + '_slip2.png');
      markup = '<h3>Cross-section of slip distribution</h3>' +
          '<img src="' + img.get('url') + '"' +
          ' class="finite-fault-cross-section" ' +
          ' alt="Cross-section of slip distribution"/>';
    } catch (e) {
      markup = '<p class="alert error">Could not load cross-section of ' +
          'slip distribution</p>';
    }

    _this.content.innerHTML = markup;
  };


  options = null;
  return _this;
};


module.exports = FiniteFaultPinView;
