'use strict';

var Attribution = require('base/Attribution'),
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
      baseURL;

  if (content) {
    // compute absolute base url
    url = content.url;
    baseURL = url.replace(path, '');
    // load content
    Xhr.ajax({
      url: url,
      success: function (data) {
        // make all content urls absolute instead of relative
        var path;
        for (path in product.contents) {
          data = data.replace('"' + path + '"', baseURL + path);
        }
        // insert content
        el.innerHTML = '<small class="attribution">Data Source ' +
            Attribution.getContributorReference(product.source) +
            '</small>' +
            data;
      }
    });
  }

  this._content.appendChild(el);
};

FiniteFaultPage.prototype._getSummaryMarkup = function (product) {
  var basemap = product.contents['basemap.png'];

  return '<ul>' +
        '<li class="image">' +
          '<img src="' + basemap.url + '" alt="Finite Fault" />' +
        '</li>' +
        '<li>' +
          Attribution.getContributorReference(product.source) +
          '<abbr title="Finite Fault Data Source">Source</abbr>' +
        '</li>' +
      '</ul>';
};


// return constructor
module.exports = FiniteFaultPage;
