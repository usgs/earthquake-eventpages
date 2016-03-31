'use strict';


var LinkProductView = require('core/LinkProductView'),
    Module = require('core/Module'),
    TextProductView = require('core/TextProductView'),
    Util = require('util/Util');


var _DEFAULTS = {

};


/**
 * Abstract module to serve as an extension point for summary-level modules.
 *
 */
var SummaryModule = function (options) {
  var _this,
      _initialize,

      _linkViews,
      _textViews;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    _this.clearLinks(true);
    _this.clearTexts(true);
  };


  /**
   * Destroys the views in the given views array and potentially re-initializes
   * the views array to an empty array.
   *
   * @param views {Array}
   *     An array of views to clear.
   */
  _this.clearViews = function (views) {
    if (views) {
      views.forEach(function (view) {
        view.destroy();
      });
    }
  };

  /**
   * Clears the views associated with link products.
   *
   * @param init {Boolean} Optional. Default false.
   *     Flag whether to re-initialize the views array. By default the views
   *     array is set to null, if true, initializes views array to empty array.
   *
   * @see #_this.clearViews
   */
  _this.clearLinks = function (init) {
    _this.clearViews(_linkViews);

    if (init) {
      _linkViews = [];
    } else {
      _linkViews = null;
    }
  };

  /**
   * Clears the views associated with text products.
   *
   * @param init {Boolean} Optional. Default false.
   *     Flag whether to re-initialize the views array. By default the views
   *     array is set to null, if true, initializes views array to empty array.
   *
   * @see #_this.clearViews
   */
  _this.clearTexts = function (init) {
    _this.clearViews(_textViews, init);

    if (init) {
      _textViews = [];
    } else {
      _textViews = null;
    }
  };

  /**
   * Helper method for creating a simple TR DOM element potentially with a
   * "preferred" class on it.
   *
   * @param preferred {Boolean}
   *     True if the "preferred" class should be added. False otherwise.
   *
   * @return {DOMElement}
   *     A TR DOM Element.
   */
  _this.createRow = function (preferred) {
    var row;

    row = document.createElement('tr');

    if (preferred) {
      row.classList.add('preferred');
    }

    return row;
  };

  /**
   * Helper method for creating a summary section for a type of product.
   *
   * @param products {Array}
   *     An array of {Product}s to summarize.
   * @param title {String}
   *     The header text to label this summary section.
   * @param labels {Array}
   *     An array of {String}s to use a column header text.
   * @param callback {Function}
   *     A callback function to execute for each product. This callback function
   *     should return a TR DOM element. The callback function expects a
   *     {Product} as its first parameter and an index {Number} as it's second
   *     parameter.
   *
   * @return {DocumentFragment}
   *     A document fragment containing the section summary, this could be
   *     empty if no products or labels are provided.
   */
  _this.createSummary = function (products, title, labels, callback) {
    var fragment,
        header,
        table,
        tbody,
        thead,
        wrapper;

    fragment = document.createDocumentFragment();

    if (products.length && labels.length) {
      header = fragment.appendChild(document.createElement('h3'));
      wrapper = fragment.appendChild(document.createElement('div'));
      table = wrapper.appendChild(document.createElement('table'));
      thead = table.appendChild(document.createElement('thead'));
      tbody = table.appendChild(document.createElement('tbody'));

      header.innerHTML = title;

      wrapper.classList.add('horizontal-scrolling');
      table.classList.add('table-summary');

      thead.innerHTML = '<tr><th scope="col">' +
          labels.join('</th><th scope="col">') + '</th></tr>';

      tbody.appendChild(products.reduce(function (fragment, product, index) {
        fragment.appendChild(callback(product, index));
        return fragment;
      }, document.createDocumentFragment()));
    }

    return fragment;
  };

  /**
   * Free resources associated with this module.
   *
   */
  _this.destroy = Util.compose(function () {
    _this.clearLinks();
    _this.clearTexts();

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Generates markup for a catalog column in the summary table. This includes
   * a link to the product details page as well as a preferred checkbox if
   * appropriate.
   *
   * @param module {Module}
   *     The module for which to generate the link.
   * @param product {Product}
   *     The product for which to generate the link.
   * @param preferred {Boolean}
   *     True if the current product is preferred, false otherwise.
   *
   * @return {String}
   *     The markup for the link to the product details page.
   */
  _this.getCatalogMarkup = function (module, product, preferred) {
    var markup,
        type;

    markup = [];
    type = _this.getBaseType(product.get('type'));

    if (preferred) {
      markup.push('<abbr title="Preferred ' + type +
        '" class="material-icons">check</abbr>');
    }

    markup.push('<a href="#' + module.ID + '?source=' + product.get('source') +
        '&amp;code=' + product.get('code') + '">' +
      product.getProperty('eventsource').toUpperCase() +
    '</a>');

    return markup.join('');
  };

  /**
   * Creates visualization for link products. Delegates to the
   * {LinkProductView}.
   *
   * @param products {Array}
   *     An array of products to generate visualizations for.
   *
   * @return {DocumentFragment}
   *     A fragment containing the markup for each text product.
   */
  _this.getLinks = function (products) {
    var fragment,
        list;

    fragment = document.createDocumentFragment();

    if (products.length) {
      fragment.appendChild(_this.getLinksHeader());
      list = fragment.appendChild(document.createElement('ul'));

      products.forEach(function (product) {
        var view;

        view = LinkProductView({
          el: list.appendChild(document.createElement('li')),
          model: product
        });
        view.render();

        _linkViews.push(view);
      });
    }

    return fragment;
  };

  /**
   * APIMethod.
   *
   * Implementing classes should override this method.
   *
   * @return {DOMElement}
   *     A header to label the links section for this {SummaryModule}. If no
   *     header is desired, return an empty {DocumentFragment}.
   */
  _this.getLinksHeader = function () {
    var header;

    header = document.createElement('h3');
    header.innerHTML = 'Related Links';

    return header;
  };

  /**
   * Creates visualization for text products. Delegates to the
   * {TextProductView}.
   *
   * @param products {Array}
   *     An array of products to generate visualizations for.
   *
   * @return {DocumentFragment}
   *     A fragment containing the markup for each text product.
   */
  _this.getTexts = function (products) {
    var fragment;

    fragment = document.createDocumentFragment();

    products.forEach(function (product) {
      var view;

      view = TextProductView({
        el: fragment.appendChild(document.createElement('div')),
        model: product
      });
      view.render();

      _textViews.push(view);
    });

    return fragment;
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = SummaryModule;
