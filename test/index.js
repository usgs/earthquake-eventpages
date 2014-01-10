require.config({
	baseUrl: '..',
	paths: {
		mocha: 'mocha/mocha',
		chai: 'chai/chai',
		sinon: 'sinon/pkg/sinon',

		mvc: 'hazdev-webutils/src/mvc',
		util: 'hazdev-webutils/src/util',
		tablist: 'hazdev-tablist/src/tablist',

		base: 'base/0-0-1/js',
		dyfi: 'dyfi/0-0-1/js',
		scientific: 'scientific/0-0-1/js'
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
		'spec/modules/dyfi/0-0-1/DYFIModuleTest',
		'spec/modules/dyfi/0-0-1/DYFIMapPageTest',
		'spec/modules/dyfi/0-0-1/DYFIGraphPageTest',
		'spec/modules/dyfi/0-0-1/DYFIResponsesPageTest'
	], function () {
		if (window.mochaPhantomJS) {
			window.mochaPhantomJS.run();
		} else {
			mocha.run();
		}
	});
});
