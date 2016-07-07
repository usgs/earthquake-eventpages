'use strict';


var FocalMechanismModule = require('focal-mechanism/FocalMechanismModule'),
    MomentTensorPinView = require('moment-tensor/MomentTensorPinView'),
    Util = require('util/Util');


var _DEFAULTS = {
  className: 'focal-mechanism-pin-beachball',
  fillColor: '#ffaa69',
  module: FocalMechanismModule
};


/**
 * This view is used for rendering a focal mechanism pin. Currently it
 * does the same thing as the {MomentTensorPinView} (i.e. a beachball), but
 * uses a different color and className by default.
 *
 * @see {moment-tensor/MomentTensorPinView}
 */
var FocalMechanismPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = MomentTensorPinView(options);


  options = null;
  return _this;
};


module.exports = FocalMechanismPinView;
