'use strict';

import { Vector } from './vector';

// static methods that operate on arrays
let _col,
  _diagonal,
  _get,
  _identity,
  _index,
  _jacobi,
  _multiply,
  _row,
  _set,
  _stringify,
  _transpose;

/**
 * Extract a column from this matrix.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 * @param col {Number}
 *        index of column, in range [0,n)
 * @throws Error if column out of range.
 * @return {Array<Number>} column elements.
 */
_col = function(
  data: Array<number>,
  m: number,
  n: number,
  col: number
): Array<number> {
  let row, values;
  if (col < 0 || col >= n) {
    throw new Error('column ' + col + ' out of range [0,' + n + ')');
  }
  if (n === 1) {
    // only one column in matrix
    return data;
  }
  values = [];
  for (row = 0; row < m; row++) {
    values.push(data[_index(m, n, row, col)]);
  }
  return values;
};

/**
 * Get array of elements on the diagonal.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 * @return {Array<Number>} elements on the diagonal.
 */
_diagonal = function(data: Array<number>, m: number, n: number): Array<number> {
  let len, diag;
  (len = Math.min(m, n)), (diag = []);
  for (let i = 0; i < len; i++) {
    diag.push(data[_index(m, n, i, i)]);
  }
  return diag;
};

/**
 * Get the value of an element of this matrix.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 * @param row {Number}
 *        row of element, in range [0,m)
 * @param col {Number}
 *        column of element, in range [0,n)
 * @throws Error if row or col are out of range.
 * @return {Number} value.
 */
_get = function(
  data: Array<number>,
  m: number,
  n: number,
  row: number,
  col: number
): number {
  return data[_index(m, n, row, col)];
};

/**
 * Create an identity Matrix.
 *
 * @param n {Number}
 *        number of rows and columns.
 * @return identity matrix of size n.
 */
_identity = function(n: number): Array<number> {
  let values, row, col;
  values = [];
  for (row = 0; row < n; row++) {
    for (col = 0; col < n; col++) {
      values.push(row === col ? 1 : 0);
    }
  }
  return values;
};

/**
 * Get the index of an element of this matrix.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 * @param row {Number}
 *        row of element, in range [0,m)
 * @param col {Number}
 *        column of element, in range [0,n)
 * @return {Number} index.
 */
_index = function(m: number, n: number, row: number, col: number): number {
  return n * row + col;
};

/**
 * Jacobi eigenvalue algorithm.
 *
 * Ported from:
 *     http://users-phys.au.dk/fedorov/nucltheo/Numeric/now/eigen.pdf
 *
 * An iterative method for eigenvalues and eigenvectors,
 * only works on symmetric matrices.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 * @param maxRotations {Number}
 *        maximum number of rotations.
 *        Optional, default 100.
 * @return {Array<any>}
 *         Object with eigenvalue and vector properties.
 */
_jacobi = function(
  data: Array<number>,
  m: number,
  n: number,
  maxRotations: number
): Array<any> {
  let a,
    aip,
    aiq,
    api,
    app,
    app1,
    apq,
    aqi,
    aqq,
    aqq1,
    c,
    changed,
    e,
    i,
    ip,
    iq,
    p,
    phi,
    pi,
    q,
    qi,
    rotations,
    s,
    v,
    vector,
    vectors,
    vip,
    viq;

  if (m !== n) {
    throw new Error('Jacobi only works on symmetric, square matrices');
  }

  // set a default max
  maxRotations = maxRotations;
  a = data.slice(0);
  e = _diagonal(data, m, n);
  v = _identity(n);
  rotations = 0;

  do {
    changed = false;

    for (p = 0; p < n; p++) {
      for (q = p + 1; q < n; q++) {
        app = e[p];
        aqq = e[q];
        apq = a[n * p + q];
        phi = 0.5 * Math.atan2(2 * apq, aqq - app);
        c = Math.cos(phi);
        s = Math.sin(phi);
        app1 = c * c * app - 2 * s * c * apq + s * s * aqq;
        aqq1 = s * s * app + 2 * s * c * apq + c * c * aqq;

        if (app1 !== app || aqq1 !== aqq) {
          changed = true;
          rotations++;

          e[p] = app1;
          e[q] = aqq1;
          a[n * p + q] = 0;

          for (i = 0; i < p; i++) {
            ip = n * i + p;
            iq = n * i + q;
            aip = a[ip];
            aiq = a[iq];
            a[ip] = c * aip - s * aiq;
            a[iq] = c * aiq + s * aip;
          }
          for (i = p + 1; i < q; i++) {
            pi = n * p + i;
            iq = n * i + q;
            api = a[pi];
            aiq = a[iq];
            a[pi] = c * api - s * aiq;
            a[iq] = c * aiq + s * api;
          }
          for (i = q + 1; i < n; i++) {
            pi = n * p + i;
            qi = n * q + i;
            api = a[pi];
            aqi = a[qi];
            a[pi] = c * api - s * aqi;
            a[qi] = c * aqi + s * api;
          }
          for (i = 0; i < n; i++) {
            ip = n * i + p;
            iq = n * i + q;
            vip = v[ip];
            viq = v[iq];
            v[ip] = c * vip - s * viq;
            v[iq] = c * viq + s * vip;
          }
        }
      }
    }
  } while (changed && rotations < maxRotations);

  if (changed) {
    throw new Error('failed to converge');
  }

  vectors = [];
  for (i = 0; i < n; i++) {
    // i-th vector is i-th column
    vector = new Vector(_col(v, m, n, i));
    vectors.push({
      eigenvalue: e[i],
      vector: vector
    });
  }

  return vectors;
};

/**
 * Multiply this matrix by another matrix.
 *
 * @param data1 {Array<Number>}
 *        first matrix data.
 * @param m1 {Number}
 *        number of rows in first matrix.
 * @param n1 {Number}
 *        number of columns in first matrix.
 * @param data2 {Array<Number>}
 *        second matrix data.
 * @param m2 {Number}
 *        number of rows in second matrix.
 * @param n2 {Number}
 *        number of columns in second matrix.
 *
 * @throws Error if n1 !== m2
 *
 * @return result of multiplication (original matrix is unchanged).
 */
_multiply = function(
  data1: Array<number>,
  m1: number,
  n1: number,
  data2: Array<number>,
  m2: number,
  n2: number
): Array<number> {
  let col, col2, row, row1, values;

  if (n1 !== m2) {
    throw new Error('wrong combination of rows and cols');
  }
  values = [];
  for (row = 0; row < m1; row++) {
    row1 = _row(data1, m1, n1, row);
    for (col = 0; col < n2; col++) {
      col2 = _col(data2, m2, n2, col);
      // result is dot product
      values.push(Vector.dot(row1, col2));
    }
  }
  return values;
};

/**
 * Extract a row from this matrix.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 * @param row {Number}
 *        index of row, in range [0,m)
 *
 * @throws Error if row out of range.
 *
 * @return {Array<Number>} row elements.
 */
_row = function(
  data: Array<number>,
  m: number,
  n: number,
  row: number
): Array<number> {
  let col, values;
  if (row < 0 || row >= m) {
    throw new Error('row ' + row + ' out of range [0,' + m + ')');
  }
  values = [];
  for (col = 0; col < n; col++) {
    values.push(data[_index(m, n, row, col)]);
  }
  return values;
};

/**
 * Set the value of an element of this matrix.
 *
 * NOTE: this method modifies the contents of this matrix.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 * @param row {Number}
 *        row of element, in range [0,m)
 * @param col {Number}
 *        column of element, in range [0,n)
 * @param value {Number}
 *        value to set.
 *
 * @throws Error if row or col are out of range.
 */
_set = function(
  data: Array<number>,
  m: number,
  n: number,
  row: number,
  col: number,
  value: number
) {
  data[_index(m, n, row, col)] = value;
};

/**
 * Display matrix as a string.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 *
 * @return {String} formatted matrix.
 */
_stringify = function(data: Array<number>, m: number, n: number): string {
  let lastRow, lastCol, buf, row, col;

  lastRow = m - 1;
  lastCol = n - 1;
  buf = [];

  buf.push('[');
  for (row = 0; row < m; row++) {
    for (col = 0; col < n; col++) {
      buf.push(
        data[n * row + col],
        col !== lastCol || row !== lastRow ? ', ' : ''
      );
    }
    if (row !== lastRow) {
      buf.push('\n ');
    }
  }
  buf.push(']');
  return buf.join('');
};

/**
 * Transpose this matrix.
 *
 * @param data {Array<Number>}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 *
 * @return transposed matrix (original matrix is unchanged).
 */
_transpose = function(
  data: Array<number>,
  m: number,
  n: number
): Array<number> {
  let values, row, col;
  values = [];
  for (col = 0; col < n; col++) {
    for (row = 0; row < m; row++) {
      values.push(data[_index(m, n, row, col)]);
    }
  }
  return values;
};

/**
 * Construct a new Matrix object.
 *
 * If m and n are omitted, Matrix is assumed to be square and
 * data length is used to compute size.
 *
 * If m or n are omitted, data length is used to compute omitted value.
 *
 * @param data {Array}
 *        matrix data.
 * @param m {Number}
 *        number of rows.
 * @param n {Number}
 *        number of columns.
 */
export class Matrix {
  // expose static methods.
  static col = _col;
  static diagonal = _diagonal;
  static get = _get;
  static identity = _identity;
  static index = _index;
  static jacobi = _jacobi;
  static multiply = _multiply;
  static row = _row;
  static set = _set;
  static stringify = _stringify;
  static transpose = _transpose;

  constructor(
    // data in row-major order
    public data: Array<any>,
    // number of rows
    public m?: number,
    // number of columns
    public n?: number
  ) {
    if (this.m && this.n) {
      return;
    }

    // try to compute size based on data
    if (!this.m && !this.n) {
      const side = Math.sqrt(this.data.length);
      if (side !== Math.floor(side)) {
        throw new Error('matrix m,n unspecified, and matrix not square');
      }
      this.m = side;
      this.n = side;
    } else if (!this.m) {
      this.m = this.data.length / this.n;
      if (this.m !== Math.floor(this.m)) {
        throw new Error('wrong number of data elements');
      }
    } else {
      // (!this.n)
      this.n = this.data.length / this.m;
      if (this.n !== Math.floor(this.n)) {
        throw new Error('wrong number of data elements');
      }
    }
  }

  /**
   * Add matrices.
   *
   * @param that {Matrix}
   *        matrix to add.
   *
   * @throws Error if dimensions do not match.
   *
   * @return result of addition (original matrix is unchanged).
   */
  add(that: Matrix): Matrix {
    if (this.m !== that.m || this.n !== that.n) {
      throw new Error('matrices must be same size');
    }
    return new Matrix(Vector.add(this.data, that.data), this.m, this.n);
  }

  /**
   * Get a column from this matrix.
   *
   * @param col {Number}
   *        zero-based column index.
   *
   * @return {Array<Number>} array containing elements from column.
   */
  col(col: number): Array<number> {
    return _col(this.data, this.m, this.n, col);
  }

  /**
   * Get the diagonal from this matrix.
   *
   * @return {Array<Number>} array containing elements from diagonal.
   */
  diagonal(): Array<number> {
    return _diagonal(this.data, this.m, this.n);
  }

  /**
   * Get a value from this matrix.
   *
   * @param row {Number}
   *        zero-based index of row.
   * @param col {Number}
   *        zero-based index of column.
   *
   * @return {Number} value at (row, col).
   */
  get(row: number, col: number): number {
    return _get(this.data, this.m, this.n, row, col);
  }

  /**
   * Compute the eigenvectors of this matrix.
   *
   * NOTE: Matrix should be 3x3 and symmetric.
   *
   * @param maxRotations {Number}
   *        default 100.
   *        maximum number of iterations.
   *
   * @return {Array<any>} eigenvectors.
   *         Object with eigenvalue and vector properties.
   */
  jacobi(maxRotations: number = 100): Array<any> {
    return _jacobi(this.data, this.m, this.n, maxRotations);
  }

  /**
   * Multiply matrices.
   *
   * @param that {Matrix}
   *        matrix to multiply.
   *
   * @return {Matrix} result of multiplication.
   */
  multiply(that: Matrix): Matrix {
    return new Matrix(
      _multiply(this.data, this.m, this.n, that.data, that.m, that.n),
      // use that.N
      this.m,
      that.n
    );
  }

  /**
   * Multiply each element by -1.
   *
   * @return {Matrix} result of negation.
   */
  negative(): Matrix {
    return new Matrix(Vector.multiply(this.data, -1), this.m, this.n);
  }

  /**
   * Get a row from this matrix.
   *
   * @param row {Number}
   *        zero-based index of row.
   *
   * @return {Array<Number>} elements from row.
   */
  row(row): Array<number> {
    return _row(this.data, this.m, this.n, row);
  }

  /**
   * Set a value in this matrix.
   *
   * @param row {Number}
   *        zero-based row index.
   * @param col {Number}
   *        zero-based column index.
   * @param value {Number}
   *        value to set.
   */
  set(row: number, col: number, value: number) {
    _set(this.data, this.m, this.n, row, col, value);
  }

  /**
   * Subtract another matrix from this matrix.
   *
   * @param that {Matrix}
   *        matrix to subtract.
   *
   * @throws Error if dimensions do not match.
   *
   * @return result of subtraction (original matrix is unchanged).
   */
  subtract(that: Matrix): Matrix {
    if (this.m !== that.m || this.n !== that.n) {
      throw new Error('matrices must be same size');
    }
    return new Matrix(Vector.subtract(this.data, that.data), this.m, this.n);
  }

  /**
   * Display matrix as a string.
   *
   * @return {String} formatted matrix.
   */
  toString(): string {
    return _stringify(this.data, this.m, this.n);
  }

  /**
   * Transpose matrix.
   *
   * Columns become rows, and rows become columns.
   *
   * @return {Matrix} result of transpose.
   */
  transpose(): Matrix {
    return new Matrix(
      _transpose(this.data, this.m, this.n),
      // swap M and N
      this.n,
      this.m
    );
  }
}
