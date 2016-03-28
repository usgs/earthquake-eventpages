'use strict';

var Matrix = require('math/Matrix');


var _BEACHBALL_METHODS,
    _D2R,
    _R2D,
    __calculatePlane,
    __fromProduct,
    __fromStrikeDipRake,
    __range,
    __sortEigenvalues,
    Tensor;


_BEACHBALL_METHODS = {
  'smi:ci.anss.org/momentTensor/TMTS': 'TMTS',
  'smi:nc.anss.org/momentTensor/TMTS': 'TMTS',
  'smi:nc.anss.org/momentTensor/TMTS-ISO': 'TMTS-ISO',
  'smi:uu.anss.org/momentTensor/TDMT': 'TDMT'
};

_D2R = Math.PI / 180;
_R2D = 180 / Math.PI;

/**
 * Calculate one nodal plane.
 *
 * Argument order matters, so getPlane(v1, v2) and getPlane(v2, v1)
 * are different planes.
 *
 * @param v1 {Vector}
 *     first vector.
 * @param v2 {Vector}
 *     second vector.
 * @return {Object}
 *     computed plane, defined as the properties strike, dip, and rake.
 */
__calculatePlane = function (v1, v2) {
  v1 = v1.unit();
  v2 = v2.unit();
  // make sure first vector dips downward
  if (v1.z() > 0) {
    v1 = v1.multiply(-1);
    v2 = v2.multiply(-1);
  }
  return {
    strike: __range(Math.atan2(-v1.x(), v1.y()), 0, 2 * Math.PI) * _R2D,
    dip: Math.acos(-v1.z()) * _R2D,
    rake: Math.atan2(-v2.z(), v2.cross(v1).z()) * _R2D
  };
};

/**
 * Create a Tensor object from a Product object.
 *
 * @param product {Product}
 *     a focal-mechanism or moment-tensor product.
 */
__fromProduct = function (product) {
  var depth,
      props,
      type,
      tensor;

  tensor = null;
  type = product.get('type');
  props = product.get('properties') || {};

  if (type === 'focal-mechanism') {
    tensor = __fromStrikeDipRake(
        Number(props['nodal-plane-1-strike']),
        Number(props['nodal-plane-1-dip']),
        Number(props['nodal-plane-1-rake'] || props['nodal-plane-1-slip'] || 0),
        Number(props['scalar-moment'] || Math.SQRT2));
  } else if (type === 'moment-tensor') {
    tensor = Tensor({
      mrr: Number(props['tensor-mrr']),
      mtt: Number(props['tensor-mtt']),
      mpp: Number(props['tensor-mpp']),
      mrt: Number(props['tensor-mrt']),
      mrp: Number(props['tensor-mrp']),
      mtp: Number(props['tensor-mtp'])
    });

    depth = product.getProperty('derived-depth');
    if (depth === null)  {
      depth = product.getProperty('depth');
    }

    tensor.depth = depth;
  }

  if (tensor) {
    type = product.getProperty('derived-magnitude-type');
    if (!type) {
      type = product.getProperty('beachball-type');
      if (type && _BEACHBALL_METHODS.hasOwnProperty(type)) {
        type = _BEACHBALL_METHODS[type];
      }
    }

    if (type) {
      tensor.type = type;
    }
  }

  return tensor;
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
 *        scale resulting matrix by this number.
 * @return Tensor object.
 */
__fromStrikeDipRake = function(strike, dip, rake, moment) {
  var c2d,
      c2s,
      cd,
      cr,
      cs,
      d,
      mxx,
      mxy,
      mxz,
      myy,
      myz,
      mzz,
      r,
      s,
      s2d,
      s2s,
      sd,
      sr,
      ss;

  s = strike * _D2R;
  ss = Math.sin(s);
  cs = Math.cos(s);
  s2s = Math.sin(2*s);
  c2s = Math.cos(2*s);
  d = dip * _D2R;
  sd = Math.sin(d);
  cd = Math.cos(d);
  s2d = Math.sin(2*d);
  c2d = Math.cos(2*d);
  r = (rake % 90 !== 0 ? rake : rake + 1e-15) * _D2R;
  sr = Math.sin(r);
  cr = Math.cos(r);

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

  return Tensor({
    mrr:  mzz * moment,
    mtt:  mxx * moment,
    mpp:  myy * moment,
    mtp: -mxy * moment,
    mrp: -myz * moment,
    mrt:  mxz * moment
  });
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
__range = function (value, min, max) {
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
 * Sort eigen vectors in descending order by magnitude.
 *
 * @param v1 {Vector}
 *     first vector.
 * @param v2 {Vector}
 *     second vector.
 */
__sortEigenvalues = function (v1, v2) {
  var v1mag,
      v2mag;
  // largest value first
  v1mag = v1.eigenvalue;
  v2mag = v2.eigenvalue;
  if (v1mag < v2mag) {
    return 1;
  } else if (v1mag > v2mag) {
    return -1;
  } else {
    return 0;
  }
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
 Tensor = function (options) {
  var _this,
      _initialize;

  _this = {};

  _initialize = function (options) {
    var eigen,
        exponent,
        l,
        moment,
        moment_log10,
        mpp,
        mrr,
        mrt,
        mrp,
        mtp,
        mtt,
        n,
        p,
        t;

    _this.mtt = mtt = options.mtt || options.mxx || 0;
    _this.mpp = mpp = options.mpp || options.myy || 0;
    _this.mrr = mrr = options.mrr || options.mzz || 0;
    _this.mrt = mrt = options.mrt || options.mxz || 0;
    _this.mrp = mrp = options.mrp || -options.myz || 0;
    _this.mtp = mtp = options.mtp || -options.mxy || 0;
    _this.units = 'N-m';

    // calculate moment and derived values
    _this.moment = moment = Math.sqrt(0.5 *
        ( (mrr * mrr + mtt * mtt + mpp * mpp) +
        2 * (mrt * mrt + mrp * mrp + mtp * mtp) ));
    _this.moment_log10 = moment_log10 = Math.log(moment) / Math.LN10;
    _this.exponent = exponent = parseInt(moment_log10, 10);
    _this.scale = Math.pow(10, exponent);
    _this.magnitude = (2/3) * (moment_log10 - 9.1);

    // calculate principal axes
    _this.matrix = Matrix([
      mtt, -mtp, mrt,
      -mtp, mpp, -mrp,
      mrt, -mrp, mrr
    ], 3, 3);
    eigen = _this.matrix.jacobi();
    eigen.sort(__sortEigenvalues);
    _this.T = t = eigen[0];
    _this.N = n = eigen[1];
    _this.P = p = eigen[2];
    _this.fCLVD = n.eigenvalue /
        Math.max(Math.abs(t.eigenvalue), Math.abs(p.eigenvalue));
    _this.percentDC = Math.abs(1 - Math.abs(_this.fCLVD) / 0.5);
    _this.forceThrust = Math.pow(Math.sin(t.plunge()), 2);
    _this.forceStrikeSlip = Math.pow(Math.sin(n.plunge()), 2);
    _this.forceNormal = Math.pow(Math.sin(p.plunge()), 2);

    // calculate nodal planes
    // p = (n - l) / sqrt2
    // t = (n + l) / sqrt2
    l = t.subtract(p).unit();
    n = t.add(p).unit();
    _this.NP1 = __calculatePlane(l, n);
    _this.NP2 = __calculatePlane(n, l);
  };


  _initialize(options);
  options = null;
  return _this;
};


// add static methods
Tensor.calculatePlane = __calculatePlane;
Tensor.fromProduct = __fromProduct;
Tensor.fromStrikeDipRake = __fromStrikeDipRake;


module.exports = Tensor;
