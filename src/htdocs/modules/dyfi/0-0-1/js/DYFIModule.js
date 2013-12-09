/* global define */
define([
	'base/EventModule'
], function (
	EventModule
) {
	'use strict';
	
	var DYFIModule = function (options) {
		EventModule.call(this, options);
	};
	DYFIModule.prototype = Object.create(EventModule.prototype);

	return DYFIModule;
});