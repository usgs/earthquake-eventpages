/* global define */
define([
	'summary/Attribution',
	'base/EventModulePage',
	'util/Xhr'
], function (
	Attribution,
	EventModulePage,
	Xhr
) {
	'use strict';

	var SummaryPage = function (options) {
		EventModulePage.call(this, options);
	};
	SummaryPage.prototype = Object.create(EventModulePage.prototype);

	SummaryPage.prototype._setContentMarkup = function () {
		var markup = [],
		    generalHeader,
		    nearbyCities,
		    tectonicSummary,
		    generalText,
		    impactText;

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

		// Store references to containing elements for faster access
		generalHeader = this._content.querySelector('.summary-general-header');
		nearbyCities = this._content.querySelector('.summary-nearby-cities');
		tectonicSummary = this._content.querySelector('.summary-tectonic-summary');
		generalText = this._content.querySelector('.summary-general-text');
		impactText = this._content.querySelector('.summary-impact-text');

		// Fetch AJAX content and load it into the containers
		Xhr.ajax({
				url: this._event.properties.products.geoserve[0]
						.contents['geoserve.json'].url,
				success: function (geoserve) {
					var i,
					    city,
					    cities,
					    len;

					if (nearbyCities !== null) {
						cities = ['<ul>'];
						for (i = 0, len = geoserve.cities.length; i < len; i++) {
							city = geoserve.cities[i];
							cities.push('<li>' + city.distance +
									'km ' + city.direction +
									' of ' + city.name +
									'</li>');
						}
						cities.push('</ul>');
						nearbyCities.innerHTML = '<h3>Nearby Cities</h3>' + cities.join('');
					}

					if (tectonicSummary !== null) {
						tectonicSummary.innerHTML = '<h3>Tectionic Summary</h3>' +
								geoserve.tectonicSummary.text;
					}
				},
				error: function () {
					nearbyCities.parentNode.removeChild(nearbyCities);
					tectonicSummary.parentNode.removeChild(tectonicSummary);
					nearbyCities = null;
					tectonicSummary = null;
				}
			});

		this._loadTextualContent(generalHeader, 'general-header', null);
		this._loadTextualContent(impactText, 'impact-text', 'Impact Text');
		this._loadTextualContent(generalText, 'general-text',
				'Additional Commentary');

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
				Attribution.getMainContributerHeader(magnitudeId) +
			'</div>';
		}

		return ''; // TODO
	};

	/**
	 * Handles loading text-type products into the container. This works for
	 * products with in-line (byte) content.
	 *
	 * @param container {DOMElement}
	 *      The container into which the textual content should be loaded
	 * @param type {String}
	 *      The product type (a text-type product type)
	 */
	SummaryPage.prototype._loadTextualContent = function (container, type,
			title) {

		var i = null,
		    len = null,
		    products = null,
		    markup = [];

		if (title !== null && typeof title !== 'undefined') {
			title = '<h3>' + title + '</h3>';
		} else {
			title = null;
		}

		if (container === null ||
				!this._event.properties.products.hasOwnProperty(type)) {
			return;
		}

		products = this._event.properties.products[type];

		for (i = 0, len = products.length; i < len; i++) {
			markup.push('<div>' + products[0].contents[''].bytes + '<div>');
		}

		container.innerHTML = title + markup.join('');
	};

	return SummaryPage;
});
