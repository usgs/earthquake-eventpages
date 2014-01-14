/* global define */
define([
	'./Matrix',
	'./Vector3'
], function (
	Matrix,
	Vector3
) {
	'use strict';

	var R2D = 180 / Math.PI,
	    D2R = Math.PI / 180,
	    BEACHBALL_TYPES;


	// mapping from quakeml method id to type
	BEACHBALL_TYPES = {
		'smi:nc.anss.org/momentTensor/TMTS': 'TMTS'
	};


	/**
	 * Shift a number until it is in the specified range.
	 *
	 * Add or subtract the range size (max - min) until value is between.
	 *
	 * @param value {Number}
	 *        value to normalize.
	 * @param min {Number}
	 *        range minimum.
	 * @param max {Number}
	 *        range maximum.
	 * @return {Number} value in the range [min, max).
	 */
	var _range = function (value, min, max) {
		var span = max - min;
		while (value < min) {
			value += span;
		}
		while (value >= max) {
			value -= span;
		}
		return value;
	};


	/**
	 * Construct a new tensor.
	 *
	 * @param mtt {Number}
	 *        mtt value in N-m.
	 * @param mpp {Number}
	 *        mpp value in N-m.
	 * @param mrr {Number}
	 *        mrr value in N-m.
	 * @param mrt {Number}
	 *        mrt value in N-m.
	 * @param mrp {Number}
	 *        mrp value in N-m.
	 * @param mtp {Number}
	 *        mtp value in N-m.
	 */
	var Tensor = function (options) {
		options = options || {};

		this.mtt = options.mtt || options.mxx || 0;
		this.mpp = options.mpp || options.myy || 0;
		this.mrr = options.mrr || options.mzz || 0;
		this.mrt = options.mrt || options.mxz || 0;
		this.mrp = options.mrp || -options.myz || 0;
		this.mtp = options.mtp || -options.mxy || 0;
		this.units = 'N-m';

		this._calculateMoment();
		this._calculateAxes();
		this._calculatePlanes();
	};


	/**
	 * Calculate Moment and derived values.
	 *
	 * Sets moment, moment_log10, exponent, scale, and magnitude properties.
	 */
	Tensor.prototype._calculateMoment = function () {
		var mrr = this.mrr,
		    mtt = this.mtt,
		    mpp = this.mpp,
		    mrt = this.mrt,
		    mrp = this.mrp,
		    mtp = this.mtp,
		    moment,
		    moment_log10,
		    exponent;

		this.moment = moment = Math.sqrt(0.5 *
			( (mrr * mrr + mtt * mtt + mpp * mpp) +
				2 * (mrt * mrt + mrp * mrp + mtp * mtp) ));
		this.moment_log10 = moment_log10 = Math.log(moment) / Math.LN10;
		this.exponent = exponent = parseInt(moment_log10, 10);
		this.scale = Math.pow(10, exponent);
		this.magnitude = (2/3) * (moment_log10 - 9.1);
	};

	/**
	 * Calculate principal axes.
	 *
	 * Sets matrix, T, N, P, fCLVD, percentDC, forceThrust, forceStrikeSlip,
	 *      forceNormal properties.
	 */
	Tensor.prototype._calculateAxes = function () {
		var abs = Math.abs,
		    pow = Math.pow,
		    sin = Math.sin,
		    matrix,
		    eigen,
		    N,
		    T,
		    P;

		this.matrix = matrix = new Matrix([
			 this.mtt, -this.mtp,  this.mrt,
			-this.mtp,  this.mpp, -this.mrp,
			 this.mrt, -this.mrp,  this.mrr
		], 3, 3);

		eigen = matrix.jacobi();
		eigen.sort(function (a, b) {
			// largest value first
			return b.value - a.value;
		});

		T = new Vector3(eigen[0].vector);
		T.value = eigen[0].value;
		N = new Vector3(eigen[1].vector);
		N.value = eigen[1].value;
		P = new Vector3(eigen[2].vector);
		P.value = eigen[2].value;

		this.T = T;
		this.N = N;
		this.P = P;
		this.fCLVD = N.value / T.value;
		this.percentDC = abs(1 - (abs(this.fCLVD) / 0.5));
		this.forceThrust = pow(sin(T.plunge()), 2);
		this.forceStrikeSlip = pow(sin(N.plunge()), 2);
		this.forceNormal = pow(sin(P.plunge()), 2);
	};


	/**
	 * Calculate nodal planes
	 *
	 * Sets NP1 and NP2 properties.
	 */
	Tensor.prototype._calculatePlanes = function () {
		var T = this.T,
		    P = this.P,
		    // p = (n - l) / sqrt2
		    // t = (n + l) / sqrt2
		    l = T.subtract(P).unit(),
		    n = T.add(P).unit();

		/**
		 * Calculate one nodal plane.
		 *
		 * Argument order matters, so getPlane(v1, v2) and getPlane(v2, v1)
		 * are different planes.
		 *
		 * @param  {[type]} v1 [description]
		 * @param  {[type]} v2 [description]
		 * @return {[type]}    [description]
		 */
		function getPlane (v1, v2) {
			v1 = v1.unit();
			v2 = v2.unit();
			// make sure first vector dips downward
			if (v1.z() > 0) {
				v1 = v1.multiply(-1);
				v2 = v2.multiply(-1);
			}
			return {
				strike: _range(Math.atan2(-v1.x(), v1.y()), 0, 2 * Math.PI) * R2D,
				dip: Math.acos(-v1.z()) * R2D,
				rake: Math.atan2(-v2.z(), v2.cross(v1).z()) * R2D
			};
		}

		this.NP1 = getPlane(l, n);
		this.NP2 = getPlane(n, l);
	};


	/**
	 * Create a Tensor from strike, dip, and rake of one nodal plane.
	 *
	 * @param strike {Number}
	 *        strike of nodal plane in degrees.
	 * @param dip {Number}
	 *        dip of nodal plane in degrees.
	 * @param rake {Number}
	 *        rake of nodal plane in degrees.
	 * @param moment {Number}
	 *        optional, scale resulting matrix by this number.
	 *        default is sqrt(2).
	 * @return Tensor object.
	 */
	Tensor.fromStrikeDipRake = function(strike, dip, rake, moment) {
		var sin = Math.sin,
		    cos = Math.cos,
		    s = strike * D2R,
		    ss = sin(s),
		    cs = cos(s),
		    s2s = sin(2*s),
		    c2s = cos(2*s),
		    d = dip * D2R,
		    sd = sin(d),
		    cd = cos(d),
		    s2d = sin(2*d),
		    c2d = cos(2*d),
		    r = (rake % 90 !== 0 ? rake : rake + 1e-15) * D2R,
		    sr = sin(r),
		    cr = cos(r),
		    mxx,
		    mxy,
		    mxz,
		    myy,
		    myz,
		    mzz;

		moment = moment || Math.SQRT2;

		// mtt
		mxx = -1 * (sd * cr * s2s + s2d * sr * ss * ss);
		// -mtp
		mxy =      (sd * cr * c2s + s2d * sr * s2s * 0.5);
		// mrt
		mxz = -1 * (cd * cr * cs  + c2d * sr * ss);
		// mpp
		myy =      (sd * cr * s2s - s2d * sr * cs * cs);
		// -mrp
		myz = -1 * (cd * cr * ss  - c2d * sr * cs);
		// mrr
		mzz =      (s2d * sr);

		return new Tensor({
			mrr:  mzz * moment,
			mtt:  mxx * moment,
			mpp:  myy * moment,
			mtp: -mxy * moment,
			mrp: -myz * moment,
			mrt:  mxz * moment
		});
	};


	Tensor.fromProduct = function (product) {
		var props = product.properties,
		    status = product.status || '',
		    title,
		    source,
		    type,
		    strike,
		    dip,
		    rake,
		    moment,
		    tensor;

		if (status.toUpperCase() === 'DELETE') {
			// deleted
			return null;
		}

		source = (props['beachball-source'] || product.source).toLowerCase();
		title = source.toUpperCase();
		type = props['beachball-type'] || props['derived-magnitude-type'] || null;

		if (type !== null) {
			if (type in BEACHBALL_TYPES) {
				type = BEACHBALL_TYPES[type];
			}
			title += ' ' + type;
		} else {
			title += ' <small>' + product.code + '</small>';
		}

		if (product.type === 'focal-mechanism') {
			strike = props['nodal-plane-1-strike'];
			dip = props['nodal-plane-1-dip'];
			rake = props['nodal-plane-1-rake'] || props['nodal-plane-1-slip'] || 0;
			moment = props['scalar-moment'] || Math.SQRT2;

			tensor = Tensor.fromStrikeDipRake(+strike, +dip, +rake, +moment);
			tensor.isMechanism = true;
		} else if (product.type === 'moment-tensor') {
			tensor = new Tensor({
				mrr: +props['tensor-mrr'],
				mtt: +props['tensor-mtt'],
				mpp: +props['tensor-mpp'],
				mrt: +props['tensor-mrt'],
				mrp: +props['tensor-mrp'],
				mtp: +props['tensor-mtp']
			});
			tensor.depth = +props['derived-depth'] || +props.depth || null;
			tensor.isMechanism = false;
		} else {
			throw new Error('Expected "focal-mechanism" or "moment-tensor"' +
					', got ' + product.type);
		}

		tensor.product = product;
		tensor.title = title;
		tensor.type = type;
		tensor.source = source;

		return tensor;
	};


	// return constructor
	return Tensor;
});
