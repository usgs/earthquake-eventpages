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

	var DYFIMapPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};

	DYFIMapPage.prototype = Object.create(EventModulePage.prototype);

	DYFIMapPage.prototype._setContentMarkup = function () {
		var dyfi_div;

		// DEBUG
		//console.log(this._event);

		dyfi_div = document.createElement('div');
		dyfi_div.id = 'dyfi-maps';
		this._content.appendChild(dyfi_div);

		new ImageList({
			el: this._content.querySelector('#dyfi-maps'),
			tabPosition: 'right',
			tabs: this._getTabList()
		});

		this._createUseMaps();

	};

	/**
	 * Creates a tablist for use by the ImageList class.
	 **/
	DYFIMapPage.prototype._getTabList = function () {
		var dyfi = this._event.properties.products.dyfi[0];
		var contents = dyfi.contents;
		var eventId = dyfi.code;
		var tablist = [];
		var ciimArray = new Array(
			{ciimExt:'_ciim.jpg',title:'Intensity Map',usemap:'imap_base'},
			{ciimExt:'_ciim_geo.jpg',title:'Geocoded Map',usemap:'imap_geo'},
			{ciimExt:'_ciim_zoom.jpg',title:'Zoom Map',usemap:'imap_zoom'},
			{ciimExt:'_ciim_zoomout.jpg',title:'Zoom Out Map',usemap:'imap_zoomout'});
		var i,
		    j = 0,
		    len,
		    ciimImage;

		for (i = 0, len = ciimArray.length; i < len; i++) {
			ciimImage = eventId + ciimArray[i].ciimExt;
			if (contents.hasOwnProperty(ciimImage)) {
				tablist[j++] = {
					title: ciimArray[i].title,
					image: contents[ciimImage].url,
					alt: ciimArray[i].title,
					attributes: {useMap: '#' + ciimArray[i].usemap}
				};
			}
		}

		return tablist;
	};

	DYFIMapPage.prototype._createUseMaps = function() {
		var eventId = this._event.properties.products.dyfi[0].code;
		var contents = this._event.properties.products.dyfi[0].contents;
		var htmlExt = new Array('_ciim_imap.html', '_ciim_zoom_imap.html',
			'_ciim_zoomout_imap.html', '_ciim_geo_imap.html');
		var filename,
		    content,
		    i,
		    len = htmlExt.length;

		for (i = 0; i < len; i++) {
			filename = eventId + htmlExt[i];
			content = contents[filename];
			if (content !== undefined) {
				this._getUseMap(content);
			}
		}
	};

	/**
	 * ajax call to get the usemap for a given image.
	 *
	 * @param content {Object}
	 *        a content object aquired from the properties.products.dyfi Object
	 * @param content.url {String}
	 *        the url used to retrieve the usemap
	 **/
	DYFIMapPage.prototype._getUseMap = function(content) {
		Xhr.ajax({
		url: content.url,
		success: function(html) {
			var div = document.getElementById('dyfi-maps');
			div.insertAdjacentHTML('beforeend', html);
			}
		});
	};

	return DYFIMapPage;
});
