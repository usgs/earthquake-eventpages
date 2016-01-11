'use strict';

var Attribution = require('base/Attribution'),
    BeachBall = require('scientific/tensor/BeachBall'),
    SummaryPage = require('base/SummaryPage'),
    Tensor = require('scientific/tensor/Tensor'),
    Util = require('util/Util');


var __getBeachBall = function (params) {
  return new BeachBall(Util.extend({
    size: 30,
    plotAxes: false,
    plotPlanes: true
  }, params)).getCanvas().toDataURL();
};

var __getCatalogMarkup = function (params) {
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

  markup.push('<a href="#scientific_origin:' + product.source + '_' +
      product.code + '">' + properties.eventsource.toUpperCase() + '</a>');

  return markup.join('');
};

var __getMagnitudeMarkup = function (params) {
  var properties;

  properties = params.product.properties;

  return params.formatter.magnitude(properties.magnitude,
      properties['magnitude-type']);
};

var __getNPMarkup = function (params) {
  return ['(',
    params.formatter.fmStrike(params.plane.strike), ', ',
    params.formatter.fmDip(params.plane.dip), ', ',
    params.formatter.fmRake(params.plane.rake),
    ')'
  ].join('');
};

var __getSourceMarkup = function (params) {
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
};

var __getTensor = function (params) {
  if (!params.tensor) {
    params.tensor = Tensor.fromProduct(params.product);
  }

  return params.tensor;
};


var _DEFAULTS = {
  includeTypes: {
    origin: {
      display: 'Origin',
      columns: [
        {
          label: 'Catalog',
          value: __getCatalogMarkup
        },
        {
          label: '<abbr title="Magnitude and Type">Mag</abbr>',
          value: __getMagnitudeMarkup
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
          value: __getSourceMarkup
        }
      ]
    },
    'moment-tensor': {
      display: 'Moment Tensor',
      columns: [
        {
          label: 'Catalog',
          value: __getCatalogMarkup,
        },
        {
          label: 'Tensor',
          value: function (params) {
            var beachBall,
                product,
                tensor;

            product = params.product;
            tensor = __getTensor(params);

            beachBall = __getBeachBall({
              tensor: tensor,
              fillColor: tensor.fillColor
            });

            return [
              (tensor === null ? product.code :
                '<img src="' + beachBall + '" alt="Moment Tensor Beachball (' +
                    tensor.code + ')"/>')
            ].join('');
          }
        },
        {
          label: '<abbr title="Magnitude and Type">Mag</abbr>',
          value: function (params) {
            var tensor;

            tensor = __getTensor(params);

            if (tensor) {
              return params.formatter.magnitude(
                  tensor.magnitude, tensor.type);
            } else {
              return '&ndash;';
            }
          }
        },
        {
          label: 'Depth',
          value: function (params) {
            var tensor;

            tensor = __getTensor(params);

            return params.formatter.depth(tensor ? tensor.depth : null);
          }
        },
        {
          label: '% <abbr title="Double Couple">DC</abbr>',
          value: function (params) {
            var tensor;

            tensor = __getTensor(params);

            if (tensor) {
              return Math.round(tensor.percentDC * 100) + ' %';
            } else {
              return '&ndash;';
            }
          }
        },
        {
          label: 'Source',
          value: __getSourceMarkup
        }
      ]
    },
    'focal-mechanism': {
      display: 'Focal Mechanism',
      columns: [
        {
          label: 'Catalog',
          value: __getCatalogMarkup
        },
        {
          label: 'Mechanism',
          value: function (params) {
            var beachBall,
                tensor;

            tensor = __getTensor(params);
            beachBall = __getBeachBall({
              tensor: tensor,
              fillColor: tensor.fillColor
            });

            return '<img src="' + beachBall + '" alt="Focal Mechanism"/>';
          }
        },
        // {
        //   label: 'NP1 - Strike',
        //   value: function (params) {
        //     var strike,
        //         tensor;

        //     tensor = __getTensor(params);
        //     strike = tensor ? tensor.NP1.strike : null;

        //     return params.formatter.fmStrike(strike);
        //   }
        // },
        // {
        //   label: 'NP1 - Dip',
        //   value: function (params) {
        //     var dip,
        //         tensor;

        //     tensor = __getTensor(params);
        //     dip = tensor ? tensor.NP1.dip : null;

        //     return params.formatter.fmDip(dip);
        //   }
        // },
        // {
        //   label: 'NP1 - Rake',
        //   value: function (params) {
        //     var rake,
        //         tensor;

        //     tensor = __getTensor(params);
        //     rake = tensor ? tensor.NP1.rake : null;

        //     return params.formatter.fmRake(rake);
        //   }
        // },
        // {
        //   label: 'NP2 - Strike',
        //   value: function (params) {
        //     var strike,
        //         tensor;

        //     tensor = __getTensor(params);
        //     strike = tensor ? tensor.NP2.strike : null;

        //     return params.formatter.fmStrike(strike);
        //   }
        // },
        // {
        //   label: 'NP2 - Dip',
        //   value: function (params) {
        //     var dip,
        //         tensor;

        //     tensor = __getTensor(params);
        //     dip = tensor ? tensor.NP2.dip : null;

        //     return params.formatter.fmDip(dip);
        //   }
        // },
        // {
        //   label: 'NP2 - Rake',
        //   value: function (params) {
        //     var rake,
        //         tensor;

        //     tensor = __getTensor(params);
        //     rake = tensor ? tensor.NP2.rake : null;

        //     return params.formatter.fmRake(rake);
        //   }
        // },
        {
          label: 'Nodal Plane 1<br/><small>Strike,Dip,Rake</small>',
          value: function (params) {
            var tensor;

            tensor = __getTensor(params);

            return __getNPMarkup({
              formatter: params.formatter,
              plane: tensor.NP1
            });
          }
        },
        {
          label: 'Nodal Plane 2<br/><small>Strike,Dip,Rake</small>',
          value: function (params) {
            var tensor;

            tensor = __getTensor(params);

            return __getNPMarkup({
              formatter: params.formatter,
              plane: tensor.NP2
            });
          }
        },
        {
          label: 'Source',
          value: __getSourceMarkup
        }
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
