/* global define */
define([
	'util/Util',
	'base/EventModule',
	'base/ContentsXML'
], function (
	Util,
	EventModule,
	ContentsXML
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

	ShakemapModule.prototype.getFooterMarkup = function () {

		var product = this._event.properties.products.shakemap[0],
		    el = document.createElement('div');
		el.className = 'downloads';
		el.innerHTML = 'Loading contents ...';

		new ContentsXML({
				product: product,
				callback: function (contents) {
					el.innerHTML = '<header><h3>Downloads</h3></header>' +
							contents.getDownloads();
				},
				errback: function () {
					el.innerHTML = 'Error loading contents ...';
				}});
		return el;
	};

	return ShakemapModule;
});
