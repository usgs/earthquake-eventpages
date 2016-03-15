'use strict';


var ModalView = require('mvc/ModalView'),
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
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  /**
   * Initialize the new module.
   *
   * @param options {Object}
   */
  _initialize = function (/*options*/) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
    _this.TYPES = _TYPES;

    _this.modal = ModalView();
  };


  /**
   * Free resources associated with this Module and then call parent
   * destroy method as well.
   *
   */
  _this.destroy = Util.compose(function () {
    // TODO
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};


InteractiveMapModule.ID = _ID;
InteractiveMapModule.TITLE = _TITLE;
InteractiveMapModule.TYPES = _TYPES;


module.exports = InteractiveMapModule;
