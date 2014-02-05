/* global define */
define([
	'util/Util',
	'./MomentTensorDetailsPage'
], function (
	Util,
	MomentTensorDetailsPage
) {
	'use strict';

	// default options
	var DEFAULTS = {
		title: 'Focal Mechanism',
		hash: 'mechanism',
		productType: 'focal-mechanism'
	};


	/**
	 * Construct a new FocalMechanismDetailsPage.
	 *
	 * @param options {Object}
	 *        module options.
	 * @see MomentTensorPage.
	 */
	var FocalMechanismDetailsPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		this._code = options.code;
		MomentTensorDetailsPage.call(this, options);
	};

	// extend MomentTensorPage
	FocalMechanismDetailsPage.prototype = Object.create(MomentTensorDetailsPage.prototype);



	/**
	 * Mechanism info.
	 *
	 * @param tensor {Tensor}
	 *        the focal-mechanism product.
	 * @return {String} info table.
	 */
	FocalMechanismDetailsPage.prototype._getInfo = function (tensor) {
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
	FocalMechanismDetailsPage.prototype._getAxes = function () {
		return '';
	};


	// return constructor
	return FocalMechanismDetailsPage;
});
