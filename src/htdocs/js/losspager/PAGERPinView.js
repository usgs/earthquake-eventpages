'use strict';


var BasicPinView = require('core/BasicPinView'),
    PAGERModule = require('losspager/PAGERModule'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: PAGERModule
};


var PAGERPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);


  /**
   * Render the histograms as PAGERPinView content
   *
   */
  _this.renderPinContent = function () {
    var economic,
        fatality,
        markup;

    markup = [];
    economic = _this.model.getContent('alertecon_smaller.png');
    fatality = _this.model.getContent('alertfatal_smaller.png');

    if (economic) {
      markup.push('<span>Estimated Economic Losses</span>' +
          '<img src="' + economic.get('url') + '" />');
    }

    if (fatality) {
      markup.push('<span>Estimated Fatalities</span>' +
          '<img src="' + fatality.get('url') + '" />');
    }

    _this.content.innerHTML = markup.join('');
  };


  options = null;
  return _this;
};

module.exports = PAGERPinView;
