'use strict';


var BasicPinView = require('core/BasicPinView'),
    DYFIFormModule = require('dyfi/DYFIFormModule'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: DYFIFormModule
};


var DYFIFormPinView = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.destroy = Util.compose(function () {
    _formatter = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Render the histograms as DYFIFormPinView content
   *
   */
  _this.renderPinContent = function () {
    var properties,
        responses;

    properties = _this.model.get('properties');
    responses = properties['num-responses'] || properties.numResp;

    _this.content.innerHTML =
      '<div class="pin-badge dyfi-responses-badge" ' +
          'title="Number of DYFI Responses">' +
        '<strong>' + _formatter.number(responses, 0, '&ndash;') + '</strong>' +
        '<br>' +
        '<abbr>Responses</abbr>' +
      '</div>';
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = DYFIFormPinView;
