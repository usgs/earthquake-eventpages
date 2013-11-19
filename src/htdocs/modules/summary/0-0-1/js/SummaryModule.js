/* global define */
define([
	'base/EventModule'
], function (
	EventModule
) {
	'use strict';

	var SummaryModule = function (options) {
		EventModule.call(this, options);
	};
	SummaryModule.prototype = Object.create(EventModule.prototype);

	return SummaryModule;
});
