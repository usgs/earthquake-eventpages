'use strict';

var Attribution = require('base/Attribution'),
    ProductSummarizer = require('base/ProductSummarizer'),
    SummaryDetailsPage = require('base/SummaryDetailsPage'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


/**
 * Construct a new FiniteFaultPage.
 *
 * @param options {Object}
 *        page options.
 * @see base/SummaryDetailsPage for additional options.
 */
var FiniteFaultPage = function (options) {
  options = Util.extend({}, options, {
    productType: 'finite-fault'
  });
  SummaryDetailsPage.call(this, options);
};

FiniteFaultPage.prototype = Object.create(SummaryDetailsPage.prototype);


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
        // make all content urls absolute instead of relative
        data = _this._replaceRelativePaths(data, product.contents);
        // insert content
        el.classList.add('finite-fault');
        el.innerHTML = '<small class="attribution">Data Source ' +
            Attribution.getContributorReference(product.source) +
            '</small>' +
            data;
      }
    });
  }

  return el;
};

FiniteFaultPage.prototype._getSummaryMarkup = function (product) {
  return ProductSummarizer.getFiniteFaultSummary(product);
};


// return constructor
module.exports = FiniteFaultPage;
