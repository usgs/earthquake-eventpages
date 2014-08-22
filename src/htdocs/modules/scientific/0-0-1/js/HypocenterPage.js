/* global define */
define([
	'util/Util',
	'util/Xhr',
	'quakeml/Quakeml',
	'mvc/Collection',
	'mvc/DataTable',

	'base/SummaryDetailsPage',
	'base/Formatter',
	'summary/Attribution',
	'tablist/TabList',
	'accordion/Accordion'
], function (
	Util,
	Xhr,
	Quakeml,
	Collection,
	DataTable,

	SummaryDetailsPage,
	Formatter,
	Attribution,
	TabList,
	Accordion
) {
	'use strict';

	// default options
	var DEFAULTS = {
		formatter: new Formatter(),
		tabList: {
			tabPosition: 'top'
		}
	};

	var NOT_SPECIFIED = '<abbr title="Not Specified">-</abbr>';

	// columns for phase data table
	var PHASE_DATA_COLUMNS = [
		{
			'className': 'channel',
			'title': 'Channel',
			'format': function (arrival) {
				var station = arrival.pick.waveformID;
				return station.networkCode + ' ' + station.stationCode +
						' ' + station.channelCode + ' ' + station.locationCode;
			},
			'header': true
		},
		{
			'className': 'distance',
			'title': 'Distance',
			'format': function (arrival) {
				return parseFloat(arrival.distance).toFixed(2) + '&deg;';
			},
			'downloadFormat': function (arrival) {
				return arrival.distance;
			}
		},
		{
			'className': 'azimuth',
			'title': 'Azimuth',
			'format': function (arrival) {
				return parseFloat(arrival.azimuth).toFixed(2) + '&deg;';
			},
			'downloadFormat': function (arrival) {
				return arrival.azimuth;
			}
		},
		{
			'className': 'phase',
			'title': 'Phase',
			'format': function (arrival) {
				return arrival.phase;
			}
		},
		{
			'className': 'time',
			'title': 'Arrival Time',
			'format': function (arrival) {
				var pick = arrival.pick,
				    time;

				time = pick.time.value.split('T')[1].split('Z')[0].split(':');
				time[2] = parseFloat(time[2]).toFixed(2);
				if (time[2] < 10) {
					time[2] = '0' + time[2];
				}
				time = time.join(':');
				return time;
			},
			'downloadFormat': function (arrival) {
				return arrival.pick.time.value;
			}
		},
		{
			'className': 'status',
			'title': 'Status',
			'format': function (arrival) {
				return arrival.pick.evaluationMode;
			}
		},
		{
			'className': 'residual',
			'title': 'Residual',
			'format': function (arrival) {
				return parseFloat(arrival.timeResidual).toFixed(2);
			},
			'downloadFormat': function (arrival) {
				return arrival.timeResidual;
			}
		},
		{
			'className': 'weight',
			'title': 'Weight',
			'format': function (arrival) {
				return parseFloat(arrival.timeWeight).toFixed(2);
			},
			'downloadFormat': function (arrival) {
				return arrival.timeWeight;
			}
		}
	];

	// sort options for phase data table
	var PHASE_DATA_SORTS = [
		{
			'id': 'channel',
			'title': 'Channel',
			'sortBy': function (arrival) {
				var station = arrival.pick.waveformID;
				return station.networkCode + ' ' + station.stationCode +
						' ' + station.channelCode + ' ' + station.locationCode;
			}
		},
		{
			'id': 'distance',
			'title': 'Distance',
			'sortBy': function (arrival) {
				return parseFloat(arrival.distance);
			}
		},
		{
			'id': 'azimuth',
			'title': 'Azimuth',
			'sortBy': function (arrival) {
				return parseFloat(arrival.azimuth);
			}
		},
		{
			'id': 'phase',
			'title': 'Phase',
			'sortBy': function (arrival) {
				return arrival.phase;
			}
		},
		{
			'id': 'time',
			'title': 'Arrival Time',
			'sortBy': function (arrival) {
				return arrival.pick.time.value;
			}
		},
		{
			'id': 'residual',
			'title': 'Residual',
			'sortBy': function (arrival) {
				return parseFloat(arrival.timeResidual);
			}
		},
		{
			'id': 'weight',
			'title': 'Weight',
			'sortBy': function (arrival) {
				return parseFloat(arrival.timeWeight);
			}
		}
	];


	/**
	 * Construct a new HypocenterPage.
	 *
	 * @param options {Object}
	 *        page options.
	 */
	var HypocenterPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options);
		this._code = options.code;
		this._tabList = null;
		this._phaseEl = document.createElement('div');
		this._phaseRendered = false;
		this._magnitudeEl = document.createElement('div');
		this._magnitudeRendered = false;
		SummaryDetailsPage.call(this, this._options);
	};

	HypocenterPage.prototype = Object.create(SummaryDetailsPage.prototype);

	/**
	 * Clean up event bindings.
	 *
	 */
	HypocenterPage.prototype.destroy = function () {
		this._options = null;
		this._phaseEl = null;
		this._quakeml = null;

		if (this._magnitudeEl) {
			this._magnitudeEl = null;
		}

		if (this._tabList) {
			this._tabList.destroy();
			this._tabList = null;
		}
		SummaryDetailsPage.prototype.destroy.call(this);
	};

	/**
	 * Get all products that match options.productTypes. If a
	 * source + code combination exists across multiple product types,
	 * then add the most recent product to the product array.
	 *
	 * @return {Array<object> allProducts,
	 *         an array of products
	 */
	HypocenterPage.prototype.getProducts = function () {
		var origins = this._event.properties.products.origin || [],
		    origin,
		    phases = this._event.properties.products['phase-data'] || [],
		    phase,
		    allProducts = [],
		    tmpProducts = [],
		    sourceCode = [],
		    index,
		    id,
		    i,
		    code = this._code;

		if (!code) {
			code = this._getHash();
		}

		allProducts = origins;

		// build array of products that are in the allProducts array
		for (i = 0; i < origins.length; i++) {
			origin = origins[i];
			sourceCode.push(origin.source + '_' + origin.code);
		}

		for (i = 0; i < phases.length; i++) {
			phase = phases[i];
			id = phase.source + '_' + phase.code;
			index = sourceCode.indexOf(id);

			// product doesn't exist, add product
			if (index === -1) {
				allProducts.push(phase);
				sourceCode.push(id);
			} else {
				// replace origin with phase-data product if
				// phase-data updateTime is same age or newer.
				if (allProducts[index].updateTime <= phase.updateTime) {
					allProducts[index] = phase;
				}
			}
		}

		if (code) {
			for (i = 0; i < allProducts.length; i++) {
				if (code === allProducts[i].source + '_' + allProducts[i].code) {
					tmpProducts.push(allProducts[i]);
					allProducts = tmpProducts;
				}
			}
		}

		return allProducts;
	};

	/**
	 * Called by SummaryDetailsPage._setContentMarkup(), handles
	 * displaying all detailed information for an origin product.
	 *
	 * @param  {object} product, origin product to display
	 *
	 */
	HypocenterPage.prototype.getDetailsContent = function (product) {
		var el = document.createElement('div'),
		    tabListDiv = document.createElement('section'),
		    tabListContents = [],
		    _this = this,
		    originDetails;

		this._product = product;

		originDetails = [
			'<h3>', product.source.toUpperCase(), '</h3>',
			this.getOriginDetail(product)
		].join('');
		tabListContents.push({
			title: 'Origin Detail',
			content: originDetails
		});

		if ((product.type === 'phase-data' || product.type === 'origin') &&
				product.contents.hasOwnProperty('quakeml.xml')) {
			// build phase table
			tabListContents.push({
				title: 'Phases',
				content: function () {
					_this._getPhaseDetail();
					return _this._phaseEl;
				}
			});
			// build magnitude table
			tabListContents.push({
				title: 'Magnitudes',
				content: function () {
					_this._getMagnitudeDetail();
					return _this._magnitudeEl;
				}
			});
		}

		// Build TabList
		this._tabList = new TabList({
			el: this._content.appendChild(tabListDiv),
			tabPosition: 'top',
			tabs: tabListContents
		});

		// Update the FE region info
		this.getFeString(product, function (feString) {
			var feContainer = el.querySelector('.fe-info');

			if (feContainer) {
				feContainer.innerHTML = feString;
			}
		});

		this._content.appendChild(el);
	};

	HypocenterPage.prototype._getPhaseDetail = function () {
		var xml = this._product.contents['quakeml.xml'];

		if (!this._quakeml) {
			this._parseQuakemlCallback = this._getPhaseDetail;
			this._parseQuakeml(xml);
		} else if (!this._phaseRendered) {
			this._renderPhases(this._phaseEl);
			this._phaseRendered = true;
		}
	};

	HypocenterPage.prototype._getMagnitudeDetail = function () {
		var xml = this._product.contents['quakeml.xml'];

		if (!this._quakeml) {
			this._parseQuakemlCallback = this._getMagnitudeDetail;
			this._parseQuakeml(xml);
		} else if (!this._magnitudeRendered) {
			this._magnitudeEl.innerHTML = this._getMagnitudesMarkup();
			new Accordion({
				el:this._magnitudeEl
			});
			this._magnitudeRendered = true;
		}
	};

	HypocenterPage.prototype._renderPhases = function (phaseEl) {
		var origins = this._quakeml.getOrigins(),
		    origin, o, oLen,
		    preferred = null,
		    arrivals, a, aLen;

		for (o = 0, oLen = origins.length; o < oLen; o++) {
			origin = origins[o];
			if (origin.isPreferred) {
				preferred = origin;
				break;
			}
		}

		phaseEl.innerHTML = '<section class="hypocenter-phase">' +
				'<header><h3>Phase Arrival Times</h3></header>' +
				'<div class="datatable"></div>' +
				'</section>';

		if (!preferred || !preferred.arrivals) {
			phaseEl.querySelector('.datatable').innerHTML =
					'<p class="error alert">No Phase Data Exists</p>';
			return;
		}

		// add ids to arrivals
		arrivals = preferred.arrivals;
		for (a = 0, aLen = arrivals.length; a < aLen; a++) {
			arrivals[a].id = a;
		}

		this._phaseTable = new DataTable({
			el: phaseEl.querySelector('.datatable'),
			className: 'tabular responsive hypocenter-phase',
			collection: new Collection(preferred.arrivals),
			emptyMarkup: '<p class="error alert">No Phase Data Exists</p>',
			columns: PHASE_DATA_COLUMNS,
			sorts: PHASE_DATA_SORTS,
			defaultSort: 'distance'
		});

	};

	HypocenterPage.prototype._getMagnitudesMarkup = function () {
		var buf = [],
		    magnitudes = this._quakeml.getMagnitudes(),
		    magnitude,
		    m;

		if (magnitudes.length) {
			for (m = 0; m < magnitudes.length; m++) {
				magnitude = magnitudes[m];
				buf.push(this._getMagnitudeMarkup(magnitude));
			}
		} else {
			buf.push('<p class="error alert">No Magnitude Data Exists</p>');
		}
		return buf.join('');
	};

	HypocenterPage.prototype._getMagnitudeMarkup = function (magnitude) {
		var buf = [],
		    contributions = magnitude.contributions,
		    contribution,
		    stationMagnitude,
		    amplitude,
		    station,
		    amp,
		    status,
		    weight,
		    period,
		    a,
		    source,
		    type,
		    mag,
		    magError,
		    numStations;

		if (magnitude.creationInfo) {
			source = Attribution.getName(magnitude.creationInfo.agencyID);
		} else {
			source = Attribution.getName(this._product.source);
		}

		type = magnitude.type || NOT_SPECIFIED;
		mag = magnitude.mag.value || NOT_SPECIFIED;
		magError = magnitude.mag.uncertainty || NOT_SPECIFIED;
		numStations = magnitude.stationCount || NOT_SPECIFIED;

		buf.push(
			'<section class="accordion accordion-closed networkmagnitude">',
			'<h3>', source, '</h3>',
			'<ul class="networkmagnitude-summary">',
				'<li class="magnitude">',
					'<span><strong>', mag, '</strong></span>',
					'<abbr title="Magnitude">Mag</abbr>',
				'</li>',
				'<li>',
					'<span>', type, '</span>',
					'<abbr title="Magnitude type">Type</abbr>',
				'</li>',
				'<li>',
					'<span>', magError, '</span>',
					'<abbr title="Magnitude Error">Error</abbr>',
				'</li>',
				'<li>',
					'<span>', numStations, '</span>',
					'<abbr title="Number of stations">Stations</abbr>',
				'</li>',
			'</ul>',
			'<a class="accordion-toggle">Details</a>',
			'<div class="accordion-content">'
		);

		if (contributions.length === 0) {
			buf.push('<p>No amplitudes contributed for this magnitude</p>');
		} else {
			buf.push(
				'<table class="tabular responsive networkmagnitude-stations">',
					'<thead><tr>',
						'<th>',
							'<abbr title="Network Station Channel Location">Channel</abbr>',
						'</th>',
						'<th>Type</th>',
						'<th>Amplitude</th>',
						'<th>Period</th>',
						'<th>Status</th>',
						'<th>Magnitude</th>',
						'<th>Weight</th>',
					'</tr></thead>',
				'<tbody>'
			);

			for (a = 0; a < contributions.length; a++) {
				contribution = contributions[a];
				stationMagnitude = contribution.stationMagnitude;
				type = stationMagnitude.type;
				amplitude = stationMagnitude.amplitude || {};
				station = stationMagnitude.waveformID || amplitude.waveformID;
				mag = stationMagnitude.mag.value || '-';
				weight = contribution.weight;
				amp = '-';
				period = '-';

				if (amplitude.genericAmplitude) {
					amp = amplitude.genericAmplitude.value + ( amplitude.unit || '' );
				}
				if (amplitude.period) {
					period = amplitude.period.value + 's';
				}
				status = amplitude.evaluationMode || stationMagnitude.status ||
						'automatic';

				buf.push(
					'<tr>',
						'<th scope="row">',
							station.networkCode,
							' ', station.stationCode,
							' ', station.channelCode,
							' ', station.locationCode,
						'</th>',
						'<td class="type">', type , '</td>',
						'<td class="amplitude">', amp , '</td>',
						'<td class="period">', period , '</td>',
						'<td class="status">', status , '</td>',
						'<td class="magnitude">', mag , '</td>',
						'<td class="weight">', weight , '</td>',
					'</tr>');
			}
			buf.push('</tbody></table>');
		}
		buf.push('</div></section>');
		return buf.join('');
	};

	HypocenterPage.prototype._parseQuakeml = function (quakemlInfo) {
		var that = this;

		if (quakemlInfo) {
			Xhr.ajax({
				url: quakemlInfo.url,
				success: function (xml) {
					// use quakeml parser to make xml into quakeml
					that._quakeml = new Quakeml({xml: xml});
					that._parseQuakemlCallback();
				},
				error: function () {
					console.log('Failed to parse quakeml');
				}
			});
		}
	};

	/**
	 * Format an origin product details.
	 *
	 * @param  product {Object}
	 *         The origin-type product for which to get the FE string.
	 * @param callback {Function}
	 *        Callback method to execute upon completion of FE lookup. Will be
	 *        called with the FE string, which may be a single hyphen if any
	 *        error occurred during the lookup process.
	 *
	 */
	HypocenterPage.prototype.getFeString = function (product, callback) {
		var geoserveProduct = null,
		    i, len, testProduct,
		    geoProducts,
		    prodEventSource,
		    prodEventSourceCode;

		try {
			geoProducts = this._event.properties.products.geoserve;
			prodEventSource = product.properties.eventsource;
			prodEventSourceCode = product.properties.eventsourcecode;

			// Find geoserve product that corresponds to the given (origin) product
			for (i = 0, len = geoProducts.length; i < len; i++) {
				testProduct = geoProducts[i];
				if (testProduct.properties.eventsource === prodEventSource &&
						testProduct.properties.eventsourcecode === prodEventSourceCode) {
					geoserveProduct = testProduct;
					break;
				}
			}

			Xhr.ajax({
				url: geoserveProduct.contents['geoserve.json'].url,
				success: function (geoserve) {
					callback(geoserve.fe.longName + ' (' + geoserve.fe.number + ')');
				},
				error: function () {
					callback('-');
				}
			});
		} catch (e) {
			callback('-');
		}
	};

	HypocenterPage.prototype.getOriginDetail = function (product) {
		var buf = [],
		    formatter = this._options.formatter || new Formatter(),
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
		    depthError = p['vertical-error'] || null,
		    numStations = p['num-stations-used'] || null,
		    numPhases = p['num-phases-used'] || null,
		    minimumDistance = p['minimum-distance'] || null,
		    standardError = p['standard-error'] || null,
		    azimuthalGap = p['azimuthal-gap'] || null,
		    reviewStatus = p['review-status'] || 'automatic',
		    originSource = p['origin-source'] || product.source,
		    magnitudeSource = p['magnitude-source'] || product.source;

		buf.push('<table class="tabular origin-detail"><tbody>');


		buf.push('<tr><th scope="row">Magnitude</th><td>',
				formatter.magnitude(magnitude, magnitudeType, magnitudeError),
				'</td></tr>');

		buf.push('<tr><th scope="row">Location</th><td>',
				formatter.location(latitude, longitude),
				formatter.uncertainty(horizontalError, 1, '', 'km'),
				'</td></tr>');

		buf.push('<tr><th scope="row">Depth</th><td>',
				formatter.depth(depth, 'km', depthError),
				'</td></tr>');

		buf.push('<tr><th scope="row">Origin Time</th><td>',
				'<time datetime="', eventTime, '">',
						eventTime.replace('T', ' ').replace('Z', ' UTC'),
				'</time>',
				'</td></tr>');

		buf.push('<tr><th scope="row">Number of Stations</th><td>',
				(numStations === null ? '-' : numStations),
				'</td></tr>');

		buf.push('<tr><th scope="row">Number of Phases</th><td>',
				(numPhases === null ? '-' : numPhases),
				'</td></tr>');

		buf.push('<tr><th scope="row">Minimum Distance</th><td>',
				(minimumDistance === null ? '-' :
						(minimumDistance * 0.0174532925 * 6378.1).toFixed(2) + ' km' +
						' (' + parseFloat(minimumDistance).toFixed(2) + '&deg;)'),
				'</td></tr>');

		buf.push('<tr><th scope="row">Travel Time Residual</th><td>',
				(standardError === null ? '-' : standardError + ' sec'),
				'</td></tr>');

		buf.push('<tr><th scope="row">Azimuthal Gap</th><td>',
				(azimuthalGap === null ? '-' : azimuthalGap + '&deg;'),
				'</td></tr>');

		// Placeholder, filled in asynchronously
		buf.push('<tr>',
				'<th scope="row">',
					'<abbr title="Flinn Engdahl">FE</abbr> Region',
				'</th>',
				'<td class="fe-info">-</td></tr>');

		buf.push('<tr><th scope="row">Review Status</th><td>',
				reviewStatus.toUpperCase().replace('REVIEWED', 'MANUAL'),
				'</td></tr>');

		buf.push(
				'<tr><th scope="row">Event ID</th><td>', eventId, '</td></tr>',
				'<tr><th scope="row">Magnitude Source</th><td>',
						Attribution.getName(magnitudeSource),
						'</td></tr>',
				'<tr><th scope="row">Location Source</th><td>',
						Attribution.getName(originSource),
						'</td></tr>');


		buf.push('</tbody></table>');

		return buf.join('');
	};

	HypocenterPage.prototype._getSummaryMarkup = function (product) {
		var source = Attribution.getContributor(product.source),
		    p = product.properties,
		    depth = p.depth,
		    magnitude = p.magnitude,
		    magnitudeType = p['magnitude-type'];

		return '<ul>' +
					'<li>' +
						'<span>' + magnitude + '</span>' +
						'<abbr title="Magnitude">Mag</abbr>' +
					'</li>' +
					'<li>' +
						'<span>' + magnitudeType + '</span>' +
						'<abbr title="Magnitude Type">Type</abbr>' +
					'</li>' +
					'<li>' +
						'<span>' + depth + '</span>' +
						'<abbr title="Depth (km)">Depth</abbr>' +
					'</li>' +
					'<li>' +
						'<span>' + product.source.toUpperCase() + '</span>' +
						'<abbr title="' + (source ? source.title : 'Contributor') +
								'">Source</abbr>' +
					'</li>' +
				'</ul>';
	};

	// return constructor
	return HypocenterPage;
});
