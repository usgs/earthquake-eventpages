'use strict';

var EventModulePage = require('base/EventModulePage'),
    Formatter = require('base/Formatter'),
    Util = require('util/Util'),

    Tensor = require('./tensor/Tensor');


// default options
var DEFAULTS = {
  title: 'Summary',
  hash: 'summary',
  formatter: new Formatter()
};


/**
 * Create a new ScientificSummaryPage.
 * @param options {Object}
 *        module options.
 */
var ScientificSummaryPage = function (options) {
  this._options = Util.extend({}, DEFAULTS, options);
  EventModulePage.call(this, this._options);
};

// extend EventModulePage
ScientificSummaryPage.prototype = Object.create(EventModulePage.prototype);

/**
 * Render page content.
 */
ScientificSummaryPage.prototype._setContentMarkup = function () {
  var products = this._options.eventDetails.properties.products,
      product;

  // Hypocenter content
  if (products.hasOwnProperty('origin')) {
    product = products.origin[0];
    this._getPreferredSummaryMarkup(product, 'scientific_origin', 'Origin');
  }

  // Moment Tensor content
  if (products.hasOwnProperty('moment-tensor')) {
    product = Tensor.fromProduct(products['moment-tensor'][0]);
    this._getPreferredSummaryMarkup(product, 'scientific_tensor', 'Moment Tensor');
  }

  // Focal Mechanism content
  if (products.hasOwnProperty('focal-mechanism')) {
    product = Tensor.fromProduct(products['focal-mechanism'][0]);
    this._getPreferredSummaryMarkup(product, 'scientific_mechanism', 'Focal Mechanism');
  }

  // Finite Fault content
  if (products.hasOwnProperty('finite-fault')) {
    product = products['finite-fault'][0];
    this._getPreferredSummaryMarkup(product, 'scientific_finitefault', 'Finite Fault');
  }

  // scitech-text content
  this.getText();

  // scitech-links content
  this.getLinks();
};

ScientificSummaryPage.prototype._getPreferredSummaryMarkup = function (product, hash, name) {
  var preferredProductMarkup = document.createElement('section');

  this._options.module.getPage(hash, function (page) {
    var products = page.getProducts(),
        preferredLink = document.createElement('a');

    preferredProductMarkup.innerHTML = '<h3>' + name + '</h3>';
    preferredProductMarkup.appendChild(page.buildSummaryMarkup(product));

    // Add link to product-summary page when more than one product exists
    if (products.length > 1) {
      preferredLink.href = '#' + hash;
      preferredLink.className = 'view-all';
      preferredLink.innerHTML = 'View all ' + name + 's (' + products.length +
          ' total)';
      preferredProductMarkup.appendChild(preferredLink);
    }
  });

  this._content.appendChild(preferredProductMarkup);
};

/**
 * Get any scitech-text information.
 *
 * @return {DOMElement} content, or null if no information present.
 */
ScientificSummaryPage.prototype.getText = function () {
  var products = this._event.properties.products,
      texts = products['scitech-text'],
      textEl = null,
      buf,
      i,
      len,
      text;

  if (texts) {
    textEl = document.createElement('div');
    textEl.className = 'scitech-text';

    buf = [];
    buf.push('<h3>Scientific and Technical Commentary</h3>');
    for (i = 0, len = texts.length; i < len; i++) {
      text = texts[i].contents[''].bytes;
      buf.push('<section>', text, '</section>');
    }

    textEl.innerHTML = buf.join('');
  }

  if (textEl !== null) {
    this._content.appendChild(textEl);
  }
};

/**
 * Get any scitech-link information.
 *
 * @return {DOMElement} links, or null if no information present.
 */
ScientificSummaryPage.prototype.getLinks = function () {
  var products = this._event.properties.products,
      links = products['scitech-link'],
      linkEl = null,
      buf,
      i,
      len,
      link;

  if (links) {
    linkEl = document.createElement('div');
    linkEl.className = 'scitech-links';

    buf = [];
    buf.push('<h3>Scientific and Technical Links</h3>');
    buf.push('<ul>');
    for (i = 0, len = links.length; i < len; i++) {
      link = links[i].properties;
      buf.push('<li><a href="', link.url, '">', link.text, '</a></li>');
    }
    buf.push('</ul>');
    linkEl.innerHTML = buf.join('');
  }

  if (linkEl !== null) {
    this._content.appendChild(linkEl);
  }
};


module.exports = ScientificSummaryPage;
