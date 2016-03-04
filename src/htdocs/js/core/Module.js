'use strict';

var Formatter = require('core/Formatter'),
    Util = require('util/Util'),
    View = require('mvc/View');

var _ID,
    _TITLE,
    _TYPES,

    _hasContent;


// Note: These should be overridden by each implementing sub-class.
_ID = 'module';
_TITLE = 'Default Module';
_TYPES = [];

_hasContent = function (/*eventPageModel*/) {
  return true;
};

var _DEFAULTS = {

};


var Module = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (options) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;

    _formatter = options.formatter || Formatter();
  };

  /**
   * Get a product header.
   *
   * @param options {Object}
   * @param options.product {Product}
   *     product to summarize.
   * @param options.summaryModule {Module}
   *     default null.
   *     include link to module with all versions of `product`.
   */
  _this.getProductHeader = function(options) {
    var buf,
        el,
        ev,
        numProducts,
        preferred,
        product,
        reviewed,
        type,
        summaryModule;

    product = options.product;
    summaryModule = options.summaryModule;

    buf = [];
    ev = _this.model.get('event');
    type = product.get('type');
    preferred = (ev.getPreferredProduct(type) === product);
    reviewed = product.isReviewed();

    if (summaryModule) {
      numProducts = ev.getProducts(type).length;
      buf.push('<a class="back-to-summary-link"' +
          ' href="#'  + summaryModule.ID + '">');
      if (numProducts > 1) {
        buf.push('View all ' + _this.TITLE + 's (' + numProducts + ' total)');
      } else {
        buf.push('Back to ' + summaryModule.TITLE);
      }
      buf.push('</a>');
    }

    buf.push('<small class="attribution">' +
        'Contributed by TODO' +
        ' last updated ' + _formatter.datetime(product.get('updateTime')) +
        '</small>');

    buf.push('<ul class="quality-statements no-style">');
    if (preferred) {
      buf.push('<li class="preferred">' +
          'The data below is the most preferred data available' +
          '</li>');
    } else {
      buf.push('<li class="unpreferred">' +
          'The data below is <strong>NOT</strong>' +
          ' the most preferred data available' +
          '</li>');
    }
    if (reviewed === true) {
      buf.push('<li class="reviewed">' +
          'The data below has been reviewed by a scientist' +
          '</li>');
    } else if (reviewed === false) {
      // only claim product is unreviewed if review-status property was set.
      buf.push('<li class="unreviewed">' +
          'The data below has <strong>NOT</strong>' +
          ' been reviewed by a scientist.' +
          '</li>');
    }
    buf.push('</ul>');

    el = document.createElement('div');
    el.classList.add('product-header');
    el.innerHTML = buf.join('');
    return el;
  };

  _this.render = function () {
    // TODO :: Implement
    _this.el.innerHTML = [
      '<div class="module-header">',
        '<h3>Module Header</h3>',
      '</div>',
      '<div class="module-content">',
        '<h3>Module Content</h3>',
      '</div>',
      '<div class="module-footer">',
        '<h3>Module Footer</h3>',
      '</div>'
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


Module.ID = _ID;
Module.TITLE = _TITLE;
Module.TYPES = _TYPES;

Module.hasContent = _hasContent;


module.exports = Module;
