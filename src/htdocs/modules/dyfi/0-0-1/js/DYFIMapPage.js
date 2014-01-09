/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'tablist/Tablist',
	'tablist/ImageList',
	'util/Xhr',
	'./TabListUtil'
], function (
	Util,
	EventModulePage,
	TabList,
	ImageList,
	Xhr,
	TabListUtil
) {
	'use strict';

	var DEFAULTS = {
		title: 'Maps',
		hash: 'maps'
	};

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
		new ImageList({
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

	/**
	 * ajax call to get the usemap for a given image.
	 *
	 * @param content {Object}
	 *        a content object aquired from the properties.products.dyfi Object
	 * @param content.url {String}
	 *        the url used to retrieve the usemap
	 **/
	DYFIMapPage.prototype._getUseMap = function (content, _this) {
		Xhr.ajax({
			url: content.url,
			success: function (html) {
				_this._content.insertAdjacentHTML('beforeend', html);
			}
		});
	};

	return DYFIMapPage;
});
