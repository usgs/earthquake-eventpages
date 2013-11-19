/* global define */
define([
	'util/Util',
	'util/Events'
], function (
	Util,
	Events
) {
	'use strict';

	var DEFAULTS = {
		// Maximum number of modules to cache
		maxCacheLength: 3,

		// Default page to render if no hash is specified
		defaultPage: null

		// Configured list of modules (and sub-pages). Must be specified when
		// event page is constructed.
		//
		// modules: [
		// 	{
		// 		className: 'base/EventModule',
		// 		options: {
		// 			title: 'Default Module',
		// 			stub: 'module',
		// 			pages: [
		// 				{
		// 					className: 'base/EventModulePage',
		// 					options: {
		// 						title: 'Default Page',
		// 						stub: 'page'
		// 					}
		// 				}
		// 			]
		// 		}
		// 	}
		// ]
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
		options = options || {};

		this._container = options.container || document.createElement('section');
		this._navigation = options.navigation || document.createElement('nav');
		this._modules = options.modules || [];
		this._event = options.eventDetails || {};

		this._defaultPage = options.defaultPage || DEFAULTS.defaultPage;
		this._maxCacheLength = options.maxCacheLength || DEFAULTS.maxCacheLength;
		this._cachedModules = [];

		this._initialize();
	};

	EventPage.prototype.destroy = function () {
		Events.off('hashchange', this._onHashChange, this);
	};

	EventPage.prototype.render = function (evt) {
		var hash = __get_hash(evt),
		    _this = this;

		try {
			this.getModule(hash, function (module) {
				module.getPage(hash, function (page) {
					_this._render(module, page);
				});
			});
		} catch (e) {
			// TODO :: Handle this differently?
			console.log('Error: ' + e);

			if (this._defaultPage !== null) {
				this._showDefaultPage();
			}
		}
	};

	EventPage.prototype.updateNavSelection = function (evt) {
		var i = null,
		    selectedItems = null,
		    numSelected = null,
		    selectedItem = null,
		    hash = __get_hash(evt);

		// Deselect all nav items
		selectedItems = this._navigation.querySelectorAll('.current-page');
		for (i = 0, numSelected = selectedItems.length; i < numSelected; i++) {
			Util.removeClass(selectedItems.item(i), 'current-page');
		}

		// Select the item specified by the event (or window location)
		selectedItem = this._navigation.querySelector('[href="#'+hash+'"]');
		if (selectedItem) {
			Util.addClass(selectedItem, 'current-page');
		}
	};

	EventPage.prototype.getModule = function (hash, callback) {
		var i = null,
		    _this = this,
		    module = null,
		    moduleInfo = null,
		    moduleFound = false,
		    numModules = this._modules.length,
		    numCached = this._cachedModules.length,
		    hashStub = hash.split('_').slice(0, 1).join('_');

		// Check the cache
		for (i = 0; i < numCached; i++) {
			module = this._cachedModules[i];
			if (module.getStub() === hashStub) {
				callback(module);
				return;
			}
		}

		// Not in the cache, try the registered modules
		for (i = 0; i < numModules; i++) {
			moduleInfo = this._modules[i];
			if (moduleInfo.options.stub === hashStub) {
				moduleFound = true;
				break;
			}
		}

		if (moduleFound) {
			require([moduleInfo.className], function (Module) {
				module = new Module(Util.extend(
						{}, moduleInfo.options, {eventDetails: _this._event}));
				_this.primeCache(module);
				callback(module);
			});
			return;
		}

		throw 'No module found for request: "' + hash + '"';
	};

	EventPage.prototype.primeCache = function (module) {
		var i = null,
		    cachedModule = null,
		    numCached = this._cachedModules.length;

		// Check if this module is already in the cache
		for (i = 0; i < numCached; i++) {
			cachedModule = this._cachedModules[i];
			if (module.getStub() === this._cachedModules[i].getStub()) {
				cachedModule.destroy();
				this._cachedModules.splice(i, 1);
				break; // Should only be in cache once, so quit looking
			}
		}

		// Add the module to the front of the cache
		this._cachedModules.unshift(module);

		// Trim the cache if it has grown too large
		while (this._cachedModules.length > this._maxCacheLength) {
			cachedModule = this._cachedModules.pop();
			cachedModule.destroy();
		}
	};


	EventPage.prototype._initialize = function () {
		var hash = __get_hash();

		this._updateNavigation();

		Events.on('hashchange', this._onHashChange, this);

		if (hash === '') {
			// No hash on page URL, use default page
			this._showDefaultPage();
		} else {
			// There is a hash already, make sure we show the page from the hash
			this._onHashChange();
		}
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
		}
	};

	EventPage.prototype._render = function (module, page) {
		if (this._current) {
			this._current.page.destroy();
			delete this._current.page;

			this._current.module.destroy();
			delete this._current.module;

			this._current = null;
		}

		this._container.innerHTML = '';
		this._container.appendChild(page.getHeader());
		this._container.appendChild(page.getContent());
		this._container.appendChild(page.getFooter());

		if (module && page) {
			this._current = {
				module: module,
				page: page
			};
		}
	};

	EventPage.prototype._onHashChange = function (evt) {
		this.updateNavSelection(evt);
		this.render(evt);
	};

	EventPage.prototype._updateNavigation = function () {
		var i = null,
		    j = null,
		    module = null,
		    pages = null,
		    numPages = null,
		    page = null,
		    markup = [],
		    numModules = this._modules.length;

		for (i = 0; i < numModules; i++) {
			module = this._modules[i].options;
			pages = module.pages;
			numPages = pages.length;

			markup.push('<section><header>' + module.title + '</header>');

			for (j = 0; j < numPages; j++) {
				page = pages[j].options;
				markup.push('<a href="#' + module.stub + '_' + page.stub + '">' +
						page.title + '</a>');
			}

			markup.push('</section>');
		}

		this._navigation.innerHTML = markup.join('');
		this.updateNavSelection();
	};

	return EventPage;
});
