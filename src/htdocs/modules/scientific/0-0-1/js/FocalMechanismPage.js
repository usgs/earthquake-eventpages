/* global define */
define([
	'util/Util',
	'./MomentTensorPage',
	'summary/Attribution'
], function (
	Util,
	MomentTensorPage,
	Attribution
) {
	'use strict';


	var DEFAULTS = {};

	/**
	 * Construct a new FocalMechanismPage.
	 *
	 * @param options {Object}
	 *        module options.
	 * @see MomentTensorPage.
	 */
	var FocalMechanismPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		this._code = options.code;
		MomentTensorPage.call(this, options);
	};

	// extend MomentTensorPage
	FocalMechanismPage.prototype = Object.create(MomentTensorPage.prototype);


	FocalMechanismPage.prototype._getSummaryMarkup = function (tensor) {
		var formatter = this._options.formatter,
		    magnitude = tensor.magnitude,
		    percentDC = Math.round(tensor.percentDC * 100),
		    source = Attribution.getContributor(tensor.source);

		magnitude = formatter.magnitude(magnitude);

		return [
					'<ul>',
						'<li class="image">',
							'<img src="', this.getBeachball(tensor), '" />',
						'</li>',
						'<li>',
							'<span>', magnitude, '</span>',
							'<abbr title="Magnitude">Mag</abbr>',
						'</li>',
						'<li>',
							'<span>', percentDC, '</span>',
							'<abbr title="Percent Double Couple">% DC</abbr>',
						'</li>',
						'<li>',
							'<span>', tensor.source.toUpperCase(), '</span>',
							'<abbr title="', (source ? source.title : 'Contributor'),
									'">Source</abbr>',
						'</li>',
					'</ul>',
		].join('');
	};

	/**
	 * Mechanism info.
	 *
	 * @param tensor {Tensor}
	 *        the focal-mechanism product.
	 * @return {String} info table.
	 */
	FocalMechanismPage.prototype._getInfo = function (tensor) {
		return [
			'<table class="info-table tabular"><tbody>',
			'<tr><th scope="row">Author</th>',
				'<td>', tensor.source, '</td></tr>',
			'<tr><th scope="row">Catalog</th>',
				'<td>', tensor.product.properties.eventsource, '</td></tr>',
			'<tr><th scope="row">Contributor</th>',
				'<td>', tensor.product.source, '</td></tr>',
			'<tr><th scope="row">Code</th>',
				'<td>', tensor.product.code, '</td></tr>',
			'</tbody></table>'
		].join('');
	};

	/**
	 * Mechanism Axes information.
	 *
	 * @return {String} empty string, don't show axes for mechanism.
	 */
	FocalMechanismPage.prototype._getAxes = function () {
		return '';
	};


	// return constructor
	return FocalMechanismPage;
});
