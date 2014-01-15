/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'base/Formatter',
	'./tensor/Tensor',
	'./tensor/BeachBall',
	'./HypocenterPage'
], function (
	Util,
	EventModulePage,
	Formatter,
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
			'<div class="rest row clearfix"></div>'
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
				'<a href="#scientific_hypocenter"><h3>Hypocenter</h3></a>',
				HypocenterPage.prototype.getOriginDetail.call(this, origins[0]),
				'<p><a href="#scientific_hypocenter">',
					'View all locations, magnitudes, phases, and arrivals.',
				'</a></p>'
			].join('');
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
		    tensors = [],
		    tensorEl = null,
		    anchor,
		    rowEl,
		    el,
		    className,
		    source,
		    i,
		    len;

		if (tensorProducts || mechanismProducts) {
			tensorEl = document.createElement('div');
			tensorEl.className = 'tensor';
			anchor = document.createElement('a');
			tensorEl.appendChild(anchor);

			if (tensorProducts) {
				anchor.innerHTML = '<h3>Moment Tensor</h3>';
				// load tensors page
				anchor.href = '#scientific_tensor';

				// only show preferred moment tensor
				tensors.push(Tensor.fromProduct(tensorProducts[0]));
			} else {
				// mechanisms
				anchor.innerHTML = '<h3>Focal Mechanism</h3>';
				// load mechanism page
				anchor.href = '#scientific_mechanism';

				// show all mechanisms from preferred source
				source = mechanismProducts[0].source;
				for (i = 0; i < mechanismProducts.length; i++) {
					if (mechanismProducts[i].source === source) {
						tensors.push(Tensor.fromProduct(mechanismProducts[i]));
					}
				}
			}

			// put all beachballs in one row
			rowEl = document.createElement('div');
			rowEl.className = 'row';
			anchor.appendChild(rowEl);

			len = tensors.length;
			className = (len <= 1 ? '' :
					'column one-of-' + ['', 'one', 'two', 'three', 'four', 'five'][len]);
			for (i = 0; i < len; i++) {
				el = document.createElement('div');
				el.className = className;
				el.appendChild(new BeachBall({
						tensor: tensors[i],
						size: 256,
					}).getCanvas());
				rowEl.appendChild(el);
			}
		}

		return tensorEl;
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
