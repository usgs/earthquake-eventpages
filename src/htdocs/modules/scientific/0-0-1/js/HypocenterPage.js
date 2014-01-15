/* global define */
define([
	'util/Util',
	'base/TabbedModulePage',
	'base/Formatter'
], function (
	Util,
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
	 * Construct a new HypocenterPage.
	 *
	 * @param options {Object}
	 *        page options.
	 */
	var HypocenterPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options);
		TabbedModulePage.call(this, this._options);
	};

	// extend TabbedModulePage.
	HypocenterPage.prototype = Object.create(TabbedModulePage.prototype);


	/**
	 * Get a list of products for display.
	 *
	 * This method searches origin and phase-data products, and returns
	 *     phase-data in place of origin when the same source, code,
	 *     and the updateTime is as new, as the corresponding origin product.
	 *
	 * @return {Array<Product>} origin/phase-data products.
	 */
	HypocenterPage.prototype.getProducts = function () {
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
	 * Get tab title for a product.
	 *
	 * @param product {Product}
	 *        the product.
	 * @return {String} summary content for product.
	 */
	HypocenterPage.prototype.getSummary = function (product) {
		var formatter = this._options.formatter,
		    source = product.source.toUpperCase(),
		    p = product.properties,
		    magnitude = p.magnitude,
		    magnitudeType = p['magnitude-type'],
		    latitude = p.latitude,
		    longitude = p.longitude,
		    depth = p.depth;

		return [
			'<strong>', source, '</strong>',
			'<small>',
				'<br/>', formatter.magnitude(magnitude, magnitudeType),
				'<br/>', formatter.location(latitude, longitude),
				'<br/>', formatter.depth(depth, 'km'), ' depth',
			'</small>'
		].join('');
	};

	/**
	 * Get tab content for a product.
	 *
	 * @param product {Product}
	 *        the product.
	 * @return {DOMElement} detail content for product.
	 */
	HypocenterPage.prototype.getDetail = function (product) {
		var el = document.createElement('div'),
		    source = product.source.toUpperCase(),
		    phases,
		    magnitudes;
		el.className = 'scientific-hypocenter clearfix';
		el.innerHTML = [
			'<h3>', source, '</h3>',
			'<div class="info"></div>',
			'<div class="phases"></div>',
			'<div class="magnitudes"></div>',
			'<div class="downloads"></div>'
		].join('');

		el.querySelector('.info').innerHTML =
				this.getOriginDetail.call(this, product);

		phases = el.querySelector('.phases');
		magnitudes = el.querySelector('.magnitudes');
		if (product.type === 'phase-data') {
			phases.innerHTML = '<p><a href="#">Show associated phase information</a></p>';
			magnitudes.innerHTML = '<p><a href="#">Show associated magnitudes information</a></p>';
			// TODO: make these links do something.
		} else {
			phases.innerHTML = '<p><em>No associated phase information available.</em></p>';
			magnitudes.innerHTML = '<p><em>No associate magnitude information available.</em></p>';
		}

		// add downloads
		el.querySelector('.downloads').appendChild(
				TabbedModulePage.prototype.getDetail.call(this, product));

		return el;
	};

	/**
	 * Format an origin product details.
	 *
	 * @param  product {Object}
	 *         the origin-type product to display.
	 * @return {String}
	 *         this implementation creates a definition list.
	 */
	HypocenterPage.prototype.getOriginDetail = function (product) {
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

		buf.push('<table class="origin-detail striped"><tbody>');


		buf.push('<tr><th>Magnitude</th><td>',
				formatter.magnitude(magnitude, magnitudeType, magnitudeError),
				'</td></tr>');

		buf.push('<tr><th>Location</th><td>',
				formatter.location(latitude, longitude),
				formatter.uncertainty(horizontalError, 1, '', 'km'),
				'</td></tr>');

		buf.push('<tr><th>Depth</th><td>',
				formatter.depth(depth, 'km', depthError),
				'</td></tr>');

		buf.push('<tr><th>Origin Time</th><td>',
				'<time datetime="', eventTime, '">',
						eventTime.replace('T', ' ').replace('Z', ' UTC'),
				'</time>',
				'</td></tr>');

		buf.push('<tr><th>Number of Stations</th><td>',
				(numStations === null ? '-' : numStations),
				'</td></tr>');

		buf.push('<tr><th>Number of Phases</th><td>',
				(numPhases === null ? '-' : numPhases),
				'</td></tr>');

		buf.push('<tr><th>Minimum Distance</th><td>',
				(minimumDistance === null ? '-' :
						(minimumDistance * 0.0174532925 * 6378.1).toFixed(1) + ' km' +
						' (' + parseFloat(minimumDistance).toFixed(1) + '&deg;)'),
				'</td></tr>');

		buf.push('<tr><th>Travel Time Residual</th><td>',
				(standardError === null ? '-' : standardError + ' sec'),
				'</td></tr>');

		buf.push('<tr><th>Azimuthal Gap</th><td>',
				(azimuthalGap === null ? '-' : azimuthalGap + '&deg;'),
				'</td></tr>');

		buf.push('<tr><th>Review Status</th><td>',
				reviewStatus.toUpperCase().replace('REVIEWED', 'MANUAL'),
				'</td></tr>');

		buf.push(
				'<tr><th>Event ID</th><td>', eventId, '</td></tr>',
				'<tr><th>Magnitude Source</th><td>', magnitudeSource, '</td></tr>',
				'<tr><th>Location Source</th><td>', originSource, '</td></tr>');


		buf.push('</tbody></table>');

		return buf.join('');
	};


	// return constructor
	return HypocenterPage;
});
