/* global L */
'use strict';


var DyfiUtmLayer = require('map/DyfiUtmLayer'),
    EsriGrayscale = require('leaflet/layer/EsriGrayscale'),
    EsriTerrain = require('leaflet/layer/EsriTerrain'),
    Formatter = require('core/Formatter'),
    HazDevLayers = require('leaflet/control/HazDevLayers'),
    MousePosition = require('leaflet/control/MousePosition'),
    OpenAerialMap = require('leaflet/layer/OpenAerialMap'),
    OpenStreetMap = require('leaflet/layer/OpenStreetMap'),
    TectonicPlates = require('leaflet/layer/TectonicPlates'),
    UsFault = require('leaflet/layer/UsFault'),
    Util = require('util/Util'),
    View = require('mvc/View');


// Display names of overlays
var _DYFI_10K_OVERLAY = 'DYFI Responses 10 km',
    _DYFI_1K_OVERLAY = 'DYFI Responses 1 km',
    _DYFI_DEFAULT_OVERLAY = 'DYFI Responses',
    _EPICENTER_OVERLAY = 'Epicenter',
    _FAULTS_OVERLAY = 'U.S. Faults',
    _PLATES_OVERLAY = 'Tectonic Plates';

var _DEFAULTS = {
  config: {
    baseLayer: 'Terrain',
    overlays: [
      _EPICENTER_OVERLAY,
      _PLATES_OVERLAY,
      _FAULTS_OVERLAY
    ]
  }
};


/**
 * Checks if the given latitude/longitude represent a location within the U.S.
 * where the U.S. fault layer has data (so some regions are not considered).
 *
 * @param latitude {Number}
 *     Decimal degrees latitude.
 * @param longitude {Number}
 *     Decimal degrees longitude.
 *
 * @return {Boolean}
 *     True if the location is within the considered U.S., false otherwise.
 */
var __inUs = function (latitude, longitude) {
  // Note :: Only considering U.S. regions that have fault layer data...
  return (
    ( // Contemrinous U.S.
      latitude <= 50.0 && latitude >= 24.6 &&
      longitude <= 65.0 && longitude >= -125.0
    ) ||
    ( // Hawaii
      latitude <= 23.0 && latitude >= 23.0 &&
      longitude <= -154.0 && longitude >= -161.0
    )
  );
};


var InteractiveMapView = function (options) {
  var _this,
      _initialize,

      _baseLayers,
      _defaultConfig,
      _formatter,
      _layersControl,
      _map,
      _overlays,
      _positionControl,
      _scaleControl;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (options) {
    _this.el.classList.add('interactive-map-view');

    _defaultConfig = Util.extend({}, _DEFAULTS.config, _this.model.get('map'));
    _formatter = options.formatter || Formatter();

    _map = L.map(_this.el, {
      attributionControl: false,
      center: [0, 0],
      zoom: 2,
      zoomAnimation: true
    });

    _layersControl = HazDevLayers(
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
   * Creates the appropriate DYFI overlays based on the given product.
   * Adds each overlay to the instance _overlays mapping.
   *
   * @param dyfi {Product}
   *     The DYFI product for which to create overlays. If null, no overlays
   *     are added.
   */
  _this.addDyfiOverlays = function (dyfi) {
    var content;

    if (!dyfi) {
      return;
    }

    // 10k responses aggregation
    content = dyfi.getContent('dyfi_geo_10km.geojson');
    if (content) {
      _overlays[_DYFI_10K_OVERLAY] = DyfiUtmLayer({
        url: content.get('url')
      });
    }

    // 1km responses aggregation
    content = dyfi.getContent('dyfi_geo_1km.geojson');
    if (content) {
      _overlays[_DYFI_1K_OVERLAY] = DyfiUtmLayer({
        url: content.get('url')
      });
    }

    // Fallback responses aggregation
    content = dyfi.getContent('dyfi_geo_1km.geojson');
    if (!_overlays.hasOwnProperty(_DYFI_10K_OVERLAY) &&
        !_overlays.hasOwnProperty(_DYFI_1K_OVERLAY)) {

      content = dyfi.getContent('dyfi_geo.geojson');
      if (content) {
        _overlays[_DYFI_DEFAULT_OVERLAY] = DyfiUtmLayer({
          url: content.get('url')
        });
      }
    }
  };

  /**
   * Creates the appropriate ShakeMap overlays based on the given product.
   * Adds each overlay to the instance _overlays mapping.
   *
   * @param shakemap {Product}
   *     The ShakeMap product for which to create overlays. If null, no overlays
   *     are added.
   */
  _this.addShakeMapOverlays = function (/*shakemap*/) {
    // TODO
  };

  _this.createEpicenterMarker = function (latitude, longitude, magnitude) {
    var marker;

    marker = L.marker([latitude, longitude], {
      zIndexOffset: 99,
      icon: L.icon({
        iconUrl: 'images/star.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    });
    marker.bindPopup([
      'Epicenter M', _formatter.magnitude(magnitude),
      '<br/>',
      _formatter.location(latitude, longitude)
    ].join(''));

    return marker;
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
    _formatter = null; // TODO :: This may have been provided, so don't call destroy?
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
    var catalogEvent,
        eventLatitude,
        eventLongitude;

    // TODO :: Look at _this.model.event to see which overlays are available.
    //         Returned object is keyed by display name for each layer.
    _overlays = {};

    catalogEvent = _this.model.get('event');

    if (!catalogEvent) {
      // No event, no overlays to create
      return _overlays;
    }

    eventLatitude = catalogEvent.getLatitude();
    eventLongitude = catalogEvent.getLongitude();

    // Put a star over the epicenter
    _overlays[_EPICENTER_OVERLAY] = _this.createEpicenterMarker(eventLatitude,
        eventLongitude, catalogEvent.getMagnitude());

    // Always include tectonic plates
    _overlays[_PLATES_OVERLAY] = TectonicPlates();

    // Include faults layer if in U.S.
    if (__inUs(eventLatitude, eventLongitude)) {
      _overlays[_FAULTS_OVERLAY] = UsFault();
    }

    // TODO :: Add support for non-preferred products?

    // DYFI
    _this.addDyfiOverlays(catalogEvent.getPreferredProduct('dyfi'));

    // ShakeMap
    _this.addShakeMapOverlays(catalogEvent.getPreferredProduct('shakemap'));

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
    var catalogEvent,
        config,
        latitude,
        longitude;

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

    // Zoom to a two-degree map centered on event
    catalogEvent = _this.model.get('event');
    if (catalogEvent) {
      latitude = catalogEvent.getLatitude();
      longitude = catalogEvent.getLongitude();
      _map.fitBounds([[latitude + 2.0, longitude + 2.0],
          [latitude - 2.0, longitude - 2.0]]);
    }

    console.log('InteractiveMapView::renderComplete');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = InteractiveMapView;
