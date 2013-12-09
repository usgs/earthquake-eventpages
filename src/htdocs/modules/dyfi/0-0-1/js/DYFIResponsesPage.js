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
		title: 'Responses',
		hash: 'responses'
	};

	var DYFIResponsesPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};
	DYFIResponsesPage.prototype = Object.create(EventModulePage.prototype);

	return DYFIResponsesPage;
});
