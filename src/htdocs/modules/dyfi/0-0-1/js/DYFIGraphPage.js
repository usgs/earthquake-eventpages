/* global define */
define([
	'base/EventModulePage'
], function (
	EventModulePage
) {
	'use strict';

	var DYFIGraphPage = function (options) {
		EventModulePage.call(this, options);
	};
	DYFIGraphPage.prototype = Object.create(EventModulePage.prototype);

	return DYFIGraphPage;
});