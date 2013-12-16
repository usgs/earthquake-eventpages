/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'tablist/Tablist',
	'tablist/ImageList',
	'./CreateTabListData'
], function (
	Util,
	EventModulePage,
	TabList,
	ImageList,
	CreateTabListData
) {
	'use strict';

	var DEFAULTS = {
		title: 'Graphs',
		hash: 'graphs'
	};

	var GRAPHIMAGES = [
		{
			title:'Intensity vs. Distance',
			suffix:'_plot_atten.jpg'
		},
		{
			title:'Response Vs. Time',
			suffix:'_plot_numresp.jpg'
		}
	];

	var DYFIGraphPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};
	DYFIGraphPage.prototype = Object.create(EventModulePage.prototype);

	DYFIGraphPage.prototype._setContentMarkup = function () {
		var products = this._event.properties.products,
		    dyfi;
		if (!products.dyfi) {
			return;
		}

		dyfi = products.dyfi[0];
		new ImageList({
			el: this._content.appendChild(document.createElement('div')),
			tabPosition: 'right',
			tabs: new CreateTabListData(
				{contents:dyfi.contents,
				 eventId:dyfi.code,
				 dataObject:GRAPHIMAGES
				})
		});

	};

	return DYFIGraphPage;
});
