/* global define */
define([
	'util/Events',
	'util/Util',

	'base/0-0-1/EventModulePage'
], function (
	Events,
	Util,

	EventModulePage
) {
	'use strict';

	var DEFAULTS = {

	};

	var EventModule = function (options) {
		Events.call(this);

		options = Util.extend({}, DEFAULTS, options || {});

		this._pages = options.pages || [];
		this._displayText = options.displayText || 'Default Page';
		this._defaultPage = new EventModulePage({href: 'Unknown', displayText: 'Default'});
	};
	EventModule.prototype = Object.create(Events.prototype);

	EventModule.prototype.getNavigationMarkup = function (baseStub) {
		var markup = [],
		    i = 0,
		    numPages = this._pages.length,
		    page = null;

		markup.push('<section><header>' + this._displayText + '</header>');

		for (i = 0; i < numPages; i++) {
			page = this._pages[i];

			markup.push('<a href="#' + baseStub + '_' + page.options.href + '">' +
					page.options.displayText + '</a>');
		}

		markup.push('</section>');

		return markup.join('');
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
				require([
					pageInfo.classname
				], function (
					Page
				) {
					module._render(new Page(pageInfo.options), callback);
				});
				return;
			}
		}

		this._render(this._defaultPage, callback);
	};

	EventModule.prototype.destroy = function (element) {
		// TODO :: Clean up memory for the page that renders the hash
	};



	EventModule.prototype._render = function (page, callback) {
		var markup = [];

		markup.push(this._renderModuleHeader(page));
		markup.push(this._renderModuleContent(page));
		markup.push(this._renderModuleFooter(page));

		page._el.innerHTML = markup.join('');
		callback(this, page);
	};

	EventModule.prototype._renderModuleHeader = function (page) {
		return '<header class="event-module-header">' +
			'<h1>' + this._displayText + ' - ' + page._displayText + '</h1>' +
		'</header>';
	};

	EventModule.prototype._renderModuleContent = function (page) {
		return '<section class="event-module-content">' +
			'<span class="timestamp">' + (new Date()).toUTCString() + '</span>' +
		'</section>';
	};

	EventModule.prototype._renderModuleFooter = function (page) {
		return '<footer class="event-module-footer"></footer>';
	};
	return EventModule;
});
