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
		title: 'Did You Feel It?',
		hash: 'dyfi',
		cssUrl: require.toUrl('dyfi/../css/index.css'),
		dependencyLoader: null,
		pages: [
			{
				className: 'dyfi/DYFIMapPage',
				options: {
					title: 'Maps',
					hash: 'maps'
				},
				productTypes: ['dyfi']
			},
			{
				className: 'dyfi/DYFIGraphPage',
				options: {
					title: 'Graphs',
					hash: 'graphs'
				},
				hasContent: function (eventDetails) {
					var dyfi,
					    code,
					    contents;
					try {
						dyfi = eventDetails.properties.products.dyfi[0];
						code = dyfi.code;
						contents = dyfi.contents;
						return (
								contents.hasOwnProperty(code + '_plot_atten.jpg') ||
								contents.hasOwnProperty(code + '_plot_numresp.jpg'));
					} catch (e) {
						return false;
					}
				}
			},
			{
				className: 'dyfi/DYFIResponsesPage',
				options: {
					title: 'Responses',
					hash: 'responses'
				},
				hasContent: function (eventDetails) {
					var dyfi,
					    code,
					    contents;
					try {
						dyfi = eventDetails.properties.products.dyfi[0];
						code = dyfi.code;
						contents = dyfi.contents;
						return contents.hasOwnProperty('cdi_zip.xml');
					} catch (e) {
						return false;
					}
				}
			}
		]
	};

	var DYFIModule = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		this._event = options.eventDetails || {};
		EventModule.call(this, options);
	};
	DYFIModule.prototype = Object.create(EventModule.prototype);

	DYFIModule.prototype.getFooterMarkup = function () {

		var product = this._event.properties.products.dyfi[0],
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

	return DYFIModule;
});
