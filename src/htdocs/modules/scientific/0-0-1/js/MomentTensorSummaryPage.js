/* global define */
define([
	'util/Util',
	'base/SummaryModulePage',
	'base/Formatter',
	'./tensor/Tensor',
	'./tensor/BeachBall'
], function (
	Util,
	SummaryModulePage,
	Formatter,
	Tensor,
	BeachBall
) {
	'use strict';


	// default options
	var DEFAULTS = {
		title: 'Moment Tensor',
		hash: 'tensor',
		productType: 'moment-tensor',
		className: 'tensors',
		formatter: new Formatter()
	};


	/**
	 * Construct a new MomentTensorSummaryPage.
	 *
	 * @param options {Object}
	 *        module options
	 * @see TabbedModulePage.
	 */
	var MomentTensorSummaryPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		SummaryModulePage.call(this, options);
	};

	// extend TabbedModulePage
	MomentTensorSummaryPage.prototype = Object.create(SummaryModulePage.prototype);


	/**
	 * Override TabbedModulePage.getProducts to return Tensor objects.
	 *
	 * @return {Array<Tensor>} array of tensor objects.
	 */
	MomentTensorSummaryPage.prototype.getProducts = function () {
		var tensors = [],
		    products,
		    i,
		    len;

		// convert products to Tensor objects
		products = SummaryModulePage.prototype.getProducts.call(this);
		for (i = 0, len = products.length; i < len; i++) {
			tensors.push(Tensor.fromProduct(products[i]));
		}

		return tensors;
	};


	/**
	 * Get Summary card:
	 *  - beachball
	 *  - details
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {DOMElement} element with tensor title.
	 */
	MomentTensorSummaryPage.prototype.getSummary = function (tensor) {
		var el = document.createElement('a'),
		    header = document.createElement('div'),
		    info = document.createElement('div'),
		    //slug = '_' + tensor.source + '_' + tensor.type;
		    slug = '_' + tensor.source + '_' + tensor.code;
		el.className = 'summary';
		info.className = 'info';
		header.className = 'header';
		el.appendChild(header);
		el.appendChild(info);
		// set content
		info.innerHTML = this._getSummaryContent(tensor);
		// add beachball
		header.appendChild(new BeachBall({
			tensor: tensor,
			size: 200,
			plotAxes: false,
			plotPlanes: true
		}).getCanvas());
		el.appendChild(info);
		el.href = '#scientific_' + this._hash + slug;

		return el;
	};


	/**
	 * Used by getSummary() method,
	 * so subclasses can override non-beachball content.
	 *
	 * @param tensor {Tensor}
	 *        tensor object.
	 * @return {String} summary content.
	 */
	MomentTensorSummaryPage.prototype._getSummaryContent = function (tensor) {
		var formatter = this._options.formatter,
		    type = tensor.type,
		    magnitude = tensor.magnitude,
		    depth = Math.round(tensor.depth) + ' km',
		    author = tensor.source,
		    percentDC = Math.round(tensor.percentDC * 100);

		magnitude = formatter.magnitude(magnitude);
		//depth = formatter.depth(depth, 'km');

		return [
					'<header class="title">', type, '</header>',
					'<dl class="summary">',
						'<dt>Magnitude:</dt>',
						'<dd>', magnitude, '</dd>',
						'<dt>Depth:</dt>',
						'<dd>', depth, '</dd>',
						'<dt>Percent <abbr title="Double Couple">DC</abbr>:</dt>',
						'<dd>', percentDC, '%</dd>',
						'<dt>Author:</dt>',
						'<dd>', author, '</dd>',
					'</dl>',
		].join('');
	};


	// return constructor
	return MomentTensorSummaryPage;
});
