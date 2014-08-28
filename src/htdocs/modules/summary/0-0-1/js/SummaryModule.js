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
		title: 'General',
		hash: 'general',
		cssUrl: require.toUrl('summaryCss/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'summary/SummaryPage',
				options: {
					title: 'Summary',
					hash: 'summary'
				},
				//Always include page.
				hasContent: function () {
					return true;
				},
				productTypes: ['origin', 'geoserve']
			},
			{
				className: 'summary/InteractiveMap',
				options: {
					title: 'Interactive Map',
					hash: 'map'
				}
			}
		]
	};

	var SummaryModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		if (options.eventConfig && options.eventConfig.KML_STUB) {
			this._kmlUrl = options.eventConfig.KML_STUB.replace('%s',
					options.eventDetails.id);
		}
		EventModule.call(this, Util.extend({}, DEFAULTS, options || {}));
	};

	SummaryModule.prototype = Object.create(EventModule.prototype);

	SummaryModule.prototype.getNavigationItems = function (hash) {
		var markUp = EventModule.prototype.getNavigationItems.call(this, hash);

		if ( this._kmlUrl ) {
			markUp.push('<a href="' + this._kmlUrl + '">Google Earth KML</a>');
		}

		return markUp;
	};

	return SummaryModule;
});
