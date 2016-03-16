/* global L */
'use strict';


var EsriGrayscale = require('leaflet/layer/EsriGrayscale'),
    EsriTerrain = require('leaflet/layer/EsriTerrain'),
    MousePosition = require('leaflet/control/MousePosition'),
    OpenAerialMap = require('leaflet/layer/OpenAerialMap'),
    OpenStreetMap = require('leaflet/layer/OpenStreetMap'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS = {
  config: {
    baseLayer: 'Terrain',
    overlays: []
  }
};


var InteractiveMapView = function (options) {
  var _this,
      _initialize,

      _baseLayers,
      _defaultConfig,
      _layersControl,
      _map,
      _overlays,
      _positionControl,
      _scaleControl;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (/*options*/) {
    _this.el.classList.add('interactive-map-view');

    _defaultConfig = Util.extend({}, _DEFAULTS.config, _this.model.get('map'));

    _map = L.map(_this.el, {
      attributionControl: false,
      center: [0, 0],
      zoom: 2,
      zoomAnimation: true
    });

    _layersControl = L.control.layers(
      _this.getAvailableBaseLayers(),
      _this.getAvailableOverlays()
    );
    _map.addControl(_layersControl);

    if (!Util.isMobile()) {
      _positionControl = MousePosition();
      _map.addControl(_positionControl);

      _scaleControl = L.control.scale({position: 'bottomleft'});
      _map.addControl(_scaleControl);
    }
  };

  /**
   * Free resources associated with this view and then call default
   * View.destroy.
   *
   */
  _this.destroy = Util.compose(function () {
    if (_positionControl) {
      _positionControl.removeFrom(_map);
    }

    if (_scaleControl) {
      _scaleControl.removeFrom(_map);
    }

    _map.remove(); // destroy map and free resources


    _baseLayers = null;
    _defaultConfig = null;
    _layersControl = null;
    _map = null;
    _overlays = null;
    _positionControl = null;
    _scaleControl = null;


    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getAvailableBaseLayers = function () {
    _baseLayers = {
      'Terrain': EsriTerrain(),
      'Grayscale': EsriGrayscale(),
      'Street': OpenStreetMap(),
      'Satellite': OpenAerialMap()
    };

    return _baseLayers;
  };

  _this.getAvailableOverlays = function () {
    // TODO :: Look at _this.model.event to see which overlays are available.
    //         Returned object is keyed by display name for each layer.
    _overlays = {};

    return _overlays;
  };

  /**
   * Called to notify the view that it's element is now in the DOM so
   * things like dimensions can be inspected etc...
   *
   */
  _this.onDomReady = function () {
    _map.invalidateSize();
  };

  /**
   * Renders the map.
   *
   */
  _this.render = function () {
    var config;

    config = Util.extend({}, _defaultConfig, _this.model.get('map'));
    console.log(config);

    Object.keys(_baseLayers).forEach(function (layerName) {
      var layer;

      layer = _baseLayers[layerName];

      if (layer.map) {
        layer.removeFrom(_map);
      }

      if (layerName === config.baseLayer) {
        layer.addTo(_map);
      }
    });

    Object.keys(_overlays).forEach(function (layerName) {
      var layer;

      layer = _overlays[layerName];

      if (layer.map) {
        layer.removeFrom(_map);
      }

      if (config.overlays.indexOf(layerName) !== -1) {
        layer.addTo(_map);
      }
    });

    console.log('InteractiveMapView::renderComplete');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = InteractiveMapView;
