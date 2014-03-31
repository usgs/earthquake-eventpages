/* global define */
define([
	'util/Util',
	'base/SummaryModulePage',
	'base/Formatter',
	'summary/Attribution'
],
function (
	Util,
	SummaryModulePage,
	Formatter,
	Attribution
) {
	'use strict';

	var DEFAULTS = {
		formatter: new Formatter(),
		title: 'Hypocenter',
		hash: 'hypocenter',
		productType: 'origin',
		className: 'hypocenters',
	};

	var HypocenterSummaryPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		SummaryModulePage.call(this, options);
	};

	HypocenterSummaryPage.prototype = Object.create(SummaryModulePage.prototype);

	/**
	 * Get tab title for a product.
	 *
	 * @param product {Product}
	 *        the product.
	 * @return {String} summary content for product.
	 */
	HypocenterSummaryPage.prototype.getSummary = function (product) {
		var source = product.source,
				formatter = this._options.formatter,
		    p = product.properties,
		    magnitude = p.magnitude,
		    magnitudeType = p['magnitude-type'],
		    latitude = p.latitude,
		    longitude = p.longitude,
		    depth = p.depth,
		    el = document.createElement('a');

		el.className = 'summary';
		el.href = this._getHash(product);

		el.innerHTML = [
			'<div class="header">',
				'<header>', formatter.magnitude(magnitude), '</header>',
				'<small>' , magnitudeType , '</small>',
			'</div>',
			'<div class="info">',
				'<span class="location">',
					formatter.location(latitude, longitude),
				'</span>',
				'<span class="depth">',
					formatter.depth(depth, 'km'), ' depth',
				'</span>',
				'<span class="contributor">',
					Attribution.getMainContributerHeader(source.toUpperCase()),
				'</span>',
			'<div>'
		].join('');

		return el;
	};

	// return constructor
	return HypocenterSummaryPage;

});