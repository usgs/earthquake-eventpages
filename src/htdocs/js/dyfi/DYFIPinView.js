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
   * Render the content section of the pin. This loads a DYFI image
   *
   */
  _this.renderPinContent = function () {
    var code,
        img;

    code = _this.model.get('code');
    img = _this.model.getContent(code + '_ciim.jpg');

    if (img) {
      _this.content.innerHTML = '<img src="' + img.get('url') +
          '" class="dyfi-intensity-map" alt="DYFI Intensity Map"/>';
    } else {
      _this.content.innerHTML = '<p class="alert warning">Could not load ' +
          'DYFI intensity map</p>';
    }
  };


  options = null;
  return _this;
};

module.exports = DYFIPinView;
