'use strict';

var Attribution = require('base/Attribution'),
    SummaryPage = require('base/SummaryPage'),

    Util = require('util/Util');


var _DEFAULTS = {
  includeTypes: {
    origin: {
      display: 'Origin',
      columns: [
        {
          label: 'Catalog',
          value: function (params) {
            var markup,
                product,
                properties;

            product = params.product;
            properties = product.properties;
            markup = [];


            if (params.preferred) {
              markup.push('<abbr title="Preferred ' + params.product.type +
                  '" class="material-icons">check</abbr>');
            }

            markup.push('<a href="#scientific_origin:' + product.source + '_' + product.code + '">' + properties.eventsource.toUpperCase() + '</a>');

            return markup.join('');
          }
        },
        {
          label: '<abbr title="Magnitude">Mag</abbr>',
          value: function (params) {
            var properties;

            properties = params.product.properties;

            return params.formatter.magnitude(properties.magnitude,
                properties['magnitude-type']);
          }
        },
        {
          label: 'Time',
          value: function (params) {
            return params.formatter.time(new Date(Date.parse(
                params.product.properties.eventtime)));
          }
        },
        {
          label: 'Depth',
          value: function (params) {
            return params.formatter.depth(params.product.properties.depth);
          }
        },
        {
          label: 'Status',
          value: function (params) {
            return params.product.properties['review-status'].toUpperCase();
          }
        },
        {
          label: 'Location',
          value: function (params) {
            var properties;

            properties = params.product.properties;

            return params.formatter.location(properties.latitude,
                properties.longitude);
          }
        },
        {
          label: 'Source',
          value: function (params) {
            var magnitudeSource,
                source,
                originSource,
                product,
                properties;

            product = params.product;
            properties = product.properties;
            source = [];

            originSource = properties['origin-source'] || product.source;
            magnitudeSource = properties['magnitude-source'] || product.source;

            source.push(Attribution.getContributorReference(originSource));

            if (originSource !== magnitudeSource) {
              source.push(Attribution.getContributorReference(magnitudeSource));
            }

            return source.join('');
          }
        }
        // source
      ]
    }
  }
};

var ScientificSummaryPage = function (params) {
  this._options = Util.extend({}, _DEFAULTS, params);

  SummaryPage.call(this, this._options);
};

ScientificSummaryPage.prototype = Object.create(SummaryPage.prototype);

module.exports = ScientificSummaryPage;

// 'use strict';

// var EventModulePage = require('base/EventModulePage'),
//     Formatter = require('base/Formatter'),
//     Util = require('util/Util');


// // default options
// var DEFAULTS = {
//   title: 'Summary',
//   hash: 'summary',
//   formatter: new Formatter()
// };


// /**
//  * Create a new ScientificSummaryPage.
//  * @param options {Object}
//  *        module options.
//  */
// var ScientificSummaryPage = function (options) {
//   this._options = Util.extend({}, DEFAULTS, options);
//   EventModulePage.call(this, this._options);
// };

// // extend EventModulePage
// ScientificSummaryPage.prototype = Object.create(EventModulePage.prototype);

// // Do not display a header
// ScientificSummaryPage.prototype._setHeaderMarkup = function () {};
// // Do not display a footer
// ScientificSummaryPage.prototype._setFooterMarkup = function () {};

// /**
//  * Render page content.
//  */
// ScientificSummaryPage.prototype._setContentMarkup = function () {
//   var products = this._options.eventDetails.properties.products,
//       product;

//   // Hypocenter content
//   if (products.hasOwnProperty('origin')) {
//     product = products.origin[0];
//     this.getPreferredSummaryMarkup(product, 'scientific_origin', 'Origin');
//   }

//   // Moment Tensor content
//   if (products.hasOwnProperty('moment-tensor')) {
//     product = products['moment-tensor'][0];
//     this.getPreferredSummaryMarkup(product, 'scientific_tensor', 'Moment Tensor');
//   }

//   // Focal Mechanism content
//   if (products.hasOwnProperty('focal-mechanism')) {
//     product = products['focal-mechanism'][0];
//     this.getPreferredSummaryMarkup(product, 'scientific_mechanism', 'Focal Mechanism');
//   }

//   // Finite Fault content
//   if (products.hasOwnProperty('finite-fault')) {
//     product = products['finite-fault'][0];
//     this.getPreferredSummaryMarkup(product, 'scientific_finitefault', 'Finite Fault');
//   }

//   // scitech-text content
//   //this.getTexts();
//   this._content.appendChild(this.getTexts());

//   // scitech-links content
//   this._content.appendChild(this.getLinks());
// };

// /**
//  * Get any scitech-text information.
//  *
//  * @return {DOMElement} content, or null if no information present.
//  */
// ScientificSummaryPage.prototype.getTexts = function () {
//   var fragment = document.createDocumentFragment(),
//       products = this._event.properties.products,
//       texts = products['scitech-text'],
//       textEl = null,
//       i,
//       len;

//   if (texts) {
//     textEl = document.createElement('div');
//     textEl.className = 'scitech-text';
//     textEl.innerHTML = '<h3>Scientific and Technical Commentary</h3>';
//     fragment.appendChild(textEl);

//     for (i = 0, len = texts.length; i < len; i++) {
//       textEl.appendChild(this.getText(texts[i]));
//     }
//   }

//   return fragment;
// };

// ScientificSummaryPage.prototype.getText = function (product) {
//   var el = document.createElement('section'),
//       content,
//       contents = product.contents;

//   if (contents && contents['']) {
//     content = contents[''].bytes;
//     content = this._replaceRelativePaths(content, product.contents);

//     el.innerHTML = content;
//   }

//   return el;
// };

// /**
//  * Get any scitech-link information.
//  *
//  * @return {DocumentFragment}
//  *         Fragment with links, or empty if no information present.
//  */
// ScientificSummaryPage.prototype.getLinks = function () {
//   var fragment = document.createDocumentFragment(),
//       products = this._event.properties.products,
//       links = products['scitech-link'],
//       linkEl = null,
//       i,
//       item,
//       len,
//       list;

//   if (links) {
//     linkEl = document.createElement('div');
//     linkEl.className = 'scitech-links';
//     linkEl.innerHTML = '<h3>Scientific and Technical Links</h3>';
//     fragment.appendChild(linkEl);

//     list = document.createElement('ul');
//     linkEl.appendChild(list);

//     for (i = 0, len = links.length; i < len; i++) {
//       item = document.createElement('li');
//       item.appendChild(this.getLink(links[i]));
//       list.appendChild(item);
//     }
//   }

//   return fragment;
// };

// /**
//  * Create an anchor element from a link product.
//  *
//  * @param product {Object}
//  *        The link product.
//  * @return {DOMEElement}
//  *         anchor element.
//  */
// ScientificSummaryPage.prototype.getLink = function (product) {
//   var el = document.createElement('a'),
//       props = product.properties;

//   el.setAttribute('href', props.url);
//   el.innerHTML = props.text;

//   return el;
// };


// module.exports = ScientificSummaryPage;
