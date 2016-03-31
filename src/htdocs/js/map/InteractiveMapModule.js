'use strict';


var Events = require('util/Events'),
    InteractiveMapView = require('map/InteractiveMapView'),
    ModalView = require('mvc/ModalView'),
    Module = require('core/Module'),
    Util = require('util/Util');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;

_ID = 'map';
_TITLE = 'Interactive Map';
_TYPES = ['origin'];

_DEFAULTS = {

};


/**
 * The module handles interaction between the InteractiveMapView and the larger
 * EventPage framework. There are two top-level components to this module:
 *
 * The first is the background, in-page, content. This content is very simple
 * and only used as a fallback to allow navigation or to re-open the modal view.
 *
 * The second top-level component is the modal view itself. This view provides
 * the container into which the map itself will be rendered.
 *
 * Closing the map will navigate the page to either (1) the previous EventPage
 * module that the user was viewing or (2) the default EventPage module in the
 * case that the user was linked directly into the map.
 *
 * @param options {Object}
 *      See documentation on _initialize method for details.
 */
var InteractiveMapModule = function (options) {
  var _this,
      _initialize,

      _closeButton,
      _mapView,
      _modal,
      _scenarioBadge;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  /**
   * Initialize the new module.
   *
   * @param options {Object}
   */
  _initialize = function (options) {
    var config;

    _this.ID = _ID;
    _this.TITLE = _TITLE;
    _this.TYPES = _TYPES;

    config = _this.model.get('config');

    _this.content.addEventListener('click', _this.onContentClick);

    _mapView = InteractiveMapView({
      formatter: options.formatter,
      model: _this.model,
      module: _this
    });

    _modal = ModalView(_mapView.el, {
      buttons: null, // no footer
      title: null    // no header
    });

    _modal.el.classList.add('modal-map');
    _this.appendCloseButton();

    if (config && config.SCENARIO_MODE === true) {
      _this.appendScenarioBadge();
    }
  };


  _this.appendCloseButton = function () {
    if (!_closeButton) {
      _closeButton = _modal.el.appendChild(document.createElement('button'));
      _closeButton.classList.add('cancel');
      _closeButton.classList.add('modal-close');
      _closeButton.innerHTML = 'Close Map';

      _closeButton.addEventListener('click', _this.onCloseButtonClick);
    }
  };

  _this.appendScenarioBadge = function () {
    if (!_scenarioBadge) {
      _scenarioBadge = _modal.el.appendChild(document.createElement('div'));
      _scenarioBadge.classList.add('scenario-badge');
      _scenarioBadge.classList.add('leaflet-control');
      _scenarioBadge.innerHTML = 'Scenario';
    }
  };

  /**
   * Free resources associated with this Module and then call parent
   * destroy method as well.
   *
   */
  _this.destroy = Util.compose(function () {
    _this.content.removeEventListener('click', _this.onContentClick);
    _closeButton.removeEventListener('click', _this.onCloseButtonClick);

    _mapView.destroy();
    _modal.hide();
    _modal.destroy();

    _mapView = null;
    _modal = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.onCloseButtonClick = function () {
    Events.trigger('back');
  };

  /**
   * Delegatede event listener to capture clicks on the button and show
   * the modal view. This is a fallback so user can get back to map if
   * they somehow end up viewing the background content of this module.
   *
   */
  _this.onContentClick = function (ev) {
    if (ev.target && ev.target.classList.contains('show-map')) {
      _this.showMap();
    }
  };

  /**
   * Renders the background information and then shows the map.
   *
   */
  _this.render = function () {
    // Do basic background rendering stuff. This will largely go unseen.
    _this.header.innerHTML = '<a class="back-to-summary-link" ' +
        'href="#">Back to General</a>';
    _this.content.innerHTML = '<button class="show-map">Show Map</button>';
    _this.footer.innerHTML = '';

    _this.showMap();
  };

  /**
   * Shows the map and notifies the sub-view that its content is in the DOM
   * so the view can invalidate dimensions etc...
   *
   */
  _this.showMap = function () {
    _modal.show();
    _mapView.onDomReady();
  };


  _initialize(options);
  options = null;
  return _this;
};


InteractiveMapModule.ID = _ID;
InteractiveMapModule.TITLE = _TITLE;
InteractiveMapModule.TYPES = _TYPES;


module.exports = InteractiveMapModule;
