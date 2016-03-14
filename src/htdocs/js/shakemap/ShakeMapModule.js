'use strict';

var ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Module = require('core/Module'),
    ShakeMapView = require('shakemap/ShakeMapView'),
    Util = require('util/Util');


var _ID,
    _TITLE,
    _TYPES;


// Note: These should be overridden by each implementing sub-class.
_ID = 'shakemap';
_TITLE = 'ShakeMap';
_TYPES = ['shakemap'];


var _DEFAULTS = {

};


/**
 * Bridges the event page framework with the product rendering.
 *
 */
var ShakeMapModule = function (options) {
  var _this,
      _initialize,

      _shakeMapView;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  /**
   * Initialize a new module.
   *
   * @see Module#_initialize
   */
  _initialize = function (/*options*/) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };


  /**
   * Destroy this module and sub-view(s).
   *
   */
  _this.destroy = Util.compose(function () {
    if (_shakeMapView) {
      _shakeMapView.destroy();
    }
    _shakeMapView = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Renders the details for this module. Defers bulk of header Information
   * to generalized header rendering. Uses {ShakeMapView} for bulk of content
   * rendering.
   *
   */
  _this.render = function () {
    var product;


    _this.header.innerHTML = '<h3>ShakeMap</h3>';

    product = _this.getProduct('shakemap');
    if (!product) {
      _this.content.innerHTML =
          '<p class="alert warning">No ShakeMap Found</p>';
    } else {
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        summaryModule: ImpactSummaryModule
      }));

      // Load content from ShakeMapView
      _shakeMapView = ShakeMapView({
        el: _this.content,
        model: product
      });

      _shakeMapView.render();
    }

    _this.footer.innerHTML =
      '<h3>For More Information</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="http://usgs.github.io/shakemap">ShakeMap Manual</a>' +
        '</li>' +
      '</ul>';
  };


  _initialize(options);
  options = null;
  return _this;
};


ShakeMapModule.ID = _ID;
ShakeMapModule.TITLE = _TITLE;
ShakeMapModule.TYPES = _TYPES;


module.exports = ShakeMapModule;
