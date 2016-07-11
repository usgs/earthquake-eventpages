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
      _mapView,
      _marker;

  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Initialize the new module.
   *
   * @param options {Object}
   */
  _initialize = function (/*options*/) {
    var latitude,
        longitude;

    _mapEl = document.createElement('div');
    _mapEl.classList.add('regional-info-map');
    _this.content.appendChild(_mapEl);

    latitude = parseFloat(_this.model.getProperty('latitude'));
    longitude = parseFloat(_this.model.getProperty('longitude'));

    if (isNaN(latitude) || isNaN(longitude)) {
      return;
    }

    _marker = L.marker([latitude, longitude], {
        zIndexOffset: 99,
        icon: L.icon({
          iconUrl: 'images/star.png',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      });

    _mapView = L.map(_mapEl, {
      attributionControl: false,
      boxZoom: false,
      center: [0, 0],
      zoom: 0,
      doubleClickZoom: false,
      dragging: false,
      fadeAnimation: false,
      keyboard: false,
      markerZoomAnimation: false,
      layers: [
        Terrain({provider: Terrain.NATGEO}),
        HistoricSeismicity(),
        // TODO :: Population density layer ... need tile layer in GIS first
        _marker
      ],
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
      zoomAnimation: false,
      zoomControl: false
    });
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
      latitude = parseFloat(_this.model.getProperty('latitude'));
      longitude = parseFloat(_this.model.getProperty('longitude'));

      _mapView.invalidateSize();
      // give a 2 degree buffer around center point
      _mapView.fitBounds([
          [latitude - 2.0, longitude - 2.0],
          [latitude + 2.0, longitude + 2.0]
      ]);
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = RegionalInfoPinView;
