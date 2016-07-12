/* global L */
'use strict';

var Terrain = require('leaflet/layer/Terrain'),
    GeoserveNearbyPlacesView = require('general/GeoserveNearbyPlacesView'),
    GeoserveRegionSummaryView = require('general/GeoserveRegionSummaryView'),
    HistoricSeismicity = require('leaflet/layer/HistoricSeismicity'),
    InteractiveMapModule = require('map/InteractiveMapModule'),
    InteractiveMapView = require('map/InteractiveMapView'),
    Module = require('core/Module'),
    NearbyPlacesView = require('general/NearbyPlacesView'),
    Product = require('pdl/Product'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _ID,
    _TITLE,

    _hasContent;


_ID = 'region-info';
_TITLE = 'Regional Information';

_hasContent = function (eventPageModel) {
  var ev;

  ev = eventPageModel.get('event');
  if (ev !== null) {
    // only show this module if there is an event
    return true;
  }

  return false;
};

var _DEFAULTS = {
  formatter: null,
  mapRadius: 5.0
};


/**
 * A module for rendering non-event specific, regional information.
 *
 */
var RegionalInfoModule = function (options) {
  var _this,
      _initialize,

      _mapEl,
      _mapRadius,
      _nearbyPlacesEl,
      _nearbyPlacesView,
      _otherRegionInfoEl,
      _tectonicSummaryEl,
      _tectonicSummaryView;


  _this = Module(options);

  /**
   * Constructor for this module.
   *
   * @params options.formatter {Formatter}
   *     A formatter to use on this module.
   * @param options.mapRadius {Number}
   *     The default map radius in decimal degrees. Note: This value is
   *     not used unless nearby cities fails.
   */
  _initialize = function (options) {
    var el,
        mapLink;

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    options = Util.extend({}, _DEFAULTS, options);

    _mapRadius = options.mapRadius;

    mapLink = [
      '#', InteractiveMapModule.ID, '?',
        encodeURIComponent(InteractiveMapView.HIST_SEIS_OVERLAY), '=true&amp;',
        encodeURIComponent(InteractiveMapView.POPULATION_OVERLAY), '=true&amp;',
        encodeURIComponent(InteractiveMapView.SHAKEMAP_CONTOURS), '=false'
    ].join('');

    el = _this.content;
    el.classList.add('regional-info-module');
    el.innerHTML = [
        '<div class="row right-to-left">',
          '<div class="column one-of-three">',
            '<div class="regional-info-module-regions"></div>',
            '<div class="regional-info-module-places"></div>',
          '</div>',
          '<div class="column two-of-three">',
            '<a href="', mapLink, '">',
              '<div class="regional-info-module-map"></div>',
              'View Interactive Map',
            '</a>',
          '<div class="regional-info-module-tectonic-summary"></div>',
          '</div>',
        '</div>',
    ].join('');

    _mapEl = el.querySelector('.regional-info-module-map');

    _nearbyPlacesEl = el.querySelector('.regional-info-module-places');
    _otherRegionInfoEl = el.querySelector('.regional-info-module-regions');

    _tectonicSummaryEl = el.querySelector(
        '.regional-info-module-tectonic-summary');
  };


  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    if (_nearbyPlacesView) {
      _nearbyPlacesView.off('places', 'onNearbyPlaces', _this);
      _nearbyPlacesView.off('places-error', 'onNearbyPlaces', _this);
      _nearbyPlacesView.destroy();
      _nearbyPlacesView = null;
    }

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
    }

    if (_this.map) {
      _this.map.remove();
    }

    _mapEl = null;
    _mapRadius = null;
    _nearbyPlacesEl = null;
    _otherRegionInfoEl = null;
    _tectonicSummaryEl = null;


    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Get the FE info from an array of data.
   *
   * @param data {Array}
   *     An array of data with properties containing a name/number.
   */
  _this.getFeInfo = function (data) {
    var i,
        info,
        len,
        name,
        number;

    name = null;
    number = null;
    len = data.length || 0;

    for (i = 0; (name === null || number === null) && i < len; i++) {
      info = data[i] || {};
      name = name || (info.properties) ? info.properties.name : null;
      number = number || (info.properties) ? info.properties.number : null;
    }

    return {
      properties: {
        name: name,
        number: number
      }
    };
  };

  /**
   * Finds a non-automatic nearby-cities product. If none exists, returns null.
   *
   * @param ev {CatalogEvent}
   *     The event containing nearby-cities products.
   *
   * @param config {Object}
   *     An object containing a SCENARIO_MODE and/or INTERNAL_MODE flag
   *     (boolean) used to determine the full product types.
   *
   * @return {Product}
   *     The most preferred, non-automatic nearby-cities product or null if
   *     none exist.
   */
  _this.getNearbyPlacesProduct = function (ev, config) {
    var nearbyCities,
        origins,
        product;

    product = null;

    nearbyCities = ev.getProducts(Product.getFullType('nearby-cities'), config);
    origins = ev.getProducts(Product.getFullType('origin'), config);

    // Have both nearby-cities and origin products. Look for a nearby-cities
    // product that does not directly correspond to an origin. The resulting
    // list of nearby-cities products will be only those manually sent by RSNs.
    nearbyCities = nearbyCities.filter(function (nearbyCity) {
      var match;

      match = false;
      origins.some(function (origin) {
        match = _this.isAutomaticNearbyCity(nearbyCity, origin);
        return match;
      });

      return !match; // If not matched, then not automatic --> keep product
    });

    // If we have any non-automatic nearby-cities, use the first (most
    // preferred) one.
    if (nearbyCities.length) {
      product = nearbyCities[0];
    }

    return product;
  };

  /**
   * Determines if the given nearbyCity product is an automatic product that
   * was generated by the given origin product.
   *
   * @param nearbyCity {Product}
   *     The nearby city product to check
   * @param origin {Product}
   *     The origin product to check against
   *
   * @return {Boolean}
   *     True if the nearbyCity product was automatically generated by
   *     the origin product.
   */
  _this.isAutomaticNearbyCity = function (nearbyCity, origin) {
    var cityCode,
        citySource,
        originCode;

    citySource = nearbyCity.get('source');
    cityCode = nearbyCity.get('code');
    originCode = origin.get('code');

    // If code matches and source is "us" then product is automatic.
    return (
      citySource === 'us' &&
      cityCode === originCode
    );
  };

  /**
   * Callback method when the {NearbyPlacesView} receives and renders data. This
   * method updates the map extent to potentially include all the nearby
   * places in the given `places` array. A minimum extent is used in
   * case all the nearby places are very nearby such that no map context would
   * be visible.
   *
   * @param places {Array}
   *     An array of places to use as a basis for map context.
   */
  _this.onNearbyPlaces = function (places) {
    var degrees,
        ev,
        km,
        latitude,
        longitude,
        place;

    ev = _this.model.get('event');

    if (ev && _this.map) {
      places = places || [];
      place = places[places.length - 1] || {};
      km = place.distance;

      latitude = ev.getLatitude();
      longitude = ev.getLongitude();

      if (latitude === null || longitude === null) {
        return;
      }

      if (km) {
        degrees = km / 111.2; // not regarding latitude, but close enough
      } else {
        degrees = _mapRadius;
      }

      // Provide some minimum extent for context...
      degrees = Math.max(degrees, 1);

      _this.map.fitBounds([
        [latitude + degrees, longitude + degrees],
        [latitude - degrees, longitude - degrees]
      ]);
    }
  };

  /**
   * Callback method when the AJAX call to geoserve for other regional
   * completes. This method updates the "Administrative Region" and "FE Region"
   * sections of the page.
   *
   * @param data {Object}
   *      An object containing "admin" and/or "fe" region information as
   *      returned by Geoserve.
   */
  _this.onOtherRegionComplete = function (data) {
    var admin,
        fe,
        markup;

    if (!data || !data.admin || !data.fe) {
      return;
    }

    markup = [];
    admin = data.admin.features[0] || {};
    fe = _this.getFeInfo(data.fe.features || []);

    if (admin.properties) {
      admin = admin.properties;
      markup.push([
        '<h3>Administrative Region</h3>',
        '<dl class="no-style regional-info-module-admin vertical">',
          '<dt class="regional-info-module-admin-iso">',
            'ISO',
          '</dt>',
          '<dd>',
            (admin.iso === null) ? '&ndash;' : admin.iso,
          '</dd>',
          '<dt class="regional-info-module-admin-country">',
            'Country',
          '</dt>',
          '<dd>',
            (admin.country === null) ? '&ndash;' : admin.country,
          '</dd>',
          '<dt class="regional-info-module-admin-region">',
            'Region',
          '</dt>',
          '<dd>',
            (admin.region === null) ? '&ndash;' : admin.region,
          '</dd>',
        '</dl>',
      ].join(''));
    }

    if (fe.properties) {
      fe = fe.properties;
      markup.push([
        '<h3>Flinn Engdahl Region</h3>',
        '<dl class="no-style regional-info-module-fe vertical">',
          '<dt class="regional-info-module-admin-iso">',
            'Name',
          '</dt>',
          '<dd>',
            (fe.name === null) ? '&ndash;' : fe.name,
          '</dd>',
          '<dt class="regional-info-module-admin-iso">',
            'Number',
          '</dt>',
          '<dd>',
            (fe.number === null) ? '&ndash;' : fe.number,
          '</dd>',
        '</dl>',
      ].join(''));
    }

    _otherRegionInfoEl.innerHTML = markup.join('');
  };

  /**
   * Starts the rendering process. Some parts of the page render synchronously
   * while others not so. Rendering is delegated to sub-methods.
   *
   */
  _this.render = function () {
    var ev;

    ev = _this.model.get('event');

    _this.renderHeader(ev);

    _this.renderMap(ev);

    _this.renderOtherRegionInfo(ev);
    _this.renderNearbyPlaces(ev);

    _this.renderTectonicSummary(ev);

    _this.renderFooter(ev);
  };

  /**
   * Render module footer.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderFooter = function (/*ev*/) {
    _this.footer.innerHTML = ''; // TODO :: Anything?
  };

  /**
   * Render module header.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderHeader = function (ev) {
    var latitude,
        eventid;

    Util.empty(_this.header);

    if (!ev) {
      return;
    }

    eventid = ev.getEventId();
    latitude = ev.getLatitude();

    // If location latitude extents are + or - 85 degrees show warning
    if (Math.abs(latitude) > 85.0) {
      _this.header.innerHTML = [
        '<p class="alert warning">',
          'Due to the high latitude of this',
          ' event, the location map does not show the correct location.',
          ' To see the actual location we recommend using',
          ' <a href="/earthquakes/feed/v1.0/detail/', eventid, '.kml">',
          'Google Earth KML',
          '</a>.',
        '</p>'
      ].join('');
    } else {
      _this.header.innerHTML = '';
    }
  };

  /**
   * Render map information for the event.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderMap = function (ev) {
    var latitude,
        longitude;

    if (_this.map) {
      _this.map.remove();
      _this.map = null;
    }

    if (!ev) {
      return;
    }

    latitude = ev.getLatitude();
    longitude = ev.getLongitude();

    if (latitude === null || longitude === null) {
      return;
    }

    _this.map = L.map(_mapEl, {
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

    L.control.scale({position: 'bottomleft'}).addTo(_this.map);
  };

  /**
   * Render nearby-cities product, or nearby places from geoserve.
   *
   * @param ev {CatalogEvent}
   */
  _this.renderNearbyPlaces = function (ev) {
    var config,
        product;

    if (_nearbyPlacesView) {
      _nearbyPlacesView.off('places', 'onNearbyPlaces', _this);
      _nearbyPlacesView.off('places-error', 'onNearbyPlaces', _this);
      _nearbyPlacesView.destroy();
      _nearbyPlacesView = null;
    }
    Util.empty(_nearbyPlacesEl);

    if (!ev) {
      return;
    }

    config = _this.model.get('config');

    product = _this.getNearbyPlacesProduct(ev, config);
    if (product) {
      _nearbyPlacesView = NearbyPlacesView({
        model: product,
        renderNewLayout: true
      });
    } else {
      product = ev.getPreferredOriginProduct();
      _nearbyPlacesView = GeoserveNearbyPlacesView({
        model: product,
        renderNewLayout: true,
        url: (config ? config.GEOSERVE_WS_URL : '/ws/geoserve/')
      });
    }

    _nearbyPlacesView.on('places', 'onNearbyPlaces', _this);
    _nearbyPlacesView.on('places-error', 'onNearbyPlaces', _this);

    _nearbyPlacesEl.innerHTML = '<h3>Nearby Places</h3>' +
        '<small>' +
          'Direction data (below) indicate the position of the event ' +
          'relative to the place.' +
        '</small>';

    _nearbyPlacesEl.appendChild(_nearbyPlacesView.el);
    _nearbyPlacesView.render();
  };

  /**
   * Fires off a Geoserve request for other regional information. When that
   * request completes, the `onOtherRegionInfoComplete` method is invoked.
   *
   * @param ev {CatalogEvent}
   */
  _this.renderOtherRegionInfo = function (ev) {
    var config,
        latitude,
        longitude;

    Util.empty(_otherRegionInfoEl);

    if (!ev) {
      return;
    }

    config = _this.model.get('config');
    latitude = ev.getLatitude();
    longitude = ev.getLongitude();

    if (latitude === null || longitude === null) {
      return;
    }

    Xhr.ajax({
      url: ((config) ? config.GEOSERVE_WS_URL : '/ws/geoserve/') +
          'regions.json',
      data: {
        latitude: latitude,
        longitude: longitude,
        type: 'admin,fe'
      },
      success: _this.onOtherRegionComplete,
      error: _this.onOtherRegionComplete
    });
  };

  /**
   * Render the tectonic-summary product if available.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderTectonicSummary = function (ev) {
    var product;

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
    }

    Util.empty(_tectonicSummaryEl);

    if (!ev) {
      return;
    }

    product = ev.getPreferredOriginProduct();

    if (product) {
      _tectonicSummaryView = GeoserveRegionSummaryView({
        el: _tectonicSummaryEl,
        model: product
      });
      _tectonicSummaryView.render();
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


RegionalInfoModule.ID = _ID;
RegionalInfoModule.TITLE = _TITLE;

RegionalInfoModule.hasContent = _hasContent;


module.exports = RegionalInfoModule;
