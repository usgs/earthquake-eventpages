'use strict';

var ProductView = require('core/ProductView'),
    Util = require('util/Util');


/**
 * View for losspager product.
 *
 * @param options {object}
 *    all options are passed to ProductView.
 */
var PAGERView = function (options) {
  var _this,
      _initialize;

  _this = ProductView(options);

  _initialize = function () {

  };

  /**
   * Destroy all the things.
   */
  _this.destroy = Util.compose(function () {
    _this = null;
    _initialize = null;
  }, _this.destroy);

  /**
   * Called when the model changes. Initially sets a loading message
   *
   *
   */
  _this.render = function () {
    _this.el.innerHTML = 'Loading content&hellip;';
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = PAGERView;
