/* global define */
define([
	'summary/Attribution',
	'base/EventModulePage',
	'base/ContentsXML',
	'util/Xhr',
	'util/Util',
	'accordion/Accordion',
], function (
	Attribution,
	EventModulePage,
	ContentsXML,
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

		markup.push(this._getMapMarkup());

		markup.push(this._getTextContentMarkup('nearby-cities'));
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

		if (this.mapContainer) {
			this._loadStaticMapContent(this.mapContainer, geoserve.cities);
		}

		if (!this._nearbyCitiesFlag) {
			this._ajaxSuccessNearbyCities(geoserve.cities);
		}

		if (this.tectonicSummary !== null) {
			new Accordion({el:this.tectonicSummary}).addAccordion({
					toggleText: 'Tectonic Summary',
					toggleElement: 'h3',
					contentText: geoserve.tectonicSummary.text
				});
		}

	};

	SummaryPage.prototype._ajaxSuccessNearbyCities = function (nearbyCities) {
		var i,
		    city,
		    cities,
		    len;

		if (this.nearbyCities !== null) {
			cities = ['<ol class="staticmap">'];
			for (i = 0, len = nearbyCities.length; i < len; i++) {
				city = nearbyCities[i];
				cities.push('<li>' + city.distance +
					'km ' + city.direction +
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

	SummaryPage.prototype._getMapMarkup = function () {
		return '<div class="summary-map"></div>';
	};

	SummaryPage.prototype._loadStaticMapContent = function (container, cities) {
		var i = null,
		    len = null,
		    city = null,
		    latitude = this._event.geometry.coordinates[1],
		    longitude = this._event.geometry.coordinates[0],
		    points = [],
		    img = document.createElement('img'),
		    imgSrc = null,
		    imgLink = document.createElement('a');

		img.setAttribute('alt', 'Map');
		imgSrc = ['http://www.mapquestapi.com/staticmap/v4/getmap?' +
				'key=Fmjtd%7Cluub2h0rnh%2Cb2%3Do5-9ut0g6&' +
				'size=500,500&' +
				'type=map&' +
				'imagetype=jpeg&' +
				'pois='
		];

		for (i = 0, len = cities.length; i < len; i++) {
			city = cities[i];
			points.push('orange_1-' + (i+1) + ',' + city.latitude + ',' +
					city.longitude);
		}

		points.push('red_1,' + latitude + ',' + longitude);

		imgSrc.push(points.join('|'));
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
		var products = this._event.properties.products,
		    origin,
		    ids = {},
		    idsArray = [],
		    id,
		    markup = [],
		    productname,
		    length,
		    product,
		    i;

		for (productname in products) {
			product = products[productname];
			length = product.length;
			for (i = 0; i < length; i++) {
				ids[product[i].source.toUpperCase()] = true;
			}
		}

		if (products.hasOwnProperty('origin')){
			length = products.origin.length;
			for (i = 0; i < length; i++) {
				origin = products.origin[i];

				if (origin.properties.hasOwnProperty('origin-source')) {
					ids[origin.properties['origin-source'].toUpperCase()] = true;
				}
				if (origin.properties.hasOwnProperty('magnitude-source')) {
					ids[origin.properties['magnitude-source'].toUpperCase()] = true;
				}
			}
		}

		for (id in ids) {
			idsArray.push(id);
		}
		idsArray.sort();
		length = idsArray.length;

		markup.push(['<div class="summary-attribution">',
				'<h3>Attribution</h3><ul>'].join(''));

		for (i = 0; i < length; i++) {
			markup.push(['<li>',Attribution.getName(idsArray[i]),'</li>'].join(''));
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

	return SummaryPage;
});
