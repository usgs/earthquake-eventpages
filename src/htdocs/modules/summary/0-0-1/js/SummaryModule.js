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
		title: 'Event Summary',
		hash: 'event',
		cssUrl: require.toUrl('summary/../css/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'summary/SummaryPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				}
			}
		]
	};

	var SummaryModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		if (options.eventDetails) {
			options.title = 'Event: ' + options.eventDetails.id;
		}
		EventModule.call(this, Util.extend({}, DEFAULTS, options || {}));
	};
	SummaryModule.prototype = Object.create(EventModule.prototype);

	return SummaryModule;
});
