/* global define */
define([
	'util/Util'
], function (
	Util
) {
	'use strict';

	var DEFAULTS = {
		// URL hash fragment identifying this module; unique within the EventPage.
		stub: 'module',

		// Title of this specific module
		title: 'Module',

		// Maximum number of pages this module can cache
		maxCacheLength: 3
	};

	var EventModule = function (options) {
		options = options || {};

		this._stub = options.stub || DEFAULTS.stub;
		this._title = options.title || DEFAULTS.title;
		this._pages = options.pages || [];
		this._event = options.eventDetails || {};

		this._maxCacheLength = options.maxCacheLength || DEFAULTS.maxCacheLength;
		this._cachedPages = [];
	};

	EventModule.prototype.destroy = function () {
		// TODO
	};

	EventModule.prototype.getHeaderMarkup = function (page) {
		return '<h1>' + this._title + ' - ' + page.getTitle() + '</h1>';
	};

	EventModule.prototype.getFooterMarkup = function () {
		return '';
	};

	EventModule.prototype.getStub = function () {
		return this._stub;
	};

	EventModule.prototype.getPage = function (hash, callback) {
		var i = null,
		    _this = this,
		    page = null,
		    pageInfo = null,
		    pageFound = false,
		    numPages = this._pages.length,
		    numCached = this._cachedPages.length;

		// Check the cache first
		for (i = 0; i < numCached; i++) {
			page = this._cachedPages[i];
			if (hash === this._stub + '_' + page.getStub()) {
				callback(page);
				return;
			}
		}

		// Not in the cache, check the registered pages
		for (i = 0; i < numPages; i++) {
			pageInfo = this._pages[i];
			if (hash === this._stub + '_' + pageInfo.options.stub) {
				pageFound = true;
				break;
			}
		}

		if (pageFound) {
			require([pageInfo.className], function (Page) {
				page = new Page(Util.extend(
						{}, pageInfo.options, {eventDetails: _this._event}));
				_this.primeCache(page);
				callback(page);
			});
			return;
		}

		throw 'No page found for request: "' + hash + '"';
	};

	EventModule.prototype.primeCache = function (page) {
		var i = null,
		    cachedPage = null,
		    numCached = this._cachedPages.length;

		// Check if this page is already in the cache
		for (i = 0; i < numCached; i++) {
			cachedPage = this._cachedPages[i];
			if (page.getStub() === this._cachedPages[i].getStub()) {
				cachedPage.destroy();
				this._cachedPages.splice(i, 1);
				break; // Should only be in cache once, so quit looking
			}
		}

		// Add the page to the front of the cache
		this._cachedPages.unshift(page);

		// Trim the cache if it has grown too large
		while (this._cachedPages.length > this._maxCacheLength) {
			cachedPage = this._cachedPages.pop();
			cachedPage.destroy();
		}
	};

	return EventModule;
});
