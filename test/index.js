require.config({
	baseUrl: '..',
	paths: {
		mocha: 'mocha/mocha',
		chai: 'chai/chai',
		sinon: 'sinon/pkg/sinon',

		leaflet: 'leaflet/dist/leaflet-src',

		mvc: 'hazdev-webutils/src/mvc',
		util: 'hazdev-webutils/src/util',
		tablist: 'hazdev-tablist/src/tablist',
		svgimagemap: 'hazdev-svgimagemap/src/svgimagemap',
		quakeml: 'quakeml-parser-js/src/quakeml',

		base: 'base/0-0-1/js',
		summary: 'summary/0-0-1/js',
		scientific: 'scientific/0-0-1/js',
		impact: 'impact/0-0-1/js'
	},
	shim: {
		mocha: {
			exports: 'mocha'
		},
		chai: {
			deps: ['mocha'],
			exports: 'chai'
		},
		sinon: {
			exports: 'sinon'
		},
		leaflet: {
			exports: 'L'
		}
	}
});

require([
	'mocha',
], function (
	mocha
) {
	'use strict';

	mocha.setup('bdd');

	// Add each test class here as they are implemented
	require([
		'spec/modules/base/0-0-1/EventPageTest',
		'spec/modules/base/0-0-1/EventModuleTest',
		'spec/modules/base/0-0-1/EventModulePageTest',
		'spec/modules/summary/0-0-1/SummaryPageTest',
		'spec/modules/impact/0-0-1/ImpactModuleTest',
		'spec/modules/impact/0-0-1/DYFIPageTest',
		'spec/modules/impact/0-0-1/ShakemapDetailsTest',
		'spec/modules/impact/0-0-1/TabListUtilTest',
		'spec/modules/impact/0-0-1/PagerPageTest',
		'spec/modules/impact/0-0-1/PagerXmlParserTest',
		'spec/modules/scientific/0-0-1/HypocenterPageTest',
		'spec/modules/scientific/0-0-1/MomentTensorTest'
	], function () {
		if (window.mochaPhantomJS) {
			window.mochaPhantomJS.run();
		} else {
			mocha.run();
		}
	});
});
