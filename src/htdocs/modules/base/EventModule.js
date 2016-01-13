'use strict';

var Util = require('util/Util'),

    EventModulePage = require('./EventModulePage');


var CSS_MAP = {},
    CSS_CONTAINER = document.querySelector('head'),
    JS_MAP = {};

var DEFAULTS = {
  title: 'Event Module',
  hash: 'module',
  cssUrl: 'modules/base/index.css',
  pages: [
    {
      factory: EventModulePage,
      options: {
        title: 'Page 1',
        hash: 'page1',
      }
    },
    {
      factory: EventModulePage,
      options: {
        title: 'Page 2',
        hash: 'page2',
      }
    }
  ],
  eventDetails: {}
};

var EventModule = function (options) {
  options = Util.extend({}, DEFAULTS, options || {});

  this._title = options.title;
  this._hash = options.hash;
  this._pages = options.pages;
  this._cssUrl = options.cssUrl;
  this._eventDetails = options.eventDetails;
  this._eventConfig = options.eventConfig;
  this._eventPage = options.eventPage;

  this._cssLoaded = false;
};

EventModule.prototype.destroy = function () {
  // TODO :: Clean up allocated memory. Make instantiated pages clean up as
  //         well.
};

/**
 * API Method
 *
 * Module implementations should return false from this method when they
 * have no content to display.
 *
 * @return {Boolean} whether this module has content and should be included
 *         in navigation and on page.
 */
EventModule.prototype.hasContent = function () {
  var pages = this._pages,
      page,
      numPages,
      i;
  // if any pages have content, module has content
  for (i = 0, numPages = pages.length; i < numPages; i++) {
    page = pages[i];
    if (this._pageHasContent(page)) {
      return true;
    }
  }
  // no page content found
  return false;
};


/**
 * API Method
 *
 * Module implementations should override this method to return markup
 * for their navigation. Navigation markup should be formatted as follows:
 *
 * <section>
 *   <header>Module Name</header>
 *   <a href="#moduleStub_page1Stub">Page 1</a>
 *   <a href="#moduleStub_page2Stub">Page 2</a>
 *   <a href="#moduleStub_page3Stub">Page 3</a>
 * </section>
 *
 * @return {String}
 *      Navigation markup for this module.
 */
EventModule.prototype.getNavigationItems = function (hash) {
  var i,
      markup,
      numPages;

  markup = [];
  numPages = this._pages.length;

  // Use first module as header for nav section
  if (numPages > 0) {
    markup.push('<header>' +
        this._getNavigationItem(this._pages[0], hash, true) + '</header>');

    for (i = 1; i < numPages; i++) {
      markup.push(this._getNavigationItem(this._pages[i], hash));
    }
  }

  return markup;
};

/**
 * @param page {EventModulePage}
 * @param hash {String}
 * @param force {Boolean}
 *      True if a navigation item should be produced even if the page has no
 *      content. In this case the navigation item will never be clickable.
 */
EventModule.prototype._getNavigationItem = function (page, hash, force) {
  var fullHash,
      item,
      linkText,
      pageOptions;

  item = [];
  pageOptions = page.options || this._title;

  linkText = pageOptions.title || this._title;
  fullHash = this._hash + '_' + pageOptions.hash;

  if (this._pageHasContent(page)) {
    item.push('<a href="#' + fullHash + '">');

    if (hash.indexOf(fullHash) !== -1) {
      item.push('<strong class="current-page">' + linkText + '</strong>');
    } else {
      item.push(linkText);
    }

    item.push('</a>');
  } else if (force) {
    item.push('<a href="javascript:void(null);">');

    if (hash.indexOf(fullHash) !== -1) {
      item.push('<strong class="current-page">' + linkText + '</strong>');
    } else {
      item.push(linkText);
    }

    item.push('</a>');
  }

  return item.join('');
};

/**
 * Check whether a page has any content.
 *
 * @param page {Object}
 *        a page in the module pages list.
 * @return {Boolean}
 *        if page.hasContent is a Function,
 *            returns page.hasContent(eventDetails).
 *        if page.productTypes is an Array,
 *            returns true if any product types in the productTypes array
 *                exist in the event.
 *            returns false if no product types in the productTypes array
 *                exist in the event.
 *        otherwise, returns true.
 */
EventModule.prototype._pageHasContent = function (page) {
  var productTypes,
      i,
      len;

  // check for custom hasContent method.
  if (page.hasContent instanceof Function) {
    return page.hasContent(this._eventDetails);
  }

  // check for product types array
  if (page.productTypes instanceof Array) {
    productTypes = page.productTypes;
    for (i = 0, len = productTypes.length; i < len; i++) {
      if (this._eventHasProduct(productTypes[i])) {
        // found in event
        return true;
      }
    }
    // not found in event
    return false;
  }

  // default to true
  return true;
};

/**
 * Check if the event has a specific type of product.
 *
 * @param type {String}
 *        the product type to check.
 * @return {Boolean}
 *         true, if a product with that type exists in the event,
 *         otherwise false.
 */
EventModule.prototype._eventHasProduct = function (type) {
  try {
    return (this._eventDetails.properties.products[type].length > 0);
  } catch (e) {
    return false;
  }
};

EventModule.prototype.getHeaderMarkup = function (page) {
  var isPreferred,
      isReviewed,
      markup,
      product,
      products,
      subtitle,
      title;

  title = this._title;
  subtitle = page.getTitle();

  products = page.getProducts();
  product = page.getProductToRender();



  markup = [
    '<h2>' + title + ' - ' + subtitle + '</h2>',

    '<a class="back-to-summary-link" href="#', this.getHash(), '_summary">',
      (products.length < 2) ?
          'Back to ' + title + ' Summary' :
          'View all ' + subtitle + 's (' + products.length + ' total)',
    '</a>'
  ];

  if (product && products.length) {
    isPreferred = product.id === products[0].id;

    isReviewed = product.properties['review-status'];
    if (isReviewed) {
      isReviewed = (isReviewed.toUpperCase() === 'REVIEWED');
    }

    Array.prototype.push.apply(markup, [
      page.getAttribution(product),

      '<ul class="quality-statements no-style">',
        '<li class="', isPreferred ? 'preferred' : 'unpreferred', '">',
          'The data below is ', isPreferred ? '' : '<strong>NOT</strong> ',
          'the most preferred data available.',
        '</li>',
    ]);

    if (product.properties.hasOwnProperty('review-status')) {
      Array.prototype.push.apply(markup,
        [
          '<li class="', isReviewed ? 'reviewed' : 'unreviewed', '">',
            'The data below has ', isReviewed ? '' : '<strong>NOT</strong> ',
            'been reviewed by a scientist.',
          '</li>',
        '</ul>'
      ]);
    } else {
      markup.push('</ul>');
    }
  }

  return markup.join('');
};

EventModule.prototype.getFooterMarkup = function (/* page */) {
  return '';
};

EventModule.prototype.getHash = function () {
  return this._hash;
};

/**
 * @param hash {String}
 *      The URL fragment for which page to get. This hash will include both
 *      the module stub as well as the page stub (separated by an underscore).
 * @param callback {Function}
 *      A method called upon completion. If the page is found, the callback
 *      method is passed the class constructor function to instantiate the
 *      desired page. If the page is not found, the callback method is passed
 *      a null argument. The callback function should handle this null
 *      instance.
 */
EventModule.prototype.getPage = function (hash, callback) {
  var module = this;
  var pageInfo = this._getPageInfo(hash);
  var pageOptions = Util.extend({}, pageInfo.options,
      {
        productTypes: pageInfo.productTypes,
        eventDetails: this._eventDetails,
        eventConfig: this._eventConfig,
        module: module,
        eventPage: this._eventPage
      });

  var loadPage = function () {
    var page = new pageInfo.factory(pageOptions);
    if (!module._cssLoaded) {
      module._loadCSS();
    }
    callback(page);
  };

  if (typeof pageInfo.factory === 'function') {
    loadPage();
  } else {
    EventModule.loadJS(pageInfo.dependencyBundle, function () {
      pageInfo.factory = require(pageInfo.className);
      loadPage();
    });
  }
};


EventModule.prototype._loadCSS = function () {
  if (this._cssUrl) {
    EventModule.loadCSS(this._cssUrl);
  }

  // Maybe should do this in some "onLoad" event when CSS actually loads, but
  // this is good enough for now. We gave it a chance to work at least.
  this._cssLoaded = true;
};

/**
 *
 * @param pageHash {String}
 *      The hash of the page for which to get the class name.
 *
 * @return {String}
 *      The name of the class that corresponds to the given pageHash. If no
 *      such page is registered for the pageHash, then null is returned.
 */
EventModule.prototype._getPageInfo = function (pageHash) {
  var numPages = this._pages.length,
      i = null, pageInfo = null;

  pageHash = this._readHash(pageHash);

  for (i = 0; i < numPages; i++) {
    pageInfo = this._pages[i];
    if (pageInfo.options.hash === pageHash) {
      if (!this._pageHasContent(pageInfo)) {
        // hide pages without content
        return null;
      }
      return pageInfo;
    }
  }

  return null;
};

/**
 * Returns the page to load from the hash.
 *
 * @param  {String} value, URL hash to parse.
 *
 * @return {String}
 *         page to load that is stripped from the hash.
 */
EventModule.prototype._readHash = function (value) {
  value = value.replace(this._hash + '_', '');

  if (value.indexOf(':') !== -1) {
    value = value.substr(0, value.indexOf(':'));
  }

  return value;
};

// ------------------------------------------------------------
// Static methods
// ------------------------------------------------------------

/**
 * Static method to load a css file given a url. This method tracks each url
 * that is loaded to prevent duplicate attempts to load the same file.
 *
 * @param url {String}
 *      The URL for the file to load.
 */
EventModule.loadCSS = function (url) {
  var link;

  if (CSS_MAP.hasOwnProperty(url)) {
    return;
  }

  link = CSS_CONTAINER.appendChild(document.createElement('link'));
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', url);

  CSS_MAP[url] = true;
};

try {
  // Pre-load the CSS map with all prior loaded CSS files
  // (this is a "best guess")
  var links = document.querySelectorAll('link[rel="stylesheet"]');
  for (var i = 0; i < links.length; i++) {
    CSS_MAP[links.item(i).href] = true;
  }
  links = null;
} catch (e) {
  // TODO :: Hmm ... ?
}

/**
 * Static method to load a js file given a url. This method tracks each url
 * that is loaded to prevent duplicate attempts to load the same file.
 *
 * @param url {String}
 *      The URL for the file to load.
 * @param loadCallback {Function}
 *      The function to call after URL loads.
 */
var __loadJS = function (url, loadCallback) {
  if (JS_MAP.hasOwnProperty(url)) {
    // already loaded, call callback
    loadCallback(url);
  } else {
    Util.loadScript(url, {
      success: function () {
        // mark as loaded
        JS_MAP[url] = true;
        // call callback
        loadCallback(url);
      }
    });
  }
};

/**
 * Static method to load one or more js files given urls.
 * This method tracks each url that is loaded to prevent duplicate attempts to
 * load the same file.
 *
 * @param url {Array<String>|String}
 *      The URLs for the file to load.
 * @param callback {Function}
 *      The function to call after URLs load.
 */
EventModule.loadJS = function (urls, callback) {
  var i,
      len,
      loaded,
      loadCallback;
  // make sure urls is an array
  urls = Array.isArray(urls) ? urls : [urls];
  len = urls.length;
  loaded = 0;
  // callback for __loadJS
  loadCallback = function () {
    loaded++;
    if (loaded === len) {
      callback();
    }
  };
  // load all dependencies
  for (i = 0; i < len; i++) {
    __loadJS(urls[i], loadCallback);
  }
};



module.exports = EventModule;
