'use strict';

var Product = require('pdl/Product'),
    View = require('mvc/View');


/**
 * View for a specific Product.
 *
 * @param options {Object}
 *     all options are passed to mvc/View.
 */
var ProductView = function (options) {
  var _this;

  // Make sure the model used for this view is a pdl/Product
  options = options || {};
  options.model = options.model || Product();

  _this = View(options);

  options = null;
  return _this;
};


module.exports = ProductView;
