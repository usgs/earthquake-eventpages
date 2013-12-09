/* global define */
define([
	'base/EventModulePage'
], function (
	EventModulePage
) {
	'use strict';
	
	var DYFIMapPage = function (options) {
		EventModulePage.call(this, options);
	};
	DYFIMapPage.prototype = Object.create(EventModulePage.prototype);

	return DYFIMapPage;
});