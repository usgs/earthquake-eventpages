/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'tablist/Tablist',
	'tablist/ImageList',
	'util/Xhr'
], function (
	Util,
	EventModulePage,
	TabList,
	ImageList,
	Xhr
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
		var products = this._event.properties.products;
		if (!products.dyfi) {
			return;
		}

		new ImageList({
			el: this._content.appendChild(document.createElement('div')),
			tabPosition: 'right',
			tabs: this._getTabList(products.dyfi[0])
		});

	};

	/**
	 * Creates a tablist for use by the ImageList class.
	 **/
	DYFIMapPage.prototype._getTabList = function (dyfi) {
		var contents = dyfi.contents,
		    eventId = dyfi.code,
		    tablist = [],
		    attributes,
		    i,
		    len,
		    imageName,
		    mapName;

		for (i = 0, len = MAPIMAGES.length; i < len; i++) {
			var image = MAPIMAGES[i];

			imageName = eventId + image.suffix;
			if (contents.hasOwnProperty(imageName)) {
				attributes = null;
				mapName = eventId + image.mapSuffix;
				if (contents.hasOwnProperty(mapName)) {
					this._getUseMap(contents[mapName]);
					attributes = {
						useMap: '#' + image.usemap
					};
				}

				tablist.push({
					title: image.title,
					image: contents[imageName].url,
					attributes: attributes
				});
			}
		}

		return tablist;
	};

	/**
	 * ajax call to get the usemap for a given image.
	 *
	 * @param content {Object}
	 *        a content object aquired from the properties.products.dyfi Object
	 * @param content.url {String}
	 *        the url used to retrieve the usemap
	 **/
	DYFIMapPage.prototype._getUseMap = function (content) {
		var _this = this;
		Xhr.ajax({
			url: content.url,
			success: function (html) {
				_this._content.insertAdjacentHTML('beforeend', html);
			}
		});
	};

	return DYFIMapPage;
});
