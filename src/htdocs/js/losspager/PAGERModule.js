'use strict';


var ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Module = require('core/Module'),
    PagerView = require('losspager/PAGERView'),
    Util = require('util/Util');


var _ID,
    _TITLE,
    _TYPES;

_ID = 'pager';
_TITLE = 'PAGER';
_TYPES = ['losspager'];


var PAGERModule = function (options) {
  var _this,
      _initialize,

      _pagerView;

  options = Util.extend({}, options);
  _this = Module(options);

  _initialize = function () {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };


  _this.destroy = Util.compose(function () {
    if (_pagerView) {
      _pagerView.destroy();
    }

    _pagerView = null;

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
    var downloads,
        product;

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

      if (!_pagerView) {
        _pagerView = PagerView({
          el: _this.content,
          model: product
        });
      }

      _pagerView.render();

      downloads = _this.getProductFooter({product: product});
    }

    _this.footer.innerHTML =
      '<h3>For More Information</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="/data/pager/">Scientific Background for PAGER</a>' +
        '</li>' +
      '</ul>';

    if (downloads) {
      _this.footer.appendChild(downloads);
    }
  };


  _initialize();
  options = null;
  return _this;
};


PAGERModule.ID = _ID;
PAGERModule.TITLE = _TITLE;
PAGERModule.TYPES = _TYPES;


module.exports = PAGERModule;
