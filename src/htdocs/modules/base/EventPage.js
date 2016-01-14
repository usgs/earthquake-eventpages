'use strict';

var Events = require('util/Events'),
    Util = require('util/Util'),

    Attribution = require('base/Attribution'),

    ScientificModule = require('scientific/ScientificModule'),
    SummaryModule = require('summary/SummaryModule'),
    ImpactModule = require('impact/ImpactModule');


var REDIRECTS = {
  'summary': 'general_summary',
  'general_summary': 'general_region',

  'shakemap': 'impact_shakemap',
  'shakemap_intensity': 'impact_shakemap',
  'shakemap_pga': 'impact_shakemap',
  'shakemap_pgv': 'impact_shakemap',
  'shakemap_sr03': 'impact_shakemap',
  'shakemap_sr10': 'impact_shakemap',
  'shakemap_sr30': 'impact_shakemap',
  'shakemap_uncertainty': 'impact_shakemap',
  'shakemap_stationlist': 'impact_shakemap',

  'pager': 'impact_pager',
  'pager_impact': 'impact_pager',
  'pager_historic': 'impact_pager',
  'pager_cities': 'impact_pager',

  'dyfi': 'impact_dyfi',
  'dyfi_maps': 'impact_dyfi',
  'dyfi_graphs': 'impact_dyfi',
  'dyfi_form': 'impact_tellus',

  'scientific': 'scientific_summary',
  'scientific_contributed-solutions': 'scientific_origin',
  'scientific_tensor': 'scientific_moment-tensor',
  'scientific_mechanism': 'scientific_focal-mechanism',
  'scientific_finitefault': 'scientific_finite-fault'
};

var DEFAULTS = {
  // Maximum number of modules to cache
  maxCacheLength: 3,

  // Default page to render if no hash is specified
  defaultPage: 'general_region'
};

var __get_hash = function (evt) {
  var hash;

  if (evt) {
    hash = evt.newURL;
  }

  if (hash === null || typeof hash === 'undefined') {
    hash = window.location.hash || '';
  }

  return hash.split('#').slice(1).join('#');
};

var EventPage = function (options) {
  this._events = Events();
  this.off = this._events.off;
  this.on = this._events.on;
  this.trigger = this._events.trigger;

  options = Util.extend({}, DEFAULTS, options);

  this._container = options.container ||
      document.querySelector('.event-content') ||
      document.createElement('section');
  this._navigation = options.navigation ||
      document.querySelector('.site-sectionnav') ||
      document.createElement('nav');
  this._footer = options.footer ||
      document.querySelector('.event-footer') ||
      document.createElement('footer');

  this._eventDetails = options.eventDetails || null;
  this._eventConfig = options.eventConfig || null;

  this._defaultPage = options.defaultPage || this._getDefaultPage();

  this._maxCacheLength = options.maxCacheLength || DEFAULTS.maxCacheLength;
  this._cache = [];
  this._currentPage = null;

  this._modules = options.modules || this._getDefaultModules();

  this._buildContributorArray();

  this._initialize();
};

EventPage.prototype._getDefaultPage = function () {
  if (this._eventDetails === null) {
    return 'impact_tellus';
  } else {
    return this._defaultPage;
  }
};

EventPage.prototype._getDefaultModules = function () {
  var eventConfig = this._eventConfig,
      eventDetails = this._eventDetails;

  if (eventDetails === null) {
    // unknown event
    return [
      new ImpactModule({
        'eventDetails': eventDetails,
        'eventConfig': eventConfig,
        'eventPage': this
      })
    ];
  } else {
    // regular event page
    return [
      new SummaryModule({
          'eventDetails': eventDetails,
          'eventConfig': eventConfig,
          'eventPage': this
      }),
      new ImpactModule({
        'eventDetails': eventDetails,
        'eventConfig': eventConfig,
        'eventPage': this
      }),
      new ScientificModule({
        'eventDetails': eventDetails,
        'eventConfig': eventConfig,
        'eventPage': this
      })
    ];
  }
};

EventPage.prototype.destroy = function () {
  var i = null;

  Events.off('hashchange', this._onHashChange, this);

  for (i = this._modules.length - 1; i >= 0; i--) {
    this._modules[i].destroy();
    this._modules[i] = null;
    delete this._modules[i];
  }

  this._events.destroy();
  this._events = null;

  this._modules = null;

  this._cache = null;
  this._maxCacheLength = null;
  this._currentPage = null;

  this._defaultPage = null;

  this._eventDetails = null;
  this._navigation = null;
  this._container = null;
};

EventPage.prototype.render = function (evt) {
  var hash = __get_hash(evt),
      _this = this,
      cacheIndex = this._getCacheIndex(hash);

  if (cacheIndex !== null) {
    this._renderPage(hash, this._cache[cacheIndex].page);
    return;
  }

  try {
    this.getModule(hash).getPage(hash, function (page) {
      if (page !== null) {
        _this._renderPage(hash, page);
      } else {
        // No page? No render. Error.
        throw 'No page found for request: "' + hash + '"';
      }
    });
  } catch (e) {
    // TODO :: Handle this differently?
    console.log('Error: ' + e);
    console.log('Error stack: ' + e.stack);

    if (this._defaultPage !== null && this._defaultPage !== hash) {
      this._showDefaultPage();
    }
  }
};

EventPage.prototype.updateNavigation = function (evt) {
  var markup = [],
      i = 0,
      numModules = this._modules.length,
      module,
      hash = __get_hash(evt);

  for (; i < numModules; i++) {
    module = this._modules[i];
    if (module.hasContent()) {
      markup.push('<section>' + module.getNavigationItems(hash).join('') + '</section>');
    }
  }
  markup.push('<a href="/earthquakes/map/">Latest Earthquakes</a>');

  this._navigation.innerHTML = markup.join('');
};

EventPage.prototype.updateFooter = function () {
  this._footer.innerHTML =
    '<h3>Contributors</h3>' +
    Attribution.getContributorList() +
    '<h3>Additional Information</h3>' +
    '<ul>' +
      '<li>' +
        '<a href="/earthquakes/map/doc_aboutdata.php">' +
            'About ANSS Comprehensive Catalog (ComCat)' +
        '</a>' +
      '</li>' +
      '<li>' +
      '<a href="/earthquakes/eventpage/terms.php">' +
        'Technical Terms used on Event Pages' +
      '</a>' +
      '</li>' +
    '</ul>';
};

EventPage.prototype._buildContributorArray = function () {
  var allProducts,
      products,
      product,
      props,
      author,
      sources = [],
      type,
      i,
      length;

  try {
    allProducts = this._eventDetails.properties.products;
  } catch (e) {
    allProducts = {};
  }

  for (type in allProducts) {
    products = allProducts[type];
    length = products.length;

    for (i = 0; i < length; i++) {
      product = products[i];

      if (product.source === 'admin') {
        continue;
      }

      // check product source
      if (product.source && !Util.contains(sources, product.source)) {
        sources.push(product.source.toLowerCase());
      }

      props = product.properties || {};
      if (props['origin-source']) {
        author = props['origin-source'].toLowerCase();
        if (!Util.contains(sources, author)) {
          sources.push(author);
        }
      }
      if (props['magnitude-source']) {
        author = props['magnitude-source'].toLowerCase();
        if (!Util.contains(sources, author)) {
          sources.push(author);
        }
      }
      if (props['beachball-source']) {
        author = props['beachball-source'].toLowerCase();
        if (!Util.contains(sources, author)) {
          sources.push(author);
        }
      }
    }
  }

  Attribution.setContributors(sources);
};


EventPage.prototype.getModule = function (hash) {
  var i = null,
      module = null,
      numModules = this._modules.length,
      hashStub = hash.split('_').slice(0, 1).join('_');

  for (i = 0; i < numModules; i++) {
    module = this._modules[i];
    if (module.getHash() === hashStub) {
      // found module, but suppress if it has no content.
      if (module.hasContent()) {
        return module;
      } else {
        break;
      }
    }
  }

  throw 'No module found for request: "' + hash + '"';
};

EventPage.prototype.cachePage = function (hash, page) {
  var i = null,
      cachedPage = null,
      numCached = this._cache.length;

  // Check if this module is already in the cache (it shouldn't be)
  for (i = 0; i < numCached; i++) {
    cachedPage = this._cache[i];
    if (hash === cachedPage.hash) {
      // Already in cache ...
      if (cachedPage.page !== page) {
        // ... and different, so delete previous cache, then cache new object
        cachedPage.page.destroy();
        this._cache.splice(i, 1);
        break;
      } else {
        // ... but same, so just move to front of cache
        Array.prototype.unshift.apply(this._cache, this._cache.splice(i, 1));
        return;
      }
    }
  }

  // Add the module to the front of the cache
  this._cache.unshift({hash: hash, page: page});

  // Trim the cache if it has grown too large
  while (this._cache.length > this._maxCacheLength) {
    cachedPage = this._cache.pop();
    cachedPage.page.destroy();
  }
};


EventPage.prototype._initialize = function () {
  var hash = __get_hash();

  Events.on('hashchange', this._onHashChange, this);
  this.updateNavigation();
  this.updateFooter();

  if (hash === '') {
    // No hash on page URL, use default page
    this._showDefaultPage();
  } else if (REDIRECTS.hasOwnProperty(hash)) {
    if (window.location.replace) {
      window.location.replace('#' + REDIRECTS[hash]);
    } else {
      window.location = '#' + REDIRECTS[hash];
    }
  } else {
    // There is a hash already, make sure we show the page from the hash
    this._onHashChange();
  }

};

EventPage.prototype._getCacheIndex = function (hash) {
  var i = 0,
      numCached = this._cache.length,
      cachedPage = null;

  for (; i < numCached; i++) {
    cachedPage = this._cache[i];
    if (cachedPage.hash === hash) {
      return i;
    }
  }

  return null;
};

EventPage.prototype._renderPage = function (hash, page) {
  if (this._currentPage !== null) {
      this._currentPage.onRemove();
  }

  // Update the page rendering
  Util.empty(this._container);
  this._container.appendChild(page.getHeader());
  this._container.appendChild(page.getContent());
  this._container.appendChild(page.getFooter());

  // Update cache
  this.cachePage(hash, page);

  // track current page
  this._currentPage = page;
  this._currentPage.onAdd();

  // Notify listeners
  this.trigger('render', {hash: hash, page: page});
};

EventPage.prototype._showDefaultPage = function () {
  if (this._defaultPage !== null) {
    if (window.location.replace) {
      window.location.replace('#' + this._defaultPage);
    } else {
      window.location.hash = '#' + this._defaultPage;
    }
  } else {
    // No page to show, show nothing
    this._container.innerHTML = '';
  }
};

EventPage.prototype._onHashChange = function (evt) {
  this.updateNavigation(evt);
  this.render(evt);
};


module.exports = EventPage;
