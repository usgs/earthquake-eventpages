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

  // DYFI content
  if (products.hasOwnProperty('dyfi')) {
    product = products.dyfi[0];
    this.getPreferredSummaryMarkup(product, 'impact_dyfi', 'DYFI');
  }

  // Shakemap content
  if (products.hasOwnProperty('shakemap')) {
    product = products.shakemap[0];
    this.getPreferredSummaryMarkup(product, 'impact_shakemap', 'ShakeMap');
  }

  // Shakemap content
  if (products.hasOwnProperty('losspager')) {
    product = products.losspager[0];
    this.getPreferredSummaryMarkup(product, 'impact_pager', 'PAGER');
  }
};


module.exports = ImpactSummaryPage;
