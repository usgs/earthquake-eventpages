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
		title: 'Graphs',
		hash: 'graphs'
	};

	var DYFIGraphPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};
	DYFIGraphPage.prototype = Object.create(EventModulePage.prototype);

	return DYFIGraphPage;
});
