'use strict';


var BasicPinView = require('core/BasicPinView'),
    PAGERView = require('losspager/PAGERView'),
    Util = require('util/Util');


var PAGERPinView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, options);
  _this = BasicPinView(options);

  _initialize = function () {
    _this.el.classList.add('pager-pin-view');
    _this.pagerView = PAGERView({
      el: document.createElement('div'),
      model: _this.model
    });
  };

  /**
   * Render the histograms as PAGERPinView content
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
