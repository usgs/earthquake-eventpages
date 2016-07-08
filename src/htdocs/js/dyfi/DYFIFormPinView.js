'use strict';


var BasicPinView = require('core/BasicPinView'),
    DYFIFormModule = require('dyfi/DYFIFormModule'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: DYFIFormModule
};


var DYFIFormPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Render the histograms as DYFIFormPinView content
   *
   */
  _this.renderPinContent = function () {
    var markup,
        pad,
        responses,
        stillZero,
        value;

    markup = [];
    pad = '000000';
    responses = _this.model.getProperty('num-responses') ||
        _this.model.getProperty('numResp') || '0';
    // pad with zeros
    responses = pad.substring(0, pad.length - responses.length) + responses;
    stillZero = true;

    for (var i = 0, len = responses.length; i < len; i += 1) {
      value = responses.charAt(i);

      if (value === '0' && stillZero) {
        markup.push('<div class="responses-digit empty-digit">0</div>');
      } else {
        stillZero = false;
        markup.push('<div class="responses-digit">', value, '</div>');
      }
    }

    _this.content.innerHTML =
      '<div class="dyfi-responses-badge" title="Number of DYFI Responses">' +
        markup.join('') +
      '</div>' +
      '<div class="dyfi-responses-abbr">' +
        '<abbr title="Number of DYFI Responses">Responses</abbr>' +
      '</div>' +
      '<small class="disclaimer">' +
        'Contribute to citizen science. Please <a href="#tellus">tell us</a> ' +
        'about your experience.' +
      '</small>';
  };


  options = null;
  return _this;
};

module.exports = DYFIFormPinView;
