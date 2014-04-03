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
			    tablist = [],
			    i,
			    len,
			    imageName,
			    attributes,
			    content;

			if (contents === null || eventId === null || dataObject === null) {
				return tablist;
			}

			for (i = 0, len = dataObject.length; i < len; i++) {
				var image = dataObject[i];

				imageName = image.suffix;
				if (contents.hasOwnProperty(imageName)) {
					attributes = null;
					content = '<img src="' + contents[imageName].url + '" />';

					// TODO, create station list
					tablist.push({
						title: image.title,
						content: content
					});
				}
			}

			return tablist;
		}

	};

	return TabListUtil;
});