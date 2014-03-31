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

		base: 'modules/base/0-0-1/js',
		summary: 'modules/summary/0-0-1/js',
		dyfi: 'modules/dyfi/0-0-1/js',
		pager: 'modules/pager/0-0-1/js',
		scientific: 'modules/scientific/0-0-1/js',
		shakemap: 'modules/shakemap/0-0-1/js'
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
	'theme/OffCanvas',
// these are listed here to be bundled with index.js
	'tablist/Tablist',
	'tablist/ImageList',
	'base/EventModulePage',
	'base/EventModulePages',
	'base/TabbedModulePage',
	'base/ContentsXML',
	'base/Formatter'
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
