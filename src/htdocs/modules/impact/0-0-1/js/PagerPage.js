/* global define */
define([
	'util/Util',
	'util/Xhr',

	'base/EventModulePage',
	'impact/PagerXmlParser'
], function (
	Util,
	Xhr,

	EventModulePage,
	PagerXmlParser
) {
	'use strict';

	var DEFAULTS = {
		renderCallback: null // Function to call when async rendering is complete
	};

	var PagerPage = function (options) {
		options = Util.extend({}, DEFAULTS, options || {});
		this._renderCallback = options.renderCallback;
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
		if (this._cityEl && this._cityEl.querySelector('.toggle') !== null) {
			this._cityEl.removeEventListener('click', this._onCityClick, false);
		}
	};

	/**
	 * Set static markup and scaffold structure for remaining content.
	 *
	 * @see _renderPage
	 */
	PagerPage.prototype._setContentMarkup = function () {
		var _this = this,
		    contents = this._event.properties.products.losspager[0].contents;

		this._content.classList.add('pager');
		this._content.innerHTML = [
			'<section class="alert-wrapper row"></section>',
			'<section class="row">',
				'<h3>Estimated Population Exposure to Earthquake Shaking</h3>',
				'<span class="legend">',
					'Population per ~1 sq. km. from LandScan (k = x1,000)',
				'</span>',
				'<div class="map-wrapper column one-of-two">',
					'<img src="', contents['exposure.png'].url,
							'" alt="Population Exposure Map"/>',
				'</div>',
				'<div class="exposure-wrapper column one-of-two"></div>',
			'</section>',
			'<section class="row right-to-left">',
				'<div class="comment-wrapper column one-of-two"></div>',
				'<div class="city-wrapper column one-of-two"></div>',
			'</section>'
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
				_this._pagerInfo = PagerXmlParser.parse(
						xhr.responseXML || responseText);

				_this._renderPage();
			},
			error: function (errorInfo) {
				_this._renderError(errorInfo);
			}
		});
	};

	/**
	 * Use disclaimer for footer information.
	 *
	 */
	PagerPage.prototype._setFooterMarkup = function () {
		this._footer.classList.add('pager');
		this._footer.innerHTML =
			'<p class="disclaimer">' +
				'PAGER content is automatically generated, and <strong>only ' +
				'considers losses due to structural damage</strong>. Limitations of ' +
				'input data, shaking estimates, and loss models may add uncertainty. ' +
				'PAGER results are generally available within 30 minutes of the ' +
				'earthquake&rsquo;s occurrence. However, information on the extent ' +
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

	/**
	 * Renders the components of the page that require pager.xml. This includes:
	 *
	 *  - alert histograms
	 *  - exposure table
	 *  - comments (structure/secondary effects)
	 *  - nearby cities
	 *
	 */
	PagerPage.prototype._renderPage = function () {
		this._renderAlerts();
		this._renderExposures();
		this._renderComments();
		this._renderCities();

		if (this._renderCallback && typeof this._renderCallback === 'function') {
			this._renderCallback();
		}
	};

	/**
	 * Renders an error on the page when pager.xml fails to load.
	 *
	 */
	PagerPage.prototype._renderError = function (errorInfo) {
		this._content.innerHTML = '<p class="error">' +
				'An error occurred loading this page. Please try again later.</p>';

		if (this._renderCallback && typeof this._renderCallback === 'function') {
			this._renderCallback(errorInfo);
		}
	};

	/**
	 * Adds alert historgrams and corresponding impact comments to page.
	 * Historgrams are added based on descending alert level.
	 *
	 */
	PagerPage.prototype._renderAlerts = function () {
		var alerts = this._pagerInfo.alerts,
		    comments = this._pagerInfo.comments.impact,
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
			'<div class="column one-of-two">' +
				'<h3>Estimated Economic Losses</h3>' +
				'<a href="' + contents['alertecon.pdf'].url + '">' +
					'<img src="' + contents['alertecon.png'].url + '" alt=""/>' +
				'</a>' +
				'<p>' +
					((comments.length === 2) ? comments[1] : comments[0]) +
				'</p>' +
			'</div>'
			;
		}

		if (alerts.fatality) {
			fatLevel = alerts.fatality.level;
			if (levelValues.hasOwnProperty(fatLevel)) {
				fatLevel = levelValues[fatLevel];
			}
			fatMarkup = [
			'<div class="column one-of-two">' +
				'<h3>Estimated Fatalities</h3>' +
				'<a href="' + contents['alertfatal.pdf'].url + '">' +
					'<img src="' + contents['alertfatal.png'].url + '" alt=""/>' +
				'</a>'
			];

			if (comments.length === 2) {
				fatMarkup.push('<p>' + comments[0] + '</p>');
			}

			fatMarkup.push('</div>');

			fatMarkup = fatMarkup.join('');
		}

		if (fatLevel === -1 && econLevel === -1) {
			this._alertEl.parentNode.removeChild(this._alertEl);
			this._alertEl = null;
		} else if (fatLevel >= econLevel) {
			this._alertEl.innerHTML = fatMarkup + econMarkup;
		} else {
			this._alertEl.innerHTML = econMarkup + fatMarkup;
		}
	};

	/**
	 * Adds exposure table information to page. Clicking on the MMI box for an
	 * exposure level expands to show meta information about that exposure level.
	 *
	 */
	PagerPage.prototype._renderExposures = function () {
		var exposureList = ['<ol class="pager-exposures">'],
		    exposures = this._pagerInfo.exposures,
		    i = 0,
		    len = exposures.length,
		    exposure,
		    mmi;

		mmi = parseFloat(this._event.properties.products.losspager[0]
				.properties.maxmmi);

		for (; i < len; i++) {
			exposure = exposures[i];

			exposureList.push(this._createExposureItem(exposure,
					(exposure.min <= mmi && mmi <= exposure.max)));
		}

		if (len === 0) {
			this._exposureEl.parentNode.removeChild(this._exposureEl);
			this._exposureEl = null;
		} else {
			this._exposureEl.innerHTML = exposureList.join('');
			this._exposureEl.addEventListener('click', this._onExposureClick);
		}
	};

	/**
	 * Adds the structure comment and secondary effects comments to the page.
	 *
	 */
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
			this._commentEl = null;
		}
	};

	/**
	 * Adds the nearby cities list to the page. Cities have a very special sorting
	 * algorithm. The first 11 cities are displayed by default and a control is
	 * used to show/hide additional cities.
	 *
	 */
	PagerPage.prototype._renderCities = function () {
		var markup = [],
		    cities = this._pagerInfo.cities,
		    i = 0,
		    len = cities.length,
		    city;

		markup.push(
			'<h3>Selected Cities Exposed</h3>' +
			'<span class="legend">' +
				'from GeoNames Database of Cities with 1,000 or more residents' +
			'</span>'
		);

		if (len > 11) {
			markup.push('<a href="javascript:void(null);" class="toggle">' +
					'Show/Hide Full City List</a>');
			this._cityEl.addEventListener('click', this._onCityClick);
		}

		markup.push('<ol class="pager-cities">');

		for (; i < len; i++) {
			city = cities[i];

			Array.prototype.push.apply(markup, [
				'<li class="', ((i>10)?'city-additional':''),'">',
					'<span class="roman mmi ', city.css, '">', city.roman, '</span>',
					city.name,
					'<span class="population">', city.populationDisplay, '</span>',
				'</li>'
			]);
		}

		markup.push(
			'</ol>' +
			'<span class="legend">(k = x1,000)</span>'
		);

		if (len === 0) {
			this._cityEl.parentNode.removeChild(this._cityEl);
			this._cityEl = null;
		} else {
			this._cityEl.innerHTML = markup.join('');
		}
	};

	/**
	 * Event handler for click events on exposure MMI controls. This is bound
	 * to the container and uses event delegation.
	 *
	 * Note: Scope of "this" within this function is the clicked DOM element.
	 */
	PagerPage.prototype._onExposureClick = function (evt) {
		if (evt.target.classList.contains('mmi')) {
			evt.target.parentNode.classList.toggle('expanded');
		}
	};

	/**
	 * Event handler for click events on city list toggle control. This is bound
	 * to the container and uses event delegation.
	 *
	 * Note: Scope of "this" within this function is the clicked DOM element.
	 */
	PagerPage.prototype._onCityClick = function (evt) {
		if (evt.target.classList.contains('toggle')) {
			this.querySelector('.pager-cities').classList.toggle('show-additional');
		}
	};

	/**
	 * Utility method to create exposure item markup.
	 *
	 * @param exposure {Object}
	 *      The exposure level for which to create an element.
	 *
	 * @return {String}
	 *      The markup.
	 */
	PagerPage.prototype._createExposureItem = function (exposure, expanded) {
		return '<li class="' + (expanded?'expanded':'') + '">' +
			'<span class="roman mmi ' + exposure.css + '">' +
				exposure.label +
			'</span>' +
			'<span class="population-label">Population Exposure</span>' +
			'<span class="population-value">' + exposure.populationDisplay + '</span>' +
			'<dl>' +
				'<dt>Perceived Shaking</dt>' +
					'<dd>' + exposure.perc + '</dd>' +
				'<dt>Damage to Resistant Structures</dt>' +
					'<dd>' + exposure.resist + '</dd>' +
				'<dt>Damage to Vulnerable Structures</dt>' +
					'<dd>' + exposure.vuln + '</dd>' +
			'</dl>' +
		'</li>';
	};

	return PagerPage;
});