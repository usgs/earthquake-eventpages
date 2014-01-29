/* global define */
define([
	'util/Util',
	'base/EventModulePage',
	'base/TabbedModulePage',
	'base/Formatter',
	'./tensor/Tensor',
	'./tensor/BeachBall'
], function (
	Util,
	EventModulePage,
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
		tabList: {
			tabPosition: 'top'
		},
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
		this._source = options.source;
		this._type = options.type;
		TabbedModulePage.call(this, options);
	};

	// extend TabbedModulePage
	MomentTensorPage.prototype = Object.create(TabbedModulePage.prototype);



	MomentTensorPage.prototype._setContentMarkup = function () {
		var products = this.getProducts(),
		    tensor,
		    contentEl,
		    className,
		    content,
		    _this = this
		    ;

		for (var i = 0; i < products.length; i++) {
			tensor = products[i];

			if (tensor.source === this._source && tensor.type === this._type) {
				content = this.getDetail(tensor);
			}
		}

		contentEl = this.getContent();
		className = this._options.className;
		if (className) {
			contentEl.classList.add(className);
		}
		// add content
		if (typeof content === 'string') {
			contentEl.innerHTML = content;
		} else {
			contentEl.appendChild(content);
		}


		Util.addEvent(this.getContent().querySelector('.toggle-button'), 'click', ( function () {
			var callback = function callback () {
				_this._toggleInfo();
			};
			return callback;
		})(this));
	};

	MomentTensorPage.prototype.getEmptyContent = function () {
		return 'No ' + this._options.productType + ' products for this event';
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
					this._getPlanes(tensor),
					this._getAxes(tensor),
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
				TabbedModulePage.prototype.getDetail(tensor.product));

		return el;
	};


	MomentTensorPage.prototype._toggleInfo = function () {
		var button = this.getContent().querySelector('.toggle-button'),
		    rows = this.getContent().querySelectorAll('.toggle'),
		    row;

		for (var i = 0; i < rows.length; i++) {
			row = rows[i];
			if (Util.hasClass(row, 'hidden')) {
				Util.removeClass(row, 'hidden');
			} else  {
				Util.addClass(row, 'hidden');
			}
		}

		if (Util.hasClass(button, 'on')) {
			Util.removeClass(button, 'on');
			Util.addClass(button, 'off');
		} else  {
			Util.removeClass(button, 'off');
			Util.addClass(button, 'on');
		}
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
		var formatter = this._options.formatter,
		    moment = tensor.moment,
		    magnitude = tensor.magnitude,
		    percentDC = tensor.percentDC,
		    depth = tensor.depth,
		    author = tensor.source,
		    catalog = tensor.product.properties.eventsource,
		    contributor = tensor.product.source,
		    code = tensor.product.code,
		    half_duration = tensor.product.properties.duration/2 || '--';

		moment = (moment / tensor.scale).toFixed(3) +
				'e+' + tensor.exponent + ' ' + tensor.units;
		magnitude = magnitude.toFixed(2);
		percentDC = Math.round(percentDC * 100) + '%';
		depth = formatter.depth(depth, 'km');

		return [
			'<table class="info-table tabular"><tbody>',
			'<tr><th scope="row">Moment</th>',
				'<td>', moment, '</td></tr>',
			'<tr><th scope="row">Magnitude</th>',
				'<td>', magnitude, '</td></tr>',
			'<tr><th scope="row">Depth</th>',
				'<td>', depth, '</td></tr>',
			'<tr><th scope="row">Percent <abbr title="Double Couple">DC</abbr></th>',
				'<td>', percentDC, '</td></tr>',
			'<tr><th scope="row">Half Duration</th>',
				'<td>', half_duration, '</td></tr>',
			'<tr><th scope="row">Author</th>',
				'<td>', author, '<span class="toggle-button off"></span></td></tr>',
			'<tr class="toggle hidden"><th scope="row">Catalog</th>',
				'<td>', catalog, '</td></tr>',
			'<tr class="toggle hidden"><th scope="row">Contributor</th>',
				'<td>', contributor, '</td></tr>',
			'<tr class="toggle hidden"><th scope="row">Code</th>',
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
