/* global define */
define([
	'imagemap/SvgImageMap'
], function (
	SvgImageMap
) {
	'use strict';

	var TabListUtil;

	TabListUtil = {

		CreateTabListData: function (options) {
			var contents = options.contents,
			    eventId = options.eventId,
			    dataObject = options.dataObject,
			    tablist = [],
			    i,
			    len,
			    imageKey,
			    mapKey;

			var container,
			    info;

			if (contents === null || eventId === null || dataObject === null) {
				return tablist;
			}

			for (i = 0, len = dataObject.length; i < len; i++) {
				container = document.createElement('div');
				info = dataObject[i];
				imageKey = eventId + info.suffix;

				if (contents.hasOwnProperty(imageKey)) {
					if (info.hasOwnProperty('usemap') &&
							info.hasOwnProperty('mapSuffix')) {
						mapKey = eventId + info.mapSuffix;
						new SvgImageMap({
							el: container,
							imageUrl: contents[imageKey].url,
							mapUrl: contents[mapKey].url,
							mapName: info.usemap
						});
					} else {
						container.innerHTML = '<img alt="map" src="' +
								contents[imageKey].url + '"/>';
					}
				}

				tablist.push({
					title: info.title,
					content: container
				});
			}
			return tablist;
		}

	};

	return TabListUtil;
});
