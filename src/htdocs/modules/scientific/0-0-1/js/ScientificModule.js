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
				className: 'scientific/MomentTensorPage',
				options: {
					title: 'Moment Tensor',
					hash: 'tensor'
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
