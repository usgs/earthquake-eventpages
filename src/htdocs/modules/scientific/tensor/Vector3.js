'use strict';


/**
 * Construct a new Vector3.
 *
 * @param data {Array<Number>}
 *        An array with 3 elements: [x, y, z].
 */
var Vector3 = function (data) {
  this._data = data;
};


/**
 * Get the x element.
 *
 * @return {Number} the x element.
 */
Vector3.prototype.x = function () {
  return this._data[0];
};

/**
 * Get the y element.
 *
 * @return {Number} the y element.
 */
Vector3.prototype.y = function () {
  return this._data[1];
};

/**
 * Get the z element.
 *
 * @return {Number} the z element.
 */
Vector3.prototype.z = function () {
  return this._data[2];
};

/**
 * Compute the length of this vector.
 *
 * @return {Number} the length of this vector.
 */
Vector3.prototype.length = function () {
  var data = this._data,
      x = data[0],
      y = data[1],
      z = data[2];
  return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Add a vector.
 *
 * @param that {Vector3}
 *        vector to add
 * @return {Vector3} result of addition, original vector is unchanged.
 */
Vector3.prototype.add = function (that) {
  var data = this._data,
      thatData = that._data;
  return new Vector3([
      data[0] + thatData[0],
      data[1] + thatData[1],
      data[2] + thatData[2]]);
};

/**
 * Subtract a vector.
 *
 * @param that {Vector3}
 *        vector to subtract
 * @return {Vector3} result of subtraction, original vector is unchanged.
 */
Vector3.prototype.subtract = function (that) {
  var data = this._data,
      thatData = that._data;
  return new Vector3([
      data[0] - thatData[0],
      data[1] - thatData[1],
      data[2] - thatData[2]]);
};

/**
 * Mulitply this vector by a scalar.
 *
 * @param n {Number}
 *        scalar to multiply.
 * @return {Vector3} scaled vector, original vector is unchanged.
 */
Vector3.prototype.multiply = function (n) {
  var data = this._data;
  return new Vector3([n * data[0], n * data[1], n * data[2]]);
};

/**
 * Convert vector to a unit vector.
 *
 * @return {Vector3} unit vector, original vector is unchanged.
 */
Vector3.prototype.unit = function () {
  var mag = this.length();
  if (mag === 0) {
    throw new Error('Cannot convert zero vector to unit vector');
  } else if (mag === 1) {
    // already a unit vector
    return this;
  }
  return this.multiply(1 / mag);
};

/**
 * Dot this vector with another vector.
 *
 * @param that {Vector3}
 *        the vector to dot.
 * @return {Number} the dot product.
 */
Vector3.prototype.dot = function (that) {
  var data = this._data,
      thatData = that._data;

  return data[0] * thatData[0] +
      data[1] * thatData[1] +
      data[2] * thatData[2];
};

/**
 * Cross this vector with another vector.
 *
 * @param that {Vector3}
 *        the vector to cross.
 * @return {Vector3} the cross product, original vectors are unchanged.
 */
Vector3.prototype.cross = function (that) {
  var data = this._data,
      x = data[0],
      y = data[1],
      z = data[2],
      thatData = that._data,
      thatX = thatData[0],
      thatY = thatData[1],
      thatZ = thatData[2];
  return new Vector3([
    y * thatZ - thatY * z,
    x * thatZ - thatX * z,
    x * thatY - thatX * y
  ]);
};

/**
 * Compute angle between vectors.
 *
 * @param that {Vector3}
 *        other vector.
 * @return {Number} angle between vectors in radians.
 */
Vector3.prototype.angle = function (that) {
  return Math.acos(this.dot(that) / (this.length() * that.length()));
};

/**
 * Rotate this vector around an axis.
 *
 * From "6.2 The normalized matrix for rotation about an arbitrary line",
 *      http://inside.mines.edu/~gmurray/ArbitraryAxisRotation/
 *
 * @param theta {Number}
 *        angle of rotation in radians.
 * @param that {Vector3}
 *        axis of rotation.
 * @param origin {Vector3}
 *        origin of axis of rotation.
 *        Optional, default [0,0,0].
 * @return resulting vector, original vectors are unchanged.
 */
Vector3.prototype.rotate = function (that, theta, origin) {
  var _origin = (origin ? origin._data : [0,0,0]),
      a = _origin[0],
      b = _origin[1],
      c = _origin[2],
      thatData = that._data,
      u = thatData[0],
      v = thatData[1],
      w = thatData[2],
      data = this._data,
      x = data[0],
      y = data[1],
      z = data[2],
      cosT = Math.cos(theta),
      sinT = Math.sin(theta),
      au = a * u,
      av = a * v,
      aw = a * w,
      bu = b * u,
      bv = b * v,
      bw = b * w,
      cu = c * u,
      cv = c * v,
      cw = c * w,
      uu = u * u,
      ux = u * x,
      uy = u * y,
      uz = u * z,
      vv = v * v,
      vx = v * x,
      vy = v * y,
      vz = v * z,
      ww = w * w,
      wx = w * x,
      wy = w * y,
      wz = w * z;

  return new Vector3([
    (a * (vv + ww) - u * (bv + cw - ux - vy - wz)) * (1 - cosT) +
        x * cosT + (-cv + bw - wy + vz) * sinT,
    (b * (uu + ww) - v * (au + cw - ux - vy - wz)) * (1 - cosT) +
        y * cosT + (cu - aw + wx - uz) * sinT,
    (c * (uu + vv) - w * (au + bv - ux - vy - wz)) * (1 - cosT) +
        z * cosT + (-bu + av - vx + uy) * sinT
  ]);
};

/**
 * Get the azimuth.
 *
 * @return {Number} the azimuth in radians.
 */
Vector3.prototype.azimuth = function () {
  var data = this._data,
      x = data[0],
      y = data[1];
  return Math.atan2(y, x);
};

/**
 * Get the plunge.
 *
 * @return {Number} the plunge.
 *         Positive values = the vector is below the plane z=0.
 *         Zero = the vector is on the plane z=0.
 *         Negative values = the vector is above the plane z=0.
 */
Vector3.prototype.plunge = function () {
  var z = this._data[2],
      length = this.length();
  return Math.asin(z / length);
};


module.exports = Vector3;
