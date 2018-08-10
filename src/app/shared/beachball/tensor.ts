'use strict';

import { Matrix } from './matrix';
import { Vector } from './vector';


const _BEACHBALL_METHODS = {
  'smi:ci.anss.org/momentTensor/TMTS': 'TMTS',
  'smi:nc.anss.org/momentTensor/TMTS': 'TMTS',
  'smi:nc.anss.org/momentTensor/TMTS-ISO': 'TMTS-ISO',
  'smi:uu.anss.org/momentTensor/TDMT': 'TDMT'
};
const _D2R = Math.PI / 180;
const _R2D = 180 / Math.PI;


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
export class Tensor {

  public mtt: number;
  public mpp: number;
  public mrr: number;
  public mrt: number;
  public mrp: number;
  public mtp: number;
  public units = 'N-m';

  public moment: number;
  public momentLog10: number;
  public exponent: number;
  public scale: number;
  public magnitude: number;

  public matrix: Matrix;
  public T: any;
  public N: any;
  public P: any;
  public fCLVD: number;
  public percentDC: number;
  public forceThrust: number;
  public forceStrikeSlip: number;
  public forceNormal: number;

  public NP1: any;
  public NP2: any;

  // reference to product, and optional attributes from product
  public product: any = null;
  public depth: any;
  public type: any;
  public halfDuration: any;

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
  static calculatePlane (v1: Vector, v2: Vector): any {
    v1 = v1.unit();
    v2 = v2.unit();
    // make sure first vector dips downward
    if (v1.z() > 0) {
      v1 = v1.multiply(-1);
      v2 = v2.multiply(-1);
    }
    return {
      strike: Tensor.range(Math.atan2(-v1.x(), v1.y()), 0, 2 * Math.PI) * _R2D,
      dip: Math.acos(-v1.z()) * _R2D,
      rake: Math.atan2(-v2.z(), v2.cross(v1).z()) * _R2D
    };
  }

  /**
   * Create a Tensor object from a Product object.
   *
   * @param product {Product}
   *     a focal-mechanism or moment-tensor product.
   */
  static fromProduct (product: any): Tensor {
    let depth,
        duration,
        props,
        type,
        tensor;

    if (!product) {
      return null;
    }

    tensor = null;
    type = product.type;
    props = product.properties || {};

    if (type === 'focal-mechanism') {
      tensor = Tensor.fromStrikeDipRake(
          Number(props['nodal-plane-1-strike']),
          Number(props['nodal-plane-1-dip']),
          Number(props['nodal-plane-1-rake'] || props['nodal-plane-1-slip'] || 0),
          Number(props['scalar-moment'] || Math.SQRT2));
    } else if (type === 'moment-tensor') {
      tensor = new Tensor({
        mrr: Number(props['tensor-mrr']),
        mtt: Number(props['tensor-mtt']),
        mpp: Number(props['tensor-mpp']),
        mrt: Number(props['tensor-mrt']),
        mrp: Number(props['tensor-mrp']),
        mtp: Number(props['tensor-mtp'])
      });

      depth = props['derived-depth'];
      if (!depth)  {
        depth = props['depth'];
      }
      tensor.depth = depth;

      duration = props['sourcetime-duration'];
      if (duration) {
        tensor.halfDuration = duration / 2;
      }
    }

    if (tensor) {
      tensor.product = product;

      type = props['derived-magnitude-type'];
      if (!type) {
        type = props['beachball-type'];
        if (type && _BEACHBALL_METHODS.hasOwnProperty(type)) {
          type = _BEACHBALL_METHODS[type];
        }
      }

      if (type) {
        tensor.type = type;
      }
    }

    return tensor;
  }

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
   *
   * @return Tensor object.
   */
  static fromStrikeDipRake (strike: number, dip: number, rake: number, moment: number): Tensor {
    let c2d,
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
    s2s = Math.sin(2 * s);
    c2s = Math.cos(2 * s);
    d = dip * _D2R;
    sd = Math.sin(d);
    cd = Math.cos(d);
    s2d = Math.sin(2 * d);
    c2d = Math.cos(2 * d);
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

    return new Tensor({
      mrr:  mzz * moment,
      mtt:  mxx * moment,
      mpp:  myy * moment,
      mtp: -mxy * moment,
      mrp: -myz * moment,
      mrt:  mxz * moment
    });
  }


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
   *
   * @return {Number} value in the range [min, max).
   */
  static range (value: number, min: number, max: number): number {
    const span = max - min;
    while (value < min) {
      value += span;
    }
    while (value >= max) {
      value -= span;
    }
    return value;
  }

  /**
   * Sort eigen vectors in descending order by magnitude.
   *
   * @param v1 {any}
   *     first eigenvector.
   * @param v2 {any}
   *     second eigenvector.
   */
  static sortEigenvalues (v1: any, v2: any): number {
    let v1mag,
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
  }


  constructor(
    options: any
  ) {
    let eigen,
          exponent,
          l,
          moment,
          momentLog10,
          mpp,
          mrr,
          mrt,
          mrp,
          mtp,
          mtt,
          n,
          p,
          t;

    this.mtt = mtt = options.mtt || options.mxx || 0;
    this.mpp = mpp = options.mpp || options.myy || 0;
    this.mrr = mrr = options.mrr || options.mzz || 0;
    this.mrt = mrt = options.mrt || options.mxz || 0;
    this.mrp = mrp = options.mrp || -options.myz || 0;
    this.mtp = mtp = options.mtp || -options.mxy || 0;
    this.units = 'N-m';

    // calculate moment and derived values
    this.moment = moment = Math.sqrt(0.5 *
        ( (mrr * mrr + mtt * mtt + mpp * mpp) +
        2 * (mrt * mrt + mrp * mrp + mtp * mtp) ));
    this.momentLog10 = momentLog10 = Math.log(moment) / Math.LN10;
    this.exponent = exponent = parseInt(momentLog10, 10);
    this.scale = Math.pow(10, exponent);
    this.magnitude = (2 / 3) * (momentLog10 - 9.1);

    // calculate principal axes
    this.matrix = new Matrix([
      mtt, -mtp, mrt,
      -mtp, mpp, -mrp,
      mrt, -mrp, mrr
    ], 3, 3);
    eigen = this.matrix.jacobi();
    eigen.sort(Tensor.sortEigenvalues);
    this.T = t = eigen[0];
    this.N = n = eigen[1];
    this.P = p = eigen[2];
    this.fCLVD = n.eigenvalue /
        Math.max(Math.abs(t.eigenvalue), Math.abs(p.eigenvalue));
    this.percentDC = Math.abs(1 - Math.abs(this.fCLVD) / 0.5);
    this.forceThrust = Math.pow(Math.sin(t.vector.plunge()), 2);
    this.forceStrikeSlip = Math.pow(Math.sin(n.vector.plunge()), 2);
    this.forceNormal = Math.pow(Math.sin(p.vector.plunge()), 2);

    // calculate nodal planes
    // p = (n - l) / sqrt2
    // t = (n + l) / sqrt2
    l = t.vector.subtract(p.vector).unit();
    n = t.vector.add(p.vector).unit();
    this.NP1 = Tensor.calculatePlane(l, n);
    this.NP2 = Tensor.calculatePlane(n, l);

    // label axes and planes
    this.T.name = 'T';
    this.N.name = 'N';
    this.P.name = 'P';
    this.NP1.name = 'NP1';
    this.NP2.name = 'NP2';
  }

}
