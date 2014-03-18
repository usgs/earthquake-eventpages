/* global define */
define([
	'util/Util',
	'util/Xhr',
	'base/TabbedModulePage'
], function (
	Util,
	Xhr,
	TabbedModulePage
) {
	'use strict';


	/**
	 * Construct a new FiniteFaultPage.
	 *
	 * @param options {Object}
	 *        page options.
	 * @see base/TabbedModulePage for additional options.
	 */
	var FiniteFaultPage = function (options) {
		options = Util.extend({}, options, {
			productType: 'finite-fault'
		});
		TabbedModulePage.call(this, options);
	};

	FiniteFaultPage.prototype = Object.create(TabbedModulePage.prototype);


	/**
	 * Finite fault products have broken contents.xml, embed html instead.
	 *
	 * @param product {Object}
	 *        finite-fault product.
	 * @return {DOMElement} that is updated to contain html content.
	 */
	FiniteFaultPage.prototype.getDetail = function (product) {
		var el = document.createElement('div'),
		    path = product.eventsourcecode + '.html',
		    content = product.contents[path],
		    url,
		    baseURL;

		if (content) {
			// compute absolute base url
			url = content.url;
			baseURL = url.replace(path, '');
			// load content
			Xhr.ajax({
				url: url,
				success: function (data) {
					// make all content urls absolute instead of relative
					var path;
					for (path in product.contents) {
						data = data.replace(path, baseURL + path);
					}
					// insert content
					el.innerHTML = data;
				}
			});
		}

		el.appendChild(TabbedModulePage.prototype.getDownloads.call(this, product));

		return el;
	};


	// return constructor
	return FiniteFaultPage;
});
