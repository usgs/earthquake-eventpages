/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'base/Formatter'
],
function (
	Util,
	EventModulePage,
	Formatter
) {
	'use strict';

	var DEFAULTS = {
		formatter: new Formatter()
	};

	var SummaryModulePage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options || {});
		EventModulePage.call(this, options);
	};

	SummaryModulePage.prototype = Object.create(EventModulePage.prototype);

	SummaryModulePage.prototype._setContentMarkup = function () {
		var products = this.getProducts(),
		    product, summary,
		    row = document.createElement('div'),
		    info = document.createElement('p');

		row.className = 'row clearfix ' + this._options.className;
		row.appendChild(info);

		info.innerHTML = 'Click on a summary section to view the details.';

		// if (products.length === 1) {
		// 	window.location = this._getHash(products[0]);
		// }

		for (var i = 0; i < products.length; i++) {
			product = products[i];
			summary = this.getSummary(product);
			if (i === 0) {
				// first product is preferred
				Util.addClass(summary, 'preferred');
			}
			row.appendChild(summary);
		}

		this.getContent().appendChild(row);
	};


	SummaryModulePage.prototype._getHash = function (product)  {
		return '#' + this._options.module._hash + '_' + this._hash + '_'+
				product.source + '_' + product.code;
	};


	/**
	 * Find the products (or other information) to display on this page.
	 *
	 * This implementation uses these configurable options:
	 *     productType {String} find products of this type.
	 *     onlyPreferred {Boolean} only include the most preferred product.
	 *     onlyPreferredSource {Boolean} include all products
	 *         from the most preferred product's source.
	 *
	 * @return {Array<Object>} array of "products" to display on this page.
	 */
	SummaryModulePage.prototype.getProducts = function () {
		var options = this._options,
		    productType = options.productType,
		    onlyPreferred = options.onlyPreferred,
		    onlyPreferredSource = options.onlyPreferredSource,
		    allProducts = this._event.properties.products[productType],
		    products = [],
		    source,
		    product,
		    i,
		    len;
		if (allProducts) {
			if (onlyPreferred) {
				products.push(allProducts[0]);
			} else if (onlyPreferredSource) {
				source = allProducts[0].source;
				for (i = 0, len = allProducts.length; i < len; i++) {
					product = allProducts[i];
					if (product.source === source) {
						products.push(product);
					}
				}
			} else {
				products = allProducts;
			}
		}
		return products;
	};



	// return constructor
	return SummaryModulePage;

});