/* global L */
'use strict';

var EsriTerrain = require('leaflet/layer/EsriTerrain'),
    Formatter = require('core/Formatter'),
    GeoserveNearbyPlacesView = require('general/GeoserveNearbyPlacesView'),
    GeoserveRegionSummaryView = require('general/GeoserveRegionSummaryView'),
    Module = require('core/Module'),
    NearbyPlacesView = require('general/NearbyPlacesView'),
    Product = require('pdl/Product'),
    Util = require('util/Util');


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


var RegionalInfoModule = function (options) {
  var _this,
      _initialize,

      _formatter,
      _locationEl,
      _locationView,
      _map,
      _mapRadius,
      _nearbyPlacesEl,
      _nearbyPlacesView,
      _tectonicSummaryEl,
      _tectonicSummaryView;


  _this = Module(options);

  _initialize = function (options) {
    var el;

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    options = Util.extend({}, _DEFAULTS, options);
    _formatter = options.formatter || Formatter();
    _mapRadius = options.mapRadius;

    el = _this.content;
    el.classList.add('generalsummary');
    el.innerHTML = [
        '<div class="row">',
          '<div class="column two-of-three">',
            '<div class="regional-info-module-map"></div>',
          '</div>',
          '<div class="column one-of-three">',
            '<div class="generalsummary-places"></div>',
          '</div>',
        '</div>',
        '<div class="generalsummary-tectonic-summary"></div>',
    ].join('');

    _locationEl = el.querySelector('.regional-info-module-map');
    _nearbyPlacesEl = el.querySelector('.generalsummary-places');
    _tectonicSummaryEl = el.querySelector('.generalsummary-tectonic-summary');
  };


  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    _this = null;
    _initialize = null;

    if (_locationView) {
      _locationView.destroy();
      _locationView = null;
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

    if (_map) {
      _map.remove();
    }

    _locationEl = null;
    _map = null;
    _mapRadius = null;
    _nearbyPlacesEl = null;
    _tectonicSummaryEl = null;
  }, _this.destroy);

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

  _this.isAutomaticNearbyCity = function (nearbyCity, origin) {
    var cityCode,
        citySource,
        cityUpdateTime,
        originCode,
        originUpdateTime;

    citySource = nearbyCity.get('source');
    cityCode = nearbyCity.get('code');
    originCode = origin.get('code');

    // If code matches and source is "us" then product is automatic.
    return (
      citySource === 'us' &&
      cityCode === originCode
    );
  };

  _this.onNearbyPlaces = function (places) {
    var degrees,
        ev,
        km,
        latitude,
        longitude,
        place;

    ev = _this.model.get('event');

    if (ev && _map) {
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

      // Use Math.max to provide some minimum extent for context...
      _map.fitBounds([
        [latitude + Math.max(degrees, 1), longitude + Math.max(degrees, 1)],
        [latitude - Math.max(degrees, 1), longitude - Math.max(degrees, 1)]
      ]);
    }
  };

  _this.render = function () {
    var ev;

    ev = _this.model.get('event');

    _this.renderHeader(ev);
    _this.renderMap(ev);
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

    if (_map) {
      _map.remove();
      _map = null;
    }

    if (!ev) {
      return;
    }

    latitude = ev.getLatitude();
    longitude = ev.getLongitude();

    if (latitude === null || longitude === null) {
      return;
    }

    _map = L.map(_locationEl, {
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
        EsriTerrain(),
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

    L.control.scale({position: 'bottomleft'}).addTo(_map);
  };

  /**
   * Render nearby-cities product, or nearby places from geoserve.
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
        url: (config ? config.GEOSERVE_WS_URL : null)
      });
    }

    _nearbyPlacesView.on('places', 'onNearbyPlaces', _this);
    _nearbyPlacesView.on('places-error', 'onNearbyPlaces', _this);

    _nearbyPlacesEl.innerHTML = '<h3>Nearby Places</h3>';
    _nearbyPlacesEl.appendChild(_nearbyPlacesView.el);
    _nearbyPlacesView.render();
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
