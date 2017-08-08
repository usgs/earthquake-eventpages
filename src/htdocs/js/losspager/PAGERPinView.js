'use strict';


var BasicPinView = require('core/BasicPinView'),
    Formatter = require('core/Formatter'),
    PAGERModule = require('losspager/PAGERModule'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: PAGERModule
};


var PAGERPinView = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  /**
   * Render the histograms as PAGERPinView content
   *
   */
  _this.renderPinContent = function () {
    var alertlevel,
        economic,
        fatality,
        markup;

    markup = [];
    alertlevel = _this.model.getProperty('alertlevel');
    economic = _this.model.getContent('alertecon_smaller.png');
    fatality = _this.model.getContent('alertfatal_smaller.png');

    if (alertlevel !== 'pending') {
      if (economic) {
        markup.push('<span>Estimated Economic Losses</span>' +
            '<img src="' + economic.get('url') + '" />');
      }

      if (fatality) {
        markup.push('<span>Estimated Fatalities</span>' +
            '<img src="' + fatality.get('url') + '" />');
      }
    } else {
      markup.push('<p class="info alert">',
        'Alert information for this event is currently under review and ',
        'will be available soon. Thank you for your patience.',
      '</p>');
    }

    _this.content.innerHTML = markup.join('');
  };

  /**
   * Render header for PAGERPinView with impact bubble
   *
   */
  _this.renderPinHeader = Util.compose(_this.renderPinHeader, function () {
    var alertlevel;

    alertlevel = _this.model.getProperty('alertlevel');
    if (alertlevel) {
      _this.header.insertAdjacentHTML('beforeend',
        '<span class="pager-bubble bubble-border pager-alertlevel-' +
            alertlevel + '">' +
          '<strong class="roman">' +
            alertlevel.toUpperCase() +
          '</strong>' +
        '</span>'
      );
    }
  });


  _initialize(options);
  options = null;
  return _this;
};

module.exports = PAGERPinView;
