/* global define */
define([
	'summary/Attribution',
	'base/EventModulePage',
	'base/ContentsXML',
	'base/Formatter',
	'util/Xhr',
	'util/Util',
	'accordion/Accordion'
], function (
	Attribution,
	EventModulePage,
	ContentsXML,
	Formatter,
	Xhr,
	Util,
	Accordion
) {
	'use strict';

	var SummaryPage = function (options) {
		options = Util.extend({}, options || {});
		if( options.eventDetails.properties &&
				options.eventDetails.properties.products.hasOwnProperty
				('nearby-cities')) {
			this._nearbyCitiesFlag = true;
		}
		this.mapContainer = {};
		this.nearbyCities = {};
		this.tectonicSummary = {};
		EventModulePage.call(this, options);
	};
	SummaryPage.prototype = Object.create(EventModulePage.prototype);

	SummaryPage.prototype._setContentMarkup = function () {
		var _this = this,
		    markup = [],
		    generalHeader,
		    generalText,
		    impactText;

		markup.push(this._getTextContentMarkup('general-header'));

		markup.push(
			'<div class="row">' +
			'<div class="column five-of-ten">' +
			'<div class="summary-map"></div>' +
			'</div>' +
			'<div class="column five-of-ten">' +
			this._getTimeMarkup() +
			this._getLocationMarkup() +
			this._getTextContentMarkup('nearby-cities') +
			'</div>' +
			'</div>'
			);
		markup.push(this._getMoreInformationMarkup());
		markup.push(this._getTextContentMarkup('tectonic-summary'));
		markup.push(this._getTextContentMarkup('general-text'));
		markup.push(this._getTextContentMarkup('impact-text'));

		markup.push(this._getAttributionMarkup());

		this._content.innerHTML = markup.join('');

		// Store references to containing elements for faster access
		generalHeader = this._content.querySelector('.summary-general-header');
		this.mapContainer = this._content.querySelector('.summary-map');
		this.nearbyCities = this._content.querySelector('.summary-nearby-cities');
		this.tectonicSummary = this._content.querySelector('.summary-tectonic-summary');
		generalText = this._content.querySelector('.summary-general-text');
		impactText = this._content.querySelector('.summary-impact-text');

		this._loadStaticMapContent(this.mapContainer);

		// Fetch AJAX content and load it into the containers
		try {
			Xhr.ajax({
					url: this._event.properties.products.geoserve[0]
							.contents['geoserve.json'].url,
					success: function (geoserve) {
						_this._ajaxSuccess(geoserve);
					},
					error: function () {
						_this._ajaxError();
					}
				});
		} catch (e) {
			this._ajaxError();
		}

		if (this._nearbyCitiesFlag) {
			try{
				Xhr.ajax({
						url: this._event.properties.products['nearby-cities'][0]
								.contents['nearby-cities.json'].url,
						success: function (nearbyCities) {
							_this._ajaxSuccessNearbyCities(nearbyCities);
						},
						error: function () {
							_this._ajaxErrorNearbyCities();
						}
					});
			} catch (e) {
				this._ajaxErrorNearbyCities();
			}
		}

		this._loadTextualContent(generalHeader, 'general-header', null);
		this._loadTextualContent(impactText, 'impact-text', 'Impact Text');
		this._loadTextualContent(generalText, 'general-text',
				'Additional Commentary');
	};

	SummaryPage.prototype._ajaxError = function () {
		if (!this._nearbyCitiesFlag) {
			this._ajaxErrorNearbyCities();
		}
		if (this.tectonicSummary) {
			this.tectonicSummary.parentNode.removeChild(this.tectonicSummary);
		}
		this.tectonicSummary = null;
	};

	SummaryPage.prototype._ajaxErrorNearbyCities = function () {
		if (this.nearbyCities) {
			this.nearbyCities.parentNode.removeChild(this.nearbyCities);
		}
		this.nearbyCities = null;
	};

	SummaryPage.prototype._ajaxSuccess = function (geoserve) {
		if (!this._nearbyCitiesFlag) {
			this._ajaxSuccessNearbyCities(geoserve.cities);
		}

		if (this.tectonicSummary !== null) {
			this.tectonicSummary.innerHTML = '<h3>Tectonic Summary</h3>' +
					geoserve.tectonicSummary.text;
		}

	};

	SummaryPage.prototype._ajaxSuccessNearbyCities = function (nearbyCities) {
		var i,
		    city,
		    cities,
		    len;

		if (this.nearbyCities !== null) {
			cities = ['<ol class="nearbyCities no-bullets">'];
			for (i = 0, len = nearbyCities.length; i < len; i++) {
				city = nearbyCities[i];
				cities.push('<li>' + city.distance +
					'km (' + Math.round(this._kmToMi(city.distance)) + 'mi) ' +
					city.direction +
					' of ' + city.name +
					'</li>');
			}
			cities.push('</ol>');
			this.nearbyCities.innerHTML = '<h3>Nearby Cities</h3>' + cities.join('');
		}
	};

	SummaryPage.prototype._getTextContentMarkup = function (type) {
		if (this._event.properties.products.hasOwnProperty(type)) {
			return '<div class="summary-' + type + '"></div>';
		}
		return '';
	};

	SummaryPage.prototype._getTimeMarkup = function () {
		var properties = this._event.properties,
		    markup = [],
		    time;

		time = parseInt(properties.time, 10);

		markup.push(
				'<div class="summary-time">' +
				'<h3>Event Time</h3>' +
				'<ol class="no-bullets">' +
				'<li>' +
				this._formatDate(time, 0) +
				'</li>' +
				'<li>' +
				this._formatDate(time, -1 * properties.tz) +
				'</li>' +
				'<li>' +
				this._getOtherTimeZoneLink(time) +
				'</li>' +
				'</ol>' +
				'</div>');

		return markup.join('');
	};

	SummaryPage.prototype._getLocationMarkup = function () {
		var geometry = this._event.geometry,
		    markup = [],
		    depth = geometry.coordinates[2];

		markup.push(
			'<div class="summary-location">' +
			'<h3>Event Location</h3>' +
			'<p class="no-bullets">' +
			this._formatCoord(geometry.coordinates[1], 'N', 'S') +
			' ' +
			this._formatCoord(geometry.coordinates[0], 'E', 'W') +
			' depth=' + (Math.round(depth * 10) / 10).toFixed(1) + 'km (' +
			(Math.round(this._kmToMi(depth) * 10) / 10).toFixed(1) + 'mi)' +
			'</p>' +
			'</div>');

		return markup.join('');

	};

	SummaryPage.prototype._loadStaticMapContent = function (container) {
		var latitude = this._event.geometry.coordinates[1],
		    longitude = this._event.geometry.coordinates[0],
		    img = document.createElement('img'),
		    imgSrc = null,
		    imgLink = document.createElement('a');

		img.setAttribute('alt', 'Map');
		imgSrc = ['http://www.mapquestapi.com/staticmap/v4/getmap?' +
				'key=Fmjtd%7Cluub2h0rnh%2Cb2%3Do5-9ut0g6&' +
				'size=500,500&' +
				'type=map&' +
				'imagetype=jpeg&' +
				'zoom=8&' +
				'center=' + latitude + ',' + longitude + '&' +
				'pois=' + 'red_1,' + latitude +',' + longitude
		];

		img.setAttribute('src', imgSrc.join(''));
		imgLink.href = '#general_map';

		imgLink.appendChild(img);
		container.appendChild(imgLink);

		Util.addEvent(img, 'click', (function (_this) {
			var callback = function callback () {
				_this._showInteractiveMap();
			};
			return callback;
		})(this));
	};

	SummaryPage.prototype._getMoreInformationMarkup = function () {
		var i = null,
		    len = null,
		    link = null,
		    cache = {},
		    links = this._event.properties.products['general-link'],
		    markup = ['<div class="summary-related-links">' +
		        '<h3>For More Information</h3><ul>'];

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
		var allProducts = this._event.properties.products,
		    ids = {},
		    idsArray = [],
		    id,
		    markup = [],
		    type,
		    length,
		    products,
		    product,
		    i;

		for (type in allProducts) {
			products = allProducts[type];
			length = products.length;
			for (i = 0; i < length; i++) {
				product = products[i];
				ids[product.source.toUpperCase()] = true;
				if (type === 'origin') {
					id = product.properties['origin-source'];
					if (id) {
						ids[id.toUpperCase()] = true;
					}
					id = product.properties['magnitude-source'];
					if (id) {
						ids[id.toUpperCase()] = true;
					}
				}
			}
		}

		for (id in ids) {
			idsArray.push(id);
		}
		idsArray.sort();
		length = idsArray.length;

		markup.push('<div class="summary-attribution">' +
				'<h3>Attribution</h3><ul>');

		for (i = 0; i < length; i++) {
			markup.push('<li>' + Attribution.getName(idsArray[i]) + '</li>');
		}
		markup.push('</ul>');

		return markup.join('');
	};

	SummaryPage.prototype._loadTextualContent =
			function (container, type, title) {
		var i = null,
		    len = null,
		    products = null,
		    markup = [];

		if (container === null ||
				!this._event.properties.products.hasOwnProperty(type)) {
			return;
		}

		products = this._event.properties.products[type];

		for (i = 0, len = products.length; i < len; i++) {
			markup.push('<div>' + products[0].contents[''].bytes + '<div>');
		}

		new Accordion({el:container}).addAccordion({
			toggleText: title,
			toggleElement: 'h3',
			contentText: markup.join('')
		});
	};

	SummaryPage.prototype.getProducts = function () {
		var products = EventModulePage.prototype.getProducts.call(this),
		    toshow = [],
		    show = {},
		    key, product;

		for ( key in products ) {
			product = products[key];
			if (!(product.type in show)) {
				show[product.type] = '';
				toshow.push(product);
			}
		}

		return toshow;
	};

	SummaryPage.prototype._showInteractiveMap = function () {
		var _this = this;

		require(['summary/InteractiveMap'], function (InteractiveMap) {
			if (!_this._interactiveMap) {
				_this._interactiveMap = new InteractiveMap({
						eventDetails: _this._event});
			}

			_this._interactiveMap.show(document.body);
		});
	};

		// TODO :: Move these date formatting methods to a utility class for re-use.

	SummaryPage.prototype._formatDate = function (stamp, minutesOffset) {
		var milliOffset = minutesOffset * 60 * 1000,
		    offsetString = this._formatTimezoneOffset(minutesOffset),
		    theDate = new Date(stamp + milliOffset),
		    year = theDate.getUTCFullYear(),
		    month = theDate.getUTCMonth() + 1,
		    day = theDate.getUTCDate(),
		    hours = theDate.getUTCHours(),
		    minutes = theDate.getUTCMinutes(),
		    seconds = theDate.getUTCSeconds();

		if (month < 10) {month = '0' + month;}
		if (day < 10) {day = '0' + day;}
		if (hours < 10) {hours = '0' + hours;}
		if (minutes < 10) {minutes = '0' + minutes;}
		if (seconds < 10) {seconds = '0' + seconds;}

		return year + '-' + month + '-' + day + ' ' + hours + ':' +
				minutes + ':' + seconds + ' (UTC' + offsetString + ')';
	};

	SummaryPage.prototype._getOtherTimeZoneLink = function (stamp) {
		var theDate = new Date(stamp),
		    uri,
		    title = this._event.properties.title;

		uri = 'http://www.timeanddate.com/worldclock/fixedtime.html?iso=' +
				theDate.toISOString() + '&msg=' + title;
		uri = encodeURI(uri);

		return '<a href="' + uri +
		'" target="_blank">Times in other timezones</a>';
	};

	SummaryPage.prototype._formatTimezoneOffset = function (offset) {
		var buffer = [],
		    hours = null,
		    minutes = null;

		if (offset === 0 ) {
			return '';
		} else if (offset < 0) {
			buffer.push('-');
			offset *= -1;
		} else {
			buffer.push('+');
		}

		hours = parseInt(offset / 60, 10);
		if (hours < 10) {
			buffer.push('0');
		}
		buffer.push(hours + ':');

		minutes = parseInt(offset % 60, 10);
		if (minutes < 10) {
			buffer.push('0');
		}
		buffer.push(minutes);

		return buffer.join('');
	};

	SummaryPage.prototype._formatCoord = function (value, pos, neg) {
		if (value >= 0.0) {
			return ((Math.round(value * 1000) / 1000).toFixed(3) + '&deg' + pos);
		} else {
			return ((Math.round(value * -1000) / 1000).toFixed(3) + '&deg' + neg);
		}
	};

	SummaryPage.prototype._kmToMi = function (km) {
		return (km * 0.621371);
	};

	return SummaryPage;
});
