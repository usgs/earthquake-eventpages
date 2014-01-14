/* global define */
define([
	'util/Util',
	'./MomentTensorPage'
], function (
	Util,
	MomentTensorPage
) {
	'use strict';

	// default options
	var DEFAULTS = {
		title: 'Focal Mechanism',
		hash: 'mechanism',
		productType: 'focal-mechanism'
	};


	/**
	 * Construct a new FocalMechanismPage.
	 *
	 * @param options {Object}
	 *        module options.
	 * @see MomentTensorPage.
	 */
	var FocalMechanismPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		MomentTensorPage.call(this, options);
	};

	// extend MomentTensorPage
	FocalMechanismPage.prototype = Object.create(MomentTensorPage.prototype);


	/**
	 * Tab content besides beachball.
	 *
	 * @param tensor {Tensor}
	 *        the focal-mechanism product.
	 * @return {String} tab content.
	 */
	FocalMechanismPage.prototype._getSummaryContent = function (tensor) {
		var source = tensor.source.toUpperCase(),
		    code = tensor.product.code;
		return source + ' ' + code;
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
			'<table class="info-table striped"><tbody>',
			'<tr><th>Author</th>',
				'<td>', tensor.source, '</td></tr>',
			'<tr><th>Catalog</th>',
				'<td>', tensor.product.properties.eventsource, '</td></tr>',
			'<tr><th>Contributor</th>',
				'<td>', tensor.product.source, '</td></tr>',
			'<tr><th>Code</th>',
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
