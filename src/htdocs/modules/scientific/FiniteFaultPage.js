'use strict';

var EventModulePage = require('base/EventModulePage'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


/**
 * Construct a new FiniteFaultPage.
 *
 * @param options {Object}
 *        page options.
 * @see base/EventModulePage for additional options.
 */
var FiniteFaultPage = function (options) {
  options = Util.extend({}, options, {
    productType: 'finite-fault'
  });
  EventModulePage.call(this, options);
};

FiniteFaultPage.prototype = Object.create(EventModulePage.prototype);


/**
 * Finite fault products have broken contents.xml, embed html instead.
 *
 * @param product {Object}
 *        finite-fault product.
 * @return {DOMElement} that is updated to contain html content.
 */
FiniteFaultPage.prototype.getDetailsContent = function (product) {
  var el = document.createElement('div'),
      path = product.properties.eventsourcecode + '.html',
      content = product.contents[path],
      url,
      baseURL,
      _this;

  if (content) {
    _this = this;
    // compute absolute base url
    url = content.url;
    baseURL = url.replace(path, '');
    // load content
    Xhr.ajax({
      url: url,
      success: function (data) {
        el.classList.add('finite-fault');
        // make all content urls absolute instead of relative
        el.innerHTML = _this._replaceRelativePaths(data, product.contents);
      }
    });
  }

  return el;
};


// return constructor
module.exports = FiniteFaultPage;
