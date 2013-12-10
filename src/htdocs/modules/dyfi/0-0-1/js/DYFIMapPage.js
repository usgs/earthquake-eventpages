/* global define */
define([
	'util/Util',
	'base/EventModulePage'
], function (
	Util,
	EventModulePage
) {
	'use strict';

	var DEFAULTS = {
		title: 'Maps',
		hash: 'maps'
	};

	var DYFIMapPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};
	DYFIMapPage.prototype = Object.create(EventModulePage.prototype);

	return DYFIMapPage;
});
