'use strict';


var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');


var PAGERPinView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, options);
  _this = BasicPinView(options);

  _initialize = function () {

  };

  /**
   * Render the PAGERPinView contents
   */
  _this.renderPinContent = function () {
    _this.content.innerHTML = 'PAGERPinView';
  };

  _initialize();
  options = null;
  return _this;
};


module.exports = PAGERPinView;
