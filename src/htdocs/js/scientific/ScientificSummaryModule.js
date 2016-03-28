'use strict';


var Attribution = require('core/Attribution'),
    BeachBallView = require('moment-tensor/BeachBallView'),
    Formatter = require('core/Formatter'),
    Module = require('core/Module'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util');


var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;


_ID = 'scientific-summary';
_TITLE = 'Scientific Summary';
_TYPES = [
  'origin',
  'phase-data',
  'moment-tensor',
  'focal-mechanism',
  'finite-fault',
  'scitech-link'
];

_DEFAULTS = {
  mtFillColor: '#6ea8ff',
  fmFillColor: '#ffaa69'
};


/**
 * Module for the scientific summary page. This module renders a table-like
 * set of summary-level data for the products contained within the "scientific"
 * section of the event page.
 *
 * @param options {Object}
 *     Configuration options for this module. See initialize documentation for
 *     details.
 */
var ScientificSummaryModule = function (options) {
  var _this,
      _initialize,

      _fmFillColor,
      _formatter,
      _mtFillColor;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  /**
   * Constructor. Initializes a new {ScientificSummaryModule}.
   *
   * @param options {Object}
   *     Configuration options for the module. Specifically...
   * @param options.mtFillColor {String}
   *     A hexadecimal color to be used when rendering moment tensors.
   * @param options.fmFillColor {String}
   *     A hexadecimal color to be used when rendering focal mechanisms.
   */
  _initialize = function (options) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;

    _formatter = options.formatter || Formatter();
    _mtFillColor = options.mtFillColor;
    _fmFillColor = options.fmFillColor;
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
  _this.createTable = function (products, title, labels, callback) {
    var fragment,
        header,
        table,
        tbody,
        thead,
        wrapper;

    fragment = document.createDocumentFragment();

    if (products.length && labels.length) {
      header = fragment.appendChild(document.createElement('h2'));
      wrapper = fragment.appendChild(document.createElement('div'));
      table = wrapper.appendChild(document.createElement('table'));
      thead = table.appendChild(document.createElement('thead'));
      tbody = table.appendChild(document.createElement('tbody'));

      header.innerHTML = title;

      wrapper.classList.add('horizontal-scrolling');
      table.classList.add('table-summary');

      thead.innerHTML = '<tr><th scope="row">' +
          labels.join('</th><th scope="row">') + '</th></tr>';

      tbody.appendChild(products.reduce(function (fragment, product, index) {
        fragment.appendChild(callback(product, index));
        return fragment;
      }, document.createDocumentFragment()));
    }

    return fragment;
  };

  /**
   * Frees resources associated with this module.
   *
   */
  _this.destroy = Util.compose(function () {
    _fmFillColor = null;
    _formatter = null;
    _mtFillColor = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Creates the summary section for the finite fault product(s).
   *
   * @param products {Array}
   *     An array of products to summarize.
   *
   * @return {DocumentFragment}
   *     A (potentially empty) document fragment containing the summary for
   *     the given set of products.
   */
  _this.getFiniteFaultTable = function (products) {
    return _this.createTable(products, 'Finite Fault', [
        'Catalog',
        'Preview',
        'Source'
      ],
      _this.getFiniteFaultTableRow
    );
  };

  /**
   * Creates a row with summary information for the given product.
   *
   * @param product {Product}
   *     The product to summarize
   * @param index {Number}
   *     The place in which this product ranks among other products of the
   *     same type within the context of the current event. 0 = most preferred
   *
   * @return {DOMElement}
   *     A TR DOM element.
   */
  _this.getFiniteFaultTableRow = function (product, index) {
    var map,
        preferred,
        row;

    map = product.getContent('basemap.png');
    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getProductLinkMarkup(product, preferred),
      '</th>',
      '<td>',
        '<img src="', map.get('url'), '" class="image" alt="Finite Fault"/>',
      '</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>'
    ].join('');

    return row;
  };

  /**
   * Creates the summary section for the focal mechanism product(s).
   *
   * @param products {Array}
   *     An array of products to summarize.
   *
   * @return {DocumentFragment}
   *     A (potentially empty) document fragment containing the summary for
   *     the given set of products.
   */
  _this.getFocalMechanismTable = function (products) {
    return _this.createTable(products, 'Focal Mechanism', [
        'Catalog',
        'Mechanism',
        'Nodal Plan 1<br/><small>Strike,Dip,Rake</small>',
        'Nodal Plan 1<br/><small>Strike,Dip,Rake</small>',
        'Source'
      ],
      _this.getFocalMechanismTableRow);
  };

  /**
   * Creates a row with summary information for the given product.
   *
   * @param product {Product}
   *     The product to summarize
   * @param index {Number}
   *     The place in which this product ranks among other products of the
   *     same type within the context of the current event. 0 = most preferred
   *
   * @return {DOMElement}
   *     A TR DOM element.
   */
  _this.getFocalMechanismTableRow = function (product, index) {
    var beachball,
        np1,
        np2,
        preferred,
        row,
        tensor;

    preferred = (index === 0);
    row = _this.createRow(preferred);

    tensor = Tensor.fromProduct(product);
    np1 = tensor.NP1;
    np2 = tensor.NP2;

    row.innerHTML = [
      '<th scope="row">',
        _this.getProductLinkMarkup(product, preferred),
      '</th>',
      '<td class="beachball"></td>',
      '<td>(',
        _formatter.angle(np1.strike), ', ',
        _formatter.angle(np1.dip), ', ',
        _formatter.angle(np1.rake),
      ')</td>',
      '<td>(',
        _formatter.angle(np2.strike), ', ',
        _formatter.angle(np2.dip), ', ',
        _formatter.angle(np2.rake),
      ')</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>'
    ].join('');

    beachball = BeachBallView({
      el: row.querySelector('.beachball'),
      fillColor: _fmFillColor,
      labelAxes: false,
      labelPlanes: false,
      size: 30,
      tensor: tensor
    });

    beachball.render();
    beachball.destroy();
    beachball = null;

    return row;
  };

  /**
   * Creates the summary section for the moment tensor product(s).
   *
   * @param products {Array}
   *     An array of products to summarize.
   *
   * @return {DocumentFragment}
   *     A (potentially empty) document fragment containing the summary for
   *     the given set of products.
   */
  _this.getMomentTensorTable = function (products) {
    return _this.createTable(products, 'Moment Tensor', ['Catalog', 'Tensor',
        'Magnitude and Type', 'Depth',
        '% <abbr title="Double Couple">DC</abbr>', 'Source'],
        _this.getMomentTensorTableRow);
  };

  /**
   * Creates a row with summary information for the given product.
   *
   * @param product {Product}
   *     The product to summarize
   * @param index {Number}
   *     The place in which this product ranks among other products of the
   *     same type within the context of the current event. 0 = most preferred
   *
   * @return {DOMElement}
   *     A TR DOM element.
   */
  _this.getMomentTensorTableRow = function (product, index) {
    var beachball,
        preferred,
        row,
        tensor;

    tensor = Tensor.fromProduct(product);
    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getProductLinkMarkup(product, preferred),
      '</th>',
      '<td class="beachball"></td>',
      '<td>',
        _formatter.magnitude(
          tensor.magnitude,
          product.getProperty('derived-magnitude-type') || 'Mw'
        ),
      '</td>',
      '<td>',
        _formatter.depth(tensor.depth, 'km'),
      '</td>',
      '<td>',
        Math.round(tensor.percentDC * 100) + ' %',
      '</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>'
    ].join('');

    beachball = BeachBallView({
      el: row.querySelector('.beachball'),
      fillColor: _mtFillColor,
      labelAxes: false,
      labelPlanes: false,
      size: 30,
      tensor: tensor
    });

    beachball.render();
    beachball.destroy();
    beachball = null;

    return row;
  };

  /**
   * Checks origin and phase-data type products on the given event. Prefers
   * phase-data from the same source and code unless there is a newer
   * corresponding origin.
   *
   * @param ev {CatalogEvent}
   *     The event to check.
   *
   * @return {Array}
   *     An array of {Product}s of either origin or phase-data type. Most
   *     preferred product first.
   */
  _this.getOriginProducts = function (ev) {
    var products;

    if (ev) {
      products = ev.getProducts('origin').map(function (origin) {
        var phase;

        // Find a corresponding phase-data product
        phase = ev.getProductById('phase-data', origin.get('source'),
            origin.get('code'));

        // Prefer the phase-data product if it is at least as new as the origin
        if (phase && phase.get('updateTime') >= origin.get('updateTime')) {
          return phase;
        } else {
          return origin;
        }
      });
    } else {
      products = [];
    }

    return products;
  };

  /**
   * Creates the summary section for the origin product(s).
   *
   * @param products {Array}
   *     An array of products to summarize.
   *
   * @return {DocumentFragment}
   *     A (potentially empty) document fragment containing the summary for
   *     the given set of products.
   */
  _this.getOriginTable = function (products) {
    return _this.createTable(products, 'Origin', ['Catalog',
        '<abbr title="Magnitude">Mag</abbr>', 'Time', 'Depth', 'Status',
        'Location', 'Source'],
        _this.getOriginTableRow);
  };

  /**
   * Creates a row with summary information for the given product.
   *
   * @param product {Product}
   *     The product to summarize
   * @param index {Number}
   *     The place in which this product ranks among other products of the
   *     same type within the context of the current event. 0 = most preferred
   *
   * @return {DOMElement}
   *     A TR DOM element.
   */
  _this.getOriginTableRow = function (product, index) {
    var eventTime,
        preferred,
        row;

    eventTime = new Date(product.getProperty('eventtime'));
    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getProductLinkMarkup(product, preferred),
      '</th>',
      '<td>',
        _formatter.magnitude(
          product.getProperty('magnitude'),
          product.getProperty('magnitude-type')
        ),
      '</td>',
      '<td>',
        '<abbr title="', _formatter.datetime(eventTime, 0), '">',
          _formatter.time(eventTime),
        '</abbr>',
      '</td>',
      '<td>',
        _formatter.depth(product.getProperty('depth')),
      '</td>',
      '<td>',
        product.getProperty('review-status').toUpperCase(),
      '</td>',
      '<td>',
        _formatter.location(
          product.getProperty('latitude'),
          product.getProperty('longitude')
        ),
      '</td>',
      '<td>',
        Attribution.getProductAttribution(product),
      '</td>'
    ].join('');

    return row;
  };

  /**
   * Generates markup for a link to the product details page.
   *
   * @param product {Product}
   *     The product for which to generate the link.
   * @param preferred {Boolean}
   *     True if the current product is preferred, false otherwise.
   *
   * @return {String}
   *     The markup for the link to the product details page.
   */
  _this.getProductLinkMarkup = function (product, preferred) {
    var markup,
        type;

    markup = [];
    type = product.get('type');

    // phase-data are actually rendered by the origin module
    if (type === 'phase-data') {
      type = 'origin';
    }

    if (preferred) {
      markup.push('<abbr title="Preferred ' + type +
        '" class="material-icons">check</abbr>');
    }

    markup.push('<a href="#' + type + '?source=' + product.get('source') +
        '&amp;code=' + product.get('code') + '">' +
      product.getProperty('eventsource').toUpperCase() +
    '</a>');

    return markup.join('');
  };

  /**
   * Generate links for scientific and technical link products.
   *
   * @param products {Array}
   *     An array of scitech-link {Product}s.
   *
   * @return {DocumentFragment}
   *     A fragment containing links for each given product.
   */
  _this.getScitechLinks = function (products) {
    var fragment,
        header,
        list;

    fragment = document.createDocumentFragment();

    if (products.length) {
      header = fragment.appendChild(document.createElement('h2'));
      list = fragment.appendChild(document.createElement('ul'));

      list.classList.add('scitech-links');

      header.innerHTML = 'Scientific and Technical Links';
      list.innerHTML = products.reduce(function (markup, product) {
        markup.push([
          '<li class="scitech-link">',
            '<a href="', product.getProperty('url'), '">',
              product.getProperty('text'),
            '</a>',
          '</li>'
        ].join(''));
        return markup;
      }, []).join('');
    }

    return fragment;
  };

  /**
   * Renders the module header, content, and footer.
   *
   */
  _this.render = function () {
    var ev,
        faults,
        fragment,
        links,
        mechs,
        origins,
        tensors;

    fragment = document.createDocumentFragment();
    ev = _this.model.get('event');

    faults = ev.getProducts('finite-fault');
    links = ev.getProducts('scitech-link');
    mechs = ev.getProducts('focal-mechanism');
    origins = _this.getOriginProducts(ev);
    tensors = ev.getProducts('moment-tensor');

    fragment.appendChild(_this.getOriginTable(origins));
    fragment.appendChild(_this.getMomentTensorTable(tensors));
    fragment.appendChild(_this.getFiniteFaultTable(faults));
    fragment.appendChild(_this.getFocalMechanismTable(mechs));
    fragment.appendChild(_this.getScitechLinks(links));

    _this.header.innerHTML = '';

    Util.empty(_this.content);
    _this.content.appendChild(fragment);

    _this.footer.innerHTML = '';
  };

  _initialize(options);
  options = null;
  return _this;
};


ScientificSummaryModule.ID = _ID;
ScientificSummaryModule.TITLE = _TITLE;
ScientificSummaryModule.TYPES = _TYPES;


module.exports = ScientificSummaryModule;
