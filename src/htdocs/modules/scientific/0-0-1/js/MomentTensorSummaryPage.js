/* global define */
define([
	'util/Util',
	'base/TabbedModulePage',
	'base/Formatter',
	'./tensor/Tensor',
	'./tensor/BeachBall'
], function (
	Util,
	TabbedModulePage,
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
		className: 'tensor-page',
		formatter: new Formatter()
	};


	/**
	 * Construct a new MomentTensorPage.
	 *
	 * @param options {Object}
	 *        module options
	 * @see TabbedModulePage.
	 */
	var MomentTensorPage = function (options) {
		options = Util.extend({}, DEFAULTS, options);
		TabbedModulePage.call(this, options);
	};

	// extend TabbedModulePage
	MomentTensorPage.prototype = Object.create(TabbedModulePage.prototype);


	// loop over tensors, build two-up display with beachballs
	MomentTensorPage.prototype._setContentMarkup = function () {

		var tensors = this.getProducts(),
		    tensor,
		    row = document.createElement('div'),
		    column_one = document.createElement('div'),
		    column_two = document.createElement('div'),
		    info = document.createElement('p');

		row.className = 'row';
		row.appendChild(info);
		row.appendChild(column_one);
		row.appendChild(column_two);
		column_one.className = 'column one-of-two';
		column_two.className = 'column one-of-two';

		info.innerHTML = 'Click on a moment tensor to view the details page.';


		for (var i = 0; i < tensors.length; i++) {

			tensor = tensors[i];

			if (i%2 === 0) {
				column_one.appendChild(this.getSummary(tensor));
			} else {
				column_two.appendChild(this.getSummary(tensor));
			}

		}


		this.getContent().appendChild(row);

	};


	/**
	 * Override TabbedModulePage.getProducts to return Tensor objects.
	 *
	 * @return {Array<Tensor>} array of tensor objects.
	 */
	MomentTensorPage.prototype.getProducts = function () {
		var tensors = [],
		    products,
		    i,
		    len;

		// convert products to Tensor objects
		products = TabbedModulePage.prototype.getProducts.call(this);
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
	MomentTensorPage.prototype.getSummary = function (tensor) {
		var el = document.createElement('a'),
		    details = document.createElement('div'),
		    slug = '_' + tensor.source + '_' + tensor.type;
		el.className = 'tensor-summary';
		details.className = 'details';
		// set content
		details.innerHTML = this._getSummaryContent(tensor);
		// add beachball
		el.appendChild(new BeachBall({
			tensor: tensor,
			size: 200,
			plotAxes: false,
			plotPlanes: true
		}).getCanvas());
		el.appendChild(details);
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
	MomentTensorPage.prototype._getSummaryContent = function (tensor) {
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
						'<dt>Author:</dt>',
						'<dd>', author, '</dd>',
						'<dt>Magnitude:</dt>',
						'<dd>', magnitude, '</dd>',
						'<dt>Depth:</dt>',
						'<dd>', depth, '</dd>',
						'<dt>Percent <abbr title="Double Couple">DC</abbr>:</dt>',
						'<dd>', percentDC, '%</dd>',
					'</dl>',
		].join('');
	};




	// return constructor
	return MomentTensorPage;
});
