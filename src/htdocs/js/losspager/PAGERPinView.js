'use strict';


var BasicPinView = require('core/BasicPinView'),
    PAGERModule = require('losspager/PAGERModule'),
    PAGERView = require('losspager/PAGERView'),
    Util = require('util/Util');

var _DEFAULTS = {
  module: PAGERModule
};


var PAGERPinView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function () {
    _this.pagerView = PAGERView({
      model: _this.model
    });
  };

  /**
   * Destroy all the things.
   *
   */
  _this.destroy = Util.compose(function () {
    _this.pagerView.destroy();
  }, _this.destroy);

  /**
   * Render the histograms as PAGERPinView content
   *
   */
  _this.renderPinContent = function () {
    var economic,
        fatality;

    economic = _this.pagerView.renderEconomicHistogram();
    fatality = _this.pagerView.renderFatalityHistogram();

    _this.content.innerHTML = economic.innerHTML + fatality.innerHTML;
  };


  _initialize();
  options = null;
  return _this;
};

module.exports = PAGERPinView;
