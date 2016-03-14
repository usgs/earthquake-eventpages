'use strict';

var TextProductView = require('core/TextProductView'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var FiniteFaultView = function (options) {
  var _this;


  options = Util.extend({contentPath: options.model ?
      (options.model.getProperty('eventsourcecode') + '.html') : ''},
    _DEFAULTS, options
  );
  _this = TextProductView(options);

  options = null;
  return _this;
};


module.exports = FiniteFaultView;
