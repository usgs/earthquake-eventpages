'use strict';


var ContentView = require('core/ContentView'),
    Product = require('pdl/Product'),
    Quakeml = require('quakeml/Quakeml'),
    Util = require('util/Util');


var _DEFAULTS = {

};


/**
 * Abstract view for displaying quakeml.xml {Content} object.
 *
 * @param options {Object}
 *     Configuration options for this view. See _initialize method
 *     documentation for details.
 */
var QuakemlView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ContentView(options);

  /**
   * Constructor. Initializes a new {QuakemlView}.
   *
   * @param options {Object}
   *     Configuration options for this view.
   * @param options.model {Content}
   *     The content model to render.
   * @param options.product {Product}
   *     The product that contains the given {Content}. Typically an origin
   *     or phase-data product.
   */
  _initialize = function (options) {
    _this.product = options.product || Product();
  };


  /**
   * Frees resources allocated to this view.
   *
   */
  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;
  }, _this.destroy);


  /**
   * Callback executed when fetchData fails. Displays an error message.
   *
   * @param status {String}
   *     An error message. Currently ignored.
   * @param xhr {XMLHttpRequest}
   *     The XHR object used to fetch the data.
   */
  _this.onError = function (/*status, xhr*/) {
    _this.el.innerHTML = '<p class="alert error">' +
        'Failed to load quakeml data.</p>';
  };

  /**
   * Callback executed when fetchData succeeds. Parses and renders the
   * quakeml data and triggers an event offering the parsed quakeml back
   * so others can save the effort.
   *
   * @param data {String}
   *     The raw QuakeML XML string content.
   * @param xhr {XMLHttpRequest}
   *     The XHR object used to fetch the data.
   *
   */
  _this.onSuccess = function (data/*, xhr*/) {
    try {
      _this.quakeml = Quakeml({xml: data});

      _this.render();

      // Let others know about our success so they don't have to download
      // and parse it themselves...
      _this.trigger('quakeml', _this.quakeml);
    } catch (e) {
      // Ignore ...
      console.log(e.stack);
    }
  };

  /**
   * Fetches quakeml based on the current model, or renders it if the quakeml
   * is already available. Delegates to sub methods.
   *
   */
  _this.render = function () {
    if (!_this.quakeml) {
      // Don't have quakeml yet, try to get it
      _this.el.innerHTML = '<p>Loading content&hellip;</p>';
      _this.fetchData();
    } else {
      _this.renderQuakeml();
    }
  };

  /**
   * Renders the quakeml.
   *
   */
  _this.renderQuakeml = function () {
    _this.el.innerHTML = JSON.stringify(_this.quakeml);
  };

  /**
   * Sets the quakeml to render. This is useful in case some external party
   * already downloaded/parsed the quakeml, thus saving time internally.
   *
   * @param quakeml {Quakeml}
   *     The parsed Quakeml to render.
   */
  _this.setQuakeml = function (quakeml) {
    _this.quakeml = quakeml;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = QuakemlView;
