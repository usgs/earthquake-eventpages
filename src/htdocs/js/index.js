/* global require */
require.config({
	baseUrl: '.',
	paths: {
		mvc: 'hazdev-webutils/src/mvc',
		util: 'hazdev-webutils/src/util',

		base: 'modules/base/0-0-1/js',
		dyfi: 'modules/dyfi/0-0-1/js'
	},
	shim: {
	}
});

require([
	'EventDetails',
	'base/EventPage'
], function (
	EventDetails,
	EventPage
) {
	'use strict';

	new EventPage({
		eventDetails: EventDetails
	});
});
