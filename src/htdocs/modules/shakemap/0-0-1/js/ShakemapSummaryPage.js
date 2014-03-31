/* global define */
define([
	'util/Util'
],
function (
	Util
) {
	'use strict';

	var DEFAULTS = {};

	var ShakemapSummaryPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
	};

	// return constructor
	return ShakemapSummaryPage;

});