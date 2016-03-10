'use strict';


var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter');

/**
 * This class extends the {ContentView} class and is specifically used
 * for rendering "contents.xml" for a given product. The `options.model` should
 * be of type {Content}.
 *
 *
 * @param options {Object}
 *     An object containing configuration options for this view.
 *
 * @param options.formatter {Formatter}
 *     The formatter object to use for formatting intrinsic values.
 */
var DYFIIntensityGraphView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = options || {};
  _this = ContentView(options);

  /**
   * @Constructor
   *
   * Initializes the view. See class level documentation for details.
   */
  _initialize = function (options) {
    _formatter = options.formatter || Formatter();

    // TODO :: Remove console.log
    console.log(_this.model.get());
  };


  _this.render = function () {
    _this.el.innerHTML = '<p>This is the DYFIIntensityGraphView.</p>';
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = DYFIIntensityGraphView;