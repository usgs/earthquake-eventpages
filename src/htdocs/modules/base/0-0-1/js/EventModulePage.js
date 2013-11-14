/* global define */
define([
	'util/Util'
], function (
	Util
) {
	'use strict';
	
	var DEFAULTS = {
		displayText: 'Default Page',
		href: '#'
	};

	var EventModulePage = function (options) {

		options = Util.extend({}, DEFAULTS, options || {});

		this._displayText = options.displayText;
		this._href = options.href;
		this._content = options.content || document.createElement('section');
	};

	EventModulePage.prototype.getContent = function () {
		return this._content;
	};

	EventModulePage.prototype.render = function () {
		this._content.innerHTML = 'Page last rendered: ' +
				(new Date()).toUTCString();
	};

	EventModulePage.prototype.destroy = function (element) {
		// TODO :: Clean up any page event bindings
	};


	EventModulePage.prototype._initialize = function () {
		if (!Util.hasClass(this._content, 'event-module-content')) {
			Util.addClass(this._content, 'event-module-content');
		}
	};

	return EventModulePage;
});
