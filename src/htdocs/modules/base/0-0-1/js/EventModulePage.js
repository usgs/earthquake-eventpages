/* global define */
define([
	'base/EventModule',

	'util/Util',
	'base/ContentsXML'
], function (
	EventModule,

	Util,
	ContentsXML
) {
	'use strict';

	var DEFAULTS = {
		// URL hash fragment identifying this page; unique within the parent module.
		hash: 'page',

		// Title of this specific module page
		title: 'Page'
	};

	var EventModulePage = function (options) {

		options = options || {};

		this._module = options.module || new EventModule();
		this._hash = options.hash || DEFAULTS.hash;
		this._title = options.title || DEFAULTS.title;
		this._event = options.eventDetails || {};
		this._productTypes = options.productTypes || [];

		this._initialize();
	};

	EventModulePage.prototype.destroy = function () {
		// TODO
	};

	EventModulePage.prototype.getHeader = function () {
		return this._header;
	};

	EventModulePage.prototype.getContent = function () {
		return this._content;
	};

	EventModulePage.prototype.getFooter = function () {
		return this._footer;
	};

	EventModulePage.prototype.getHash = function () {
		return this._hash;
	};

	EventModulePage.prototype.getTitle = function () {
		return this._title;
	};

	EventModulePage.prototype._initialize = function () {
		this._header = document.createElement('header');
		Util.addClass(this._header, 'event-module-header');
		Util.addClass(this._header, 'clearfix');

		this._content = document.createElement('section');
		Util.addClass(this._content, 'event-module-content');
		Util.addClass(this._content, 'clearfix');

		this._footer = document.createElement('footer');
		Util.addClass(this._footer, 'event-module-footer');
		Util.addClass(this._footer, 'clearfix');

		this._setHeaderMarkup();
		this._setContentMarkup();
		this._setFooterMarkup();
	};

	EventModulePage.prototype._setHeaderMarkup = function () {
		this._header.innerHTML = this._module.getHeaderMarkup(this);
	};

	EventModulePage.prototype._setContentMarkup = function () {
		this._content.innerHTML = '<p>' +
			'Rendered: ' + (new Date()).toUTCString() +
		'</p>';
	};

	EventModulePage.prototype._setFooterMarkup = function () {
		var footerMarkup = this._module.getFooterMarkup(this),
		    products,
		    el,
		    i;

		//This isn't currently used. But it makes sense to leave it.
		if (typeof footerMarkup === 'object') {
			this._footer.appendChild(footerMarkup);
		} else {
			this._footer.innerHTML = footerMarkup;
		}

		//Get a list of products to add to the downloads list.
		products = this._getProducts();

		//IRIS page, and tests can return no products.
		if (products.length !== 0) {

			el = document.createElement('div');
			el.innerHTML = '<p><header><h3>Downloads</h3></header></p>';
			el.className = 'downloads';
			this._footer.appendChild(el);

			for (i=0; i< products.length; i++) {
				this.getDownloads(products[i]);
			}
		}

	};

	/**
	 * Find the products to display on this page.
	 *
	 * @return {Array<Object>} allProducts,
	 *         all products that match options.productTypes.
	 *
	 * Named '_getProducts' to not conflict with the tablist
	 * call 'getProducts' that was overridden in MomentTensorPage.js
	 */
	EventModulePage.prototype._getProducts = function () {
		var productTypes = this._productTypes,
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
	 * Gets the downloadable products and attachs to the footer.
	 */
	EventModulePage.prototype.getDownloads = function (product) {
		var el = document.createElement('div');

		el.innerHTML = '<p>Loading contents &hellip;</p>';
		el.className = 'downloads';

			new ContentsXML({
				product: product,
				callback: function (contents) {
					// build content
					el.innerHTML = contents.getDownloads();
				},
				errback: function () {
					el.innerHTML =
							'<p class="alert error">Unable to load downloads &hellip;</p>';
				}});

			this._footer.appendChild(el);
	};


	return EventModulePage;
});
