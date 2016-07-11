/* global L */
'use strict';


var BasicPinView = require('core/BasicPinView'),
    HistoricSeismicity = require('leaflet/layer/HistoricSeismicity'),
    Terrain = require('leaflet/layer/Terrain'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: {ID: 'region-info', TITLE: 'Regional Information'}
};


var RegionalInfoPinView = function (options) {
  var _this,
      _initialize,

      _mapEl,
      _mapView;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Initialize the new module.
   *
   * @param options {Object}
   */
  _initialize = function (/*options*/) {
    _mapEl = document.createElement('div');
    _mapEl.classList.add('regional-info-map');
    _this.content.appendChild(_mapEl);
  };

  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    if (_this.map) {
      _this.map.remove();
    }

    _mapEl = null;
    _mapView = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Render map information for the event.
   *
   */
  _this.renderPinContent = function () {
    var latitude,
        longitude;

    if (_mapView) {
      _mapView.remove();
      _mapView = null;
    }

    latitude = _this.model.getProperty('latitude');
    longitude = _this.model.getProperty('longitude');

    if (latitude === null || longitude === null) {
      return;
    }

    _mapView = L.map(_mapEl, {
      attributionControl: false,
      boxZoom: false,
      center: [latitude, longitude],
      zoom: 1,
      doubleClickZoom: false,
      dragging: false,
      fadeAnimation: false,
      keyboard: false,
      markerZoomAnimation: false,
      layers: [
        Terrain({provider: Terrain.NATGEO}),
        HistoricSeismicity(),
        // TODO :: Population density layer ... need tile layer in GIS first
        L.marker([latitude, longitude], {
          zIndexOffset: 99,
          icon: L.icon({
            iconUrl: 'images/star.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          })
        })
      ],
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
      zoomAnimation: false,
      zoomControl: false
    });
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = RegionalInfoPinView;
