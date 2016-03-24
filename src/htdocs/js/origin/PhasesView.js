'use strict';


var QuakemlView = require('origin/QuakemlView'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var PhasesView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = QuakemlView(options);

  _initialize = function (/*options*/) {

  };

  /**
   * Renders the quakeml.
   *
   */
  _this.renderQuakeml = function () {
    // TODO
  };

  _initialize(options);
  options = null;
  return _this;
};


module.exports = PhasesView;
