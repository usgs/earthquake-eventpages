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

  /**
   * Render the pager level in PAGERPinView header
   */
  _this.renderPinHeader = function () {
    var alertlevel,
        display,
        properties;

    // Use module ID and TITLE to create a link
    display = _this.module.TITLE;
    properties = _this.model.get('properties');
    alertlevel = (properties ? properties.alertlevel : null);

    _this.header.innerHTML = [
      '<a href="', _this.getLinkUrl(), '">', display, '</a>',
      (alertlevel ?
      '<span class="pager-bubble pager-alertlevel-' + alertlevel + '">' +
        '<strong class="roman">' +
          alertlevel.toUpperCase() +
        '</strong>' +
      '</span>' : null)
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = PAGERPinView;
