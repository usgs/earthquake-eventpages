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
      properties,
      type;

  product = params.product;
  properties = product.properties;
  markup = [];
  type = product.type;

  if (type === 'phase-data') {
    type = 'origin';
  }


  if (params.preferred) {
    markup.push('<abbr title="Preferred ' + type +
        '" class="material-icons">check</abbr>');
  }

  markup.push('<a href="#scientific_' + type + ':' + product.source + '_' +
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
    params.formatter.fmStrike(params.plane.strike), ',',
    params.formatter.fmDip(params.plane.dip), ',',
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
            var stamp;

            stamp = new Date(params.product.properties.eventtime);

            return '<abbr title="' +
                params.formatter.datetime(stamp, 0) + '">' +
              params.formatter.time(stamp, 0) +
            '</abbr>';
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
    },
    'finite-fault': {
      display: 'Finite Fault',
      columns: [
        {
          label: 'Catalog',
          value: __getCatalogMarkup
        },
        {
          label: 'Preview',
          value: function (params) {
            var basemap,
                product;

            product = params.product;
            basemap = product.contents['basemap.png'];

            return '<img class="image" src="' + basemap.url +
                '" alt="Finite Fault"/>';
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


ScientificSummaryPage.prototype._setContentMarkup = function () {
  var additionalContent;

  SummaryPage.prototype._setContentMarkup.call(this);

  // Now add scitech-text and scitech-link products to this page
  additionalContent = document.createDocumentFragment();

  additionalContent.appendChild(this._getTextContents());
  additionalContent.appendChild(this._getLinkContents());

  this._content.appendChild(additionalContent);
};


ScientificSummaryPage.prototype._getTextContents = function () {
  var fragment,
      textHeader,
      texts;

  texts = this.getProducts('scitech-text');
  fragment = document.createDocumentFragment();

  if (texts.length > 0) {
    textHeader = fragment.appendChild(document.createElement('h2'));
    textHeader.innerHTML = 'Scientific and Technical Commentary';

    texts.forEach(function (product) {
      var container,
          text;

      if (product.contents && product.contents['']) {
        container = fragment.appendChild(document.createElement('div'));
        container.id = product.id;
        container.classList.add('scitech-text');

        text = product.contents[''].bytes;
        text = this._replaceRelativePaths(text, product.contents);
        container.innerHTML = text;
      }
    }, this);
  }

  return fragment;
};

ScientificSummaryPage.prototype._getLinkContents = function () {
  var fragment,
      linkHeader,
      links,
      list;

  links = this.getProducts('scitech-link');
  fragment = document.createDocumentFragment();

  if (links.length > 0) {
    linkHeader = fragment.appendChild(document.createElement('h2'));
    linkHeader.innerHTML = 'Scientific and Technical Links';

    list = fragment.appendChild(document.createElement('ul'));
    list.classList.add('scitech-links');

    links.forEach(function (product) {
      var container,
          link,
          properties;

      properties = product.properties;
      container = list.appendChild(document.createElement('li'));
      container.classList.add('scitech-link');
      container.id = product.id;

      link = container.appendChild(document.createElement('a'));
      link.setAttribute('href', properties.url);
      link.innerHTML = properties.text;
    });
  }

  return fragment;
};


module.exports = ScientificSummaryPage;
