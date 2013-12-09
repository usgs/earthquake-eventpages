/* global define */
define([
	'base/EventModulePage'
], function (
	EventModulePage
) {
	'use strict';
	
	var DYFIResponsesPage = function (options) {
		EventModulePage.call(this, options);
	};
	DYFIResponsesPage.prototype = Object.create(EventModulePage.prototype);

		return DYFIResponsesPage;
});