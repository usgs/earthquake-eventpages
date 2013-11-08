/* global define */
define([
	'util/Util'
], function (
	Util
) {
	'use strict';
	
	var DEFAULTS = {
		displayText: 'Event Module Page',
		href: '#'
	};

	var EventModulePage = function (options) {

		options = Util.extend({}, DEFAULTS, options || {});

		this._displayText = options.displayText;
		this._href = options.href;
		this._el = options.el || document.createElement('div');
	};

	EventModulePage.prototype.render = function () {

	};

	EventModulePage.prototype.destroy = function (element) {
		// TODO :: Clean up any page event bindings
	};

	return EventModulePage;
});
