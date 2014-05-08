/* global define */
define([
	'util/Util',
	'./EventModulePage',
	'./ContentsXML'
], function (
	Util,
	EventModulePage,
	ContentsXML
) {
	'use strict';

	/**
	 * SummaryDetailsPage should be extended to create a summary/details
	 * page. While extending SummaryDetailsPage a page should override:
	 *
	 * Details Page,
	 *
	 * The details section displays detailed information for a single product.
	 *
	 *  - getDetailsContent(),
	 *
	 *    Override this method to build markup for the details page and
	 *    append the HTML element to this._content.
	 *
	 *
	 * Summary Page,
	 *
	 * The summary section displays all products returned by getProducts().
	 * getSummaryContent() builds the summary page and calls the following
	 * methods to build each individual "summary card" on the summary page.
	 *
	 *  - getSummaryHeader(),
	 *
	 *    Override this method to return the header content for
	 *    the "summary card".
	 *
	 *  - getSummaryInfo(),
	 *
	 *    Override this method to return the descriptive content
	 *    for the "summary card".
	 *
	 */

	var SummaryDetailsPage = function (options) {
		this._options = options || {};
		this._code = this._options.code || null;
		EventModulePage.call(this, this._options);
	};

	// extend EventModulePage
	SummaryDetailsPage.prototype = Object.create(EventModulePage.prototype);

	/**
	 * Determine whether to load the summary or details
	 * page, and fetch the products for the page.
	 */
	SummaryDetailsPage.prototype._setContentMarkup = function () {
		var products = this._products = this.getProducts(),
		    product = null;

		// get the product hash (i.e. us_usb000kqnc)
		this._code = this._getHash();

		if (this._code) {
			for (var i = 0; i < products.length; i++) {
				if (this._code === products[i].source + '_' + products[i].code) {
					product = products[i];
				}
			}
		} else if (products.length === 1) {
			product = products[0];
		}

		if (product) {
			// If there is only one product display details
			this.getDetailsContent(product);
			this.getDownloads(product);
		} else {
			// there is more than one product display summary
			this.getSummaryContent(products);
		}
	};

	/**
	 * Find the products to display on this page.
	 *
	 * @return {Array<Object>} allProducts,
	 *         all products that match options.productTypes.
	 *
	 */
	SummaryDetailsPage.prototype.getProducts = function () {
		var options = this._options,
		    productTypes = options.productTypes || [],
		    products = [],
		    allProducts = [],
		    type;

		// loop through different productTypes
		for (var i = 0; i < productTypes.length; i++) {
			type = productTypes[i];
			products = this._event.properties.products[type] || [];
			allProducts = allProducts.concat(products);
		}

		return allProducts;
	};


	/**
	 * Called when a details page is loaded, this method builds the
	 * markup for the detail section.
	 *
	 * @param  {Object} product, the product to display.
	 */
	SummaryDetailsPage.prototype.getDetailsContent = function (product) {
		var p = document.createElement('p');

		p.innerHTML = 'Product Details for: ' + product.code;
		this._content.appendChild(p);
	};

	/**
	 * Called when a summary page is loaded, this method builds the
	 * markup for the summary sections. It loops over products and
	 * builds a summary card for each product.
	 *
	 * @param  {Array<Object>} products, an array of products to be summarized/
	 */
	SummaryDetailsPage.prototype.getSummaryContent = function (products) {
		var product,
		    summary;

		this._content.innerHTML =
				'<p>Click on a summary section to view the details.</p>';

		for (var i = 0; i < products.length; i++) {
			product = products[i];
			summary = this.buildSummaryMarkup(product);
			if (i === 0) {
				Util.addClass(summary, 'preferred');
			}
			this._content.appendChild(summary);
		}
	};

	/**
	 * Called by getSummaryContent, this method builds the summary
	 * list markup and requests data for it's two sections.
	 *
	 * @param  {Object} product, product being summarized
	 * @return {Object},
	 *         A single products summarization, in HTML.
	 */
	SummaryDetailsPage.prototype.buildSummaryMarkup = function (product) {
		var el,
		    header, headerMarkup,
		    info, infoMarkup;

		el = document.createElement('div');
		el.className = this._options.hash + '-summary summary';
		el.setAttribute('data-id', this._buildHash(product));

		header = document.createElement('div');
		header.className = 'header';
		headerMarkup = this._getSummaryHeader(product);
		// Add header content
		if (typeof headerMarkup === 'object') {
			header.appendChild(headerMarkup);
		} else {
			header.innerHTML = headerMarkup;
		}

		info = document.createElement('div');
		info.className = 'info';
		infoMarkup = this._getSummaryInfo(product);
		// Add description content
		if (typeof infoMarkup === 'object') {
			info.appendChild(infoMarkup);
		} else {
			info.innerHTML = infoMarkup;
		}

		el.appendChild(header);
		el.appendChild(info);

		// navigate to details page
		Util.addEvent(el, 'click', this._updateHashOnSummaryClick);

		return el;
	};

	SummaryDetailsPage.prototype._updateHashOnSummaryClick = function (e) {
		window.location.hash = e.currentTarget.getAttribute('data-id');
	};

	/**
	 * The content that goes into the summary card header
	 */
	SummaryDetailsPage.prototype._getSummaryHeader = function (product) {
		return 'Summary Header: <p>' + product.source + '<p>';
	};

	/**
	 * The content that goes into the summary card description
	 */
	SummaryDetailsPage.prototype._getSummaryInfo = function (product) {
		var p = document.createElement('div');
		p.innerHTML = 'Summary Description: <p>' + product.code + '<p>';

		return p;
	};

	/**
	 * Parse the hash and build the eventCode
	 *
	 * @return {String}
	 *         eventCode that is used to identify the correct
	 *         product details to load.
	 */
	SummaryDetailsPage.prototype._getHash = function () {
		var hash = window.location.hash,
		    moduleHash = this._options.module._hash,
		    pageHash = this._options.hash,
		    currentPage = '#' + moduleHash + '_' + pageHash;

		if (hash === currentPage) {
			return;
		}

		return hash.replace('#' + moduleHash + '_' + pageHash + ':', '');
	};

	/**
	 * Build a hash that will be used as the hash value that
	 * links the summary to its details section
	 *
	 * @param  {string} hash
	 */
	SummaryDetailsPage.prototype._buildHash = function (product) {
		return '#' + this._options.module._hash + '_' + this._hash + ':'+
				product.source + '_' + product.code;
	};

	/**
	 * Retrieves downloadable content from contents.xml
	 */
	SummaryDetailsPage.prototype.getDownloads = function (product) {
		var el = document.createElement('div'),
		    title = '<header><h3>Downloads</h3></header>';

		el.innerHTML = title + '<p>Loading contents &hellip;</p>';
		el.className = 'downloads';

		new ContentsXML({
				product: product,
				callback: function (contents) {
					// build content
					el.innerHTML = title + contents.getDownloads();
				},
				errback: function () {
					el.innerHTML = title +
							'<p class="alert error">Unable to load downloads &hellip;</p>';
				}});

		this._content.appendChild(el);
	};


		// clean-up resources.
	SummaryDetailsPage.prototype.destroy = function () {
		var summaries, summary;

		// unbind click handler ono summary sections
		if (this._content) {
			summaries = this._content.querySelectorAll('.summary');
			for (var i = 0; i < summaries.length; i++) {
				summary = summaries[i];
				Util.removeEvent(summary, 'click', this._updateHashOnSummaryClick);
			}
		}

		this._content = null;
		this._products = null;
		this._options = null;

		EventModulePage.prototype.destroy.call(this);
	};


	// return constructor
	return SummaryDetailsPage;
});
