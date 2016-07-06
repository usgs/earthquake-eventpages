'use strict';


var Attribution = require('core/Attribution'),
    BasicPinView = require('core/BasicPinView'),
    InteractiveMapView = require('map/InteractiveMapView'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: {ID: 'map', TITLE: 'Interactive Map'}
};


var MapPinView = function (options) {
  var _this,
      _initialize,

      _mapView;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Initialize the new module.
   *
   * @param options {Object}
   */
  _initialize = function (/*options*/) {
    var el;

    el = document.createElement('div');
    el.classList.add('locationview-map');

    _this.product = _this.model.get('event').getPreferredOriginProduct();

    _this.content.appendChild(el);

    _mapView = InteractiveMapView({
      el: el,
      interactive: false,
      model: _this.model,
      scaleControl: false
    });
  };

  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }
    _mapView.destroy();
    _this = null;
  }, _this.destroy);

  _this.renderPinContent = function () {
    _mapView.onDomReady();
    _mapView.render();
  };

  /**
   * Override base function.
   * This pin doesn't have a contributor.
   */
  _this.renderPinFooter = function () {

    _this.footer.innerHTML = 'Contributed by ' +
        Attribution.getProductAttribution(_this.product);
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = MapPinView;
