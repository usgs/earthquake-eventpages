'use strict';

var EsriTerrain = require('leaflet/layer/EsriTerrain'),
    Formatter = require('core/Formatter'),
    GeoserveNearbyPlacesView = require('general/GeoserveNearbyPlacesView'),
    GeoserveRegionSummaryView = require('general/GeoserveRegionSummaryView'),
    LocationView = require('general/LocationView'),
    Module = require('core/Module'),
    NearbyPlacesView = require('general/NearbyPlacesView'),
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
  formatter: null
};


var RegionalInfoModule = function (options) {
  var _this,
      _initialize,

      _formatter,
      _locationEl,
      _locationView,
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

    el = _this.content;
    el.classList.add('generalsummary');
    el.innerHTML = [
        '<div class="row">',
          '<div class="column one-of-two">',
            '<div class="generalsummary-location"></div>',
          '</div>',
          '<div class="column one-of-two">',
            '<div class="generalsummary-places"></div>',
          '</div>',
        '</div>',
        '<div class="generalsummary-tectonic-summary"></div>',
    ].join('');

    _locationEl = el.querySelector('.generalsummary-location');
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
      _nearbyPlacesView.destroy();
      _nearbyPlacesView = null;
    }

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
    }

    _locationEl = null;
    _nearbyPlacesEl = null;
    _tectonicSummaryEl = null;
  }, _this.destroy);

  _this.render = function () {
    var ev;

    ev = _this.model.get('event');

    _this.renderHeader(ev);
    _this.renderLocation(ev);
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
   * Render location information for the event.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderLocation = function (/*ev*/) {
    // only create location view on first render
    // if (!_locationView) {
    //   _locationView = LocationView({
    //     el: _locationEl,
    //     formatter: _formatter,
    //     model: _this.model,
    //     module: _this
    //   });
    //   // only render first time, binds to model separately
    //   _locationView.render();
    // }
    _map = L.map(_locationEl, {
      bounds: [[minLatitude, minLongitude], [maxLatitude, maxLongitude]],
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      tap: false,
      keyboard: false,
      zoomControl: false,
      attributionControl: false,
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
      ]
    });

    _scale = L.control.scale({position: 'bottomleft'});
    _map.addControl(_scale);
  };

  /**
   * Render nearby-cities product, or nearby places from geoserve.
   */
  _this.renderNearbyPlaces = function (ev) {
    var config,
        product;

    if (_nearbyPlacesView) {
      _nearbyPlacesView.destroy();
      _nearbyPlacesView = null;
    }
    Util.empty(_nearbyPlacesEl);

    if (!ev) {
      return;
    }

    config = _this.model.get('config');

    product = ev.getPreferredProduct('nearby-cities');
    if (product) {
      _nearbyPlacesView = NearbyPlacesView({
        model: product
      });
    } else {
      product = ev.getPreferredOriginProduct();
      _nearbyPlacesView = GeoserveNearbyPlacesView({
        model: product,
        url: (config ? config.GEOSERVE_WS_URL : null)
      });
    }

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
