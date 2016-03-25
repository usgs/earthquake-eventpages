'use strict';

var LocationView = require('general/LocationView'),
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
      _generalTextEl,
      _locationEl,
      _locationView,
      _nearbyPlacesEl,
      _preferredOrigin,
      _tectonicSummaryEl,
      _tectonicSummaryView,
      _timeEl,

      _renderGeneralLink,
      _renderGeneralText,
      _renderLocation,
      _renderNearbyPlaces,
      _renderTectonicSummary,
      _renderTime;


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
    _renderLocation();
    _renderTime();
    _renderNearbyPlaces();
    _renderGeneralText();
    _renderTectonicSummary();
    _renderGeneralLink();
  };

  _this.destroy = Util.compose(function () {
    _this = null;
    _initialize = null;

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
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

    _renderGeneralLink = null;
    _renderGeneralText = null;
    _renderLocation = null;
    _renderNearbyPlaces = null;
    _renderTectonicSummary = null;
    _renderTime = null;
  }, _this.destroy);

  _renderGeneralLink = function () {
    _generalLinkEl.innerHTML = '<h3>For More Information</h3>';
  };

  _renderGeneralText = function () {
    _generalTextEl.innerHTML = '<h3>General Text</h3>';
  };

  _renderLocation = function () {
    // only create location view on first render
    if (!_locationView) {
      _locationView = LocationView({
        el: _locationEl,
        model: _preferredOrigin
      });
    }
    _locationView.render();
  };

  _renderNearbyPlaces = function () {
    _nearbyPlacesEl.innerHTML = '<h3>Nearby Places</h3>';
  };

  _renderTectonicSummary = function () {
    var ev,
        product;

    ev = _this.model.get('event');
    if (!ev) {
      return;
    }

    if (_tectonicSummaryView) {
      _tectonicSummaryView.destroy();
      _tectonicSummaryView = null;
    }

    product = _this.getProduct('tectonic-summary');
    if (product && product.getContent('tectonic-summary.inc.html')) {
      _tectonicSummaryView = TextProductView({
        contentPath: 'tectonic-summary.inc.html',
        el: _tectonicSummaryEl,
        model: product
      });
      _tectonicSummaryView.render();
    }
  };

  _renderTime = function() {
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
