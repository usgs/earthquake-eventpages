/* global define */
define([
	'util/Events',
	'util/Util'
], function (
	Events,
	Util
) {
	'use strict';

	var EventModule = function (options) {
		Events.call(this);

		this._el = options.el || document.createElement('div');
	};
	EventModule.prototype = Object.create(Events.prototype);

	return EventModule;
});
