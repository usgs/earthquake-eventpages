'use strict';

var AccordionView = require('core/AccordionView'),
    GeoserveRegionSummaryView = require('general/GeoserveRegionSummaryView'),
    LinkProductView = require('core/LinkProductView'),
    LocationView = require('general/LocationView'),
    Module = require('core/Module'),
    TextProductView = require('core/TextProductView'),
    Util = require('util/Util');


var _ID,
    _TITLE,

    _hasContent;


// Note: These should be overridden by each implementing sub-class.
_ID = 'general';
_TITLE = 'General';

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

};


var GeneralSummaryModule = function (options) {
  var _this,
      _initialize,

      _generalLinkEl,
      _generalLinks,
      _generalTextEl,
      _generalTexts,
      _locationEl,
      _locationView,
      _nearbyPlacesEl,
      _preferredOrigin,
      _tectonicSummaryEl,
      _tectonicSummaryView,
      _timeEl;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    var el;

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    try {
      _preferredOrigin = _this.model.get('event').getSummary().originProduct;
    } catch (e) {
      _preferredOrigin = null;
    }

    el = _this.content;
    el.innerHTML = [
        '<div class="row">',
          '<div class="column one-of-two">',
            '<div class="location"></div>',
          '</div>',
          '<div class="column one-of-two">',
            '<div class="time"></div>',
            '<div class="nearby-places"></div>',
          '</div>',
        '</div>',
        '<div class="general-text"></div>',
        '<div class="tectonic-summary"></div>',
        '<div class="general-link"></div>',
    ].join('');

    _locationEl = el.querySelector('.location');
    _timeEl = el.querySelector('.time');
    _nearbyPlacesEl = el.querySelector('.nearby-places');
    _generalTextEl = el.querySelector('.general-text');
    _tectonicSummaryEl = el.querySelector('.tectonic-summary');
    _generalLinkEl = el.querySelector('.general-link');
  };

  _this.render = function () {
    var ev;

    ev = _this.model.get('event');

    _this.renderLocation(ev);
    _this.renderTime(ev);
    _this.renderNearbyPlaces(ev);
    _this.renderGeneralText(ev);
    _this.renderTectonicSummary(ev);
    _this.renderGeneralLink(ev);
  };

  _this.destroy = Util.compose(function () {
    _this = null;
    _initialize = null;

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
    }

    if (_generalLinks) {
      _generalLinks.forEach(function (view) {
        view.destroy();
      });
      _generalLinks = null;
    }

    _generalLinkEl = null;
    _generalTextEl = null;
    _locationEl = null;
    _locationView.destroy();
    _locationView = null;
    _nearbyPlacesEl = null;
    _preferredOrigin = null;
    _tectonicSummaryEl = null;
    _timeEl = null;
  }, _this.destroy);

  /**
   * Render any general-link products.
   */
  _this.renderGeneralLink = function (ev) {
    var el,
        links;

    // remove any existing views if re-rendering
    if (_generalLinks) {
      _generalLinks.forEach(function (view) {
        view.destroy();
      });
      _generalLinks = null;
    }

    // nothing to render if no event or link products
    if (!ev) {
      return;
    }
    links = ev.getProducts('general-link');
    if (links.length === 0) {
      return;
    }

    _generalLinkEl.innerHTML = '<h3>For More Information</h3>';
    el = _generalLinkEl.appendChild(document.createElement('ul'));
    _generalLinks = links.map(function (product) {
      var view;
      view = LinkProductView({
        el: el.appendChild(document.createElement('li')),
        model: product
      });
      view.render();
      return view;
    });
  };

  _this.renderGeneralText = function (ev) {
    var texts;

    if (_generalTexts) {
      _generalTexts.forEach(function (view) {
        view.destroy();
      });
      _generalTexts = null;
    }

    if (!ev) {
      return;
    }
    texts = ev.getProducts('general-text');
    if (texts.length === 0) {
      return;
    }

    _generalTexts = [];
    Util.empty(_generalTextEl);
    _generalTexts = texts.map(function (product) {
      var view;
      view = TextProductView({
        el: _generalTextEl.appendChild(document.createElement('section')),
        model: product
      });
      view.render();
      return view;
    });
  };

  _this.renderLocation = function (/*ev*/) {
    // only create location view on first render
    if (!_locationView) {
      _locationView = LocationView({
        el: _locationEl,
        model: _preferredOrigin
      });
    }
    _locationView.render();
  };

  _this.renderNearbyPlaces = function () {
    _nearbyPlacesEl.innerHTML = '<h3>Nearby Places</h3>';
  };

  /**
   * Render the tectonic-summary product if available.
   */
  _this.renderTectonicSummary = function (ev) {
    var product;

    if (!ev) {
      return;
    }

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
    }

    product = ev.getPreferredOriginProduct();
    if (product && product.getProperty('eventtype') !== 'sonic boom') {
      _tectonicSummaryView = AccordionView({
        el: _tectonicSummaryEl,
        toggleElement: 'h3',
        toggleText: 'Regional Tectonic Summary',
        view: GeoserveRegionSummaryView({
          model: product
        })
      });
      _tectonicSummaryView.render();
    }
  };

  _this.renderTime = function(/*ev*/) {
    _timeEl.innerHTML = '<h3>Time</h3>';
  };


  _initialize(options);
  options = null;
  return _this;
};


GeneralSummaryModule.ID = _ID;
GeneralSummaryModule.TITLE = _TITLE;

GeneralSummaryModule.hasContent = _hasContent;


module.exports = GeneralSummaryModule;
