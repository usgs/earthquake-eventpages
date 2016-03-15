'use strict';


var Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS = {

};


var InteractiveMapView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (/*options*/) {

  };

  /**
   * Free resources associated with this view and then call default
   * View.destroy.
   *
   */
  _this.destroy = Util.compose(function () {
    // TODO
  }, _this.destroy);

  /**
   * Called to notify the view that it's element is now in the DOM so
   * things like dimensions can be inspected etc...
   *
   */
  _this.onDomReady = function () {
    // TODO
    _this.render();
  };

  /**
   * Renders the map.
   *
   */
  _this.render = function () {
    _this.el.innerHTML = 'Map View'; // TODO
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = InteractiveMapView;
