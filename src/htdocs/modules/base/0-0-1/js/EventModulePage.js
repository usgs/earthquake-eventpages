/* global define */
define([
	'base/EventModule',

	'util/Util'
], function (
	EventModule,

	Util
) {
	'use strict';

	var DEFAULTS = {
		// URL hash fragment identifying this page; unique within the parent module.
		hash: 'page',

		// Title of this specific module page
		title: 'Page'
	};

	var EventModulePage = function (options) {

		options = options || {};

		this._module = options.module || new EventModule();
		this._hash = options.hash || DEFAULTS.hash;
		this._title = options.title || DEFAULTS.title;
		this._event = options.eventDetails || {};

		this._initialize();
	};

	EventModulePage.prototype.destroy = function () {
		// TODO
	};

	EventModulePage.prototype.getHeader = function () {
		return this._header;
	};

	EventModulePage.prototype.getContent = function () {
		return this._content;
	};

	EventModulePage.prototype.getFooter = function () {
		return this._footer;
	};

	EventModulePage.prototype.getHash = function () {
		return this._hash;
	};

	EventModulePage.prototype.getTitle = function () {
		return this._title;
	};

	EventModulePage.prototype._initialize = function () {
		this._header = document.createElement('header');
		Util.addClass(this._header, 'event-module-header');
		this._content = document.createElement('section');
		Util.addClass(this._content, 'event-module-content');
		this._footer = document.createElement('footer');
		Util.addClass(this._footer, 'event-module-footer');

		this._setHeaderMarkup();
		this._setContentMarkup();
		this._setFooterMarkup();
	};

	EventModulePage.prototype._setHeaderMarkup = function () {
		this._header.innerHTML = this._module.getHeaderMarkup(this);
	};

	EventModulePage.prototype._setContentMarkup = function () {
		this._content.innerHTML = '<p>' +
			'Rendered: ' + (new Date()).toUTCString() +
		'</p>';
	};

	EventModulePage.prototype._setFooterMarkup = function () {
		this._footer.innerHTML = this._module.getFooterMarkup(this);
	};

	return EventModulePage;
});
