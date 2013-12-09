/* global define */
define([
	'util/Util',
	'base/EventModule',
], function (
	Util,
	EventModule
) {
	'use strict';

	var DEFAULTS = {
		title: 'Did You Feel It?',
		hash: 'dyfi',
		dependencyLoader: null,
		pages: [
			{
				className: 'dyfi/DYFIMapPage',
				options: {
					title: 'Maps',
					hash: 'maps'
				}
			},
			{
				className: 'dyfi/DYFIGraphPage',
				options: {
					title: 'Graphs',
					hash: 'graphs'
				}
			},
			{
				className: 'dyfi/DYFIResponsesPage',
				options: {
					title: 'Responses',
					hash: 'responses'
				}
			}
		]
	};

	var DYFIModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModule.call(this, options);
	};
	DYFIModule.prototype = Object.create(EventModule.prototype);

	return DYFIModule;
});
