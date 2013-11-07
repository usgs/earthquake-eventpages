/* global define */
define([
	'mvc/View',
	'util/Util'
], function (
	View,
	Util
) {
	'use strict';

	var DEFAULTS = {
		cacheLength: 10,
		defaultModule: 'base/0-0-1/EventModule'
	};

	var EventPage = function (options) {

		options = options || {};

		this._el = options.el || document.createElement('div');
		this._nav = options.nav || document.createElement('nav');

		this._event = options.event || {};
		this._modules = options.modules || {};
		this._maxCacheLength = options.cacheLength || DEFAULTS.cacheLength;
		this._defaultModule = options.defaultModule || DEFAULTS.defaultModule;

		// Cache of recently rendered pages. Ordered by recency.
		this._renderCache = [];
	};


	EventPage.prototype.render = function () {
		var hash = window.location.hash.substring(1),
		    index = this._getCacheIndex(hash), item = null;

		if (index !== -1) {
			// Cache hit.
			item = this._renderCache[index];

			// Remove from cache (it will be re-added later)
			this._renderCache.splice(index, 1);

			// Updates the page and caches result
			this._render(item);
		} else {
			// Cache miss. May complete asynchronously.
			item = this._delegateRender(hash)
		}
	};

	EventPage.prototype._initialize = function () {

	};

	EventPage.prototype._delegateRender = function (hash) {
		var module = null, page = this;

		try {
			module = this._findRegisteredModule(hash);
		} catch (ex) {
			module = this._defaultModule;
		}

		require([module], function (Module) {
			page._render({
				hash: hash,
				el: (new Module({event: pager._event}))._el
			});
		});
	};

	EventPage.prototype._render = function (item) {
		this._el.innerHTML = '';
		this._el.appendChild(item.el);

		this._renderCache.unshift(item);

		// Trim the cache size
		this._renderCache.splice(this._maxCacheLength,
				this.renderCache.length - this._maxCacheLength);
	};

	EventPage.prototype._findRegisteredModule = function (hash) {
		var module = this._modules[hash];

		if (typeof module === 'undefined' || module === null) {
			throw 'No registered module for target: ' + hash;
		}

		return module;
	};


	EventPage.prototype._getCacheIndex = function (hash) {
		var cached = false, i = 0, numCached = this.renderCache.length, item;

		for (i = 0; i < numCached; i++) {
			item = this._renderCache[i];
			if (item.hash === hash) {
				return i;
			}
		}
		return -1;
	};

	return EventPage;
});
