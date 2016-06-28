'use strict';


var Attribution = require('core/Attribution'),
    Module = require('core/Module'),
    ProductView = require('core/ProductView'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: {ID: '', TITLE: 'Module Title'}
};


/**
 * This class provides a base class from which others can inherit. It
 * defines a simple API for creating custom "pins" for the executive summary
 * section of the event pages. This class extends a ProductView.
 *
 * Each pin is composed of a header, content, and footer section. The
 * header contains, by convention, the product title that links to the product
 * details. The footer contains, by convention, contributor information for
 * the product. The content is much more free-form and is typically the
 * part that is overridden by implementing sub-classes.
 *
 *
 * @param options {Object}
 *     See constructor documentation for details.
 *
 *
 * @see BasicPinView#renderPinContent
 * @see BasicPinView#renderPinFooter
 * @see BasicPinView#renderPinHeader
 *
 */
var BasicPinView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  /**
   * Initializes the skeleton layout and stores references to DOM containers
   * for subsequent rendring.
   *
   *
   * @param options {Object}
   *     Configuration options for this view, in addition to what is supported
   *     in a standard ProductView, you may provide...
   * @param options.module {Module}
   *     An object containing an "ID" and "TITLE" property. The ID property is
   *     used to create a link to the product page and the TITLE property is
   *     used as the link text.
   *
   */
  _initialize = function (options) {
    _this.module = options.module || Module;

    _this.el.innerHTML = [
      '<section class="pin-view">',
        '<header class="pin-header"></header>',
        '<div class="pin-content"></div>',
        '<footer class="pin-footer"></footer>',
      '</section>'
    ].join('');

    _this.header = _this.el.querySelector('.pin-header');
    _this.content = _this.el.querySelector('.pin-content');
    _this.footer = _this.el.querySelector('.pin-footer');
  };


  /**
   * Frees resources associated with this view.
   *
   */
  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Render the header, content, and footer sections of this pin.
   *
   * @return {BasicPinView}
   *     Returns a reference to this view for method chaining...
   *
   */
  _this.render = function () {
    _this.renderPinHeader();
    _this.renderPinContent();
    _this.renderPinFooter();

    return _this;
  };

  /**
   * @APIMethod
   *
   * Render the content section of the pin. Implementing sub-classes will
   * likely want to override this method.
   *
   */
  _this.renderPinContent = function () {
    _this.content.innerHTML = 'Pin Content';
  };

  /**
   * @APIMethod
   *
   * Render the footer section of the pin.
   *
   */
  _this.renderPinFooter = function () {
    _this.footer.innerHTML = 'Contributed by ' +
        Attribution.getProductAttribution(_this.model);
  };

  /**
   * @APIMethod
   *
   * Render the header section of the pin.
   *
   */
  _this.renderPinHeader = function () {
    var fragment,
        display;

    // Use module ID and TITLE to create a link
    fragment = _this.module.ID;
    display = _this.module.TITLE;

    _this.header.innerHTML = [
      '<a href="#', fragment, '">', display, '</a>'
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = BasicPinView;
