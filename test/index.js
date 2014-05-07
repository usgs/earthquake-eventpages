// PhantomJS is missing native bind support,
//     https://github.com/ariya/phantomjs/issues/10522
// Polyfill from:
//     https://developer.mozilla.org
//         /en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		'use strict';
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5 internal IsCallable
			throw new TypeError('object to be bound is not callable');
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
		    fToBind = this,
		    FNOP = function () {},
		    fBound;

		fBound = function () {
			return fToBind.apply(
					(this instanceof FNOP && oThis ? this : oThis),
					aArgs.concat(Array.prototype.slice.call(arguments)));
		};

		FNOP.prototype = this.prototype;
		fBound.prototype = new FNOP();

		return fBound;
	};
}


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
		'spec/modules/impact/0-0-1/ShakeMapPageTest',
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
