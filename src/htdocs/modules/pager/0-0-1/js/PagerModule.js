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
		title: 'PAGER',
		hash: 'pager',
		cssUrl: require.toUrl('pager/../css/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'pager/PagerPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				},
				productTypes: ['losspager']
			}
		]
	};


	var PagerModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});

		EventModule.call(this, options);
	};
	PagerModule.prototype = Object.create(EventModule.prototype);

	return PagerModule;
});