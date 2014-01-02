/* global define */
define([
	'util/Util',
	'base/EventModulePage'
], function (
	Util,
	EventModulePage
) {
	'use strict';

	var DEFAULTS = {
		title: 'Summary',
		hash: 'summary'
	};


	var ScientificSummaryPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};

	ScientificSummaryPage.prototype = Object.create(EventModulePage.prototype);


	ScientificSummaryPage.prototype._setContentMarkup = function () {
		var products = this._event.properties.products,
		    preferredOrigin = products.origin[0];

		this.getContent().innerHTML = '<h3>Preferred Location</h3>' +
				this.getOriginDetail(preferredOrigin);
	};


	/**
	 * Format an origin product details.
	 *
	 * @param  product {Object}
	 *         the origin-type product to display.
	 * @return {String}
	 *         this implementation creates a definition list.
	 */
	ScientificSummaryPage.prototype.getOriginDetail = function (product) {
		var buf = [],
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

		buf.push('<dl class="origin-detail">');


		buf.push('<dt>Magnitude</dt><dd>',
				magnitude, ' ', magnitudeType,
				(magnitudeError === null ? '' : ' &plusmn; ' + magnitudeError),
				'</dd>');

		buf.push('<dt>Location</dt><dd>',
				Math.abs(latitude), '&deg;', (latitude > 0 ? 'N' : 'S'),
				', ',
				Math.abs(longitude), '&deg;', (longitude > 0 ? 'E' : 'W'),
				(horizontalError === null ? '' : ' &plusmn; ' + horizontalError + 'km'),
				'</dd>');

		buf.push('<dt>Depth</dt><dd>',
				(depth === null ? '-' :
						depth +
						(depthError === null ? '' : ' &plusmn; ' + depthError) +
						' km'),
				'</dd>');

		buf.push('<dt>Origin Time</dt><dd>',
				'<time datetime="', eventTime, '">',
						eventTime.replace('T', ' ').replace('Z', ' UTC'),
				'</time>',
				'</dd>');

		buf.push('<dt>Number of Stations</dt><dd>',
				(numStations === null ? '-' : numStations), '</dd>');

		buf.push('<dt>Number of Phases</dt><dd>',
				(numPhases === null ? '-' : numPhases), '</dd>');

		buf.push('<dt>Minimum Distance</dt><dd>',
				(minimumDistance === null ? '-' :
						(minimumDistance * 0.0174532925 * 6378.1).toFixed(1) + ' km' +
						' (' + parseFloat(minimumDistance).toFixed(1) + '&deg;)'),
				'</dd>');

		buf.push('<dt>Travel Time Residual</dt><dd>',
				(standardError === null ? '-' : standardError + ' sec'),
				'</dd>');

		buf.push('<dt>Azimuthal Gap</dt><dd>',
				(azimuthalGap === null ? '-' : azimuthalGap + '&deg;'),
				'</dd>');

		buf.push('<dt>Review Status</dt><dd>',
				reviewStatus.toUpperCase().replace('REVIEWED', 'MANUAL'),
				'</dd>');

		buf.push('<dt>Event ID</dt><dd>', eventId, '</dd>');

		buf.push('<dt>Magnitude Source</dt><dd>', magnitudeSource, '</dd>');

		buf.push('<dt>Location Source</dt><dd>', originSource, '</dd>');


		buf.push('</dl>');

		return buf.join('');
	};


	return ScientificSummaryPage;
});
