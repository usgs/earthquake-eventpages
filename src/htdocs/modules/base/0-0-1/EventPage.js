/* global define */
define([
	'mvc/View',
	'util/Util',
	'util/Events',

	'base/0-0-1/EventModule'
], function (
	View,
	Util,
	Events,

	DefaultModule
) {
	'use strict';


	var DEFAULTS = {
		cacheLength: 10
	};

	/**
	 *Constructor.
	 *
	 * @param options {Object} eventpage attributes.
	 * 
	 * @param options.container {Object}		the element for the event module.
	 * @param options.navigation {Object}			the element for the navigation.
	 * @param options.eventDetails {Object}						contains event Details.
	 * @param options.modules {Object}				contains ALL the event modules.
	 * @param options.cacheLength: {number}			of rendered modules to cache.
	 * @param options.defaultModule {Object}				the first module to show.
	 */
	var EventPage = function (options) {

		options = options || {};

		this._container = options.container || document.createElement('div');
		this._navigation = options.navigation || document.createElement('nav');

		this._event = options.eventDetails || {};
		this._modules = options.modules || {};
		this._maxCacheLength = options.cacheLength || DEFAULTS.cacheLength;
		this._defaultModule = options.defaultModule || new DefaultModule();
		this._renderCache = [];

		// Initialize the event page
		this._initialize();
	};


	EventPage.prototype.render = function () {
		 var hash = window.location.hash.substring(1),
		     hashParts = hash.split('_'),
		     modulePart = hashParts.shift(),
		     pagePart = hashParts.join('_'),
		     module = this._modules[modulePart] || this._defaultModule,
		     navItems = null, navItem = null, i = 0,
		     item = null, cacheIndex = this._getCacheIndex(hash);


		// Try to highlight the current section in navigation
		navItems = this._navigation.querySelectorAll('.current-page');
		if (navItems) {
			for (i = 0; i < navItems.length; i++) {
				Util.removeClass(navItems[i], 'current-page');
			}
		}

		navItem = this._navigation.querySelector('[href="#' + hash + '"]');
		if (navItem) {
			Util.addClass(navItem, 'current-page');
		}

		// Check cache before rendering a new page
		if (cacheIndex !== -1) {
			item = this._renderCache.splice(cacheIndex, 1)[0];
			this._render(item.module, item.page, hash);
			return;
		}

		// No cached version, use module to render new version
		module.render(pagePart, (function (scope) {
			return function (module, page) {
				scope._render(module, page, hash);
			};
		})(this));
	};

	EventPage.prototype._render = function (module, page, hash) {
		var item = null, i = 0;

		this._container.innerHTML = '';

		this._container.appendChild(page._el);

		// Add this rendering result to the render cache
		this._renderCache.unshift({
			hash: hash,
			module: module,
			page: page
		});

		// Keep cache from growing too large
		for (i = this._renderCache.length - 1; i >= this._maxCacheLength; i--) {
			item = this._renderCache[i];

			item.module.destroy(page._el);
			item.page.destroy();
		}

		this._renderCache.splice(this._maxCacheLength,
				this._renderCache.length - this._maxCacheLength);
	};

	EventPage.prototype._initialize = function () {
		// Update navigation
		this._updateNavigation();

		// Start listening for hash changes
		Events.prototype.on.call(Events, 'hashchange', this.render, this);

		// Load an initial page for viewing, prefer hash, fall back to default
		this.render();
	};

	EventPage.prototype._updateNavigation = function () {
		var markup = [],
		    hash = null;

		for (hash in this._modules) {
			markup.push(this._modules[hash].getNavigationMarkup(hash));
		}

		this._navigation.innerHTML = markup.join('');
	};

	EventPage.prototype._findModule = function (hash) {
		var parts = hash.split('_'),
		    modulePart = parts.splice(0, 1);

		if (modulePart in this._modules) {
			return this._modules[modulePart];
		}
	};

	EventPage.prototype._getCacheIndex = function (hash) {
		var i = 0, numCaches = this._renderCache.length;

		for (i = 0; i < numCaches; i++) {
			if (this._renderCache[i].hash === hash) {
				return i;
			}
		}

		return -1;
	};

	return EventPage;
});
