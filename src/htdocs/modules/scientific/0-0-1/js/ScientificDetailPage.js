/* global define */
define([
	'util/Util',
	'base/TabbedModulePage',
	'base/Formatter',
	'./ScientificSummaryPage'
], function (
	Util,
	TabbedModulePage,
	Formatter,
	ScientificSummaryPage
) {
	'use strict';


	// default options
	var DEFAULTS = {
		title: 'Detail',
		hash: 'detail',
		className: 'scientific-detail',
		formatter: new Formatter(),
		tabList: {
			tabPosition: 'top'
		}
	};


	/**
	 * Construct a new ScientificDetailPage.
	 *
	 * @param options {Object}
	 *        page options.
	 */
	var ScientificDetailPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options);
		TabbedModulePage.call(this, this._options);
	};

	// extend TabbedModulePage.
	ScientificDetailPage.prototype = Object.create(TabbedModulePage.prototype);


	/**
	 * Get a list of products for display.
	 *
	 * This method searches origin and phase-data products, and returns
	 *     phase-data in place of origin when the same source, code,
	 *     and the updateTime is as new, as the corresponding origin product.
	 *
	 * @return {Array<Product>} origin/phase-data products.
	 */
	ScientificDetailPage.prototype.getProducts = function () {
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
	ScientificDetailPage.prototype.getSummary = function (product) {
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
	ScientificDetailPage.prototype.getDetail = function (product) {
		var el = document.createElement('div'),
		    source = product.source.toUpperCase(),
		    phases,
		    magnitudes;
		el.className = 'scientific-detail clearfix';
		el.innerHTML = [
			'<h3>', source, '</h3>',
			'<div class="info"></div>',
			'<div class="phases"></div>',
			'<div class="magnitudes"></div>',
			'<div class="downloads"><h4>Downloads</h4></div>'
		].join('');

		el.querySelector('.info').innerHTML = ScientificSummaryPage.prototype.
				getOriginDetail.call(this, product);

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


	// return constructor
	return ScientificDetailPage;
});
