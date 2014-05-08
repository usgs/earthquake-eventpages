/* global define */
define([
	'util/Util',
	'util/Events',

	'base/EventModule',
	'summary/SummaryModule',
	'scientific/ScientificModule',
	'impact/ImpactModule'
], function (
	Util,
	Events,

	EventModule,
	SummaryModule,
	ScientificModule,
	ImpactModule
) {
	'use strict';

	var DEFAULTS = {
		// Maximum number of modules to cache
		maxCacheLength: 3,

		// Default page to render if no hash is specified
		defaultPage: 'general_summary'
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
		Events.call(this);

		options = options || {};

		this._container = options.container ||
				document.querySelector('.event-content') ||
				document.createElement('section');
		this._navigation = options.navigation ||
				document.querySelector('.site-sectionnav') ||
				document.createElement('nav');
		this._footer = options.footer ||
				document.querySelector('.event-footer') ||
				document.createElement('footer');

		this._eventDetails = options.eventDetails || {};

		this._defaultPage = options.hasOwnProperty('defaultPage') ?
				options.defaultPage : DEFAULTS.defaultPage;

		this._maxCacheLength = options.maxCacheLength || DEFAULTS.maxCacheLength;
		this._cache = [];

		this._modules = options.modules || [
			new SummaryModule({'eventDetails':this._eventDetails}),
			new ImpactModule({'eventDetails':this._eventDetails}),
			new ScientificModule({'eventDetails':this._eventDetails})
		];

		this._initialize();
	};

	EventPage.prototype = Object.create(Events.prototype);

	EventPage.prototype.destroy = function () {
		var i = null;

		Events.off('hashchange', this._onHashChange, this);

		for (i = this._modules.length - 1; i >= 0; i--) {
			this._modules[i].destroy();
			this._modules[i] = null;
			delete this._modules[i];
		}

		this._modules = null;

		this._cache = null;
		this._maxCacheLength = null;

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
				markup.push(module.getNavigationMarkup(hash));
			}
		}

		this._navigation.innerHTML = markup.join('');
	};

	EventPage.prototype.updateFooter = function () {
		this._footer.innerHTML =
			'<a href="/earthquakes/map/doc_aboutdata.php">' +
					'About ANSS Comprehensive Catalog' +
			'</a>';
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
		// Update the page rendering
		this._container.innerHTML = '';
		this._container.appendChild(page.getHeader());
		this._container.appendChild(page.getContent());
		this._container.appendChild(page.getFooter());

		// Update cache
		this.cachePage(hash, page);

		// Notify listeners
		this.trigger('render', {hash: hash, page: page});
	};

	EventPage.prototype._showDefaultPage = function () {
		var newLocation;

		if (this._defaultPage !== null) {
			if (window.location.replace) {
				newLocation = window.location.origin +
						window.location.pathname + window.location.search + '#' +
						this._defaultPage;
				window.location.replace(newLocation);
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

	return EventPage;
});
