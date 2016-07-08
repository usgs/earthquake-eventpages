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
        properties,
        responses;

    markup = [];
    properties = _this.model.get('properties');
    responses = properties['num-responses'] || properties.numResp;

    if (responses) {
      for (var i = 0, len = responses.length; i < len; i += 1) {
        markup.push('<div class="responses-digit">' + responses.charAt(i) +
            '</div>');
      }
    } else {
      markup = ['<div class="responses-digit">&ndash;</div>'];
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
