/* global define */
define([
	'require',

	'util/Util',
	'base/EventModule'
], function (
	require,

	Util,
	EventModule
) {
	'use strict';

	var DEFAULTS = {
		title: 'Impact',
		hash: 'impact',
		cssUrl: require.toUrl('impact/../css/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'impact/DYFIPage',
				options: {
					title: 'Did You Feel It?',
					hash: 'dyfi'
				},
				productTypes: ['dyfi']
			},
			{
				className: 'impact/ShakemapPage',
				options: {
					title: 'Shakemap',
					hash: 'shakemap'
				},
				productTypes: ['shakemap']
			},
			{
				className: 'impact/PagerPage',
				options: {
					title: 'PAGER',
					hash: 'pager'
				},
				productTypes: ['losspager']
			}
		]
	};


	var ImpactModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});

		EventModule.call(this, options);
	};
	ImpactModule.prototype = Object.create(EventModule.prototype);

	return ImpactModule;
});