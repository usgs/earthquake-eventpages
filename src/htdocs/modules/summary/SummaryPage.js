'use strict';

var Attribution = require('base/Attribution'),
    EventModulePage = require('base/EventModulePage'),
    Formatter = require('base/Formatter'),
    StaticMap = require('map/StaticMap'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var SummaryPage = function (options) {
  options = Util.extend({}, options || {});

  var products = options.eventDetails.properties.products;

  this._nearbyCitiesFlag = products.hasOwnProperty('nearby-cities');
  this._tectonicSummaryFlag = products.hasOwnProperty('tectonic-summary');

  this.mapContainer = {};
  this.nearbyCities = {};
  this.tectonicSummary = {};
  this._formatter = new Formatter();
  EventModulePage.call(this, options);
};
SummaryPage.prototype = Object.create(EventModulePage.prototype);


SummaryPage.prototype._setContentMarkup = function () {
  var _this = this,
      content = this._content,
      markup = [],
      generalHeader,
      generalText,
      impactText,
      products = this._event.properties.products,
      fallbackToGeoserve = false;

  markup.push(this._getTextContentMarkup('general-header'));

  markup.push(
    '<div class="row">' +
      '<div class="column one-of-two">' +
        '<div class="summary-location"></div>' +
      '</div>' +
      '<div class="column one-of-two summary-info">' +
        '<div class="summary-time"></div>' +
        '<div class="summary-nearby-cities"></div>' +
      '</div>' +
    '</div>'
    );
  markup.push(this._getTextContentMarkup('general-text'));
  markup.push(this._getTextContentMarkup('tectonic-summary'));
  markup.push(this._getTextContentMarkup('impact-text'));

  content.innerHTML = markup.join('');
  content.querySelector('.summary-location').appendChild(this._getLocation());
  content.querySelector('.summary-time').appendChild(this._getTime());
  content.appendChild(this.getLinks());

  this._loadNearbyCities();

  // Store references to containing elements for faster access
  generalHeader = this._content.querySelector('.summary-general-header');
  this.nearbyCities = this._content.querySelector('.summary-nearby-cities');
  this.tectonicSummary = this._content.querySelector('.summary-tectonic-summary');
  generalText = this._content.querySelector('.summary-general-text');
  impactText = this._content.querySelector('.summary-impact-text');

  // Fetch AJAX content and load it into the containers
  if (this._tectonicSummaryFlag) {
    try {
      Xhr.ajax({
          url: products['tectonic-summary'][0]
              .contents['tectonic-summary.inc.html'].url,
          success: function (tectonicSummary) {
            _this._ajaxSuccessTectonicSummary(tectonicSummary);
          },
          error: function () {
            throw new Error('Failed to load tectonic summary.');
          }
        });
    } catch (e) {
      this._ajaxErrorTectonicSummary();
    }
  } else {
    fallbackToGeoserve = true;
  }

  if (fallbackToGeoserve) {
    try {
      // Note :: For now, assume geoserve product will exist. In the future,
      //         this will be a dynamic call for data or potentally separate
      //         calls for each part of the data
      Xhr.ajax({
        url: products.geoserve[0].contents['geoserve.json'].url,
        success: function (geoserve) {
          if (!_this._tectonicSummaryFlag) {
            try {
              _this._ajaxSuccessTectonicSummary(geoserve.tectonicSummary.text);
            } catch (e) {
              _this._ajaxErrorTectonicSummary();
            }
          }
        },
        error: function () {
          throw new Error('Failed to load geoserve.');
        }
      });
    } catch (e) {
      if (!this._tectonicSummaryFlag) {
        this._ajaxErrorTectonicSummary();
      }
    }
  }

  this._loadTextualContent(generalHeader, 'general-header', null);
  this._loadTextualContent(impactText, 'impact-text', null);
  this._loadTextualContent(generalText, 'general-text', null);
};

SummaryPage.prototype._ajaxErrorTectonicSummary = function () {
  if (this.tectonicSummary) {
    this.tectonicSummary.parentNode.removeChild(this.tectonicSummary);
  }
  this.tectonicSummary = null;
};

SummaryPage.prototype._ajaxSuccessTectonicSummary = function (tectonicSummary) {
  if (this.tectonicSummary !== null) {
    this.tectonicSummary.innerHTML = '<h3>Tectonic Summary</h3>' +
        tectonicSummary;
  }
};

SummaryPage.prototype._getTextContentMarkup = function (type) {
  if (this._event.properties.products.hasOwnProperty(type)) {
    return '<div class="summary-' + type + '"></div>';
  }
  return '';
};


/**
 * Create content for location section.
 *
 * @return {DOMFragment}
 *         location content.
 */
SummaryPage.prototype._getLocation = function () {
  var figure,
      fragment,
      header;

  header = document.createElement('h3');
  header.innerHTML = 'Location';

  figure = document.createElement('figure');
  figure.classList.add('summary-map');
  figure.appendChild(this._getLocationMap());
  figure.appendChild(this._getLocationCaption());

  fragment = document.createDocumentFragment();
  fragment.appendChild(header);
  fragment.appendChild(this._getLocationAttribution());
  fragment.appendChild(figure);

  return fragment;
};

/**
 * Create attribution for location section.
 *
 * @return {DOMElement}
 *         element containing attribution content.
 */
SummaryPage.prototype._getLocationAttribution = function () {
  var el,
      magnitudeAuthor,
      origin,
      originAuthor,
      props;

  origin = this._event.properties.products.origin[0];
  props = origin.properties;
  originAuthor = props['origin-source'] || origin.source;
  magnitudeAuthor = props['magnitude-source'] || origin.source;

  el = document.createElement('small');
  el.classList.add('attribution');
  el.innerHTML = 'Data Source ' +
      (originAuthor === magnitudeAuthor ?
        Attribution.getContributorReference(originAuthor) :
        '<span>' +
          Attribution.getContributorReference(originAuthor) + ', ' +
          Attribution.getContributorReference(magnitudeAuthor) +
        '</span>');

  return el;
};

/**
 * Create map for location section.
 *
 * @return {DOMElement}
 *         location map.
 */
SummaryPage.prototype._getLocationMap = function () {
  var el,
      latitude = this._event.geometry.coordinates[1],
      longitude = this._event.geometry.coordinates[0];

  el = document.createElement('a');
  el.setAttribute('href', '#general_map');
  el.innerHTML = StaticMap.getImageMarkup(
          StaticMap.getExtent(longitude, latitude, 10), 512, 512);

  return el;
};

/**
 * Create caption for location section.
 *
 * @return {DOMElement}
 *         caption for location map.
 */
SummaryPage.prototype._getLocationCaption = function () {
  var el,
      depth,
      formatter = this._formatter,
      geometry = this._event.geometry,
      latitude,
      longitude;

  depth = geometry.coordinates[2];
  latitude = geometry.coordinates[1];
  longitude = geometry.coordinates[0];

  el = document.createElement('figcaption');
  el.innerHTML = formatter.location(latitude, longitude) +
        ' depth=' + formatter.depth(depth, 'km') +
        ' (' + formatter.depth(formatter.kmToMi(depth), 'mi') + ')' +
        '<a href="#general_map">View interactive map</a>';

  return el;
};


/**
 * Create content for time section.
 *
 * @return {DOMElement}
 *         time content.
 */
SummaryPage.prototype._getTime = function () {
  var fragment,
      formatter = this._formatter,
      header,
      list,
      properties = this._event.properties,
      time,
      systemTimezoneOffset;

  time = Number(properties.time);
  systemTimezoneOffset =  new Date().getTimezoneOffset() * -1;

  header = document.createElement('h3');
  header.innerHTML = 'Time';

  list = document.createElement('ol');
  list.classList.add('no-style');
  list.innerHTML =
        '<li>' +
          formatter.datetime(time, 0) +
        '</li>' +
        '<li>' +
          formatter.datetime(time, systemTimezoneOffset) +
          ' <abbr title="Your computer timezone setting">in your timezone</abbr>' +
        '</li>' +
        '<li>' +
          this._getOtherTimeZoneLink(time) +
        '</li>';

  fragment = document.createDocumentFragment();
  fragment.appendChild(header);
  fragment.appendChild(list);

  return fragment;
};


/**
 * Load nearby cities information.
 *
 * Attempts to load from a nearby-cities product.
 * If no such product is found, call _loadAutomaticNearbyCities().
 *
 * Once load is complete (error or not), _setNearbyCities is called.
 */
SummaryPage.prototype._loadNearbyCities = function () {
  var i,
      nearbyCities,
      origin,
      originCode,
      originSource,
      product,
      products,
      props;

  products = this._event.properties.products;
  nearbyCities = products['nearby-cities'];
  if (!nearbyCities) {
    // no nearby cities products
    this._loadAutomaticNearbyCities();
    return;
  }

  // choose nearby-cities product
  product = null;
  origin = products.origin[0];
  originCode = origin.properties.eventsourcecode;
  originSource = origin.properties.eventsource;
  for (i = 0; i < nearbyCities.length; i++) {
    props = nearbyCities[i].properties;
    if (props.eventsource === originSource &&
        props.eventsourcecode === originCode) {
      product = nearbyCities[i];
      break;
    }
  }
  if (product === null) {
    product = nearbyCities[0];
  }

  // load nearby cities
  Xhr.ajax({
    url: product.contents['nearby-cities.json'].url,
    success: function (cities) {
      this._setNearbyCities(cities, product);
    }.bind(this),
    error: function () {
      this._setNearbyCities(null, product);
      throw new Error('Failed to load nearby cities.');
    }.bind(this)
  });
};

/**
 * Load automatic list of nearby cities.
 *
 * Currently geoserve product, eventually geoserve webservice.
 *
 * Once load is complete (error or not), _setNearbyCities is called.
 */
SummaryPage.prototype._loadAutomaticNearbyCities = function () {
  var geoserve,
      product;

  geoserve = this._event.properties.products.geoserve;
  if (!geoserve) {
    this._setNearbyCities(null, null);
    return;
  }

  product = geoserve[0];
  Xhr.ajax({
    url: product.contents['geoserve.json'].url,
    success: function (geoserve) {
      this._setNearbyCities(geoserve.cities, product);
    }.bind(this),
    error: function () {
      this._setNearbyCities(null, product);
      throw new Error('Failed to load nearby cities from geoserve');
    }.bind(this)
  });
};

/**
 * Set the nearby cities to be displayed.
 *
 * Inject result of _formatNearbyCities into nearby-cities element.
 *
 * @param cities {Array<Object>}
 *        array of city objects with properties:
 *          city.distance {Number} distance in km.
 *          city.direction {String} compass direction from city to event.
 *          city.name {String} city name.
 *        null if there are no cities.
 * @param product {Product}
 *        the source of the cities.
 *        null if there is no product.
 */
SummaryPage.prototype._setNearbyCities = function (cities, product) {
  var content,
      el;
  el = this._content.querySelector('.summary-nearby-cities');
  content = this._formatNearbyCities(cities, product);
  if (content.childElementCount === 0) {
    // empty
    Util.detach(el);
  } else {
    el.appendChild(content);
  }
};

/**
 * Create content for nearby cities section.
 *
 * @param cities {Array<Object>}
 *        array of city objects with properties:
 *          city.distance {Number} distance in km.
 *          city.direction {String} compass direction from city to event.
 *          city.name {String} city name.
 *        null if there are no cities.
 * @param product {Product}
 *        the source of the cities.
 *        null if there is no product.
 * @return {DOMFragment}
 *         nearby cities content.
 */
SummaryPage.prototype._formatNearbyCities = function (cities /*,product*/) {
  var fragment,
      formatter = this._formatter,
      header,
      list;

  fragment = document.createDocumentFragment();

  if (cities) {
    header = document.createElement('h3');
    header.innerHTML = 'Nearby Cities';

    list = document.createElement('ol');
    list.classList.add('no-style');
    list.classList.add('nearbyCities');
    list.innerHTML = cities.map(function (city) {
      return '<li>' +
          city.distance + 'km ' +
              '(' + Math.round(formatter.kmToMi(city.distance)) + 'mi) ' +
          city.direction +
          ' of ' + city.name +
          '</li>';
    }).join('');

    fragment.appendChild(header);
    fragment.appendChild(list);
  }

  return fragment;
};


SummaryPage.prototype._loadTextualContent = function (container, type) {
  if (container === null) {
    return;
  }

  container.appendChild(this.getTexts(type));
};

SummaryPage.prototype.getProducts = function () {
  var products = EventModulePage.prototype.getProducts.call(this),
      toshow = [],
      show = {},
      key, product;

  for ( key in products ) {
    product = products[key];
    if (!(product.type in show)) {
      show[product.type] = '';
      toshow.push(product);
    }
  }

  return toshow;
};

SummaryPage.prototype._getOtherTimeZoneLink = function (stamp) {
  var theDate = new Date(stamp),
      uri,
      title = this._event.properties.title;

  uri = 'http://www.timeanddate.com/worldclock/fixedtime.html?iso=' +
      theDate.toISOString() + '&msg=' + title;
  uri = encodeURI(uri);

  return '<a href="' + uri +
  '" target="_blank">Times in other timezones</a>';
};



/**
 * Get any scitech-text information.
 *
 * @return {DOMElement} content, or null if no information present.
 */
 SummaryPage.prototype.getTexts = function (type) {
  var fragment = document.createDocumentFragment(),
      products = this._event.properties.products,
      texts = products[type],
      textEl = null,
      i,
      len;

  if (texts) {
    textEl = document.createElement('div');
    textEl.className = type;
    fragment.appendChild(textEl);

    for (i = 0, len = texts.length; i < len; i++) {
      textEl.appendChild(this.getText(texts[i]));
    }
  }

  return fragment;
};

/**
 * Get an content for one text product.
 *
 * @param product {Product}
 *        text product.
 */
SummaryPage.prototype.getText = function (product) {
  var el = document.createElement('section'),
      content,
      contents = product.contents;

  if (contents && contents['']) {
    content = contents[''].bytes;
    content = this._replaceRelativePaths(content, product.contents);

    el.innerHTML = content;
  }

  return el;
};


/**
 * Get any scitech-link information.
 *
 * @return {DocumentFragment}
 *         Fragment with links, or empty if no information present.
 */
 SummaryPage.prototype.getLinks = function () {
  var fragment = document.createDocumentFragment(),
      products = this._event.properties.products,
      links = products['general-link'],
      linkEl = null,
      i,
      item,
      len,
      list;

  if (links) {
    linkEl = document.createElement('div');
    linkEl.className = 'general-links';
    linkEl.innerHTML = '<h3>For More Information</h3>';
    fragment.appendChild(linkEl);

    list = document.createElement('ul');
    linkEl.appendChild(list);

    for (i = 0, len = links.length; i < len; i++) {
      item = document.createElement('li');
      item.appendChild(this.getLink(links[i]));
      list.appendChild(item);
    }
  }

  return fragment;
};

/**
 * Create an anchor element from a link product.
 *
 * @param product {Object}
 *        The link product.
 * @return {DOMEElement}
 *         anchor element.
 */
 SummaryPage.prototype.getLink = function (product) {
  var el = document.createElement('a'),
      props = product.properties;

  el.setAttribute('href', props.url);
  el.innerHTML = props.text;

  return el;
};


module.exports = SummaryPage;
