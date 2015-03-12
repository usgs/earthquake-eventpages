'use strict';

var EventModulePage = require('base/EventModulePage'),
    Util = require('util/Util');


// default options
var DEFAULTS = {
  title: 'Summary',
  hash: 'summary'
};


/**
 * Create a new ImpactSummaryPage.
 * @param options {Object}
 *        module options.
 */
var ImpactSummaryPage = function (options) {
  this._options = Util.extend({}, DEFAULTS, options);
  EventModulePage.call(this, this._options);
};

// extend EventModulePage
ImpactSummaryPage.prototype = Object.create(EventModulePage.prototype);

// Do not display a header
ImpactSummaryPage.prototype._setHeaderMarkup = function () {};

// Do not display a footer
ImpactSummaryPage.prototype._setFooterMarkup = function () {};

/**
 * Render page content.
 */
ImpactSummaryPage.prototype._setContentMarkup = function () {
  var products = this._options.eventDetails.properties.products,
      product;

  // Shakemap content
  if (products.hasOwnProperty('shakemap')) {
    product = products.shakemap[0];
    this._getPreferredSummaryMarkup(product, 'impact_shakemap', 'ShakeMap');
  }
};

ImpactSummaryPage.prototype._getPreferredSummaryMarkup = function (product, hash, name) {
  var preferredProductMarkup = document.createElement('section');

  this._options.module.getPage(hash, function (page) {
    var products = page.getProducts(),
        preferredLink = document.createElement('a');

    preferredProductMarkup.innerHTML = '<h3>' + name + '</h3>';
    preferredProductMarkup.appendChild(page.buildSummaryMarkup(product));

    // Add link to product-summary page when more than one product exists
    if (products.length > 1) {
      preferredLink.href = '#' + hash;
      preferredLink.className = 'view-all';
      preferredLink.innerHTML = 'View all ' + name + 's (' + products.length +
          ' total)';
      preferredProductMarkup.appendChild(preferredLink);
    }
  });

  this._content.appendChild(preferredProductMarkup);
};

module.exports = ImpactSummaryPage;
