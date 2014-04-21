/* global define */
define([
	'util/Util',
	'util/Xhr',

	'base/TabbedModulePage',
	'base/Formatter'
], function (
	Util,
	Xhr,

	TabbedModulePage,
	Formatter
) {
	'use strict';


	// default options
	var DEFAULTS = {
		title: 'Hypocenter',
		hash: 'hypocenter',
		className: 'scientific-hypocenter',
		formatter: new Formatter(),
		tabList: {
			tabPosition: 'top'
		}
	};


	/**
	 * Construct a new HypocenterDetailsPage.
	 *
	 * @param options {Object}
	 *        page options.
	 */
	var HypocenterDetailsPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options);
		this._code = options.code;
		TabbedModulePage.call(this, this._options);
	};

	// extend TabbedModulePage.
	HypocenterDetailsPage.prototype = Object.create(TabbedModulePage.prototype);


	HypocenterDetailsPage.prototype._setContentMarkup = function () {
		var products = this.getProducts(),
		    hypocenter,
		    contentEl,
		    className,
		    content
		    ;

		for (var i = 0; i < products.length; i++) {
			hypocenter = products[i];

			if (hypocenter.source + '_' + hypocenter.code === this._code) {
				content = this.getDetail(hypocenter);
			}
		}

		contentEl = this.getContent();
		className = this._options.className;
		if (className) {
			contentEl.classList.add(className);
		}
		// add content
		if (typeof content === 'string') {
			contentEl.innerHTML = content;
		} else {
			contentEl.appendChild(content);
		}
	};

	/**
	 * Get a list of products for display.
	 *
	 * This method searches origin and phase-data products, and returns
	 *     phase-data in place of origin when the same source, code,
	 *     and the updateTime is as new, as the corresponding origin product.
	 *
	 * @return {Array<Product>} origin/phase-data products.
	 */
	HypocenterDetailsPage.prototype.getProducts = function () {
		var allProducts = this._event.properties.products,
		    origins = allProducts.origin,
		    phases = allProducts['phase-data'],
		    products = [],
		    i,
		    len,
		    getPhaseProduct;

		/**
		 * Search for a phase-data product that corresponds to an origin product.
		 *
		 * @param origin {Object}
		 *        the origin product.
		 * @return {Object} the corresponding phase-data product,
		 *         or origin if no phase-data product found.
		 */
		getPhaseProduct = function (origin) {
			var source = origin.source,
			    code = origin.code,
			    updateTime = origin.updateTime,
			    phase,
			    i,
			    len;

			if (!phases) {
				return origin;
			}

			for (i = 0, len = phases.length; i < len; i++) {
				phase = phases[i];
				if (phase.source === source &&
						phase.code === code &&
						phase.updateTime >= updateTime) {
					return phase;
				}
			}
			return origin;
		};

		for (i = 0, len = origins.length; i < len; i++) {
			products.push(getPhaseProduct(origins[i]));
		}

		return products;
	};

	/**
	 * Get tab content for a product.
	 *
	 * @param product {Product}
	 *        the product.
	 * @return {DOMElement} detail content for product.
	 */
	HypocenterDetailsPage.prototype.getDetail = function (product) {
		var el = document.createElement('div'),
		    source = product.source.toUpperCase(),
		    phases,
		    magnitudes;
		el.className = 'scientific-hypocenter clearfix';
		el.innerHTML = [
			'<h3>', source, '</h3>',
			'<div class="info"></div>',
			'<div class="phases"></div>',
			'<div class="magnitudes"></div>'
		].join('');

		el.querySelector('.info').innerHTML = this.getOriginDetail(product);

		// Update the FE region info
		this.getFeString(product, function (feString) {
			var feContainer = el.querySelector('.fe-info');
			if (feContainer) {
				feContainer.innerHTML = feString;
			}
		});

		phases = el.querySelector('.phases');
		magnitudes = el.querySelector('.magnitudes');
		if (product.type === 'phase-data') {
			phases.innerHTML = '<p><a href="#">Show associated phases</a></p>';
			magnitudes.innerHTML = '<p><a href="#">' +
					'Show associated magnitudes' +
					'</a></p>';
			// TODO: make these links do something.
		} else {
			phases.innerHTML = '<p><em>No associated phases.</em></p>';
			magnitudes.innerHTML = '<p><em>No associate magnitudes.</em></p>';
		}

		// add downloads
		// el.querySelector('.downloads').appendChild(
		// 		TabbedModulePage.prototype.getDownloads.call(this, product));
		el.appendChild(TabbedModulePage.prototype.getDownloads.call(this, product));

		return el;
	};

	/**
	 * Format an origin product details.
	 *
	 * @param  product {Object}
	 *         The origin-type product for which to get the FE string.
	 * @param callback {Function}
	 *        Callback method to execute upon completion of FE lookup. Will be
	 *        called with the FE string, which may be a single hyphen if any
	 *        error occurred during the lookup process.
	 *
	 */
	HypocenterDetailsPage.prototype.getFeString = function (product, callback) {
		var geoserveProduct = null,
		    i, len, testProduct,
		    geoProducts,
		    prodEventSource,
		    prodEventSourceCode;

		try {
			geoProducts = this._event.properties.products.geoserve;
			prodEventSource = product.properties.eventsource;
			prodEventSourceCode = product.properties.eventsourcecode;

			// Find geoserve product that corresponds to the given (origin) product
			for (i = 0, len = geoProducts.length; i < len; i++) {
				testProduct = geoProducts[i];
				if (testProduct.properties.eventsource === prodEventSource &&
						testProduct.properties.eventsourcecode === prodEventSourceCode) {
					geoserveProduct = testProduct;
					break;
				}
			}

			Xhr.ajax({
				url: geoserveProduct.contents['geoserve.json'].url,
				success: function (geoserve) {
					callback(geoserve.fe.longName + ' (' + geoserve.fe.number + ')');
				},
				error: function () {
					callback('-');
				}
			});
		} catch (e) {
			callback('-');
		}
	};

	HypocenterDetailsPage.prototype.getOriginDetail = function (product) {
		var buf = [],
		    formatter = this._options.formatter || new Formatter(),
		    p = product.properties,
		    // required attributes for origins
		    latitude = p.latitude,
		    longitude = p.longitude,
		    eventTime = p.eventtime,
		    eventSource = p.eventsource,
		    eventSourceCode = p.eventsourcecode,
		    eventId = eventSource + eventSourceCode,
		    // optional attributes for origins
		    magnitude = p.magnitude || null,
		    magnitudeType = p['magnitude-type'] || null,
		    magnitudeError = p['magnitude-error'] || null,
		    horizontalError = p['horizontal-error'] || null,
		    depth = p.depth || null,
		    depthError = p['depth-error'] || null,
		    numStations = p['num-stations-used'] || null,
		    numPhases = p['num-phases-used'] || null,
		    minimumDistance = p['minimum-distance'] || null,
		    standardError = p['standard-error'] || null,
		    azimuthalGap = p['azimuthal-gap'] || null,
		    reviewStatus = p['review-status'] || 'automatic',
		    originSource = p['origin-source'] || eventSource,
		    magnitudeSource = p['magnitude-source'] || eventSource;

		buf.push('<table class="origin-detail tabular"><tbody>');


		buf.push('<tr><th scope="row">Magnitude</th><td>',
				formatter.magnitude(magnitude, magnitudeType, magnitudeError),
				'</td></tr>');

		buf.push('<tr><th scope="row">Location</th><td>',
				formatter.location(latitude, longitude),
				formatter.uncertainty(horizontalError, 1, '', 'km'),
				'</td></tr>');

		buf.push('<tr><th scope="row">Depth</th><td>',
				formatter.depth(depth, 'km', depthError),
				'</td></tr>');

		buf.push('<tr><th scope="row">Origin Time</th><td>',
				'<time datetime="', eventTime, '">',
						eventTime.replace('T', ' ').replace('Z', ' UTC'),
				'</time>',
				'</td></tr>');

		buf.push('<tr><th scope="row">Number of Stations</th><td>',
				(numStations === null ? '-' : numStations),
				'</td></tr>');

		buf.push('<tr><th scope="row">Number of Phases</th><td>',
				(numPhases === null ? '-' : numPhases),
				'</td></tr>');

		buf.push('<tr><th scope="row">Minimum Distance</th><td>',
				(minimumDistance === null ? '-' :
						(minimumDistance * 0.0174532925 * 6378.1).toFixed(2) + ' km' +
						' (' + parseFloat(minimumDistance).toFixed(2) + '&deg;)'),
				'</td></tr>');

		buf.push('<tr><th scope="row">Travel Time Residual</th><td>',
				(standardError === null ? '-' : standardError + ' sec'),
				'</td></tr>');

		buf.push('<tr><th scope="row">Azimuthal Gap</th><td>',
				(azimuthalGap === null ? '-' : azimuthalGap + '&deg;'),
				'</td></tr>');

		// Placeholder, filled in asynchronously
		buf.push('<tr>',
				'<th scope="row">',
					'<abbr title="Flinn Engdahl">FE</abbr> Region',
				'</th>',
				'<td class="fe-info">-</td></tr>');

		buf.push('<tr><th scope="row">Review Status</th><td>',
				reviewStatus.toUpperCase().replace('REVIEWED', 'MANUAL'),
				'</td></tr>');

		buf.push(
				'<tr><th scope="row">Event ID</th><td>', eventId, '</td></tr>',
				'<tr><th scope="row">Magnitude Source</th><td>',
						magnitudeSource,
						'</td></tr>',
				'<tr><th scope="row">Location Source</th><td>',
						originSource,
						'</td></tr>');


		buf.push('</tbody></table>');

		return buf.join('');
	};


	// return constructor
	return HypocenterDetailsPage;
});
