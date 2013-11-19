/* global define */
define([
	'base/EventModule'
], function (
	EventModule
) {
	'use strict';

	var SummaryModule = function (options) {
		EventModule.apply(this, arguments);

	};
	SummaryModule.prototype = Object.create(EventModule.prototype);

	return SummaryModule;
});
