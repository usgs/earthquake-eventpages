/* global define */
define([
  'leaflet',
  'base/EventModulePage',
  'map/MouseOverLayer',
  'summary/ShakeMapStationLayer',
  'summary/ContoursLayer',
  'impact/ImpactUtil',

  'util/Util',
  'util/Xhr'
], function (
  L,
  EventModulePage,
  MouseOverLayer,
  ShakeMapStationLayer,
  ContoursLayer,
  ImpactUtil,

  Util,
  Xhr
) {
  'use strict';

  var DEFAULTS = {
  };

  var InteractiveMap = function (options) {
    options = Util.extend({}, DEFAULTS, options || {});
    this._map = {};
    this._wrapper = document.createElement('div');
    this._closeButton = document.createElement('button');
    EventModulePage.call(this, options);
  };

  InteractiveMap.prototype = Object.create(EventModulePage.prototype);

  InteractiveMap.prototype._initialize = function () {
    EventModulePage.prototype._initialize.apply(this);
    if (this._eventPage) {
      this._eventPage.on('render', this._onAfterRender, this);
    }
  };

  InteractiveMap.prototype.destroy = function () {
    if (this._eventPage) {
      this._eventPage.off('render', this._onAfterRender, this);
    }
  };

  InteractiveMap.prototype._setContentMarkup = function () {

    var _this = this,
        latmax, latmin, lngmax, lngmin,
        _el = document.createElement('div');

    var layerControl = null,
        terrainLayer = null,
        grayscaleLayer = null,
        streetLayer = null,
        satelliteLayer = null,
        platesLayer = null,
        faultsLayer = null,
        latitude = null,
        longitude = null,
        epicenterMarker,
        map;

    Util.addClass(this._content, 'summary-interactive-map-wrapper');
    Util.addClass(_el, 'summary-interactive-map');
    this._closeButton.innerHTML = 'Close Map';
    this._closeButton.className = 'summary-interactive-map-close cancel';
    _el.innerHTML = '';

    // This css is added in JS because css files are loading asynchronous
    // and these rules must be applied before the map is initialized other wise
    // the map is not properly displayed.
    this._content.setAttribute('style', 'position:fixed;top:0;right:0;bottom:0;left:0;');
    _el.setAttribute('style', 'height:100%;');

    this._closeButton.setAttribute('title', 'Close');
    this._bindCloseEvent();

    this._map = map = new L.Map(_el, {
      center: [0.0, 0.0],
      zoom: 2,
      zoomAnimation: true,
      attributionControl: false
    });

    layerControl = new L.Control.Layers();

    // Terrain layer
    terrainLayer = new L.TileLayer(
        'http://{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}.jpg',
        {'subdomains': ['server', 'services']});
    map.addLayer(terrainLayer);
    layerControl.addBaseLayer(terrainLayer, 'Terrain');

    // Grayscale layer
    grayscaleLayer = new L.TileLayer(
        'http://{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}.jpg',
        {'subdomains': ['server', 'services']});
    layerControl.addBaseLayer(grayscaleLayer, 'Grayscale');

    // Street Layer
    streetLayer = new L.TileLayer(
        'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
        {'subdomains': '1234'});
    layerControl.addBaseLayer(streetLayer, 'Street');

    //Satellite Layer
    satelliteLayer = new L.TileLayer(
        'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
        {'subdomains': '1234'});
    layerControl.addBaseLayer(satelliteLayer, 'Satellite');

    // Plates
    platesLayer = new L.TileLayer(
        'http://earthquake.usgs.gov/basemap/tiles/plates/{z}/{x}/{y}.png');
    map.addLayer(platesLayer);
    layerControl.addOverlay(platesLayer, 'Tectonic Plates');

    if (this._event) {
      // Do some event-specific stuff if the event is defined
      latitude = this._event.geometry.coordinates[1];
      longitude = this._event.geometry.coordinates[0];

      // Show a 2deg map centered on earthquake epicenter)
      latmin = Math.max(latitude - 2.0, -90.0);
      latmax = Math.min(latitude + 2.0, 90.0);

      lngmin = longitude - 2.0;
      lngmax = longitude + 2.0;

      this._defaultBounds = [[latmax, lngmin], [latmin, lngmax]];

      if (latitude >= 24.6 && latitude <= 50.0 && longitude >= -125.0 && longitude <= -65.0) {
        // Add faults layer, this is a US event
        faultsLayer = new L.MouseOverLayer({
          tileUrl: 'http://earthquake.usgs.gov/basemap/tiles/faults/{z}/{x}/{y}.png',
          dataUrl: 'http://earthquake.usgs.gov/basemap/tiles/faults/{z}/{x}/{y}.grid.json?callback={cb}',
          tiptext: '{NAME}'
        });
        map.addLayer(faultsLayer);
        layerControl.addOverlay(faultsLayer, 'U.S. Faults');
      }
      // Place a marker at the earthquake location
      epicenterMarker = new L.Marker([latitude, longitude], {
        zIndexOffset: 99999,
        icon: new L.Icon({
          iconUrl: 'images/star.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      });
      epicenterMarker.bindPopup([
        'Epicenter',
        ' ',
        'M',
        this._event.properties.mag
      ].join(''));
      map.addLayer(epicenterMarker);
      if (this._event.properties.products.geoserve) {
        Xhr.ajax({
          url: this._event.properties.products.geoserve[0].contents['geoserve.json'].url,
          success: function (data) {
            var cities = data.cities,
                numCities = cities.length,
                i = null,
                city = null,
                cityMarker = null;

            for (i = 0; i < numCities; i++) {
              city = cities[i];
              cityMarker = new L.CircleMarker([city.latitude, city.longitude], {
                stroke: true,
                color: '#333',
                weight: 1,
                opacity: 1.0,
                fill: true,
                fillColor: '#eee',
                fillOpacity: 1.0,
                radius: 5
              });

              cityMarker.bindPopup([
                city.name, ' ',
                '<span class="city-distance">',
                  city.distance, 'km from epicenter',
                '</span>'
              ].join(''));
              map.addLayer(cityMarker);
            }
          }
        });
      }
      // Adds shake map contours data to map
      if (this._event.properties.products.shakemap) {
        var contourLayer = null,
            shakemap = this._event.properties.products.shakemap[0],
            contourJson,
            shakemapContents = shakemap.contents;

        if ('download/cont_mi.json' in shakemapContents) {
          contourJson = shakemapContents['download/cont_mi.json'];

          Xhr.ajax({
            url: contourJson.url,
            success: function (data) {
              _this._contourLayer = contourLayer = new ContoursLayer(data);
              contourLayer.addTo(map);
              layerControl.addOverlay(contourLayer, 'ShakeMap MMI Contours');
            }
          });
        }

        var stationJson;

        if ('download/stationlist.json' in shakemapContents) {
          stationJson = shakemapContents['download/stationlist.json'];
          this._stationLayer = new ShakeMapStationLayer(stationJson.url);
          layerControl.addOverlay(this._stationLayer, 'ShakeMap Stations');
        }
      }
    }
    map.addControl(layerControl);

    this._content.appendChild(_el);
    this._content.appendChild(this._closeButton);
  };

  // InteractiveMap.prototype.show = function (container) {
  //   var lat, latmin, latmax,
  //       lng, lngmin, lngmax;
  //   // delete this
  //   console.log('InteractiveMap.show Its alive');
  //   container = container || this._content;

  //   if (container) {
  //     container.appendChild(this._wrapper);
  //     this._map.invalidateSize();

  //     if (this._event) {
  //       // Show a 2deg map centered on earthquake epicenter)
  //       lat = this._event.geometry.coordinates[1];
  //       lng = this._event.geometry.coordinates[0];

  //       latmin = Math.max(lat - 2.0, -90.0);
  //       latmax = Math.min(lat + 2.0, 90.0);

  //       lngmin = lng - 2.0;
  //       lngmax = lng + 2.0;

  //       this._map.fitBounds([[latmax, lngmin], [latmin, lngmax]]);
  //     }
  //   }
  // };

  InteractiveMap.prototype._onAfterRender = function () {
    if (this._map) {
      this._map.invalidateSize();
      if (this._defaultBounds) {
        this._map.fitBounds(this._defaultBounds);
      }
    }
  };

  InteractiveMap.prototype._bindCloseEvent = function () {
    Util.addEvent(this._closeButton, 'click', function () {
      window.history.go(-1);
    });
  };
  return InteractiveMap;
});
