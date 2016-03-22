'use strict';

var FiniteFaultView = require('finitefault/FiniteFaultView'),
    Module = require('core/Module'),
    Util = require('util/Util');

var _ID,
    _TITLE,
    _TYPES;

_ID = 'finite-fault';
_TITLE = 'Finite Fault';
_TYPES = ['finite-fault'];

var FiniteFaultModule = function (options) {

  var _this,
      _initialize,

      _finiteFaultView;

  options = Util.extend({}, options);
  _this = Module(options);

  _initialize = function () {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };

  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;
  }, _this.destroy);


  /**
   * Renders the details for this module. Defers bulk of header Information
   * to generalized header rendering. Uses {PAGERView} for bulk of content
   * rendering.
   *
   */
  _this.render = function () {
    var product;

    _this.header.innerHTML = '<h3>Finite Fault</h3>';

    product = _this.getProduct('finite-fault');
    if (!product) {
      _this.content.innerHTML =
          '<p class="alert warning">No Finite Fault Found</p>';
    } else {
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        summaryModule: null // TODO add ScientificSummaryModule
      }));

      // Load Finite Fault View
      _finiteFaultView = FiniteFaultView({
        el: _this.content,
        model: product
      });
      _finiteFaultView.render();
    }

    // remove module-footer, there is no content
    _this.el.removeChild(_this.footer);

  };

  _initialize();
  options = null;
  return _this;
};


FiniteFaultModule.ID = _ID;
FiniteFaultModule.TITLE = _TITLE;
FiniteFaultModule.TYPES = _TYPES;


module.exports = FiniteFaultModule;