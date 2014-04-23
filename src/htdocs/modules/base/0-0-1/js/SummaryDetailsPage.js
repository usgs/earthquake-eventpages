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

	var SummaryDetailsPage = function (options) {
		this._options = options;
		this._code = options.code || null;
		EventModulePage.call(this, options);
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
	 * Find the products (or other information) to display on this page.
	 *
	 * This implementation uses these configurable options:
	 *     productType {String}, find products of this type. When multiple
	 *     types are specified an object of multiple product arrays is
	 *     returned instead of a single array.
	 *
	 *     Single productType:
	 *     [object, object, object]
	 * 
	 *     Multiple productType:
	 *     {'origin': [object, object, object], 'phase-data': [object]}
	 *
	 * @return {Array<Object>} array of "products" to display on this page.
	 * @return {Object} object of "products" to display on this page.
	 */
	SummaryDetailsPage.prototype.getProducts = function () {
		var options = this._options,
		    productTypes = options.productTypes,
		    allProducts = {},
		    products = [],
		    product,
		    productDetails,
		    type;

		// loop through different productTypes
		for (var i = 0; i < productTypes.length; i++) {
			type = productTypes[i];
			products = this._event.properties.products[type];
			productDetails = {};

			// loop through different products of a specific type
			for (var x = 0; x < products.length; x++) {
				product = products[x];
				productDetails[product.code] = product; // push onto 'type' keyed array
			}
			allProducts[type] = productDetails;
		}

		// When only one product type exists, return array of products
		if (productTypes.length === 1) {
			return products;
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
		var product;

		this._content.innerHTML =
				'<p>Click on a summary section to view the details.</p>';

		for (var i = 0; i < products.length; i++) {
			product = products[i];
			this._content.appendChild(this.buildSummaryMarkup(product));
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

		el = document.createElement('a');
		el.className = this._options.hash + '-summary summary';
		el.href = this._buildHash(product);

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

		return el;
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
	SummaryDetailsPage.prototype._buildHash = function (product)  {
		return '#' + this._options.module._hash + '_' + this._hash + ':'+
				product.source + '_' + product.code;
	};

	/**
	 * Retrieves downloadable content from contents.xml
	 */
	SummaryDetailsPage.prototype.getDownloads = function (product) {
		var el = document.createElement('div');
		el.innerHTML = 'Loading contents ...';
		el.className = 'downloads';

		new ContentsXML({
				product: product,
				callback: function (contents) {
					// build content
					el.innerHTML = '<header><h3>Downloads</h3></header>' +
							contents.getDownloads();
				},
				errback: function () {
					el.innerHTML = 'Error loading contents ...';
				}});

		this._content.appendChild(el);
	};


	// return constructor
	return SummaryDetailsPage;
});
