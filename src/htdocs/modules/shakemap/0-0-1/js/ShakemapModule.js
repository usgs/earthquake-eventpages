/* global define */
define([
	'util/Util',
	'base/EventModule'
], function (
	Util,
	EventModule
) {
	'use strict';

	var DEFAULTS = {
		title: 'Shakemap',
		hash: 'shakemap',
		cssUrl: require.toUrl('shakemap/../css/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'shakemap/ShakemapDetailsPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				},
				productTypes: ['shakemap']
			}
		]
	};

	var ShakemapModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		this._event = options.eventDetails || {};
		EventModule.call(this, options);
	};

	ShakemapModule.prototype = Object.create(EventModule.prototype);

	return ShakemapModule;
});
