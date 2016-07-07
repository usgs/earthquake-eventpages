'use strict';


var BasicPinView = require('core/BasicPinView'),
    ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: ImpactSummaryModule
};


var ImpactPinView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  _initialize = function (/*options*/) {

  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ImpactPinView;
