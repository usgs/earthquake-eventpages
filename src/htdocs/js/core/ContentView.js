'use strict';

var View = require('mvc/View');


/**
 * View for a specific Content.
 *
 * @param options {Object}
 *     all options are passed to mvc/View.
 */
var ContentView = function (options) {
  var _this;

  _this = View(options);

  // TODO: render summary information

  options = null;
  return _this;
};


module.exports = ContentView;
