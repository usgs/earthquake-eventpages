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

		console.log();
		// convert products to Tensor objects
		products = TabbedModulePage.prototype.getProducts.call(this);
		for (i = 0, len = products.length; i < len; i++) {
			tensors.push(Tensor.fromProduct(products[i]));
		}

		console.log();

		return tensors;
	};


	MomentTensorPage.prototype._setContentMarkup = function () {

		var tensors = this.getProducts(),
		    tensor;

		for (var i = 0; i < tensors.length; i++) {

			tensor = tensors[i];
			this.getContent().appendChild(this.getSummary(tensor));

		}

	};


	/**
	 * Get tab title.
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {DOMElement} element with tensor title.
	 */
	MomentTensorPage.prototype.getSummary = function (tensor) {
		var el = document.createElement('a'),
		    slug = '_' + tensor.source + '_' + tensor.type;
		el.className = 'tensor-summary';
		// set content
		el.innerHTML = this._getSummaryContent(tensor);
		// add beachball
		el.appendChild(new BeachBall({
			tensor: tensor,
			size: 152,
			plotAxes: false,
			plotPlanes: true
		}).getCanvas());

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
		    depth = tensor.depth,
		    source = tensor.source;

		magnitude = formatter.magnitude(magnitude);
		depth = formatter.depth(depth, 'km');

		return [
				'<header class="title">', type, '</header>',
				'<dl class="summary">',
					'<dt>Source</dt>',
					'<dd class="source">', source, '</dd>',
					'<dt>Magnitude</dt>',
					'<dd class="magnitude">', magnitude, '</dd>',
					'<dt>Depth</dt>',
					'<dd class="depth">', depth, '</dd>',
				'</dl>'
		].join('');
	};




	// return constructor
	return MomentTensorPage;
});
