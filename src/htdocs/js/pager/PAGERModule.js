'use strict';

var ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Module = require('core/Module'),
    Util = require('util/Util');

var _ID,
    _TITLE,
    _TYPES;

_ID = 'pager';
_TITLE = 'PAGER';
_TYPES = ['losspager'];

var PAGERModule = function (options) {

  var _this,
      _initialize;

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
   * to generalized header rendering. Uses {ShakeMapView} for bulk of content
   * rendering.
   *
   */
  _this.render = function () {
    var product;

    _this.header.innerHTML = '<h3>PAGER</h3>';

    product = _this.getProduct('losspager');
    if (!product) {
      _this.content.innerHTML =
          '<p class="alert warning">No PAGER Found</p>';
    } else {
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        summaryModule: ImpactSummaryModule
      }));

      // TODO :: Load content from PAGERView
      _this.content.innerHTML = '<p class="alert info">TODO :: create PAGERView</p>';
    }

    _this.footer.innerHTML =
      '<h3>For More Information</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="/research/pager/">Scientific Background on PAGER</a>' +
        '</li>' +
      '</ul>';
  };

  _initialize();
  options = null;
  return _this;
};


PAGERModule.ID = _ID;
PAGERModule.TITLE = _TITLE;
PAGERModule.TYPES = _TYPES;


module.exports = PAGERModule;