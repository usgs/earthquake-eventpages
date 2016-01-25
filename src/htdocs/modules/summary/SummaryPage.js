'use strict';

var Attribution = require('base/Attribution'),
    EventModulePage = require('base/EventModulePage'),
    Formatter = require('base/Formatter'),
    TectonicSummaryView = require('geoserve/TectonicSummaryView'),
    StaticMap = require('map/StaticMap'),
    Model = require('mvc/Model'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var SummaryPage = function (options) {

  this._formatter = new Formatter();

  // bind to place and region changes
  this._geoserve = new Model();
  this._geoserve.on('change:places', 'buildNearbyCitiesView', this);
  this._geoserve.on('change:regions', 'buildTectonicSummaryView', this);

  if (options.eventConfig &&
      options.eventConfig.hasOwnProperty('GEOSERVE_WS_URL')) {
    this._geoserveUrl = options.eventConfig.GEOSERVE_WS_URL;
  }

  EventModulePage.call(this, options);
};

SummaryPage.prototype = Object.create(EventModulePage.prototype);

SummaryPage.prototype._setContentMarkup = function () {
  var content = this._content,
      generalHeader,
      generalText,
      impactText;

  content.innerHTML =
      '<div class="summary-general-header"></div>' +
      '<div class="row">' +
        '<div class="column one-of-two">' +
          '<div class="summary-location"></div>' +
        '</div>' +
        '<div class="column one-of-two summary-info">' +
          '<div class="summary-time"></div>' +
          '<div class="summary-nearby-cities"></div>' +
        '</div>' +
      '</div>' +
      '<div class="summary-general-text"></div>' +
      '<div class="summary-tectonic-summary"></div>' +
      '<div class="summary-impact-text"></div>';

  content.querySelector('.summary-location').appendChild(this._getLocation());
  content.querySelector('.summary-time').appendChild(this._getTime());
  content.appendChild(this._getLinks());

  this._loadNearbyCities();
  this._loadTectonicSummary();

  // Store references to containing elements for faster access
  generalHeader = content.querySelector('.summary-general-header');
  generalText = content.querySelector('.summary-general-text');
  impactText = content.querySelector('.summary-impact-text');

  this._loadTextualContent(generalHeader, 'general-header', null);
  this._loadTextualContent(impactText, 'impact-text', null);
  this._loadTextualContent(generalText, 'general-text', null);
};

/**
 * Set this._geoserve with places data from the geoserve ws
 */
SummaryPage.prototype._getGeoserveNearbyPlaces = function () {
   var latitude,
       longitude,
       _this;

  _this = this;

  // get location
  latitude = this._event.geometry.coordinates[1];
  longitude = this._event.geometry.coordinates[0];

  // request nearby places
  if (latitude !== null && longitude !== null) {
    Xhr.ajax({
      url: this._geoserveUrl + 'places.json',
      data: {
        latitude: latitude,
        longitude: longitude,
        type: 'event'
      },
      success: function (data) {
        _this._geoserve.set({
          places: data
        });
      },
      error: function () {
        throw new Error('Geoserve web service not found');
      }
    });
  }
};

/**
 * Set this._geoserve with tectonic summary data from the geoserve ws
 */
SummaryPage.prototype._getGeoserveTectonicSummary = function () {
   var latitude,
       longitude,
       _this;

  _this = this;

  // get location
  latitude = this._event.geometry.coordinates[1];
  longitude = this._event.geometry.coordinates[0];


    // request tectonic summary
  if (latitude !== null && longitude !== null) {
    Xhr.ajax({
      url: this._geoserveUrl + 'regions.json',
      data: {
        latitude: latitude,
        longitude: longitude,
        type: 'tectonic'
      },
      success: function (data) {
        _this._geoserve.set({
          regions: data
        });
      },
      error: function () {
        throw new Error('Geoserve web service not found');
      }
    });
  }
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
 * If no such product is found, call _getGeoserveNearbyCities()
 * to retreive the nearby cities from the geoserve ws.
 *
 * Once load is complete, buildNearbyCitiesView is called.
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

  // no nearby cities products, make geoserve ws request
  if (!nearbyCities) {
    this._getGeoserveNearbyPlaces();
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
      this.formatNearbyCities(cities);
    }.bind(this),
    error: function (e) {
      console.log(e);
      throw new Error('Failed to load nearby cities.');
    }.bind(this)
  });
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
SummaryPage.prototype.buildNearbyCitiesView = function () {
  var cities,
      el,
      fragment,
      formatter = this._formatter,
      header,
      list;

  el = this._content.querySelector('.summary-nearby-cities');
  fragment = document.createDocumentFragment();

  try {
    if (this._geoserve) {
      cities = this._geoserve.get('places').event.features;
      header = document.createElement('h3');
      header.innerHTML = 'Nearby Cities';

      list = document.createElement('ol');
      list.classList.add('no-style');
      list.classList.add('nearbyCities');
      list.innerHTML = cities.map(function (city) {
        return '<li>' +
            city.properties.distance + 'km ' +
                '(' + Math.round(formatter.kmToMi(city.properties.distance)) + 'mi) ' +
            city.properties.azimuth +
            ' of ' + city.properties.name +
            '</li>';
      }).join('');

      fragment.appendChild(header);
      fragment.appendChild(list);
    }
    // append nearby cities view to element
    el.appendChild(fragment);
  } catch (e) {
    console.log(e);
  }

};

/**
 * Massage data from nearby-cities product into the same model object
 * that NearbyCitiesView expects.
 *
 * @param data {Array<Object>}
 *        array of cities objects with properties:
 *          city.distance {Number} distance in km.
 *          city.direction {String} compass direction from city to event.
 *          city.name {String} city name.
 *        null if there are no cities.
 */
SummaryPage.prototype.formatNearbyCities = function (data) {
  var cities,
      properties;

  if (data) {
    cities = data.map(function (city) {
      properties = {};
      properties.azimuth = city.direction;
      properties.distance = city.distance;
      properties.name = city.name;
      properties.population = city.population;
      return {'properties': properties};
    });
  }

  // set the massaged nearby cities array
  this._geoserve.set({
    'places': {
      'event': {
        'count': cities.length,
        'features': cities
      }
    }
  });
};

/**
 * Load tectonic summary information.
 *
 * Attempts to load from a tectonic-summary product.
 * If no such product is found, call _getGeoserveTectonicSummary().
 *
 * Once load is complete, formatTectonicSummary is called.
 */
SummaryPage.prototype._loadTectonicSummary = function () {
  var tectonicSummaries,
      product;

  tectonicSummaries = this._event.properties.products['tectonic-summary'];

  // no tectonic summary products, make geoserve ws request
  if (!tectonicSummaries) {
    this._getGeoserveTectonicSummary();
    return;
  }

  // load tectonic summary product
  product = tectonicSummaries[0];

  Xhr.ajax({
    url: product.contents['tectonic-summary.inc.html'].url,
    success: function (summary) {
      this.formatTectonicSummary(summary);
    }.bind(this),
    error: function () {
      throw new Error('Failed to load tectonic summary.');
    }.bind(this)
  });
};

/**
 * Build TectonicSummaryView from the hazdev-geoserve-ws project.
 *
 * If no data is available a default message is displayed
 */
SummaryPage.prototype.buildTectonicSummaryView = function () {
  TectonicSummaryView({
    el: this._content.querySelector('.summary-tectonic-summary'),
    header: null,
    model: this._geoserve,
    noDataMessage: null
  });
};

/**
 * Set the tectonic summary to be displayed.
 *
 * @param summary {String} tectonic summary text.
 */
SummaryPage.prototype.formatTectonicSummary = function (summary) {
  this._geoserve.set({
    'regions': {
      'tectonic': {
        'features': [{
          'properties': {
            'summary': summary
          }
        }]
      }
    }
  });
};

SummaryPage.prototype._loadTextualContent = function (el, type) {
  var content;

  if (el === null) {
    return;
  }

  content = this._getTexts(type);
  if (!content.firstChild) {
    // empty
    Util.detach(el);
  } else {
    el.appendChild(content);
  }
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
 SummaryPage.prototype._getTexts = function (type) {
  var el,
      fragment,
      i,
      len,
      products,
      texts;

  fragment = document.createDocumentFragment();

  products = this._event.properties.products;
  texts = products[type];
  if (texts) {
    el = document.createElement('div');
    el.className = type;
    fragment.appendChild(el);

    for (i = 0, len = texts.length; i < len; i++) {
      el.appendChild(this._getText(texts[i]));
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
SummaryPage.prototype._getText = function (product) {
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
SummaryPage.prototype._getLinks = function () {
  var cache = {},
      el,
      fragment,
      i,
      item,
      len,
      link,
      links,
      list,
      products,
      url;

  fragment = document.createDocumentFragment();

  products = this._event.properties.products;
  links = products['general-link'];
  if (links) {
    el = document.createElement('div');
    el.className = 'general-links';
    el.innerHTML = '<h3>For More Information</h3>';
    fragment.appendChild(el);

    list = document.createElement('ul');
    el.appendChild(list);

    for (i = 0, len = links.length; i < len; i++) {
      link = links[i];
      // this is hacky, duplicate links shouldn't be sent
      url = link.properties.url;
      if (url in cache) {
        continue;
      }
      cache[url] = true;
      // end hacky
      item = document.createElement('li');
      item.appendChild(this._getLink(link));
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
SummaryPage.prototype._getLink = function (product) {
  var el = document.createElement('a'),
      props = product.properties;

  el.setAttribute('href', props.url);
  el.innerHTML = props.text;

  return el;
};

/**
 * Clean up event bindings.
 */
SummaryPage.prototype.destroy = function () {
  this._geoserve.off('change:places', 'buildNearbyCitiesView', this);
  this._geoserve.off('change:regions', 'buildTectonicSummaryView', this);

  this._formatter = null;
  this._geoserve = null;
};

module.exports = SummaryPage;
