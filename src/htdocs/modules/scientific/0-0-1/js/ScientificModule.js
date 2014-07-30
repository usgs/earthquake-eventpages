/* global define */
define([
	'util/Util',
	'base/EventModule',
	'require'
], function (
	Util,
	EventModule,
	require
) {
	'use strict';

	var DEFAULTS = {
		title: 'Scientific',
		hash: 'scientific',
		cssUrl: require.toUrl('scientific/../css/index.css'),
		dependencyLoader: 'scientific/ScientificModuleDependencies',
		pages: [
			{
				className: 'scientific/ScientificSummaryPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				},
				productTypes: [
					'origin',
					'phase-data',
					'moment-tensor',
					'focal-mechanism',
					'finite-fault'
				]
			},
			{
				className: 'scientific/HypocenterPage',
				options: {
					title: 'Origin',
					hash: 'origin'
				},
				productTypes: [
					'origin',
					'phase-data'
				]
			},
			{
				className: 'scientific/MomentTensorPage',
				options: {
					title: 'Moment Tensor',
					hash: 'tensor'
				},
				productTypes: ['moment-tensor']
			},
			{
				className: 'scientific/FocalMechanismPage',
				options: {
					title: 'Focal Mechanism',
					hash: 'mechanism'
				},
				productTypes: ['focal-mechanism']
			},
			{
				className: 'scientific/FiniteFaultPage',
				options: {
					title: 'Finite Fault',
					hash: 'finitefault'
				},
				productTypes: ['finite-fault']
			},
			{
				className: 'scientific/IrisProductsPage',
				options: {
					title: 'IRIS Products',
					hash: 'iris'
				}
			}
		]
	};

	var ScientificModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		this._event = options.event;
		EventModule.call(this, options);
	};
	ScientificModule.prototype = Object.create(EventModule.prototype);


	ScientificModule.prototype.getFooterMarkup = function () {
		return '<a href="' +
				'http://earthquake.usgs.gov/earthquakes/eventpage/terms.php' +
				'">Technical Terms used on Event Pages</a>';
	};

	return ScientificModule;
});