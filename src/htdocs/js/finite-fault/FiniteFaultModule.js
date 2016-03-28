'use strict';

var FiniteFaultView = require('finite-fault/FiniteFaultView'),
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
    if (_finiteFaultView) {
      _finiteFaultView.destroy();
      _finiteFaultView = null;
    }
    _initialize = null;
    _this = null;
  }, _this.destroy);


  /**
   * Renders the details for this module. Defers bulk of header Information
   * to generalized header rendering. Uses FiniteFaultView for bulk of
   * content rendering.
   *
   */
  _this.render = function () {
    var footer,
        product;

    // Destroy FiniteFaultView if it already exists
    if (_finiteFaultView && _finiteFaultView.destroy) {
      _finiteFaultView.destroy();
      _finiteFaultView = null;
    }

    _this.header.innerHTML = '<h3>Finite Fault</h3>';
    Util.empty(_this.content);
    Util.empty(_this.footer);

    product = _this.getProduct('finite-fault');
    if (!product) {
      _this.content.innerHTML =
          '<p class="alert warning">No Finite Fault Found</p>';
    } else {
      // Display review/preferred status in header section
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        // TODO create/add ScientificSummaryModule
        summaryModule: null
      }));

      // Display Finite Fault View in content section
      _finiteFaultView = FiniteFaultView({
        el: _this.content,
        model: product
      });
      _finiteFaultView.render();

      // Display downloads in footer section
      footer = _this.getProductFooter({
        product: product,
      });
      if (footer) {
        _this.footer.appendChild(footer);
      }
    }
  };

  _initialize();
  options = null;
  return _this;
};


FiniteFaultModule.ID = _ID;
FiniteFaultModule.TITLE = _TITLE;
FiniteFaultModule.TYPES = _TYPES;


module.exports = FiniteFaultModule;
