/* global define */
define([
	'util/Util'
], function (
	Util
) {
	'use strict';

	var DEFAULTS = {
		title: 'Event Module',
		hash: 'module',
		dependencyLoader: 'base/EventModulePages',
		pages: [
			{
				title: 'Page 1',
				hash: 'page1',
				className: 'base/EventModulePage',
				options: {
				}
			},
			{
				title: 'Page 2',
				hash: 'page2',
				className: 'base/EventModulePage',
				options: {
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

		this._cssLoaded = false;
	};

	EventModule.prototype.destroy = function () {
		// TODO :: Clean up allocated memory. Make instantiated pages clean up as
		//         well.
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
	EventModule.prototype.getNavigationMarkup = function (hash) {
		var markup = ['<section><header>', this._title, '</header>'],
		    numPages = this._pages.length, fullHash = null,
		    i = null, page = null;

		for (i = 0; i < numPages; i++) {
			page = this._pages[i];
			fullHash = this._hash + '_' + page.hash;

			if (fullHash === hash) {
				markup.push('<strong class="current-page">' + page.title + '</strong>');
			} else {
				markup.push('<a href="#' + this._hash + '_' + page.hash + '">' +
						page.title + '</a>');
			}
		}

		return markup.join('');
	};

	EventModule.prototype.getHeaderMarkup = function (/* page */) {
		return '<h2>' + this._title + '</h2>';
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
		var pageInfo = this._getPageInfo(hash.replace(this._hash + '_', ''));
		var pageOptions = Util.extend({}, pageInfo.options,
				{eventDetails: this._eventDetails, module: module});

		require([this._dependencyLoader], function (pages) {
			var page = null;

			try {
				if (pages.hasOwnProperty(pageInfo.className)) {
					page = new pages[pageInfo.className](pageOptions);

					if (!module._cssLoaded) {
						module._loadCSS();
					}
				}
			} catch (e) {
				// TODO :: Hmm... ?
			}

			callback(page);
		});
	};

	EventModule.prototype._loadCSS = function () {
		// TODO :: Load the css for this module. This method should be called
		// once when the first page in the module is requested.
		var link = document.createElement('link'),
		    container = document.querySelectory('head');

		if (!container) {
			container = document.querySelector('body');
		}

		if (!container) {
			return;
		}

		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', require.toUrl('./index.css'));

		container.appendChild(link);

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

		for (i = 0; i < numPages; i++) {
			pageInfo = this._pages[i];
			if (pageInfo.hash === pageHash) {
				return pageInfo;
			}
		}

		return null;
	};

	// var DEFAULTS = {
	// 	// URL hash fragment identifying this module; unique within the EventPage.
	// 	stub: 'module',

	// 	// Title of this specific module
	// 	title: 'Module',

	// 	// Maximum number of pages this module can cache
	// 	maxCacheLength: 3
	// };

	// var EventModule = function (options) {
	// 	options = options || {};

	// 	this._stub = options.stub || DEFAULTS.stub;
	// 	this._title = options.title || DEFAULTS.title;
	// 	this._pages = options.pages || [];
	// 	this._event = options.eventDetails || {};

	// 	this._maxCacheLength = options.maxCacheLength || DEFAULTS.maxCacheLength;
	// 	this._cachedPages = [];
	// };

	// EventModule.prototype.destroy = function () {
	// 	// TODO
	// };

	// EventModule.prototype.getHeaderMarkup = function (page) {
	// 	return '<h1>' + this._title + ' - ' + page.getTitle() + '</h1>';
	// };

	// EventModule.prototype.getFooterMarkup = function () {
	// 	return '';
	// };

	// EventModule.prototype.getStub = function () {
	// 	return this._stub;
	// };

	// EventModule.prototype.getPage = function (hash, callback) {
	// 	var i = null,
	// 	    _this = this,
	// 	    page = null,
	// 	    pageInfo = null,
	// 	    pageFound = false,
	// 	    numPages = this._pages.length,
	// 	    numCached = this._cachedPages.length;

	// 	// Check the cache first
	// 	for (i = 0; i < numCached; i++) {
	// 		page = this._cachedPages[i];
	// 		if (hash === this._stub + '_' + page.getStub()) {
	// 			callback(page);
	// 			return;
	// 		}
	// 	}

	// 	// Not in the cache, check the registered pages
	// 	for (i = 0; i < numPages; i++) {
	// 		pageInfo = this._pages[i];
	// 		if (hash === this._stub + '_' + pageInfo.options.stub) {
	// 			pageFound = true;
	// 			break;
	// 		}
	// 	}

	// 	if (pageFound) {
	// 		require([pageInfo.className], function (Page) {
	// 			page = new Page(Util.extend(
	// 					{}, pageInfo.options, {eventDetails: _this._event}));
	// 			_this.primeCache(page);
	// 			callback(page);
	// 		});
	// 		return;
	// 	}

	// 	throw 'No page found for request: "' + hash + '"';
	// };

	// EventModule.prototype.primeCache = function (page) {
	// 	var i = null,
	// 	    cachedPage = null,
	// 	    numCached = this._cachedPages.length;

	// 	// Check if this page is already in the cache
	// 	for (i = 0; i < numCached; i++) {
	// 		cachedPage = this._cachedPages[i];
	// 		if (page.getStub() === this._cachedPages[i].getStub()) {
	// 			cachedPage.destroy();
	// 			this._cachedPages.splice(i, 1);
	// 			break; // Should only be in cache once, so quit looking
	// 		}
	// 	}

	// 	// Add the page to the front of the cache
	// 	this._cachedPages.unshift(page);

	// 	// Trim the cache if it has grown too large
	// 	while (this._cachedPages.length > this._maxCacheLength) {
	// 		cachedPage = this._cachedPages.pop();
	// 		cachedPage.destroy();
	// 	}
	// };

	return EventModule;
});
