/* global define */
define([
	'util/Util'
], function (
	Util
) {
	'use strict';

	var CSS_MAP = {},
	    CSS_CONTAINER = document.querySelector('head');

	var DEFAULTS = {
		title: 'Event Module',
		hash: 'module',
		cssUrl: require.toUrl('baseCss/index.css'),
		dependencyLoader: 'base/EventModulePages',
		pages: [
			{
				className: 'base/EventModulePage',
				options: {
					title: 'Page 1',
					hash: 'page1',
				}
			},
			{
				className: 'base/EventModulePage',
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
		this._dependencyLoader = options.dependencyLoader;
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
		var markup = ['<header>', this._title, '</header>'],
		    numPages = this._pages.length, fullHash = null,
		    i = null, page = null, pageOptions = null;

		for (i = 0; i < numPages; i++) {
			page = this._pages[i];

			if (!this._pageHasContent(page)) {
				// hide pages without content
				continue;
			}

			pageOptions = page.options;
			fullHash = this._hash + '_' + pageOptions.hash;

			if (fullHash === hash) {
				markup.push('<strong class="current-page">' + pageOptions.title +
						'</strong>');
			} else {
				markup.push('<a href="#' + this._hash + '_' + pageOptions.hash + '">' +
						pageOptions.title + '</a>');
			}
		}

		return markup;
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
		return '<h2>' + this._title + ' - ' + page.getTitle() + '</h2>';
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
		var classLoader = null;

		if (this._dependencyLoader !== null) {
			// Use configured dependency loader to load all pages at once
			classLoader = this._dependencyLoader;
		} else {
			// No dependency loader, load classes individually based on class name
			classLoader = pageInfo.className;
		}

		require([classLoader], function (PageConstructor) {
			var page = null;

			//try {
				if (typeof PageConstructor === 'function') {
					page = new PageConstructor(pageOptions);
				} else {
					page = new PageConstructor[pageInfo.className](pageOptions);
				}

				if (!module._cssLoaded) {
					module._loadCSS();
				}
			//} catch (e) {
				// TODO :: Hmm... ?
			//}

			callback(page);
		});
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
	} catch (e) {
		// TODO :: Hmm ... ?
	}

	return EventModule;
});
