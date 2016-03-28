'use strict';

var ProductView = require('core/ProductView'),
    Util = require('util/Util');


/**
 * View to display a link product.
 *
 * Uses product properties `text` and `url`.
 *
 * @param options {Object}
 *     passed to ProductView.
 */
var LinkProductView = function (options) {
  var _this;

  _this = ProductView(options);


  /**
   * Render link into this view's element.
   */
  _this.render = function () {
    var el,
        product,
        text,
        url;

    product = _this.model;
    text = product.getProperty('text');
    url = product.getProperty('url');

    if (url) {
      el = document.createElement('a');
      el.setAttribute('href', url);
    } else {
      el = document.createElement('span');
    }
    el.classList.add(product.get('type'));

    if (text) {
      el.innerHTML = text;
    } else {
      el.innerHTML = 'No link text available';
    }

    Util.empty(_this.el);
    _this.el.appendChild(el);
  };


  return _this;
};


module.exports = LinkProductView;
