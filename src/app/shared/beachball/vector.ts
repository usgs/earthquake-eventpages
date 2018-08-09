'use strict';

// static methods that operate on arrays
let __add,
    __angle,
    __azimuth,
    __cross,
    __dot,
    __equals,
    __magnitude,
    __multiply,
    __plunge,
    __unit,
    __rotate,
    __subtract,
    __x,
    __y,
    __z;


/**
 * Add two vectors.
 *
 * @param v1 {Array<Number>}
 *        the first vector.
 * @param v2 {Array<Number>}
 *        the second vector.
 * @return {Array<Number>}
 *         result of addition.
 *
 * @throws {Error} when vectors are different lengths.
 */
__add = function (v1: Array<number>, v2: Array<number>): Array<number> {
  let i,
      v;
  if (v1.length !== v2.length) {
    throw new Error('vectors must be same length');
  }
  v = [];
  for (i = 0; i < v1.length; i++) {
    v.push(v1[i] + v2[i]);
  }
  return v;
};


/**
 * Compute the angle between two vectors.
 *
 * @param v1 {Array<Number>}
 *        the first vector.
 * @param v2 {Array<Number>}
 *        the second vector.
 *
 * @return {Number}
 *         angle between vectors in radians.
 */
__angle = function (v1: Array<number>, v2: Array<number>): number {
  return Math.acos(__dot(v1, v2) / (__magnitude(v1) * __magnitude(v2)));
};

/**
 * Compute the azimuth of a vector.
 *
 * @param v1 {Array<Number>}
 *        the first vector.
 * @param v2 {Array<Number>}
 *        the second vector.
 * @return {Number}
 *         angle between vectors in radians.
 */
__azimuth = function (v1: Array<number>): number {
  if (v1.length < 2) {
    throw new Error('azimuth requires at least 2 dimensions');
  }
  if (v1[0] === 0 && v1[1] === 0) {
    // if vector is zero, or vertical, azimuth is zero.
    return 0;
  }
  return (Math.PI / 2) - Math.atan2(v1[1], v1[0]);
};

/**
 * Compute vector cross product.
 *
 * Note: only computes cross product in 3 dimensions.
 *
 * @param v1 {Array<Number>}
 *        the first vector.
 * @param v2 {Array<Number>}
 *        the second vector.
 *
 * @return {Array<Number>}
 *         the 3 dimensional cross product.
 *         the resulting vector follows the right-hand rule: if the fingers on
 *         your right hand point to v1, and you close your hand to get to v2,
 *         the resulting vector points in the direction of your thumb.
 */
__cross = function (v1: Array<number>, v2: Array<number>): Array<number> {
  if (v1.length !== v2.length || v1.length < 3) {
    throw new Error('cross product requires at least 3 dimensions');
  }
  return [
    v1[1] * v2[2] - v2[1] * v1[2],
    v1[2] * v2[0] - v2[2] * v1[0],
    v1[0] * v2[1] - v2[0] * v1[1]
  ];
};

/**
 * Compute vector dot product.
 *
 * @param v1 {Array<Number}
 *        the first vector.
 * @param v2 {Array<Number>}
 *        the second vector.
 *
 * @return {Number}
 *         the dot product.
 */
__dot = function (v1: Array<number>, v2: Array<number>): number {
  let i,
      sum;
  sum = 0;
  for (i = 0; i < v1.length; i++) {
    sum += v1[i] * v2[i];
  }
  return sum;
};

/**
 * Check if two vectors are equal.
 *
 * @param v1 {Array<Number>}
 *        the first vector.
 * @param v2 {Array<Number>}
 *        the second vector.
 *
 * @return {Boolean}
 *         true if vectors are same length and all elements are equal.
 */
__equals = function (v1: Array<number>, v2: Array<number>): boolean {
  let i;
  if (v1.length !== v2.length) {
    return false;
  }
  for (i = 0; i < v1.length; i++) {
    if (v1[i] !== v2[i]) {
      return false;
    }
  }
  return true;
};

/**
 * Compute length of vector.
 *
 * @param v1 {Array<Number>}
 *        vector.
 *
 * @return {Number}
 *         magnitude of vector.
 */
__magnitude = function (v1: Array<number>): number {
  let i,
      sum;
  sum = 0;
  for (i = 0; i < v1.length; i++) {
    sum += v1[i] * v1[i];
  }
  return Math.sqrt(sum);
};

/**
 * Multiply vector by a constant.
 *
 * @param v1 {Array<Number>}
 *        vector to multiply.
 * @param n {Number}
 *        number to multiply by.
 *
 * @return {Array<Number}
 *         result of multiplication.
 */
__multiply = function (v1: Array<number>, n: number): Array<number> {
  let i,
      v;

  v = [];
  for (i = 0; i < v1.length; i++) {
    v.push(v1[i] * n);
  }
  return v;
};

/**
 * Compute angle from plane z=0 to vector.
 *
 * @param v {Array<Number>}
 *        the vector.
 *
 * @return {Number}
 *         angle from plane z=0 to vector.
 *         angle is positive when z > 0, negative when z < 0.
 */
__plunge = function (v: Array<number>): number {
  if (v.length < 3) {
    throw new Error('__azimuth: vector must have at least 3 dimensions');
  }
  return Math.asin(v[2] / __magnitude(v));
};

/**
 * Rotate a vector around an axis.
 *
 * From "6.2 The normalized matrix for rotation about an arbitrary line",
 *      http://inside.mines.edu/~gmurray/ArbitraryAxisRotation/
 *
 * @param v1 {Array<Number>}
 *        the "point" to rotate.
 * @param axis {Array<Number>}
 *        direction vector of rotation axis.
 * @param theta {Number}
 *        angle of rotation in radians.
 * @param origin {Array<Number>}
 *        default [0, 0, 0].
 *        origin of axis of rotation.
 */
__rotate = function (v1: Array<number>, axis: Array<number>, theta: number, origin: Array<number> = [0, 0, 0]): Array<number> {
  let a,
      au,
      av,
      aw,
      b,
      bu,
      bv,
      bw,
      c,
      cu,
      cv,
      cw,
      cosT,
      sinT,
      u,
      uu,
      ux,
      uy,
      uz,
      v,
      vv,
      vx,
      vy,
      vz,
      w,
      ww,
      wx,
      wy,
      wz,
      x,
      y,
      z;

  a = origin[0];
  b = origin[1];
  c = origin[2];
  u = axis[0];
  v = axis[1];
  w = axis[2];
  x = v1[0];
  y = v1[1];
  z = v1[2];

  cosT = Math.cos(theta);
  sinT = Math.sin(theta);
  au = a * u;
  av = a * v;
  aw = a * w;
  bu = b * u;
  bv = b * v;
  bw = b * w;
  cu = c * u;
  cv = c * v;
  cw = c * w;
  uu = u * u;
  ux = u * x;
  uy = u * y;
  uz = u * z;
  vv = v * v;
  vx = v * x;
  vy = v * y;
  vz = v * z;
  ww = w * w;
  wx = w * x;
  wy = w * y;
  wz = w * z;

  return [
    (a * (vv + ww) - u * (bv + cw - ux - vy - wz)) * (1 - cosT) +
        x * cosT + (-cv + bw - wy + vz) * sinT,
    (b * (uu + ww) - v * (au + cw - ux - vy - wz)) * (1 - cosT) +
        y * cosT + (cu - aw + wx - uz) * sinT,
    (c * (uu + vv) - w * (au + bv - ux - vy - wz)) * (1 - cosT) +
        z * cosT + (-bu + av - vx + uy) * sinT
  ];
};

/**
 * Subtract two vectors.
 *
 * @param v1 {Array<Number>}
 *        the first vector.
 * @param v2 {Array<Number>}
 *        the vector to subtract.
 *
 * @return {Array<Number>}
 *         result of subtraction.
 *
 * @throws {Error} when vectors are different lengths.
 */
__subtract = function (v1: Array<number>, v2: Array<number>): Array<number> {
  let i,
      v;

  if (v1.length !== v2.length) {
    throw new Error('__subtract: vectors must be same length');
  }
  v = [];
  for (i = 0; i < v1.length; i++) {
    v.push(v1[i] - v2[i]);
  }
  return v;
};

/**
 * Convert vector to length 1.
 *
 * Same as __multiply(v1, 1 / __magnitude(v1))
 *
 * @param v1 {Array<Number>}
 *        the vector.
 *
 * @throws {Error} if vector magnitude is 0.
 *
 * @return {Array<Number>}
 *         vector converted to length 1.
 */
__unit = function (v1: Array<number>): Array<number> {
  const mag = __magnitude(v1);
  if (mag === 0) {
    throw new Error('__unit: cannot convert zero vector to unit vector');
  }
  return __multiply(v1, 1 / mag);
};

/**
 * Get, and optionally set, the x component of a vector.
 *
 * @param v {Array<Number>}
 *        the vector.
 * @param value {Number}
 *        default undefined.
 *        when defined, set x component.
 *
 * @return {Number}
 *         the x component.
 */
__x = function (v: Array<number>, value?: number): number {
  if (typeof value === 'number') {
    v[0] = value;
  }
  return v[0];
};

/**
 * Get, and optionally set, the y component of a vector.
 *
 * @param v {Array<Number>}
 *        the vector.
 * @param value {Number}
 *        default undefined.
 *        when defined, set y component.
 *
 * @return {Number}
 *         the y component.
 */
__y = function (v: Array<number>, value: number): number {
  if (typeof value === 'number') {
    v[1] = value;
  }
  return v[1];
};

/**
 * Get, and optionally set, the z component of a vector.
 *
 * @param v {Array<Number>}
 *        the vector.
 * @param value {Number}
 *        default undefined.
 *        when defined, set z component.
 *
 * @return {Number}
 *         the z component.
 */
__z = function (v: Array<number>, value: number): number {
  if (typeof value === 'number') {
    v[2] = value;
  }
  return v[2];
};


/**
 * A vector object that wraps an array.
 *
 * This is a convenience object to call the static methods on the wrapped array.
 * Only the methods x(), y(), and z() modify data; other methods return new
 * Vector objects without modifying the existing object.
 *
 * @param data {Array<Number>}
 *        array to wrap.
 */
export class Vector {

  // static methods that act on arrays
  static add = __add;
  static angle = __angle;
  static azimuth = __azimuth;
  static cross = __cross;
  static dot = __dot;
  static magnitude = __magnitude;
  static multiply = __multiply;
  static plunge = __plunge;
  static rotate = __rotate;
  static subtract = __subtract;
  static unit = __unit;
  static x = __x;
  static y = __y;
  static z = __z;


  constructor(
    public data: Array<number>
  ) { }

  /**
   * Add two vectors.
   *
   * @param that {Vector|Array<Number>}
   *        vector to add.
   * @return {Vector}
   *         result of addition.
   */
  add (that: Vector|Array<number>): Vector {
    return new Vector(__add(this.data,
        (that instanceof Vector) ? that.data : that));
  }

  /**
   * Compute angle between vectors.
   *
   * @param that {Vector|Array<Number>}
   *        vector to compute angle between.
   * @return {Number} angle between vectors in radians.
   */
  angle (that: Vector|Array<number>): number {
    return __angle(this.data,
        (that instanceof Vector) ? that.data : that);
  }

  /**
   * Compute azimuth of this vector.
   *
   * @return {Number} azimuth of this vector in radians.
   */
  azimuth (): number {
    return __azimuth(this.data);
  }

  /**
   * Compute the cross product between vectors.
   *
   * @param that {Vector|Array<Number>}
   *        the vector to cross.
   *
   * @return {Vector} result of the cross product.
   */
  cross (that: Vector|Array<number>): Vector {
    return new Vector(__cross(
        this.data,
        (that instanceof Vector) ? that.data : that));
  }

  /**
   * Compute dot product between vectors.
   *
   * @param that {Vector|Array<Number>}
   *        vector to dot.
   *
   * @return {Number} result of dot product.
   */
  dot (that: Vector|Array<number>): number {
    return __dot(this.data,
        (that instanceof Vector) ? that.data : that);
  }

  /**
   * Check if two vectors are equal.
   *
   * @param that {Vector|Array<Number>}
   *        vector to compare.
   *
   * @return {Boolean} true if equal, false otherwise.
   */
  equals (that: Vector|Array<number>): boolean {
    return __equals(this.data,
        (that instanceof Vector) ? that.data : that);
  }

  /**
   * Compute length of this vector.
   *
   * @return {Number} length of vector.
   *         Square root of the sum of squares of all components.
   */
  magnitude (): number {
    return __magnitude(this.data);
  }

  /**
   * Multiply this vector by a number.
   *
   * @param n {Number}
   *        number to multiply.
   *
   * @return {Vector} result of multiplication.
   */
  multiply (n: number): Vector {
    return new Vector(__multiply(this.data, n));
  }

  /**
   * Compute plunge of this vector.
   *
   * Plunge is the angle between this vector and the plane z=0.
   *
   * @return {Number} plunge in radians.
   *         positive when z>0, negative when z<0.
   */
  plunge (): number {
    return __plunge(this.data);
  }

  /**
   * Rotate this vector around an arbitrary axis.
   *
   * @param axis {Vector|Array<Number>}
   *        direction of axis of rotation.
   * @param theta {Number}
   *        angle of rotation in radians.
   * @param origin {Vector|Array<Number>}
   *        origin of axis of rotation.
   *
   * @return {Vector} result of rotation.
   */
  rotate (axis: Vector|Array<number>, theta: number, origin: Vector|Array<number> = [0, 0, 0]): Vector {
    return new Vector(__rotate(this.data,
        (axis instanceof Vector) ? axis.data : axis,
        theta,
        (origin instanceof Vector) ? origin.data : origin));
  }

  /**
   * Subtract another vector.
   *
   * @param that {Vector|Array<Number>}
   *        vector to subtract.
   *
   * @return {Vector} result of subtraction.
   */
  subtract (that: Vector|Array<number>): Vector {
    return new Vector(__subtract(this.data,
        (that instanceof Vector) ? that.data : that));
  }

  /**
   * Convert vector to string.
   *
   * @return {String} wrapped array converted to string.
   */
  toString (): string {
    return '' + this.data;
  }

  /**
   * Convert this vector to length 1.
   *
   * @return {Vector} vector / |vector|.
   */
  unit (): Vector {
    return new Vector(__unit(this.data));
  }

  /**
   * Get or set x component.
   *
   * @param value {Number}
   *        when defined, set x component to value.
   *
   * @return {Number} x component value.
   */
  x (value?: number): number {
    return __x(this.data, value);
  }

  /**
   * Get or set y component.
   *
   * @param value {Number}
   *        when defined, set y component to value.
   *
   * @return {Number} y component value.
   */
  y (value?: number): number {
    return __y(this.data, value);
  }

  /**
   * Get or set z component.
   *
   * @param value {Number}
   *        when defined, set z component to value.
   *
   * @return {Number} z component value.
   */
  z (value?: number): number {
    return __z(this.data, value);
  }

}
