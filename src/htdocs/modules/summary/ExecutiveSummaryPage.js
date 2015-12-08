'use strict';


var EventModulePage = require('base/EventModulePage'),
    ProductSummarizer = require('base/ProductSummarizer'),

    Util = require('util/Util');


// Default values to be used by constructor
var _DEFAULTS = {

};


/**
 * Class: ExecutiveSummaryPage
 *
 * @param params {Object}
 *      Configuration options. See _DEFAULTS for more details.
 */
var ExecutiveSummaryPage = function (params) {
  var _this,
      _initialize;


  // Inherit from parent class
  _this = Object.create(EventModulePage.prototype);

  /**
   * @constructor
   *
   */
  _initialize = function () {
    params = Util.extend({}, _DEFAULTS, params);

    EventModulePage.call(_this, params);
  };


  _this.setContentMarkup = function () {
    var content,
        contentMarkup,
        eventDetails,
        products;

    content = _this._content;
    contentMarkup = [];
    eventDetails = _this._event;
    products = eventDetails.properties.products;

    // Origin product
    if (products.hasOwnProperty('origin') || products.hasOwnProperty('phase-data')) {
      contentMarkup.push(ProductSummarizer.getProductSummary('origin',
          'scientific_origin', 'Origin', eventDetails));
    }


    // Impact products
    if (products.hasOwnProperty('dyfi')) {
      contentMarkup.push(ProductSummarizer.getProductSummary(
          'dyfi', 'impact_dyfi', 'DYFI', eventDetails));
    }

    if (products.hasOwnProperty('shakemap')) {
      contentMarkup.push(ProductSummarizer.getProductSummary(
          'shakemap', 'impact_shakemap', 'ShakeMap', eventDetails));
    }

    if (products.hasOwnProperty('losspager')) {
      contentMarkup.push(ProductSummarizer.getProductSummary(
          'losspager', 'impact_losspager', 'PAGER', eventDetails));
    }


    // Scientific products (excluding origin)
    if (products.hasOwnProperty('moment-tensor')) {
      contentMarkup.push(ProductSummarizer.getProductSummary('moment-tensor',
          'scientific_tensor', 'Moment Tensor', eventDetails));
    }

    if (products.hasOwnProperty('focal-mechanism')) {
      contentMarkup.push(ProductSummarizer.getProductSummary('focal-mechanism',
          'scientific_mechanism', 'Focal Mechanism', eventDetails));
    }

    if (products.hasOwnProperty('finite-fault')) {
      contentMarkup.push(ProductSummarizer.getProductSummary('finite-fault',
          'scientific_finitefault', 'Finite Fault', eventDetails));
    }

    content.innerHTML = contentMarkup.join('');
  };


  // ------------------------------
  // Compatibility wedges ...
  // ------------------------------

  _this._setContentMarkup = _this.setContentMarkup;


  // Always call the constructor
  _initialize(params);
  params = null;
  return _this;
};


module.exports = ExecutiveSummaryPage;
