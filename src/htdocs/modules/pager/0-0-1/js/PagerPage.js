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

	var DEFAULTS = {
		title: 'Summary',
		hash: 'summary'
	};

	var EXPOSURE_INFO = [
		{perc:'Not Felt',resist:'none',vuln:'none',label:'I',css:'mmiI'},
		{perc:'Not Felt',resist:'none',vuln:'none',label:'I',css:'mmiI'},
		{perc:'Weak',resist:'none',vuln:'none',label:'II-III',css:'mmiII'},
		{perc:'Light',resist:'none',vuln:'none',label:'IV',css:'mmiIV'},
		{perc:'Moderate',resist:'Very Light',vuln:'Light',label:'V',css:'mmiV'},
		{perc:'Strong',resist:'Light',vuln:'Moderate',label:'VI',css:'mmiVI'},
		{perc:'Very Strong',resist:'Moderate',vuln:'Moderate/Heavy',label:'VII',
				css:'mmiVII'},
		{perc:'Severe',resist:'Moderate/Heavy',vuln:'Heavy',label:'VIII',
				css:'mmiVIII'},
		{perc:'Violent',resist:'Heavy',vuln:'Very Heavy',label:'IX',css:'mmiIX'},
		{perc:'Extreme',resist:'Very Heavy',vuln:'Very Heavy',label:'X',
				css:'mmiX'},
		{perc:'Extreme',resist:'Very Heavy',vuln:'Very Heavy',label:'XI',
				css:'mmiX'},
		{perc:'Extreme',resist:'Very Heavy',vuln:'Very Heavy',label:'XII',
				css:'mmiX'}
	];

	var PagerPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};
	PagerPage.prototype = Object.create(EventModulePage.prototype);


	/**
	 * Clean up event bindings.
	 *
	 */
	PagerPage.prototype.destroy = function () {
		if (this._exposureEl) {
			this._exposureEl.removeEventListener('click', this._onExposureClick,
					false);
		}
		if (this._cityEl) {
			this._cityEl.removeEventListener('click', this._onCityClick, false);
		}
	};

	PagerPage.prototype._setContentMarkup = function () {
		var _this = this,
		    contents = this._event.properties.products.losspager[0].contents;

		this._content.classList.add('pager');
		this._content.innerHTML = [
			'<div class="alert-wrapper"></div>',
			'<div class="map-wrapper">',
				'<h3>Population Exposure</h3>',
				'<span class="legend">Population per ~1 sq. km. from LandScan</span>',
				'<img src="', contents['exposure.png'].url,
						'" alt="PAGER Population Exposure"/>',
			'</div>',
			'<div class="exposure-wrapper"></div>',
			'<div class="comment-wrapper"></div>',
			'<div class="city-wrapper"></div>'
		].join('');

		// Store these for later. See _renderPage
		this._alertEl = this._content.querySelector('.alert-wrapper');
		this._exposureEl = this._content.querySelector('.exposure-wrapper');
		this._commentEl = this._content.querySelector('.comment-wrapper');
		this._cityEl = this._content.querySelector('.city-wrapper');

		// Can only display exposure map by default. Everything else relies on info
		// found in pager.xml, so must fetch/parse that asynchrounously.

		Xhr.ajax({
			url: contents['pager.xml'].url,
			success: function (responseText, xhr) {
				_this._renderPage(_this._parsePagerXml(xhr.responseXML));
			},
			error: function (errorInfo) {
				_this._renderError(errorInfo);
			}
		});
	};

	PagerPage.prototype._setFooterMarkup = function () {
		this._footer.classList.add('pager');
		this._footer.innerHTML =
			'<p class="disclaimer">' +
				'PAGER content is automatically generated, and <strong>only ' +
				'considers losses due to structural damage</strong>. Limitations of ' +
				'input data, shaking estimates, and loss models may add uncertainty. ' +
				'PAGER results are generally available within 30 minutes of the ' +
				'earthquake&rdquo;s occurrence. However, information on the extent ' +
				'of shaking will be uncertain in the minutes and hours following an ' +
				'earthquake and typically improves as additional sensor data and ' +
				'reported intensities are acquired and incorporated into models of ' +
				'the earthquake&rsquo;s source. Users of PAGER estimates should ' +
				'account for uncertainty and always seek the most current PAGER ' +
				'release for any earthquake.' +
			'</p>' +
			'<a href="/research/pager/">' +
				'Scientific Background on the PAGER Process' +
			'</a>' +
			'<br/>' +
			'<a href="/research/pager/disclaimer.php">' +
				'Read Additional PAGER Disclaimers' +
			'</a>'
		;
	};

	PagerPage.prototype._renderPage = function () {
		this._renderAlerts();
		this._renderExposures();
		this._renderComments();
		this._renderCities();
	};

	PagerPage.prototype._renderError = function (/* errorInfo */) {
		this._content.innerHTML = '<p class="error">' +
				'An error occurred loading this page. Please try again later.</p>';
	};

	PagerPage.prototype._renderAlerts = function () {
		var alerts = this._pagerInfo.alerts,
		    contents = this._event.properties.products.losspager[0].contents,
		    econMarkup = '', econLevel = -1,
		    fatMarkup = '', fatLevel = -1;

		var levelValues = {
			'pending': 0,
			'green': 1,
			'yellow': 2,
			'orange': 3,
			'red': 4
		};

		if (alerts.economic) {
			econLevel = alerts.economic.level;
			if (levelValues.hasOwnProperty(econLevel)) {
				econLevel = levelValues[econLevel];
			}
			econMarkup =
			'<div class="wrapper">' +
				'<h3>Estimated Economic Losses</h3>' +
				'<a href="' + contents['alertecon.pdf'].url + '">' +
					'<img src="' + contents['alertecon.png'].url + '" alt=""/>' +
				'</a>' +
			'</div>'
			;
		}

		if (alerts.fatality) {
			fatLevel = alerts.fatality.level;
			if (levelValues.hasOwnProperty(fatLevel)) {
				fatLevel = levelValues[fatLevel];
			}
			fatMarkup =
			'<div class="wrapper">' +
				'<h3>Estimated Fatalities</h3>' +
				'<a href="' + contents['alertfatal.pdf'].url + '">' +
					'<img src="' + contents['alertfatal.png'].url + '" alt=""/>' +
				'</a>' +
			'</div>'
			;
		}

		if (fatLevel === -1 && econLevel === -1) {
			this._alertEl.parentNode.removeChild(this._alertEl);
		} else if (fatLevel >= econLevel) {
			this._alertEl.innerHTML = fatMarkup + econMarkup;
		} else {
			this._alertEl.innerHTML = econMarkup + fatMarkup;
		}
	};

	PagerPage.prototype._onExposureClick = function (evt) {
		if (evt.target.classList.contains('mmi')) {
			evt.target.parentNode.classList.toggle('expanded');
		}
	};

	PagerPage.prototype._onCityClick = function (evt) {
		if (evt.target.classList.contains('toggle')) {
			this.querySelector('.pager-cities').classList.toggle('show-additional');
		}
	};

	PagerPage.prototype._renderExposures = function () {
		var exposureList = document.createElement('ol'),
		    exposures = this._pagerInfo.exposures,
		    i = 0,
		    len = exposures.length;

		exposureList.classList.add('pager-exposures');

		for (; i < len; i++) {
			exposureList.appendChild(this._createExposureItem(exposures[i]));
		}

		if (len === 0) {
			this._exposureEl.parentNode.removeChild(this._exposureEl);
		} else {
			this._exposureEl.innerHTML =
				'<h3>' +
					'Estimated Population Exposure to Earthquake Shaking' +
				'</h3>';

			this._exposureEl.appendChild(exposureList);

			this._exposureEl.addEventListener('click', this._onExposureClick);
		}
	};

	PagerPage.prototype._renderComments = function () {
		var comments = this._pagerInfo.comments,
		    markup = [];

		if (comments.hasOwnProperty('structure')) {
			markup.push(
			'<div class="wrapper">' +
				'<h3>Structure Information Summary</h3>' +
				'<p>' + comments.structure + '</p>' +
			'</div>'
			);
		}

		if (comments.hasOwnProperty('effects')) {
			markup.push(
			'<div class="wrapper">' +
				'<h3>Secondary Effects</h3>' +
				'<p>' + comments.effects + '</p>' +
			'</div>'
			);
		}

		if (markup.length) {
			this._commentEl.innerHTML = markup.join('');
		} else {
			// If no comments, remove this section
			this._commentEl.parentNode.removeChild(this._commentEl);
		}
	};

	PagerPage.prototype._renderCities = function () {
		var markup = [],
		    cities = this._pagerInfo.cities,
		    i = 0,
		    len = cities.length,
		    city,
		    info,
		    population,
		    toggle,
		    ol;

		markup.push(
			'<h3>Selected Cities Exposed</h3>' +
			'<span class="legend">' +
				'from GeoNames Database of Cities with 1,000 or more residents' +
			'</span>' +
			'<ol class="pager-cities">'
		);

		for (; i < len; i++) {
			city = cities[i];
			info = EXPOSURE_INFO[Math.round(city.mmi)];
			population = this._formatPopulation(city.population);

			if (population === '0k') {
				population = '&lt;1k';
			}

			Array.prototype.push.apply(markup, [
				'<li class="', ((i>9)?'city-additional':''),'">',
					'<span class="roman mmi ', info.css, '">', info.label, '</span>',
					city.name,
					'<span class="population">', population, '</span>',
				'</li>'
			]);
		}

		markup.push(
			'</ol>' +
			'<span class="legend">(k = x1,000)</span>'
		);

		this._cityEl.innerHTML = markup.join('');

		if (len > 10) {
			// More than 10 cities, add a toggle control to show/hide all cities
			toggle = document.createElement('a');
			ol = this._cityEl.querySelector('ol');

			toggle.classList.add('toggle');
			toggle.innerHTML = 'Show/Hide Full City List';

			this._cityEl.appendChild(toggle);
			this._cityEl.addEventListener('click', this._onCityClick);
		}
	};

	PagerPage.prototype._createExposureItem = function (exposure) {
		var item = document.createElement('li'),
		    level = Math.round(exposure.min),
		    info = EXPOSURE_INFO[level];

		item.innerHTML =
			'<span class="roman mmi ' + info.css + '">' + info.label + '</span>' +
			'<span class="pop">Population Exposure: ' +
				this._formatPopulation(exposure.pop, !exposure.onMap) +
			'</span>' +
			'<dl>' +
				'<dt>Perceived Shaking</dt><dd>' + info.perc + '</dd>' +
				'<dt>Damage to Resistant Structures</dt><dd>' + info.resist + '</dd>' +
				'<dt>Damage to Vulnerable Structures</dt><dd>' + info.vuln + '</dd>' +
			'</dl>'
		;

		return item;
	};

	PagerPage.prototype._formatPopulation = function (population, incomplete) {
		var star = (incomplete?'*':'');

		if (population === 0) {
			if (incomplete) {
				population = '--';
			} else {
				population = '0k';
			}
		} else if (population > 1000) {
			population = parseInt(population / 1000, 10);
			// Insert commas for readability
			population = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			population += 'k';
		} else {
			population = '&lt;1k';
		}

		return population + star;
	};

	/**
	 * Parses the pager.xml response XML file into a JSON data structure. Attaches
	 * the parsed structure to this._pagerInfo for subsequent use as needed.
	 *
	 * @param pagerInfo {XML}
	 *        The XML response for pager.xml
	 */
	PagerPage.prototype._parsePagerXml = function (pagerInfo) {
		var i, len, j, numBins,
		    alerts, alert, type, bins, bin,
		    exposures, exposure,
		    cities, city,
		    comment;

		var info = {
			alerts: {},
			exposures: [],
			cities: [],
			comments: {}
		};

		// var parser = new DOMParser();
		// pagerInfo = parser.parseFromString(pagerInfo, 'text/xml');

		// Parse alerts/bins
		alerts = pagerInfo.querySelectorAll('pager > alerts > alert');
		for (i = 0, len = alerts.length; i < len; i++) {
			alert = alerts[i];
			type = alert.getAttribute('type');

			info.alerts[alert.getAttribute('type')] = {
				level: alert.getAttribute('level'),
				units: alert.getAttribute('units'),
				bins: []
			};

			bins = alert.querySelectorAll('bin');
			for (j = 0, numBins = bins.length; j < numBins; j++) {
				bin = bins[i];

				info.alerts[type].bins.push({
					min: bin.getAttribute('min'),
					max: bin.getAttribute('max'),
					prob: bin.getAttribute('probability'),
					color: bin.getAttribute('color')
				});
			}
		}

		// Parse exposure levels
		exposures = pagerInfo.querySelectorAll('pager > exposure');
		for (i = 0, len = exposures.length; i < len; i++) {
			exposure = exposures[i];

			info.exposures.push({
				min: parseFloat(exposure.getAttribute('dmin')),
				max: parseFloat(exposure.getAttribute('dmax')),
				pop: parseInt(exposure.getAttribute('exposure'), 10),
				onMap: (exposure.getAttribute('rangeInsideMap') === '1')
			});
		}

		// Parse cities
		cities = pagerInfo.querySelectorAll('pager > city');
		for (i = 0, len = cities.length; i < len; i++) {
			city = cities[i];

			info.cities.push({
				name: city.getAttribute('name'),
				latitude: parseFloat(city.getAttribute('lat')),
				longitude: parseFloat(city.getAttribute('lon')),
				population: parseInt(city.getAttribute('population'), 10),
				mmi: parseFloat(city.getAttribute('mmi')),
				isCapital: (city.getAttribute('iscapital') === '1')
			});
		}

		// Parse comments
		comment = pagerInfo.querySelectorAll('pager > structcomment');
		if (comment && comment.length) {
			info.comments.structure = comment[0].innerHTML.trim();
		}

		comment = pagerInfo.querySelectorAll('pager > secondary_effects');
		if (comment && comment.length) {
			info.comments.effects = comment[0].innerHTML.trim();
		}

		this._pagerInfo = info;
	};

	return PagerPage;
});