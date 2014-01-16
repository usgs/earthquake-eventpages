/* global define */
define([
	'util/Util',
	'base/TabbedModulePage',
	'./tensor/Tensor',
	'./tensor/BeachBall'
], function (
	Util,
	TabbedModulePage,
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
		tabList: {
			tabPosition: 'top'
		}
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
		// convert products to Tensor objects
		products = TabbedModulePage.prototype.getProducts.call(this);
		for (i = 0, len = products.length; i < len; i++) {
			tensors.push(Tensor.fromProduct(products[i]));
		}
		return tensors;
	};

	/**
	 * Get tab title.
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {DOMElement} element with tensor title.
	 */
	MomentTensorPage.prototype.getSummary = function (tensor) {
		var el = document.createElement('div');
		el.className = 'tensor-summary';
		// set content
		el.innerHTML = this._getSummaryContent(tensor);
		// add beachball
		el.appendChild(new BeachBall({
			tensor: tensor,
			size: 40,
			plotAxes: false,
			plotPlanes: true
		}).getCanvas());
		return el;
	};

	/**
	 * Get tab content.
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {DOMElement} element with tensor content.
	 */
	MomentTensorPage.prototype.getDetail = function (tensor) {
		var el = document.createElement('div');
		el.className = 'tensor-detail';

		// set layout
		el.innerHTML = [
			'<h3>', this._getTitle(tensor), '</h3>',
			'<div class="row clearfix">',
				'<div class="column one-of-two">',
					this._getInfo(tensor),
					this._getAxes(tensor),
					this._getPlanes(tensor),
				'</div>',
				'<div class="column one-of-two beachball"></div>',
			'</div>',
			'<div class="row clearfix downloads"></div>'
		].join('');

		// add beachball
		el.querySelector('.beachball').appendChild(
				new BeachBall({
					tensor: tensor,
					size: 320
				}).getCanvas());

		// add contentsxml content
		el.querySelector('.downloads').appendChild(
				TabbedModulePage.prototype.getDetail.call(this, tensor.product));

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
		var type = tensor.type,
		    magnitude = tensor.magnitude,
		    depth = tensor.depth;

		magnitude = magnitude.toFixed(1);
		depth = (depth ? depth.toFixed(1) + ' km' : '?');

		return [
				'<strong>', type, '</strong>',
				'<small>',
					'<br/><abbr title="Magnitude">M</abbr> = ', magnitude,
					'<br/><abbr title="Depth">D</abbr> = ', depth,
				'</small>'
		].join('');
	};

	/**
	 * Format tensor title.
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {String} title for tensor detail area.
	 */
	MomentTensorPage.prototype._getTitle = function (tensor) {
		var type = tensor.type,
		    title;

		if (type === 'Mww') {
			title = 'W-phase Moment Tensor (Mww)';
		} else if (type === 'Mwc') {
			title = 'Centroid Moment Tensor (Mwc)';
		} else if (type === 'Mwb') {
			title = 'Body-wave Moment Tensor (Mwb)';
		} else if (type === 'Mwr') {
			title = 'Regional Moment Tensor (Mwr)';
		} else {
			title = type;
		}
		return title;
	};

	/**
	 * Format tensor information.
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {String} markup for information.
	 */
	MomentTensorPage.prototype._getInfo = function (tensor) {
		var moment = tensor.moment,
		    magnitude = tensor.magnitude,
		    percentDC = tensor.percentDC,
		    depth = tensor.depth,
		    author = tensor.source,
		    catalog = tensor.product.properties.eventsource,
		    contributor = tensor.product.source,
		    code = tensor.product.code;

		moment = (moment / tensor.scale).toFixed(3) +
				'e+' + tensor.exponent + ' ' + tensor.units;
		magnitude = magnitude.toFixed(2);
		percentDC = Math.round(percentDC * 100) + '%';
		depth = (depth ? depth.toFixed(1) + ' km' : '?');

		return [
			'<table class="info-table tabular"><tbody>',
			'<tr><th scope="row">Moment</th>',
				'<td>', moment, '</td></tr>',
			'<tr><th scope="row">Magnitude</th>',
				'<td>', magnitude, '</td></tr>',
			'<tr><th scope="row">Percent <abbr title="Double Couple">DC</abbr></th>',
				'<td>', percentDC, '</td></tr>',
			'<tr><th scope="row">Depth</th>',
				'<td>', depth, '</td></tr>',
			'<tr><th scope="row">Author</th>',
				'<td>', author, '</td></tr>',
			'<tr><th scope="row">Catalog</th>',
				'<td>', catalog, '</td></tr>',
			'<tr><th scope="row">Contributor</th>',
				'<td>', contributor, '</td></tr>',
			'<tr><th scope="row">Code</th>',
				'<td>', code, '</td></tr>',
			'</tbody></table>'
		].join('');
	};

	/**
	 * Format tensor principal axes.
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {String} markup for principal axes content.
	 */
	MomentTensorPage.prototype._getAxes = function (tensor) {
		var scale = tensor.scale,
		    T,
		    N,
		    P;

		function formatAxis (axis) {
			var azimuth = axis.azimuth(),
			    plunge = axis.plunge(),
			    pi = Math.PI,
			    two_pi = 2 * pi,
			    r2d = 180 / pi;

			if (plunge < 0) {
				plunge *= -1;
				azimuth += pi;
			}
			if (azimuth < 0) {
				azimuth += two_pi;
			} else if (azimuth > two_pi) {
				azimuth -= two_pi;
			}

			return {
				value: (axis.value / scale).toFixed(3),
				azimuth: Math.round(azimuth * r2d),
				plunge: Math.round(plunge * r2d)
			};
		}

		T = formatAxis(tensor.T);
		N = formatAxis(tensor.N);
		P = formatAxis(tensor.P);

		return [
				'<h4>Principal Axes</h4>',
				'<table class="principal-axes-table tabular">',
				'<thead><tr>',
					'<th>Axis</th>',
					'<th>Value</th>',
					'<th>Plunge</th>',
					'<th>Azimuth</th>',
				'</thead>',
				'<tbody>',
					'<tr>',
						'<th scope="row">T</th>',
						'<td>', T.value, '</td>',
						'<td>', T.plunge, '&deg;</td>',
						'<td>', T.azimuth, '&deg;</td>',
					'</tr>',
					'<tr>',
						'<th scope="row">N</th>',
						'<td>', N.value, '</td>',
						'<td>', N.plunge, '&deg;</td>',
						'<td>', N.azimuth, '&deg;</td>',
					'</tr>',
					'<tr>',
						'<th scope="row">P</th>',
						'<td>', P.value, '</td>',
						'<td>', P.plunge, '&deg;</td>',
						'<td>', P.azimuth, '&deg;</td>',
					'</tr>',
				'</tbody>',
				'</table>'
		].join('');
	};

	/**
	 * Format tensor nodal planes.
	 *
	 * @param tensor {Tensor}
	 *        tensor to format.
	 * @return {String} markup for nodal planes content.
	 */
	MomentTensorPage.prototype._getPlanes = function (tensor) {
		var np1 = tensor.NP1,
		    np2 = tensor.NP2,
		    round = Math.round;

		return [
				'<h4>Nodal Planes</h4>',
				'<table class="nodal-plane-table tabular">',
				'<thead><tr>',
					'<th>Plane</th>',
					'<th>Strike</th>',
					'<th>Dip</th>',
					'<th>Rake</th>',
				'</thead>',
				'<tbody>',
					'<tr>',
					'<th scope="row"><abbr title="Nodal Plane 1">NP1</abbr></th>',
					'<td>', round(np1.strike), '&deg;</td>',
					'<td>', round(np1.dip), '&deg;</td>',
					'<td>', round(np1.rake), '&deg;</td>',
					'</tr>',
					'<tr>',
					'<th scope="row"><abbr title="Nodal Plane 2">NP2</abbr></th>',
					'<td>', round(np2.strike), '&deg;</td>',
					'<td>', round(np2.dip), '&deg;</td>',
					'<td>', round(np2.rake), '&deg;</td>',
					'</tr>',
				'</tbody>',
				'</table>'
		].join('');
	};


	// return constructor
	return MomentTensorPage;
});
