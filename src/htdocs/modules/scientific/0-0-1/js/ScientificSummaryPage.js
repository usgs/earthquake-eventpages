/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'base/Formatter',
	'summary/SummaryPage',
	'./tensor/Tensor',
	'./tensor/BeachBall',
	'./HypocenterPage'
], function (
	Util,
	EventModulePage,
	Formatter,
	SummaryPage,
	Tensor,
	BeachBall,
	HypocenterPage
) {
	'use strict';


	// default options
	var DEFAULTS = {
		title: 'Summary',
		hash: 'summary',
		formatter: new Formatter()
	};


	/**
	 * Create a new ScientificSummaryPage.
	 * @param options {Object}
	 *        module options.
	 */
	var ScientificSummaryPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options);
		EventModulePage.call(this, this._options);
	};

	// extend EventModulePage
	ScientificSummaryPage.prototype = Object.create(EventModulePage.prototype);


	/**
	 * Render page content.
	 */
	ScientificSummaryPage.prototype._setContentMarkup = function () {
		var content = this.getContent(),
		    mainCol,
		    sideCol,
		    rest,
		    el;

		// set layout
		content.innerHTML = [
			'<div class="row clearfix">',
				'<div class="mainCol column two-of-three"></div>',
				'<div class="sideCol column one-of-three"></div>',
			'</div>',
			'<div class="rest"></div>'
		].join('');
		mainCol = content.querySelector('.mainCol');
		sideCol = content.querySelector('.sideCol');
		rest = content.querySelector('.rest');

		// main column content
		el = this.getLocationSummary();
		if (el !== null) {
			mainCol.appendChild(el);
		}
		// side column content
		el = this.getBeachballSummary();
		if (el !== null) {
			sideCol.appendChild(el);
		}
		el = this.getFiniteFaultSummary();
		if (el !== null) {
			sideCol.appendChild(el);
		}
		// rest content
		el = this.getText();
		if (el !== null) {
			rest.appendChild(el);
		}
		el = this.getLinks();
		if (el !== null) {
			rest.appendChild(el);
		}
	};

	ScientificSummaryPage.prototype.getProducts = function () {
		return SummaryPage.prototype.getProducts.call(this);
	};

	/**
	 * Get a summary of the preferred location.
	 *
	 * @return {DOMElement} element with preferred location information.
	 */
	ScientificSummaryPage.prototype.getLocationSummary = function () {
		var products = this._event.properties.products,
		    origins = products.origin,
		    originEl = null;
		if (origins) {
			originEl = document.createElement('div');
			originEl.className = 'location';

			originEl.innerHTML = [
				'<h3><a href="#scientific_origin">Origin</a></h3>',
				HypocenterPage.prototype.getOriginDetail.call(this, origins[0])
			].join('');

			HypocenterPage.prototype.getFeString.call(this, origins[0],
					function (feString) {
				var feContainer = originEl.querySelector('.fe-info');
				if (feContainer) {
					feContainer.innerHTML = feString;
				}
			});
		}
		return originEl;
	};

	/**
	 * Get a summary of the focal-mechanism and/or moment-tensor information.
	 *
	 * @return {DOMElement} summary, or null if no information present.
	 */
	ScientificSummaryPage.prototype.getBeachballSummary = function () {
		var products = this._event.properties.products,
		    tensorProducts = products['moment-tensor'],
		    mechanismProducts = products['focal-mechanism'],
		    rowEl = document.createElement('div'),
		    mechanismEl = null,
		    tensorEl = null,
		    tensor,
		    source,
		    i;

		if (tensorProducts) {
			tensorEl = document.createElement('div');
			tensorEl.className = 'tensor';
			rowEl.appendChild(tensorEl);

			tensorEl.innerHTML =
					'<h3>' +
						'<a href="#scientific_tensor">Moment Tensor</a>' +
					'</h3>';

			// only show preferred moment tensor
			tensor = Tensor.fromProduct(tensorProducts[0]);
			tensorEl.appendChild(new BeachBall({
						tensor: tensor,
						size: 256,
						fillColor: tensor.fillColor
					}).getCanvas());
		}

		if (mechanismProducts) {
			mechanismEl = document.createElement('div');
			mechanismEl.className = 'mechanism';
			rowEl.appendChild(mechanismEl);

			mechanismEl.innerHTML =
					'<h3>' +
						'<a href="#scientific_mechanism">Focal Mechanism</a>' +
					'</h3>';

			// show all mechanisms from preferred source
			source = mechanismProducts[0].source;
			for (i = 0; i < mechanismProducts.length; i++) {
				if (mechanismProducts[i].source === source) {
					tensor = Tensor.fromProduct(mechanismProducts[i]);
					mechanismEl.appendChild(new BeachBall({
						tensor: tensor,
						size: 256,
						fillColor: tensor.fillColor
					}).getCanvas());
				}
			}
		}

		return rowEl;
	};

	/**
	 * Get a summary of any finite-fault information.
	 *
	 * @return {DOMElement} summary, or null if no information present.
	 */
	ScientificSummaryPage.prototype.getFiniteFaultSummary = function () {
		var products = this._event.properties.products,
		    finiteFaults = products['finite-fault'],
		    fault,
		    basemap,
		    el = null,
		    buf;

		if (finiteFaults) {
			fault = finiteFaults[0];
			basemap = fault.contents['basemap.png'];
			if (basemap) {
				el = document.createElement('div');
				buf = [];
				buf.push('<a href="#scientific_finitefault">');
				buf.push('<h3>Finite Fault</h3>');
				buf.push('<img src="', basemap.url, '" alt="Finite Fault"/>');
				buf.push('</a>');
				el.innerHTML = buf.join('');
			}
		}

		return el;
	};

	/**
	 * Get any scitech-text information.
	 *
	 * @return {DOMElement} content, or null if no information present.
	 */
	ScientificSummaryPage.prototype.getText = function () {
		var products = this._event.properties.products,
		    texts = products['scitech-text'],
		    textEl = null,
		    buf,
		    i,
		    len,
		    text;

		if (texts) {
			textEl = document.createElement('div');
			textEl.className = 'scitech-text';

			buf = [];
			buf.push('<h3>Scientific and Technical Commentary</h3>');
			for (i = 0, len = texts.length; i < len; i++) {
				text = texts[i].contents[''].bytes;
				buf.push('<section>', text, '</section>');
			}

			textEl.innerHTML = buf.join('');
		}

		return textEl;
	};

	/**
	 * Get any scitech-link information.
	 *
	 * @return {DOMElement} links, or null if no information present.
	 */
	ScientificSummaryPage.prototype.getLinks = function () {
		var products = this._event.properties.products,
		    links = products['scitech-link'],
		    linkEl = null,
		    buf,
		    i,
		    len,
		    link;

		if (links) {
			linkEl = document.createElement('div');
			linkEl.className = 'scitech-links';

			buf = [];
			buf.push('<h3>Scientific and Technical Links</h3>');
			buf.push('<ul>');
			for (i = 0, len = links.length; i < len; i++) {
				link = links[i].properties;
				buf.push('<li><a href="', link.url, '">', link.text, '</a></li>');
			}
			buf.push('</ul>');
			linkEl.innerHTML = buf.join('');
		}

		return linkEl;
	};


	// return constructor
	return ScientificSummaryPage;
});
