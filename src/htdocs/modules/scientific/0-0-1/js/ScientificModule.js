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
		dependencyLoader: null,
		pages: [
			{
				className: 'scientific/ScientificSummaryPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				}
			},
			{
				className: 'scientific/HypocenterPage',
				options: {
					title: 'Hypocenter',
					hash: 'hypocenter'
				}
			},
			{
				className: 'scientific/MomentTensorPage',
				options: {
					title: 'Moment Tensor',
					hash: 'tensor'
				}
			},
			{
				className: 'scientific/FocalMechanismPage',
				options: {
					title: 'Focal Mechanism',
					hash: 'mechanism'
				}
			},
			{
				className: 'scientific/FiniteFaultPage',
				options: {
					title: 'Finite Fault',
					hash: 'finitefault'
				}
			}
		]
	};

	var ScientificModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});

		EventModule.call(this, options);
	};
	ScientificModule.prototype = Object.create(EventModule.prototype);


	return ScientificModule;
});
