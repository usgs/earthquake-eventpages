/* global define */
define([
	'base/EventModule',

	'util/Util',
	'base/ContentsXML',
	'summary/Attribution',
	'theme/Accordion'
], function (
	EventModule,

	Util,
	ContentsXML,
	Attribution,
	Accordion
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
		this.loadDownloadMarkup = this.loadDownloadMarkup.bind(this);

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
		    el;

		this.setDownloadMarkup();

		//This isn't currently used. But it makes sense to leave it.
		if (typeof footerMarkup === 'string') {
			el = document.createElement('div');
			el.innerHTML = footerMarkup;
			footerMarkup = el;
		}
		this._footer.appendChild(footerMarkup);

	};

	EventModulePage.prototype.setDownloadMarkup = function () {
		var products,
		    el;
		//Get a list of products to add to the downloads list.
		products = this.getProducts();

		//IRIS page, and tests can return no products.
		if (products.length !== 0) {

			el = document.createElement('section');
			new Accordion({
				el: el,
				accordions: [{
					toggleText: 'Downloads',
					contentText: '<div class="page-downloads"></div>',
					classes: 'accordion-standard accordion-closed accordian-page-downloads'
				}]
			});

			this._footer.appendChild(el);

			el.addEventListener('click', this.loadDownloadMarkup);
			this._downloadsEl = el;
		}
	};

	EventModulePage.prototype.loadDownloadMarkup = function (e) {
		var products = this.getProducts(),
		    i;

		e.preventDefault();
		this._downloadsEl.removeEventListener('click',this.loadDownloadMarkup);

		for (i=0; i< products.length; i++) {
			this.getDownloads(products[i]);
		}
	};

	/**
	 * Find the products to display on this page.
	 *
	 * @return {Array<Object>} allProducts,
	 *         all products that match options.productTypes.
	 *
	 */
	EventModulePage.prototype.getProducts = function () {
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
		var el = document.createElement('section');

		el.innerHTML = '<p>Loading contents &hellip;</p>';
		el.className = 'page-download';

		this._downloadsEl.querySelector('.page-downloads').appendChild(el);
		new ContentsXML({
			product: product,
			callback: function (contents) {
			// build content
				var header = '<header class="page-download-header">' +
						'<span class="type">' + product.type + '</span>' +
						' <span class="source">' + Attribution.getName(product.source) +
						'</span>' +
						' <span class="code">' + product.code + '</span>' +
						'</header>';
				el.innerHTML = header + contents.getDownloads();
			},
			errback: function (contents,err) {
				if (err.message === 'product has no contents.xml content') {
					el.parentNode.removeChild(el);
				} else {
					el.innerHTML =
						'<p class="alert error">Unable to load downloads &hellip;</p>';
				}
			}});


	};


	return EventModulePage;
});
