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
    var map;

    map = _this.model.getContent('basemap.png');

    _this.content.innerHTML = '<img src="' + map.get('url') +
        '" class="finite-fault-basemap" alt="Finite Fault basemap"/>';
  };


  options = null;
  return _this;
};


module.exports = FiniteFaultPinView;
