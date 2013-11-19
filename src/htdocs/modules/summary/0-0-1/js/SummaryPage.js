/* global define */
define([
	'summary/Attribution',
	'base/EventModulePage'
], function (
	Attribution,
	EventModulePage
) {
	'use strict';

	var SummaryPage = function (options) {
		EventModulePage.call(this, options);
	};
	SummaryPage.prototype = Object.create(EventModulePage.prototype);

	SummaryPage.prototype._setContentMarkup = function () {
		var markup = [];

		// DEBUG
		console.log(this._event);

		markup.push(this._getTextContentMarkup('general-header'));

		markup.push(this._getMapMarkup());

		markup.push(this._getTextContentMarkup('nearby-cities'));
		markup.push(this._getTextContentMarkup('tectonic-summary'));
		markup.push(this._getTextContentMarkup('general-text'));
		markup.push(this._getTextContentMarkup('impact-text'));

		markup.push(this._getRelatedLinksMarkup());
		markup.push(this._getAttributionMarkup());

		this._content.innerHTML = markup.join('');

		// Fetch AJAX content and load it into the containers
		// TODO ...

		// Bind event listeners as needed
		// TODO ...
	};

	SummaryPage.prototype._getTextContentMarkup = function (type) {
		if (this._event.properties.products.hasOwnProperty(type)) {
			return '<div class="summary-' + type + '"></div>';
		}
		return '';
	};

	SummaryPage.prototype._getMapMarkup = function () {
		var latitude = this._event.geometry.coordinates[1],
		    longitude = this._event.geometry.coordinates[0];

		return '<div class="summary-map">' +
				'<img src="http://www.mapquestapi.com/staticmap/v4/getmap?' +
					'key=' +
					'center=' + latitude + ',' + longitude + '&' +
					'zoom=5&' +
					'size=500,500&' +
					'type=map&' +
					'imagetype=jpeg&' +
					'pois=red_1,' + latitude + ',' + longitude +
						'|orange_1,' + (latitude+1.5) + ',' + (longitude+1.5) +
						'|orange_1,' + (latitude-1.5) + ',' + (longitude-1.5) +
						'|orange_1,' + (latitude+1.5) + ',' + (longitude-1.5) +
						'|orange_1,' + (latitude-1.5) + ',' + (longitude+1.5) +
					'" alt="Map"/></div>';
	};

	SummaryPage.prototype._getRelatedLinksMarkup = function () {
		var i = null,
		    len = null,
		    link = null,
		    cache = {},
		    links = this._event.properties.products['general-link'],
		    markup = ['<div class="summary-related-links"><h3>Related Links</h3><ul>'];

		if (links && links.length) {
			for (i = 0, len = links.length; i < len; i++) {
				link = links[i];

				if (!cache.hasOwnProperty(link.properties.url)) {
					markup.push('<li class="summary-related-link"><a href="' +
							link.properties.url + '">' + link.properties.text + '</a></li>');
					cache[link.properties.url] = true;
				}
			}

			markup.push('</ul></div>');
			return markup.join('');
		}
		return '';
	};

	SummaryPage.prototype._getAttributionMarkup = function () {
		var origin = this._event.properties.products.origin[0],
		    id = origin.id.split(':')[2],
		    locationId = id,
		    magnitudeId = id;

		if (origin.properties.hasOwnProperty('origin-source')) {
			locationId = origin.properties['origin-source'];
		}
		if (origin.properties.hasOwnProperty('magnitude-source')) {
			magnitudeId = origin.properties['magnitude-source'];
		}

		id = id.toUpperCase();
		locationId = locationId.toUpperCase();
		magnitudeId = magnitudeId.toUpperCase();

		if (locationId === magnitudeId) {
			return '<div class="summary-attribution">' +
				'Location and Magnitude contributed by: ' +
				Attribution.getMainContributerHeader(locationId) +
			'</div>';
		} else {
			return '<div class="summary-attribution">' +
				'Location contributed by: ' +
				Attribution.getMainContributerHeader(locationId) + '<br/>' +
				'Magnitude contributed by: ' +
				Attribution.getMainContributerHeader(locationId) +
			'</div>';
		}

		return ''; // TODO
	};

	return SummaryPage;
});
