/* global define */
define([], function () {
  'use strict';


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
  var Matrix = function (data, m, n) {
    this._data = data;
    this._m = m;
    this._n = n;

    if (m && n) {
      // done
      return;
    }

    // try to compute size based on data
    if (!m && !n) {
      var side = Math.sqrt(data.length);
      if (side !== parseInt(side, 10)) {
        throw new Error('matrix m,n unspecified, and matrix not square');
      }
      this._m = side;
      this._n = side;
    } else if (!m) {
      m = data.length / n;
      if (m !== parseInt(m, 10)) {
        throw new Error('wrong number of data elements');
      }
      this._m = m;
    } else if (!n) {
      n = data.length / m;
      if (n !== parseInt(n, 10)) {
        throw new Error('wrong number of data elements');
      }
      this._n = n;
    }
  };


  /**
   * Get the value of an element of this matrix.
   *
   * @param row {Number}
   *        row of element, in range [0,m)
   * @param col {Number}
   *        column of element, in range [0,n)
   * @throws Error if row or col are out of range.
   * @return {Number} value.
   */
  Matrix.prototype.get = function (row, col) {
    return this._data[this._n * row + col];
  };

  /**
   * Set the value of an element of this matrix.
   *
   * NOTE: this method modifies the contents of this matrix.
   *
   * @param row {Number}
   *        row of element, in range [0,m)
   * @param col {Number}
   *        column of element, in range [0,n)
   * @param value {Number}
   *        value to set.
   * @throws Error if row or col are out of range.
   */
  Matrix.prototype.set = function (row, col, value) {
    this._data[this._n * row + col] = value;
  };

  /**
   * Extract a row from this matrix.
   *
   * @param row {Number}
   *        index of row, in range [0,m)
   * @throws Error if row out of range.
   * @return {Array<Number>} row elements.
   */
  Matrix.prototype.row = function (row) {
    var data = this._data,
        n = this._n,
        m = this._m,
        values = [],
        col;
    if (row < 0 || row >= m) {
      throw new Error('row ' + row + ' out of range [0,' + m + ')');
    }
    for (col = 0; col < n; col++) {
      values.push(data[n * row + col]);
    }
    return values;
  };

  /**
   * Extract a column from this matrix.
   *
   * @param col {Number}
   *        index of column, in range [0,n)
   * @throws Error if column out of range.
   * @return {Array<Number>} column elements.
   */
  Matrix.prototype.col = function (col) {
    var data = this._data,
        n = this._n,
        m = this._m,
        values = [],
        row;
    if (col < 0 || col >= n) {
      throw new Error('column ' + col + ' out of range [0,' + n + ')');
    }
    for (row = 0; row < m; row++) {
      values.push(data[n * row + col]);
    }
    return values;
  };

  /**
   * Transpose this matrix.
   *
   * @return transposed matrix (original matrix is unchanged).
   */
  Matrix.prototype.transpose = function () {
    var data = this._data,
        n = this._n,
        m = this._m,
        values = [],
        row,
        col;
    for (col = 0; col < n; col++) {
      for (row = 0; row < m; row++) {
        values.push(data[n * row + col]);
      }
    }
    return new Matrix(values, n, m);
  };

  /**
   * Add another matrix to this matrix.
   *
   * @param that {Matrix}
   *        matrix to add.
   * @throws Error if dimensions do not match.
   * @return result of addition (original matrix is unchanged).
   */
  Matrix.prototype.add = function (that) {
    var thisData = this._data,
        thatData = that._data,
        m = this._m,
        n = this._n,
        len = thisData.length,
        values = [],
        i;
    if (m !== that._m || n !== that._n) {
      throw new Error('matrices must be same size');
    }
    for (i = 0; i < len; i++) {
      values[i] = thisData[i] + thatData[i];
    }
    return new Matrix(values, m, n);
  };

  /**
   * Subtract another matrix from this matrix.
   *
   * @param that {Matrix}
   *        matrix to subtract.
   * @throws Error if dimensions do not match.
   * @return result of subtraction (original matrix is unchanged).
   */
  Matrix.prototype.subtract = function (that) {
    var thisData = this._data,
        thatData = that._data,
        m = this._m,
        n = this._n,
        len = thisData.length,
        values = [],
        i;
    if (m !== that._m || n !== that._n) {
      throw new Error('matrices must be same size');
    }
    for (i = 0; i < len; i++) {
      values[i] = thisData[i] - thatData[i];
    }
    return new Matrix(values, m, n);
  };

  /**
   * Multiply this matrix by another matrix.
   *
   * @param  that {Matrix}
   *         matrix to multiply.
   * @throws Error if this.n !== that.m.
   * @return result of multiplication (original matrix is unchanged).
   */
  Matrix.prototype.multiply = function (that) {
    var values = [],
        thisM = this.m,
        thisN = this.n,
        thatN,
        thatM,
        row,
        col,
        i,
        thisRow,
        thatCol,
        dot,
        data,
        len;

    if (that instanceof Matrix) {
      // a matrix
      thatM = that.m;
      thatN = that.n;
      if (thisN !== thatM) {
        throw new Error('wrong combination of rows and cols');
      }
      for (row = 0; row < thisM; row++) {
        thisRow = this.row(row);
        for (col = 0; col < thatN; col++) {
          thatCol = that.col(col);
          // result is dot product
          dot = 0;
          for (i = 0; i < thisN; i++) {
            dot += thisRow[i] * thatCol[i];
          }
          values.push(dot);
        }
      }
      return new Matrix(values, thisM, thatN);
    } else {
      // a constant
      values = [];
      data = this._data;
      len = data.length;
      for (i = 0; i < len; i++) {
        values[i] = data[i] * that;
      }
      return new Matrix(values, thisM, thisN);
    }
  };

  /**
   * Negate this matrix.
   *
   * @return result of negation (original matrix is unchanged).
   */
  Matrix.prototype.negative = function () {
    return this.multiply(-1);
  };

  /**
   * Display matrix as a string.
   *
   * @return {String} formatted matrix.
   */
  Matrix.prototype.toString = function () {
    var data = this._data,
        m = this._m,
        n = this._n,
        lastRow = m - 1,
        lastCol = n - 1,
        buf = [],
        row,
        col;

    buf.push('[');
    for (row = 0; row < m; row++) {
      for (col = 0; col < n; col++) {
        buf.push(
            data[n * row + col],
            (col !== lastCol || row !== lastRow) ? ', ' : '');
      }
      if (row !== lastRow) {
        buf.push('\n ');
      }
    }
    buf.push(']');
    return buf.join('');
  };

  /**
   * Get array of elements on the diagonal.
   *
   * @return {Array<Number>} elements on the diagonal.
   */
  Matrix.prototype.diagonal = function () {
    var data = this._data,
        m = this._m,
        n = this._n,
        len = Math.min(m, n),
        diag = [],
        i;
    for (i = 0; i < len; i++) {
      diag.push(data[n * i + i]);
    }
    return diag;
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
   * @param maxRotations {Number}
   *        maximum number of rotations.
   *        Optional, default 100.
   * @return {Array<Object>} array of eigenvalues and vectors as objects:
   *         {
   *             value: {Number},
   *             vector: {Array<Number>}
   *         }
   */
  Matrix.prototype.jacobi = function (maxRotations) {
    var m = this._m,
        n = this._n;
    if (m !== n) {
      throw new Error('Jacobi only works on symmetric, square matrices');
    }

    // set a default max
    maxRotations = maxRotations || 100;

    var a = this._data.slice(0),
        e = this.diagonal(),
        v = Matrix.identity(n)._data,
        rotations = 0,
        changed,
        i,
        q,
        p,
        app,
        aqq,
        apq,
        phi,
        c,
        s,
        app1,
        aqq1,
        ip,
        aip,
        iq,
        aiq,
        pi,
        api,
        qi,
        aqi,
        vip,
        viq,
        vectors;

    do {
      changed = false;

      for (p=0; p<n; p++) {
        for (q=p+1; q<n; q++) {
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
    } while (changed && (rotations < maxRotations));

    if (changed) {
      throw new Error('failed to converge');
    }

    v = new Matrix(v, m, n);
    vectors = [];
    for (i = 0; i < n; i++) {
      vectors.push({
        'value': e[i],
        'vector': v.col(i)
      });
    }

    return vectors;
  };


  /**
   * Create an identity Matrix.
   *
   * @param n {Number}
   *        number of rows and columns.
   * @return identity matrix of size n.
   */
  Matrix.identity = function (n) {
    var values = [],
        row,
        col;
    for (row = 0; row < n; row++) {
      for (col = 0; col < n; col++) {
        values.push((row === col) ? 1 : 0);
      }
    }
    return new Matrix(values, n, n);
  };


  // return constructor
  return Matrix;
});
