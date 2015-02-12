/* global define */
define([
  'base/EventModule',

  'util/Util',
  'base/ContentsXML',
  'base/Attribution',
  'accordion/Accordion'
], function (
  EventModule,

  Util,
  ContentsXML,
  Attribution,
  Accordion
) {
  'use strict';

  var DEFAULTS = {
    // URL hash fragment identifying this page; unique within the parent module.
    hash: 'page',

    // Title of this specific module page
    title: 'Page'
  };

  var EventModulePage = function (options) {

    options = options || {};

    this._eventPage = options.eventPage || null;
    this._module = options.module || new EventModule();
    this._hash = options.hash || DEFAULTS.hash;
    this._title = options.title || DEFAULTS.title;
    this._event = options.eventDetails;
    this._productTypes = options.productTypes;

    this._initialize();
  };

  EventModulePage.prototype.destroy = function () {
    // TODO
  };

  EventModulePage.prototype.getHeader = function () {
    return this._header;
  };

  EventModulePage.prototype.getContent = function () {
    return this._content;
  };

  EventModulePage.prototype.getFooter = function () {
    return this._footer;
  };

  EventModulePage.prototype.getHash = function () {
    return this._hash;
  };

  EventModulePage.prototype.getTitle = function () {
    return this._title;
  };

  EventModulePage.prototype._initialize = function () {
    this._header = document.createElement('header');
    Util.addClass(this._header, 'event-module-header');
    Util.addClass(this._header, 'clearfix');

    this._content = document.createElement('section');
    Util.addClass(this._content, 'event-module-content');
    Util.addClass(this._content, 'clearfix');

    this._footer = document.createElement('footer');
    Util.addClass(this._footer, 'event-module-footer');
    Util.addClass(this._footer, 'clearfix');
    this.loadDownloadMarkup = this.loadDownloadMarkup.bind(this);

    this._setHeaderMarkup();
    this._setContentMarkup();
    this._setFooterMarkup();
  };

  EventModulePage.prototype._setHeaderMarkup = function () {
    this._header.innerHTML = this._module.getHeaderMarkup(this);
  };

  EventModulePage.prototype._setContentMarkup = function () {
    this._content.innerHTML = '<p>' +
      'Rendered: ' + (new Date()).toUTCString() +
    '</p>';
  };

  EventModulePage.prototype._setFooterMarkup = function () {
    var footerMarkup = this._module.getFooterMarkup(this),
        el;

    this.setDownloadMarkup();

    //This isn't currently used. But it makes sense to leave it.
    if (typeof footerMarkup === 'string') {

      if (footerMarkup !== '') {
        el = document.createElement('div');
        el.innerHTML = footerMarkup;
        footerMarkup = el;
      } else {
        footerMarkup = null;
      }
    }

    if (footerMarkup) {
      this._footer.appendChild(footerMarkup);
    }
  };

  EventModulePage.prototype.setDownloadMarkup = function () {
    var products,
        el;
    //Get a list of products to add to the downloads list.
    products = this.getProducts();

    //IRIS page, and tests can return no products.
    if (products.length !== 0) {

      el = document.createElement('section');
      new Accordion({
        el: el,
        accordions: [{
          toggleText: 'Downloads',
          toggleElement: 'h3',
          contentText: '<div class="page-downloads"></div>',
          classes: 'accordion-standard accordion-closed accordion-page-downloads'
        }]
      });

      this._footer.appendChild(el);

      el.addEventListener('click', this.loadDownloadMarkup);
      this._downloadsEl = el;
    }
  };

  EventModulePage.prototype.loadDownloadMarkup = function (e) {
    var products = this.getProducts(),
        i;

    e.preventDefault();
    this._downloadsEl.removeEventListener('click',this.loadDownloadMarkup);

    for (i=0; i< products.length; i++) {
      this.getDownloads(products[i]);
    }
  };

  /**
   * Find the products to display on this page.
   *
   * @return {Array<Object>} allProducts,
   *         all products that match options.productTypes.
   *
   */
  EventModulePage.prototype.getProducts = function () {
    var productTypes = this._productTypes,
        products = [],
        allProducts = [],
        type;

    // loop through different productTypes
    if (productTypes) {
      for (var i = 0; i < productTypes.length; i++) {
        type = productTypes[i];
        products = this._event.properties.products[type] || [];
        allProducts = allProducts.concat(products);
      }
    }

    return allProducts;
  };

  /**
   * Gets the downloadable products and attachs to the footer.
   */
  EventModulePage.prototype.getDownloads = function (product) {
    var el = document.createElement('dl'),
        downloadEl = this._downloadsEl.querySelector('.page-downloads'),
        statusEl = document.createElement('p');

    el.className = 'page-download';
    statusEl.innerHTML = 'Loading contents &hellip;';

    downloadEl.appendChild(statusEl);
    downloadEl.appendChild(el);

    new ContentsXML({
      product: product,
      callback: function (contents) {
      // build content
        var header = '<dt class="product">' +
            '<h4 class="type">' + product.type +
              ' <small>(' + product.code + ')</small>' +
            '</h4>' +
            '<small class="attribution">Contributed by ' +
                Attribution.getContributorReference(product.source) +
            '</small>' +
          '</dt>';
        downloadEl.removeChild(statusEl);
        el.innerHTML = header + contents.getDownloads();
      },
      errback: function (contents,err) {
        if (err.message === 'product has no contents.xml content') {
          downloadEl.removeChild(el);
          downloadEl.removeChild(statusEl);
        } else {
          statusEl.className = 'alert error';
          statusEl.innerHTML = 'Unable to load downloads &hellip;';
        }
      }
    });
  };


  EventModulePage.prototype.getCatalogSummary = function (product) {
    var props = product.properties,
        eventSource = props.eventsource,
        eventSourceCode = props.eventsourcecode,
        eventId = '';

    if (eventSource) {
      eventId = (eventSource + eventSourceCode).toLowerCase();
    }

    return '<span>' +
          (eventSource ? eventSource.toUpperCase() : '&ndash;') +
          '</span>' +
          '<abbr title="' + eventId + '">Catalog</abbr>';
  };

  EventModulePage.prototype.getCatalogDetail = function (product) {
    var props = product.properties,
        eventSource = props.eventsource,
        eventSourceCode = props.eventsourcecode,
        eventId = '';

    if (!eventSource) {
      return '&ndash';
    }

    eventId = (eventSource + eventSourceCode).toLowerCase();
    return eventSource.toUpperCase() + ' <small>(' + eventId + ')</small>';
  };


  return EventModulePage;
});
