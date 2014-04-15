/* global require */
require.config({
	baseUrl: '.',
	paths: {
		leaflet: 'leaflet/dist/leaflet-src',

		mvc: 'hazdev-webutils/src/mvc',
		util: 'hazdev-webutils/src/util',
		tablist: 'hazdev-tablist/src/tablist',
		svgimagemap: 'hazdev-svgimagemap/src/svgimagemap',
		map: 'js/map',
		quakeml: 'quakeml-parser-js/src/quakeml',
		questionview: 'hazdev-question-view/src',
		locationview: 'hazdev-location-view/src',

		base: 'modules/base/0-0-1/js',
		summary: 'modules/summary/0-0-1/js',
		impact: 'modules/impact/0-0-1/js',
		scientific: 'modules/scientific/0-0-1/js'
	},
	shim: {
		leaflet: {
			exports: 'L'
		}
	}
});

require([
	'EventDetails',
	'base/EventPage',
// "theme" is configured by hazdev-template
	'theme/OffCanvas'
], function (
	EventDetails,
	EventPage,
	OffCanvas
) {
	'use strict';

	var eventpage,
	    offcanvas;

	eventpage = new EventPage({
		eventDetails: EventDetails
	});

	offcanvas = OffCanvas.getOffCanvas();
	eventpage.on('render', function () {
		offcanvas.hide();
	});

});
