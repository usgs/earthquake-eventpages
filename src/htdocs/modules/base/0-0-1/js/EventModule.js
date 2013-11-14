/* global define */
define([
	'util/Events',
	'util/Util',

	'base/EventModulePage'
], function (
	Events,
	Util,

	DefaultPage
) {
	'use strict';

	var DEFAULTS = {
		stub: 'defaultmodule'
	};

	var EventModule = function (options) {
		Events.call(this);

		options = Util.extend({}, DEFAULTS, options || {});

		this._pages = options.pages || [];
		this._stub = options.stub || DEFAULTS.stub;
		this._displayText = options.displayText || 'Default Module';

		this._header = options.header || document.createElement('header');
		this._footer = options.footer || document.createElement('footer');

		this._initialize();
	};
	EventModule.prototype = Object.create(Events.prototype);

	EventModule.prototype.getNavigationMarkup = function () {
		var markup = [],
		    i = 0,
		    numPages = this._pages.length,
		    page = null;

		markup.push('<section><header>' + this._displayText + '</header>');

		for (i = 0; i < numPages; i++) {
			page = this._pages[i];

			markup.push('<a href="#' + this._stub + '_' + page.options.href + '">' +
					page.options.displayText + '</a>');
		}

		markup.push('</section>');

		return markup.join('');
	};

	EventModule.prototype.getStub = function () {
		return this._stub;
	};

	EventModule.prototype.getHeader = function () {
		return this._header;
	};

	EventModule.prototype.getFooter = function () {
		return this._footer;
	};

	EventModule.prototype.render = function (hash, callback) {
		var pageInfo = null,
		    page = null,
		    i = 0,
		    numPages = this._pages.length,
		    module = this;

		for (i = 0; i < numPages; i++) {
			if (this._pages[i].options.href === hash) {
				pageInfo = this._pages[i];
				if (typeof pageInfo.classname === 'string') {
					// Classname is a string, require the class and go
					require([
						pageInfo.classname
					], function (
						Page
					) {
						module._render(new Page(pageInfo.options), callback);
					});
				} else if (typeof pageInfo.classname === 'function') {
					// Classname is a constructor, instantiate a new page
					module._render(new pageInfo.classname(pageInfo.options), callback);
				} else {
					// Classname is an actual instance, just use it
					module._render(pageInfo.classname, callback);
				}
				return;
			}
		}

		this._render(new DefaultPage(), callback);
	};

	EventModule.prototype.destroy = function (element) {
		// TODO :: Clean up memory for the page that renders the hash
	};


	EventModule.prototype._initialize = function () {
		if (!Util.hasClass(this._header, 'event-module-header')) {
			Util.addClass(this._header, 'event-module-header');
		}
		if (!Util.hasClass(this._footer, 'event-module-footer')) {
			Util.addClass(this._footer, 'event-module-footer');
		}
	};

	EventModule.prototype._render = function (page, callback) {
		this._renderModuleHeader(page);
		this._renderModuleFooter(page);
		page.render();

		callback(this, page);
	};

	EventModule.prototype._renderModuleHeader = function (page) {
		this._header.innerHTML = '<h1>' + this._displayText + ' - ' +
				page._displayText + '</h1>';
	};

	EventModule.prototype._renderModuleFooter = function (page) {
		// TODO :: Anything go here by default?
	};

	return EventModule;
});
