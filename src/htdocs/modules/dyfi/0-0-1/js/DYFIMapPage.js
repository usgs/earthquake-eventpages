/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'tablist/Tablist',
	'util/Xhr',
	'./TabListUtil'
], function (
	Util,
	EventModulePage,
	TabList,
	Xhr,
	TabListUtil
) {
	'use strict';

	var DEFAULTS = {
		title: 'Maps',
		hash: 'maps'
	};
	/* sets up titles and images for tabs */
	var MAPIMAGES = [
		{
			title:'Intensity Map',
			suffix:'_ciim.jpg',
			usemap:'imap_base',
			mapSuffix:'_ciim_imap.html'
		},
		{
			title:'Geocoded Map',
			suffix:'_ciim_geo.jpg',
			usemap:'imap_geo',
			mapSuffix:'_ciim_geo_imap.html'
		},
		{
			title:'Zoom Map',
			suffix:'_ciim_zoom.jpg',
			usemap:'imap_zoom',
			mapSuffix:'_ciim_zoom_imap.html'
		},
		{
			title:'Zoom Out Map',
			suffix:'_ciim_zoomout.jpg',
			usemap:'imap_zoomout',
			mapSuffix:'_ciim_zoomout_imap.html'
		}
	];

	/* creates map page and sets up the content */
	var DYFIMapPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};

	DYFIMapPage.prototype = Object.create(EventModulePage.prototype);

	DYFIMapPage.prototype._setContentMarkup = function () {
		var products = this._event.properties.products,
		    dyfi;
		if (!products.dyfi) {
			return;
		}

		dyfi = products.dyfi[0];
		/* creates tab list */
		new TabList({
			el: this._content.appendChild(document.createElement('div')),
			tabPosition: 'right',
			tabs: TabListUtil.CreateTabListData(
				{contents:dyfi.contents,
				 eventId:dyfi.code,
				 dataObject:MAPIMAGES,
				 callback:this._getUseMap,
				 object:this
				})
		});

	};

	return DYFIMapPage;
});
