/* global L */
'use strict';


var ContoursLayer = require('map/ContoursLayer'),
    DyfiUtmLayer = require('map/DyfiUtmLayer'),
    Grayscale = require('leaflet/layer/Grayscale'),
    Terrain = require('leaflet/layer/Terrain'),
    Formatter = require('core/Formatter'),
    HazDevLayers = require('leaflet/control/HazDevLayers'),
    HistoricSeismicity = require('leaflet/layer/HistoricSeismicity'),
    Legend = require('leaflet/control/Legend'),
    Module = require('core/Module'),
    MousePosition = require('leaflet/control/MousePosition'),
    Satellite = require('leaflet/layer/Satellite'),
    Street = require('leaflet/layer/Street'),
    Product = require('pdl/Product'),
    ShakeMapStationLayer = require('map/ShakeMapStationLayer'),
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
    _HIST_SEIS_OVERLAY = 'Historical Seismicity',
    _PLATES_OVERLAY = 'Tectonic Plates',
    _POPULATION_OVERLAY = 'Population Density',
    _SHAKEMAP_CONTOURS = 'ShakeMap MMI Contours',
    _SHAKEMAP_STATIONS = 'ShakeMap Stations';

var _DEFAULTS = {
  config: {
    baseLayer: 'Terrain'
  },
  interactive: true,
  markerSize: 32
};

// Set up what we want enabled by default
_DEFAULTS.config[_EPICENTER_OVERLAY] = 'true';
_DEFAULTS.config[_PLATES_OVERLAY] = 'true';
_DEFAULTS.config[_FAULTS_OVERLAY] = 'true';
_DEFAULTS.config[_SHAKEMAP_CONTOURS] = 'true';


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


/**
 * This class is a view that renders an interactive map in a container. It
 * expects a model that is an instance of the EventPageModel (currently an
 * just a generalized {Model} instance with "event" and "config" properties).
 *
 * @param options {Object}
 *     See _initialize method documentation for details.
 */
var InteractiveMapView = function (options) {
  var _this,
      _initialize,

      _baseLayers,
      _defaultConfig,
      _formatter,
      _interactive,
      _layersControl,
      _map,
      _markerSize,
      _module,
      _overlays,
      _positionControl,
      _scaleControl;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  /**
   * Constructor. Initializes a new InteractiveMapView.
   *
   * @param options {Object}
   *     Configuration options. Specifically...
   * @param options.model {Model}
   *     The EventPageModel for this view to render.
   * @param options.formatter {Formatter}
   *     The formatting utility class to use when rendering.
   * @param options.scaleControl {boolean}
   *    The scale
   */
  _initialize = function (options) {
    _this.el.classList.add('interactive-map-view');

    _defaultConfig = Util.extend({}, _DEFAULTS.config);
    _module = options.module || Module();

    _formatter = options.formatter || Formatter();
    _interactive = options.interactive;
    _markerSize = options.markerSize;

    _baseLayers = {};
    _overlays = {};

    _map = L.map(_this.el, {
      attributionControl: false,
      boxZoom: _interactive,
      center: [0, 0],
      doubleClickZoom: _interactive,
      dragging: _interactive,
      scrollWheelZoom: _interactive,
      tap: _interactive,
      touchZoom: _interactive,
      zoom: 0,
      zoomAnimation: true,
      zoomControl: _interactive
    });

    // Create the control here, the "getAvailable*" methods determine what
    // is included in this control...
    _layersControl = HazDevLayers(
      _this.getAvailableBaseLayers(),
      {}
    );
    if (_interactive) {
      _map.addControl(_layersControl);
    }

    // Add legend control to map
    if (options.legendControl !== false) {
      _this.legend = Legend();
      _map.addControl(_this.legend);
    }

    if (!Util.isMobile()) {
      if (_interactive) {
        _positionControl = MousePosition();
        _map.addControl(_positionControl);
      }

      if (options.scaleControl !== false) {
        _scaleControl = L.control.scale({position: 'bottomleft'});
        _map.addControl(_scaleControl);
      }
    }
  };

  /**
   * Creates the appropriate DYFI overlays based on the given product.
   * Adds each overlay to the instance _overlays mapping.
   *
   * @param dyfi {Product}
   *     The DYFI product for which to create overlays. If null, no overlays
   *     are added.
   *
   * @return {Object}
   *     The _overlays instance variable, as augmented with new layers.
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
        url: content.get('url'),
        legends: [
            '<img class="legend-intensity-scale" ' +
                'src="images/legends/legend-intensity-scale.png" />',
            '<img class="legend-geocoded-area" ' +
                'src="images/legends/legend-geocoded-area.png" />'
          ]
      });
    }

    // 1km responses aggregation
    content = dyfi.getContent('dyfi_geo_1km.geojson');
    if (content) {
      _overlays[_DYFI_1K_OVERLAY] = DyfiUtmLayer({
        url: content.get('url'),
        legends: [
            '<img class="legend-intensity-scale" ' +
                'src="images/legends/legend-intensity-scale.png" />',
            '<img class="legend-geocoded-area" ' +
                'src="images/legends/legend-geocoded-area.png" />'
          ]
      });
    }

    // Fallback responses aggregation
    if (!_overlays.hasOwnProperty(_DYFI_10K_OVERLAY) &&
        !_overlays.hasOwnProperty(_DYFI_1K_OVERLAY)) {

      content = dyfi.getContent('dyfi_geo.geojson');
      if (content) {
        _overlays[_DYFI_DEFAULT_OVERLAY] = DyfiUtmLayer({
          url: content.get('url'),
        legends: [
            '<img class="legend-intensity-scale" ' +
                'src="images/legends/legend-intensity-scale.png" />',
            '<img class="legend-geocoded-area" ' +
                'src="images/legends/legend-geocoded-area.png" />'
          ]
        });
      }
    }

    return _overlays;
  };

  /**
   * Creates the appropriate ShakeMap overlays based on the given product.
   * Adds each overlay to the instance _overlays mapping.
   *
   * @param shakemap {Product}
   *     The ShakeMap product for which to create overlays. If null, no overlays
   *     are added.
   *
   * @return {Object}
   *     The _overlays instance variable, as augmented with new layers.
   */
  _this.addShakeMapOverlays = function (shakemap) {
    var content;

    if (!shakemap) {
      return;
    }

    content = shakemap.getContent('download/cont_mi.json');
    if (content) {
      _overlays[_SHAKEMAP_CONTOURS] = ContoursLayer({
        clickable: _interactive,
        url: content.get('url'),
        legends: [
            '<img class="legend-intensity-scale" ' +
                'src="images/legends/legend-intensity-scale.png" />',
            '<img class="legend-intensity-contour" ' +
                'src="images/legends/legend-intensity-contour.png" />'
          ]

      });
    }

    content = shakemap.getContent('download/stationlist.json');
    if (content) {
      _overlays[_SHAKEMAP_STATIONS] = ShakeMapStationLayer({
        url: content.get('url'),
        legends: [
            '<img class="legend-intensity-scale" ' +
                'src="images/legends/legend-intensity-scale.png" />',
            '<img class="legend-seismic-station" ' +
                'src="images/legends/legend-seismic-station.png" />',
            '<img class="legend-shakemap-station" ' +
                'src="images/legends/legend-shakemap-station.png" />'
          ]
      });
    }

    return _overlays;
  };

  /**
   * Creates a marker to indicate the epicenter at the given latitude and
   * longitude coordinates. Includes the magnitude in the tooltip text.
   *
   * @param latitude {Number}
   *     Decimal degrees latitude.
   * @param longitude {Number}
   *     Decimal degrees longitude.
   * @param magnitude {Number}
   *     Magnitude of event.
   *
   * @return {L.Marker}
   *     A marker centered on the given latitude/longitude coordinate with
   *     tooltip text including the magnitude.
   */
  _this.createEpicenterMarker = function (latitude, longitude, magnitude) {
    var marker;

    marker = L.marker([latitude, longitude], {
      zIndexOffset: 99,
      icon: L.icon({
        iconUrl: 'images/star.png',
        iconSize: [_markerSize, _markerSize],
        iconAnchor: [_markerSize/2, _markerSize/2]
      })
    });

    // add epicenter legend
    marker.getLegends = function () {
      return [
        '<img class="legend-epicenter"' +
          'src="images/legends/legend-epicenter.png" />'
      ];
    };

    if (_interactive) {
      marker.bindPopup([
        'Epicenter M', _formatter.magnitude(magnitude),
        '<br/>',
        _formatter.location(latitude, longitude)
      ].join(''));
    }

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
    _formatter = null;
    _layersControl = null;
    _map = null;
    _markerSize = null;
    _module = null;
    _overlays = null;
    _positionControl = null;
    _scaleControl = null;


    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Sets the instance `_baseLayers` object to a map of LayerName => Layer for
   * each supported base layer.
   *
   * @return {Object}
   *     The updated _baseLayers object.
   */
  _this.getAvailableBaseLayers = function () {
    _baseLayers = {
      'Terrain': Terrain({provider: Terrain.NATGEO}),
      'Grayscale': Grayscale(),
      'Street': Street(),
      'Satellite': Satellite()
    };

    return _baseLayers;
  };

  /**
   * Sets the instance `_overlays` object to a map of LayerName => Layer for
   * each supported overlay layer.
   *
   * @return {Object}
   *     The updated _overlays object.
   */
  _this.getAvailableOverlays = function () {
    var catalogEvent,
        eventLatitude,
        eventLongitude;

    _overlays = {};

    catalogEvent = _this.model.get('event');

    if (!catalogEvent) {
      // No event, no overlays to create
      return _overlays;
    }

    eventLatitude = catalogEvent.getLatitude();
    eventLongitude = catalogEvent.getLongitude();

    if (eventLatitude !== null && eventLongitude !== null) {
      // Put a star over the epicenter
      _overlays[_EPICENTER_OVERLAY] = _this.createEpicenterMarker(eventLatitude,
          eventLongitude, catalogEvent.getMagnitude());
    }

    // Always include tectonic plates
    _overlays[_PLATES_OVERLAY] = TectonicPlates({
        legends: [
          '<img class="legend-tectonic-plates" ' +
              'src="images/legends/legend-tectonic-plates.png" />'
        ]
      });

    // Include faults layer if in U.S.
    if (__inUs(eventLatitude, eventLongitude)) {
      _overlays[_FAULTS_OVERLAY] = UsFault({
        legends: [
          '<img class="legend-us-faults" ' +
              'src="images/legends/legend-us-faults.png" />'
        ]
      });
    }

    // Historic seismicity
    _overlays[_HIST_SEIS_OVERLAY] = HistoricSeismicity();

    // Calling _module.getProduct will get the current product in the
    // case that a specific ?source=&code= were requested...

    // DYFI
    _this.getProductOverlays('dyfi', _this.addDyfiOverlays);

    // ShakeMap
    _this.getProductOverlays('shakemap', _this.addShakeMapOverlays);

    return _overlays;
  };

  _this.getProductOverlays = function (type, callback) {
    var catalogEvent,
        codeKey,
        config,
        product,
        sourceKey;

    catalogEvent = _this.model.get('event');

    if (!catalogEvent) {
      return;
    }

    config = Util.extend({}, _defaultConfig, _this.model.get('map'));
    sourceKey = type + 'Source';
    codeKey = type + 'Code';
    type = Product.getFullType(type, _module.model.get('config'));

    if (config.hasOwnProperty(sourceKey) &&
        config.hasOwnProperty(codeKey)) {
      product = catalogEvent.getProductById(type, config[sourceKey],
          config[codeKey]);
    } else {
      product = catalogEvent.getPreferredProduct(type);
    }

    if (product) {
      callback(product);
    }
  };
  /**
   * Called to notify the view that it's element is now in the DOM so
   * things like dimensions can be inspected etc...
   *
   */
  _this.onDomReady = function () {
    if (_map && _map.getContainer() && _map.getContainer().parentNode) {
      _map.invalidateSize();
    }
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

    _this.updateOverlays(config);


    // Zoom to a two-degree map centered on event
    catalogEvent = _this.model.get('event');
    if (catalogEvent) {
      latitude = catalogEvent.getLatitude();
      longitude = catalogEvent.getLongitude();
      _map.fitBounds([[latitude + 2.0, longitude + 2.0],
          [latitude - 2.0, longitude - 2.0]]);
    }
  };

  _this.updateOverlays = function (config) {
    // Clear existing overlays (if any)
    Object.keys(_overlays).forEach(function (layerName) {
      var layer;

      layer = _overlays[layerName];

      if (layer._map) {
        _map.removeLayer(layer);
      }

      if (_layersControl && _layersControl._layers.hasOwnProperty(layerName)) {
        _layersControl.removeLayer(layer);
      }
    });

    _this.getAvailableOverlays();

    // Now add each overlay to control and potentially add to map if so
    // configured
    Object.keys(_overlays).forEach(function (layerName) {
      var layer;

      layer = _overlays[layerName];

      if (_layersControl) {
        _layersControl.addOverlay(layer, layerName);
      }

      if (config[layerName] === 'true') {
        layer.addTo(_map);
      }
    });
  };


  _initialize(options);
  options = null;
  return _this;
};

// Expose these so others know the layers available
InteractiveMapView.DYFI_10K_OVERLAY = _DYFI_10K_OVERLAY;
InteractiveMapView.DYFI_1K_OVERLAY = _DYFI_1K_OVERLAY;
InteractiveMapView.DYFI_DEFAULT_OVERLAY = _DYFI_DEFAULT_OVERLAY;
InteractiveMapView.EPICENTER_OVERLAY = _EPICENTER_OVERLAY;
InteractiveMapView.FAULTS_OVERLAY = _FAULTS_OVERLAY;
InteractiveMapView.HIST_SEIS_OVERLAY = _HIST_SEIS_OVERLAY;
InteractiveMapView.PLATES_OVERLAY = _PLATES_OVERLAY;
InteractiveMapView.POPULATION_OVERLAY = _POPULATION_OVERLAY;
InteractiveMapView.SHAKEMAP_CONTOURS = _SHAKEMAP_CONTOURS;
InteractiveMapView.SHAKEMAP_STATIONS = _SHAKEMAP_STATIONS;


module.exports = InteractiveMapView;
