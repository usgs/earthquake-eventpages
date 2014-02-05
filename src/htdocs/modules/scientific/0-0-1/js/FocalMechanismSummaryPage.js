/* global define */
define([
	'util/Util',
	'scientific/MomentTensorSummaryPage'
], function (
	Util,
	MomentTensorSummaryPage
) {
	'use strict';


	// default options
	var DEFAULTS = {
		title: 'Focal Mechanism',
		hash: 'mechanism',
		productType: 'focal-mechanism'
	};


	/**
	 * Construct a new FocalMechanismSummaryPage.
	 *
	 * @param options {Object}
	 *        module options
	 * @see TabbedModulePage.
	 */
	var FocalMechanismSummaryPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		MomentTensorSummaryPage.call(this, options);
	};

	// extend TabbedModulePage
	FocalMechanismSummaryPage.prototype = Object.create(MomentTensorSummaryPage.prototype);


	/**
	 * Tab content besides beachball.
	 *
	 * @param tensor {Tensor}
	 *        the focal-mechanism product.
	 * @return {String} tab content.
	 */
	FocalMechanismSummaryPage.prototype._getSummaryContent = function (tensor) {
		var source = tensor.source.toUpperCase(),
		    code = tensor.product.code;

		return [
			'<header class="title">', source, '</header>',
			'<span>', code, '</span>'
		].join('');
	};


	// return constructor
	return FocalMechanismSummaryPage;
});
