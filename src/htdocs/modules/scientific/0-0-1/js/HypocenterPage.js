/* global define */
define([
	'util/Util',
	'util/Xhr',
	'quakeml/Quakeml',

	'base/SummaryDetailsPage',
	'base/Formatter',
	'summary/Attribution',
	'tablist/TabList'
], function (
	Util,
	Xhr,
	Quakeml,

	SummaryDetailsPage,
	Formatter,
	Attribution,
	TabList
) {
	'use strict';


	// default options
	var DEFAULTS = {
		formatter: new Formatter(),
		tabList: {
			tabPosition: 'top'
		}
	};


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
		this._phaseEl = null;
		this._magnitudeEl = null;
		SummaryDetailsPage.call(this, this._options);
	};

	// extend TabbedModulePage.
	HypocenterPage.prototype = Object.create(SummaryDetailsPage.prototype);

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
		    sourceCode = [],
		    index,
		    id,
		    i;

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
		    phases,
		    magnitudes,
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

		if (product.type === 'phase-data' &&
			  product.contents['quakeml.xml'] !== null) {
			// build phase table
			// phases = this._getPhaseDetail(product);
			phases = this._getPhaseDetail.bind(this);
			tabListContents.push({
				title: 'Phases',
				content: phases
			});
			// build magnitude table
			magnitudes = this._getMagnitudeDetail.bind(this);
			tabListContents.push({
				title: 'Magnitudes',
				content: magnitudes
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
		console.log("Phase Detail called");
		var xml = this._product.contents['quakeml.xml'];
		// this.loadQuakeml(product);
		if (this._phaseEl === null) {
			this._phaseEl = document.createElement('div');
		}

		if (!this._quakeml) {
			this._parseQuakeml(xml, function (quakeml) {
				this._quakeml = quakeml;
				this._phaseEl.innerHTML = this._getPhasesMarkup();
			}.bind(this));
		} else {
			this._phaseEl.innerHTML = this._getPhasesMarkup();
		}

		return this._phaseEl;
	};

	HypocenterPage.prototype._getMagnitudeDetail = function () {
		console.log("Magnitude Detail called");
		var xml = this._product.contents['quakeml.xml'];
		if (this._magnitudeEl === null) {
			this._magnitudeEl = document.createElement('div');
		}

		if (!this._quakeml) {
			this._parseQuakeml(xml, function (quakeml) {
				this._quakeml = quakeml;
				this._magnitudeEl.innerHTML = this._getMagnitudesMarkup();
			}.bind(this));
		} else {
			this._magnitudeEl.innerHTML = this._getMagnitudesMarkup();
		}

		return this._magnitudeEl;
	};

	HypocenterPage.prototype.loadQuakeml = function (quakemlInfo) {
		if (this._phaseEl === null && this._magnitudeEl === null) {
			this._phaseEl = document.createElement('div');
			this._magnitudeEl = document.createElement('div');

			this._parseQuakeml(quakemlInfo, function (quakeml) {
				this._phaseEl.innerHTML = this._getPhasesMarkup(quakeml);
				this._magnitudeEl.innerHTML = this._getMagnitudesMarkup(quakeml);
			}.bind(this));
		}
	};

	HypocenterPage.prototype._getPhasesMarkup = function () {
		var buf = [],
		    origins = this._quakeml.getOrigins(),
		    origin,
		    arrivals,
		    arrival,
		    pick,
		    station,
		    a,
		    o,
		    time;

		for (o = 0; o < origins.length; o++) {
			origin = origins[o];
			arrivals = origin.arrivals;

			buf.push('<section class="origin">');

			// output origin arrivals
			if (arrivals.length > 0) {
				buf.push(
						'<h3>Phase Arrival Times</h3>',
						'<table class="responsive">',
						'<thead><tr>',
							'<th>',
								'<abbr title="Network Station Channel Location">NSCL</abbr>',
							'</th>',
							'<th>Distance</th>',
							'<th>Azimuth</th>',
							'<th>Phase</th>',
							'<th>Arrival Time</th>',
							'<th>Status</th>',
							'<th>Residual</th>',
							'<th>Weight</th>',
						'</tr></thead>',
						'<tbody>');
				for (a = 0; a < arrivals.length; a++) {
					arrival = arrivals[a];
					pick = arrival.pick;
					station = pick.waveformID;

					time = pick.time.value.split('T')[1].split('Z')[0].split(':');
					time[2] = parseFloat(time[2]).toFixed(2);
					time = time.join(':');

					buf.push(
							'<tr>',
								'<td>',
									station.networkCode,
									' ', station.stationCode,
									' ', station.channelCode,
									' ', station.locationCode,
								'</td>',
								'<td>', parseFloat(arrival.distance).toFixed(2), '&deg;</td>',
								'<td>', parseFloat(arrival.azimuth).toFixed(2), '&deg;</td>',
								'<td>', arrival.phase, '</td>',
								'<td>', time, '</td>',
								'<td>', pick.evaluationMode.toUpperCase(), '</td>',
								'<td>', parseFloat(arrival.timeResidual).toFixed(2), '</td>',
								'<td>', parseFloat(arrival.timeWeight).toFixed(2), '</td>',
							'</tr>');
				}
				buf.push('</tbody></table>');
			}
			buf.push('</section>');
		}
		return buf.join('');
	};

	HypocenterPage.prototype._getMagnitudesMarkup = function () {
		var magnitudes = this._quakeml.getMagnitudes();

		console.log(magnitudes);

		// return JSON.stringify(quakeml.getMagnitudes()[0], null, '  ');
		return '';
	};

	HypocenterPage.prototype._parseQuakeml = function (quakemlInfo, callback) {
		console.log("Parsing quakeml");
		if (quakemlInfo !== null) {
			Xhr.ajax({
				url: quakemlInfo.url,
				success: function (xml) {
					// use quakeml parser to make xml into quakeml
					callback(new Quakeml({xml: xml}));
				},
				error: function () {
					callback('-');
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
		    depthError = p['depth-error'] || null,
		    numStations = p['num-stations-used'] || null,
		    numPhases = p['num-phases-used'] || null,
		    minimumDistance = p['minimum-distance'] || null,
		    standardError = p['standard-error'] || null,
		    azimuthalGap = p['azimuthal-gap'] || null,
		    reviewStatus = p['review-status'] || 'automatic',
		    originSource = p['origin-source'] || eventSource,
		    magnitudeSource = p['magnitude-source'] || eventSource;

		buf.push('<table class="origin-detail tabular"><tbody>');


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
						magnitudeSource,
						'</td></tr>',
				'<tr><th scope="row">Location Source</th><td>',
						originSource,
						'</td></tr>');


		buf.push('</tbody></table>');

		return buf.join('');
	};

	HypocenterPage.prototype._getSummaryHeader = function (product) {
		var formatter = this._options.formatter,
		    p = product.properties,
		    magnitude = p.magnitude,
		    magnitudeType = p['magnitude-type'];

		return '<header>' + formatter.magnitude(magnitude) + '</header>' +
				'<small>' + (magnitudeType || 'undefined') + '</small>';
	};

	HypocenterPage.prototype._getSummaryInfo = function (product) {
		var formatter = this._options.formatter,
		    source = product.source,
		    p = product.properties,
		    latitude = p.latitude,
		    longitude = p.longitude,
		    depth = p.depth;

		return '<span class="location">' +
					formatter.location(latitude, longitude) +
				'</span>' +
				'<span class="depth">' +
					formatter.depth(depth, 'km') + ' depth' +
				'</span>' +
				'<span class="contributor">' +
					Attribution.getMainContributerHeader(source.toUpperCase()) +
				'</span>';
	};

	// return constructor
	return HypocenterPage;
});
