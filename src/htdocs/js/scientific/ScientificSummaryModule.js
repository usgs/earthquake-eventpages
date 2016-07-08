'use strict';


var Attribution = require('core/Attribution'),
    BeachBallView = require('moment-tensor/BeachBallView'),
    Formatter = require('core/Formatter'),
    Product = require('pdl/Product'),
    SummaryModule = require('core/SummaryModule'),
    Tensor = require('moment-tensor/Tensor'),
    Util = require('util/Util'),

    // these modules create a circular dependency,
    // require them in initialize
    FiniteFaultModule,
    FocalMechanismModule,
    MomentTensorModule,
    OriginModule;



var _DEFAULTS,
    _ID,
    _TITLE,
    _TYPES;


_ID = 'scientific';
_TITLE = 'Technical';
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
  _this = SummaryModule(options);

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

    // these modules create a circular dependency,
    // require them first time initialize is called
    FiniteFaultModule = FiniteFaultModule ||
        require('finite-fault/FiniteFaultModule');
    FocalMechanismModule = FocalMechanismModule ||
        require('focal-mechanism/FocalMechanismModule');
    MomentTensorModule = MomentTensorModule ||
        require('moment-tensor/MomentTensorModule');
    OriginModule = OriginModule ||
        require('origin/OriginModule');
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
  _this.getFiniteFaultSummary = function (products) {
    return _this.createSummary(products, 'Finite Fault', [
        'Catalog',
        'Preview',
        'Source'
      ],
      _this.getFiniteFaultRow
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
  _this.getFiniteFaultRow = function (product, index) {
    var map,
        preferred,
        row;

    map = product.getContent('basemap.png');
    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(FiniteFaultModule, product, preferred),
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
  _this.getFocalMechanismSummary = function (products) {
    return _this.createSummary(products, 'Focal Mechanism', [
        'Catalog',
        'Mechanism',
        'Nodal Plan 1<br/><small>Strike, Dip, Rake</small>',
        'Nodal Plan 1<br/><small>Strike, Dip, Rake</small>',
        'Source'
      ],
      _this.getFocalMechanismRow);
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
  _this.getFocalMechanismRow = function (product, index) {
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
        _this.getCatalogMarkup(FocalMechanismModule, product, preferred),
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

  _this.getLinksHeader = function () {
    var header;

    header = document.createElement('h3');
    header.innerHTML = 'Scientific and Technical Links';

    return header;
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
  _this.getMomentTensorSummary = function (products) {
    return _this.createSummary(products, 'Moment Tensor', [
        'Catalog',
        'Tensor',
        'Magnitude',
        'Depth',
        '% <abbr title="Double Couple">DC</abbr>',
        'Source'
      ],
      _this.getMomentTensorRow
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
  _this.getMomentTensorRow = function (product, index) {
    var beachball,
        preferred,
        row,
        tensor;

    tensor = Tensor.fromProduct(product);
    preferred = (index === 0);
    row = _this.createRow(preferred);

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(MomentTensorModule, product, preferred),
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
    var config,
        products;

    config = _this.model.get('config');

    if (ev) {
      products = ev.getProducts(Product.getFullType('origin', config)).map(
      function (origin) {
        var phase;

        // Find a corresponding phase-data product
        phase = ev.getProductById(Product.getFullType('phase-data', config),
            origin.get('source'), origin.get('code'));

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
  _this.getOriginSummary = function (products) {
    return _this.createSummary(products, 'Origin', [
        'Catalog',
        '<abbr title="Magnitude">Mag</abbr>',
        'Time',
        'Depth',
        'Review Status',
        'Location',
        'Source'
      ],
      _this.getOriginRow
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
  _this.getOriginRow = function (product, index) {
    var eventTime,
        preferred,
        reviewStatus,
        row;

    eventTime = new Date(product.getProperty('eventtime'));
    preferred = (index === 0);
    row = _this.createRow(preferred);
    reviewStatus = product.getProperty('review-status') || 'automatic';

    row.innerHTML = [
      '<th scope="row">',
        _this.getCatalogMarkup(OriginModule, product, preferred),
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
        reviewStatus.toUpperCase(),
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
   * Renders the module header, content, and footer.
   *
   */
  _this.render = function () {
    var faults,
        fragment,
        headers,
        links,
        mechs,
        origins,
        tensors,
        texts;

    fragment = document.createDocumentFragment();

    _this.clearLinks(true);
    _this.clearTexts(true);

    faults = _this.getProducts('finite-fault');
    headers = _this.getProducts('scitech-header');
    links = _this.getProducts('scitech-link');
    mechs = _this.getProducts('focal-mechanism');
    origins = _this.getOriginProducts(_this.model.get('event'));
    tensors = _this.getProducts('moment-tensor');
    texts = _this.getProducts('scitech-text');

    Util.empty(_this.header);
    _this.header.appendChild(_this.getTexts(headers));

    fragment.appendChild(_this.getOriginSummary(origins));
    fragment.appendChild(_this.getMomentTensorSummary(tensors));
    fragment.appendChild(_this.getFiniteFaultSummary(faults));
    fragment.appendChild(_this.getFocalMechanismSummary(mechs));
    fragment.appendChild(_this.getTexts(texts));
    fragment.appendChild(_this.getLinks(links));

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
