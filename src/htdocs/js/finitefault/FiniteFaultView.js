'use strict';

var TextProductView = require('core/TextProductView'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var FiniteFaultView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = TextProductView(options);

  _initialize = function (/*options*/) {

  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = FiniteFaultView;
