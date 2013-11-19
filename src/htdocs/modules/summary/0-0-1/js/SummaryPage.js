/* global define */
define([
	'base/EventModulePage'
], function (
	EventModulePage
) {
	'use strict';

	var SummaryPage = function (options) {
		EventModulePage.apply(this, arguments);
	};
	SummaryPage.prototype = Object.create(EventModulePage.prototype);

	return SummaryPage;
});
