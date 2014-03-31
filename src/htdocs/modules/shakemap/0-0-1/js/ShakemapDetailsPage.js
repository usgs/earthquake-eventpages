/* global define */
define([
	'util/Util',
	'base/TabbedModulePage'
], function (
	Util,
	TabbedModulePage
) {
	'use strict';

	var DEFAULTS = {};

	/**
	 * Construct a new ShakemapDetailsPage.
	 *
	 * @param options {Object}
	 *        page options.
	 */
	var ShakemapDetailsPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options);
		TabbedModulePage.call(this, this._options);
	};

	// extend TabbedModulePage.
	ShakemapDetailsPage.prototype = Object.create(TabbedModulePage.prototype);


	// return constructor
	return ShakemapDetailsPage;
});