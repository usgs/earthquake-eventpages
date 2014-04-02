/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'tablist/Tablist',
	'./TabListUtil'
], function (
	Util,
	EventModulePage,
	TabList,
	TabListUtil
) {
	'use strict';

	var DEFAULTS = {
		title: 'Graphs',
		hash: 'graphs'
	};
	/* Sets up title for tab list */
	var GRAPHIMAGES = [
		{
			title:'Intensity Vs. Distance',
			suffix:'_plot_atten.jpg'
		},
		{
			title:'Responses Vs. Time',
			suffix:'_plot_numresp.jpg'
		}
	];
	/* Creates graph page and sets up the content */
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
		/* Creates tab list */
		new TabList({
			el: this._content.appendChild(document.createElement('div')),
			tabPosition: 'right',
			tabs: TabListUtil.CreateTabListData(
				{
					contents: dyfi.contents,
					eventId: dyfi.code,
					dataObject: GRAPHIMAGES
				})
		});

	};

	return DYFIGraphPage;
});
