/* global define */
define([],
	function () {
	'use strict';

	var TabListUtil;

	TabListUtil = {

		CreateTabListData: function (options) {
			var contents = options.contents,
			    eventId = options.eventId,
			    dataObject = options.dataObject,
			    callback = options.callback,
			    callingObject = options.object,
			    tablist = [],
			    i,
			    len,
			    imageName,
			    mapName,
			    attributes;

			if (contents === null || eventId === null || dataObject === null) {
				return tablist;
			}

			for (i = 0, len = dataObject.length; i < len; i++) {
				var image = dataObject[i];

				imageName = eventId + image.suffix;
				if (contents.hasOwnProperty(imageName)) {
					attributes = null;

					if (image.hasOwnProperty('mapSuffix')) {
						mapName = eventId + image.mapSuffix;
						if (contents.hasOwnProperty(mapName)) {
							callback(contents[mapName], callingObject);
							attributes = {
								useMap: '#' + image.usemap
							};
						}
					}

					tablist.push({
						title: image.title,
						image: contents[imageName].url,
						attributes: attributes
					});
				}
			}

			return tablist;
		}

	};

	return TabListUtil;
});
