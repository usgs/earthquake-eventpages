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

	HypocenterSummaryPage.prototype._getSummaryHeader = function (product) {
		var formatter = this._options.formatter,
		    p = product.properties,
		    magnitude = p.magnitude,
		    magnitudeType = p['magnitude-type'];

		return '<header>' + formatter.magnitude(magnitude) + '</header>' +
				'<small>' + (magnitudeType || 'undefined') + '</small>';
	};

	HypocenterSummaryPage.prototype._getSummaryInfo = function (product) {
		var formatter = this._options.formatter,
		    source = product.source,
		    p = product.properties,
		    latitude = p.latitude,
		    longitude = p.longitude,
		    depth = p.depth;

		return '<span class="location">' +
					formatter.location(latitude, longitude) +
				'</span>' +
				'<span class="depth">' +
					formatter.depth(depth, 'km') + ' depth' +
				'</span>' +
				'<span class="contributor">' +
					Attribution.getMainContributerHeader(source.toUpperCase()) +
				'</span>';
	};

	// return constructor
	return HypocenterSummaryPage;

});