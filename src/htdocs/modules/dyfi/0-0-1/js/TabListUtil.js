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
			var contents,
			    eventId,
			    dataObject,
			    tablist = [],
			    i,
			    len,
			    imageKey,
			    mapKey,
			    container,
			    info;

			options = options || {};
			contents = options.contents;
			eventId = options.eventId;
			dataObject = options.dataObject;

			/* Returns empty tablist if contents, eventId, dataObject are not equal
			 * to there respective data type
			 */
			if (typeof contents !== 'object' || typeof eventId !== 'string' ||
					typeof dataObject !== 'object') {
				return tablist;
			}

			/* Populates tab list and sets up SVG image map */
			for (i = 0, len = dataObject.length; i < len; i++) {
				container = document.createElement('div');
				info = dataObject[i];
				imageKey = eventId + info.suffix;

				if (contents.hasOwnProperty(imageKey)) {
					if (info.hasOwnProperty('usemap') &&
							info.hasOwnProperty('mapSuffix')) {
						mapKey = eventId + info.mapSuffix;
						/* Sets up SVG image map if one exists */
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
					tablist.push({
						title: info.title,
						content: container
					});
				}

			}
			return tablist;
		}

	};
	return TabListUtil;
});
