/* global define */
define([
	'base/EventPage',
	'impact/ImpactModule'
], function (
	EventPage,
	ImpactModule
) {
	'use strict';

	var UnknownEventPage = function (options) {
		options.defaultPage = 'impact_tellus';
		options.modules = options.modules || [
			new ImpactModule({'eventDetails':this._eventDetails})
		];
		EventPage.call(this, options);
	};

	UnknownEventPage.prototype = Object.create(EventPage.prototype);

	return UnknownEventPage;
});
