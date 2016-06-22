'use strict';

var Formatter = require('core/Formatter'),
    GeoserveNearbyPlacesView = require('general/GeoserveNearbyPlacesView'),
    GeoserveRegionSummaryView = require('general/GeoserveRegionSummaryView'),
    LinkProductView = require('core/LinkProductView'),
    LocationView = require('general/LocationView'),
    Module = require('core/Module'),
    NearbyPlacesView = require('general/NearbyPlacesView'),
    TextProductView = require('core/TextProductView'),
    Util = require('util/Util');


var _ID,
    _TITLE,

    _hasContent;


// Note: These should be overridden by each implementing sub-class.
_ID = 'general';
_TITLE = 'General Summary';

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


var GeneralSummaryModule = function (options) {
  var _this,
      _initialize,

      _formatter,
      _generalHeaderViews,
      _generalLinkEl,
      _generalLinkViews,
      _generalTextEl,
      _generalTextViews,
      _locationEl,
      _locationView,
      _nearbyPlacesEl,
      _nearbyPlacesView,
      _tectonicSummaryEl,
      _tectonicSummaryView,
      _timeEl;


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
          '<div class="column">',
            '<div class="generalsummary-warning"></div>',
          '</div>',
          '<div class="column one-of-two">',
            '<div class="generalsummary-location"></div>',
          '</div>',
          '<div class="column one-of-two">',
            '<div class="generalsummary-time"></div>',
            '<div class="generalsummary-places"></div>',
          '</div>',
        '</div>',
        '<div class="generalsummary-general-text"></div>',
        '<div class="generalsummary-tectonic-summary"></div>',
        '<div class="generalsummary-general-link"></div>',
    ].join('');

    _this.warningEl = el.querySelector('.generalsummary-warning');
    _locationEl = el.querySelector('.generalsummary-location');
    _timeEl = el.querySelector('.generalsummary-time');
    _nearbyPlacesEl = el.querySelector('.generalsummary-places');
    _generalTextEl = el.querySelector('.generalsummary-general-text');
    _tectonicSummaryEl = el.querySelector('.generalsummary-tectonic-summary');
    _generalLinkEl = el.querySelector('.generalsummary-general-link');
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    _this = null;
    _initialize = null;

    if (_generalHeaderViews) {
      _generalHeaderViews.forEach(function (view) {
        view.destroy();
      });
      _generalHeaderViews = null;
    }

    if (_generalLinkViews) {
      _generalLinkViews.forEach(function (view) {
        view.destroy();
      });
      _generalLinkViews = null;
    }

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

    _generalLinkEl = null;
    _generalTextEl = null;
    _locationEl = null;
    _nearbyPlacesEl = null;
    _tectonicSummaryEl = null;
    _timeEl = null;
  }, _this.destroy);

  /**
   * Get link for additional timezone information.
   *
   * @param time {Date}
   *     the event time.
   * @param title {String}
   *     the event title.
   *     default ''.
   * @return {String}
   *     markup for link to other time zones.
   */
  _this.getOtherTimeZoneLink = function (time, title) {
    var uri;

    title = title || '';
    uri = 'http://www.timeanddate.com/worldclock/fixedtime.html?iso=' +
        time.toISOString() + '&msg=' + title;
    uri = encodeURI(uri);

    return '<a target="_blank" href="' + uri + '">Times in other timezones</a>';
  };

  /**
   * Does a comparison of one Product against an array of Products to see if
   * the same "url" property already exists in the array.
   *
   * @param {boolean}
   *     return true if the link already exists in the array
   *
   */
  _this.isDuplicate = function (needle, haystack) {
    try {
      for (var i = 0; i < haystack.length; i++) {
        if (haystack[i].get('properties').url ===
            needle.get('properties').url) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  /**
   * Remove duplicate items from the array that have the same "url" property
   *
   * @param links {Array<Product>}
   *     An array of Products
   *
   */
  _this.removeDuplicateLinks = function (links) {
    var link,
        products;

    // add the first item since it cannot be a duplicate yet
    products = [];
    products.push(links[0]);

    // add all additional links that do not already exist in products array
    for (var i = 1; i < links.length; i++) {
      link = links[i];
      if (!_this.isDuplicate(link, products)) {
        products.push(link);
      }
    }

    return products;
  };

  _this.render = function () {
    var ev;

    ev = _this.model.get('event');

    _this.renderHeader(ev);
    _this.renderLocation(ev);
    _this.renderLocationWarning(ev);
    _this.renderTime(ev);
    _this.renderNearbyPlaces(ev);
    _this.renderGeneralText(ev);
    _this.renderTectonicSummary(ev);
    _this.renderGeneralLink(ev);
    _this.renderFooter(ev);
  };

  /**
   * Render module footer.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderFooter = function (ev) {
    var downloads,
        product,
        phase;

    Util.empty(_this.footer);
    if (!ev) {
      return;
    }

    product = ev.getPreferredOriginProduct();
    if (product) {
      phase = ev.getProductById('phase-data', product.get('source'),
          product.get('code'));
      if (phase) {
        product = phase;
      }
    }

    if (product) {
      downloads = _this.getProductFooter({
        product: product
      });
      if (downloads) {
        _this.footer.appendChild(downloads);
      }
    }
  };

  /**
   * Render any general-link products.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderGeneralLink = function (ev) {
    var el,
        links;

    // remove any existing views if re-rendering
    if (_generalLinkViews) {
      _generalLinkViews.forEach(function (view) {
        view.destroy();
      });
      _generalLinkViews = null;
    }

    // nothing to render if no event or link products
    if (!ev) {
      return;
    }
    links = ev.getProducts('general-link');
    if (links.length === 0) {
      return;
    }

    links = _this.removeDuplicateLinks(links);

    _generalLinkEl.innerHTML = '<h3>For More Information</h3>';
    el = _generalLinkEl.appendChild(document.createElement('ul'));
    _generalLinkViews = links.map(function (product) {
      var view;
      view = LinkProductView({
        el: el.appendChild(document.createElement('li')),
        model: product
      });
      view.render();
      return view;
    });
  };

  /**
   * Render any general-text products.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderGeneralText = function (ev) {
    var texts;

    if (_generalTextViews) {
      _generalTextViews.forEach(function (view) {
        view.destroy();
      });
      _generalTextViews = null;
    }

    Util.empty(_generalTextEl);
    if (!ev) {
      return;
    }
    texts = ev.getProducts('general-text');
    if (texts.length === 0) {
      return;
    }

    _generalTextViews = texts.map(function (product) {
      var view;
      view = TextProductView({
        el: _generalTextEl.appendChild(document.createElement('section')),
        model: product
      });
      view.render();
      return view;
    });
  };

  /**
   * Render module header.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderHeader = function (ev) {
    var products;

    if (_generalHeaderViews) {
      _generalHeaderViews.forEach(function (view) {
        view.destroy();
      });
      _generalHeaderViews = null;
    }

    Util.empty(_this.header);
    if (!ev) {
      return;
    }
    products = ev.getProducts('general-header');
    if (products.length === 0) {
      return;
    }

    _generalHeaderViews = products.map(function (product) {
      var view;
      view = TextProductView({
        el: _this.header.appendChild(document.createElement('section')),
        model: product
      });
      view.render();
      return view;
    });
  };

  /**
   * Render location information for the event.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderLocation = function (/*ev*/) {
    // only create location view on first render
    if (!_locationView) {
      _locationView = LocationView({
        el: _locationEl,
        formatter: _formatter,
        model: _this.model,
        module: _this
      });
      // only render first time, binds to model separately
      _locationView.render();
    }
  };

  /**
   * If location latitude extents are + or - 85 degrees show warning
   *
   * @param ev {CatalogEvent}
   *     the event.
   *
   * @return {String}
   *    warning markup.
   */
  _this.renderLocationWarning = function (ev) {
    var code,
        latitude,
        product;

    Util.empty(_this.warningEl);
    if (!ev) {
      return;
    }

    product = ev.getPreferredOriginProduct();

    code = product.get('code') || null;
    latitude = product.get('properties').latitude || null;

    if ((latitude > 85) || (latitude < -85)) {
      _this.warningEl.innerHTML =
        '<p class="alert warning">Due to the high latitude of this' +
        ' event, the location map does not show the correct location. We' +
        ' are working on a solution for this problem. To see the actual' +
        ' location we recommend using' +
        ' <a href="/earthquakes/feed/v1.0/detail/' + code + '.kml">' +
        'Google Earth KML' +
        '</a>.</p>';
    }
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
    var eventtype,
        product,
        summary;

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
    }
    Util.empty(_tectonicSummaryEl);

    if (!ev) {
      return;
    }

    summary = ev.getSummary();
    eventtype = summary.properties.type;
    if (eventtype === 'sonic boom') {
      // do not show tectonic summary on sonic boom events.
      return;
    }

    product = ev.getPreferredProduct('tectonic-summary');
    if (product) {
      _tectonicSummaryView = TextProductView({
        contentPath: 'tectonic-summary.inc.html',
        el: _tectonicSummaryEl,
        model: product
      });
    } else {
      product = ev.getPreferredOriginProduct();
      _tectonicSummaryView = GeoserveRegionSummaryView({
        el: _tectonicSummaryEl,
        model: product
      });
    }

    if (_tectonicSummaryView) {
      _tectonicSummaryView.render();
    }
  };

  /**
   * Render time information for the event.
   *
   * @param ev {CatalogEvent}
   *     the event.
   */
  _this.renderTime = function(ev) {
    var product,
        systemTimezoneOffset,
        time,
        title;

    Util.empty(_timeEl);
    if (!ev) {
      return;
    }

    product = ev.getPreferredOriginProduct();
    time = new Date(product.getProperty('eventtime'));
    systemTimezoneOffset = new Date().getTimezoneOffset() * -1;
    title = ev.getSummary().properties.title;

    _timeEl.innerHTML =
        '<h3>Time</h3>' +
        '<ol class="no-style">' +
        '<li>' +
          _formatter.datetime(time, 0) +
        '</li>' +
        '<li>' +
          _formatter.datetime(time, systemTimezoneOffset) +
          ' <abbr title="Your computer timezone setting">' +
          'in your timezone' +
          '</abbr>' +
        '</li>' +
        '<li>' +
          '<small>' + _this.getOtherTimeZoneLink(time, title) + '</small>' +
        '</li>' +
        '</ol>';
  };


  _initialize(options);
  options = null;
  return _this;
};


GeneralSummaryModule.ID = _ID;
GeneralSummaryModule.TITLE = _TITLE;

GeneralSummaryModule.hasContent = _hasContent;


module.exports = GeneralSummaryModule;
