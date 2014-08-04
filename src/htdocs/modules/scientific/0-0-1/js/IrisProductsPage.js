/* global define */
define([
	'util/Util',
	'util/Xhr',
	'base/EventModulePage'
], function (
	Util,
	Xhr,
	EventModulePage
) {
	'use strict';

	var IRIS_SERVICE_URL = 'http://service.iris.edu/fdsnws/event/1/query';
	var IRIS_SPUD_URL = 'http://www.iris.edu/spud/event/';
	var IRIS_WILBER_URL = 'http://www.iris.edu/wilber3/find_stations/';

	var DEFAULTS = {
		title: 'Waveforms',
		hash: 'waveforms'
	};


	/**
	 * Construct a new IrisProductsPage.
	 *
	 * @param options {Object}
	 *        page options.
	 * @see base/EventModulePage for additional options.
	 */
	var IrisProductsPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		EventModulePage.call(this, options);
	};

	IrisProductsPage.prototype = Object.create(EventModulePage.prototype);


	/**
	 * Build page content.
	 *
	 * Searches IRIS fdsnws event service to find an event id.
	 */
	IrisProductsPage.prototype._setContentMarkup = function () {
		var _this = this,
		    el = this.getContent(),
		    time = Number(this._event.properties.time),
		    coords = this._event.geometry.coordinates,
		    longitude = coords[0],
		    latitude = coords[1],
		    search = {};

		// search parameters
		search = {
			'starttime': new Date(time - 16000).toISOString().replace('Z', ''),
			'endtime': new Date(time + 16000).toISOString().replace('Z', ''),
			'latitude': latitude,
			'longitude': longitude,
			'maxradius': 1,
			'format': 'text'
		};

		// running search for event id
		el.innerHTML = 'Loading ...';
		// load content
		Xhr.ajax({
			url: IRIS_SERVICE_URL,
			data: search,
			success: function (data) {
				var eventid = _this._parseIrisEventId(data);
				if (eventid !== -1) {
					el.innerHTML = _this.getIrisLinks(eventid);
				} else {
					el.innerHTML = '<p class="alert error">Error finding IRIS event id</p>';
				}
			},
			error: function () {
				el.innerHTML = '<p class="alert error">Error finding IRIS event id</p>';
			}
		});

	};

	IrisProductsPage.prototype._parseIrisEventId = function (data) {
		return data.split('\n')[1].split('|')[0];
	};

	IrisProductsPage.prototype.getIrisLinks = function (eventid) {
		return '<dl class="iris-products">' +
				'<dt>' +
					'<a href="' + IRIS_SPUD_URL + eventid + '">' +
						'Searchable Product Depository (SPUD) Event Page' +
					'</a>' +
				'</dt>' +
				'<dd>' +
					'SPUD is the IRIS DMC\'s primary data product management system.' +
					' Complementing the DMC\'s SEED and assembled data archives,' +
					' which contain time series recordings, the SPUD system' +
					' primarily contains derivative data products of other types' +
					' (images, movies, etc.) created either at the DMC or by members' +
					' of the community.' +
				'</dd>' +

				'<dt>' +
				'<a href="' + IRIS_WILBER_URL + eventid + '">' +
					'Wilber Station Data for Event' +
				'</a>' +
				'</dt>' +
				'<dd>' +
					'Wilber locates stations in operation at the time of the event,' +
					' allows users to filter stations, preview waveform data, and' +
					' view record section plots. Data can be downloaded in a' +
					' number of formats including <abbr title="Seismic Analysis' +
					' Code">SAC</abbr>, <abbr title="Standard for the Exchange of' +
					' Earthquake Data">SEED</abbr>, miniSEED and ASCII.' +
				'</dd>' +
				'</dl>';
	};


	// return constructor
	return IrisProductsPage;
});
