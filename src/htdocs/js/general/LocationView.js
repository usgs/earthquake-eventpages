'use strict';

var Attribution = require('core/Attribution'),
    Formatter = require('core/Formatter'),
    InteractiveMapView = require('map/InteractiveMapView'),
    Module = require('core/Module'),
    View = require('mvc/View'),
    Util = require('util/Util');


var _DEFAULTS = {};


/**
 * View to display location information.
 *
 * @param options {Object}
 *     padded to View.
 * @param options.formatter {Formatter}
 *     formatting object.
 *     default `Formatter()`.
 */
var LocationView = function (options) {
  var _this,
      _initialize,

      _attribution,
      _caption,
      _formatter,
      _mapView;


  _this = View(options);

  _initialize = function (options) {
    var el;

    options = Util.extend({}, _DEFAULTS, options);
    _formatter = options.formatter || Formatter();

    el = _this.el;
    el.classList.add('locationview');
    el.innerHTML =
        '<h3>Location</h3>' +
        '<small class="attribution"></small>' +
        '<figure>' +
          '<a href="#map" class="locationview-map">' +
            '<div></div>' +
          '</a>' +
          '<figcaption class="locationview-caption"></figcaption>' +
        '</figure>';

    _attribution = el.querySelector('.attribution');
    _caption = el.querySelector('.locationview-caption');
    _mapView = InteractiveMapView({
      el: el.querySelector('.locationview-map > div'),
      interactive: false,
      model: _this.model,
      module: options.module || Module()
    });
    _mapView.el.addEventListener('click', _this.onClick);
  };


  /**
   * Unbind events and free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }
    _mapView.el.removeEventListener('click', _this.onClick);
    _mapView.destroy();

    _attribution = null;
    _caption = null;
    _formatter = null;
    _mapView = null;
    _this = null;
  }, _this.destroy);

  /**
   * Get attribution for product.
   *
   * @param product {Product}
   *     the product.
   * @return {String}
   *     attribution markup.
   */
  _this.getAttribution = function (product) {
    if (!product) {
      return '';
    }

    return 'Contributed by ' +
        Attribution.getProductAttribution(product) +
        ' last updated ' +
        _formatter.datetime(product.get('updateTime'));
  };

  /**
   * Get location caption for product.
   *
   * @param product {Product}
   *     the product.
   * @return {String}
   *     caption markup.
   */
  _this.getCaption = function (product) {
    var depth,
        latitude,
        longitude;

    if (!product) {
      return '<p class="alert info">No location to display.</p>';
    }

    depth = product.getProperty('depth') || '';
    latitude = product.getProperty('latitude') || null;
    longitude = product.getProperty('longitude') || null;

    if (depth) {
      depth = ' depth=' + _formatter.depth(depth, 'km') +
          ' (' + _formatter.depth(_formatter.kmToMi(depth), 'mi') + ')';
    }

    return _formatter.location(latitude, longitude) + depth +
        '<br/><a href="#map">View interactive map</a>';
  };

  /**
   * Click handler for map.
   */
  _this.onClick = function () {
    window.location = '#map';
  };

  /**
   * Render location view.
   */
  _this.render = function () {
    var el,
        ev,
        product;

    el = _this.el;
    ev = _this.model.get('event');
    if (ev === null) {
      el.classList.add('locationview-empty');
      return;
    }

    el.classList.remove('locationview-empty');
    product = ev.getPreferredOriginProduct();
    _attribution.innerHTML = _this.getAttribution(product);
    _caption.innerHTML = _this.getCaption(product);
    _mapView.render();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = LocationView;
