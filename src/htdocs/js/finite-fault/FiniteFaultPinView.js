'use strict';


var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: {ID: 'finite-fault', TITLE: 'Finite Fault'}
};

var FiniteFaultPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Render the content section of the pin. Implementing sub-classes will
   * likely want to override this method.
   *
   */
  _this.renderPinContent = function () {
    _this.content.innerHTML = 'Finite Fault Content';
  };


  options = null;
  return _this;
};


module.exports = FiniteFaultPinView;
