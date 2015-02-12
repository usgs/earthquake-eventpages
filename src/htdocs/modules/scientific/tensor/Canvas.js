'use strict';


/**
 * Create a new Canvas object.
 *
 * @param options {Object}
 * @param options.canvas {DOMElement}
 *        Optional, An existing canvas element.
 *        If omitted, a new canvas element is created.
 * @param options.width {Number}
 *        Optional, default 100.
 *        Width of canvas, when options.canvas is null.
 * @param options.height {Number}
 *        Optional, default 100.
 *        Height of canvas, when options.canvas is null.
 */
var Canvas = function (options) {
  var canvas;

  options = options || {};
  canvas = options.canvas || null;
  if (canvas === null) {
    canvas = document.createElement('canvas');
    canvas.width = options.width || 100;
    canvas.height = options.height || 100;
  }

  this.canvas = canvas;
  this.context = canvas.getContext('2d');
};


/**
 * Clear the canvas.
 */
Canvas.prototype.clear = function () {
  var canvas = this.canvas,
      context = this.context;

  if (context.clearRect) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    canvas.width = canvas.width;
  }
};

/**
 * Draw a circle
 *
 * @param x {Number}
 *        center of circle.
 * @param y {Number}
 *        center of circle.
 * @param size {Number}
 *        diameter of circle.
 * @param stroke {String}
 *        strokeStyle, or null to not stroke.
 * @param fill {String}
 *        fillStyle, or null to not fill.
 */
Canvas.prototype.circle = function (x, y, size, stroke, fill) {
  var c = this.context;

  c.beginPath();
  c.arc(x, y, size/2, 0, Math.PI*2, true);
  c.closePath();

  this._strokeAndFill(stroke, fill);
};

/**
 * Draw a polygon
 *
 * @param x {Array<Number>}
 *        array of x coordinates.
 * @param y {Array<Number>}
 *        array of y coordinates.
 * @param stroke {String}
 *        strokeStyle, or null to not stroke.
 * @param fill {String}
 *        fillStyle, or null to not fill.
 */
Canvas.prototype.polygon = function (x, y, stroke, fill) {
  var c = this.context;

  c.beginPath();
  c.moveTo(x[0], y[0]);
  for (var i=1, len=x.length; i<len; i++) {
    c.lineTo(x[i], y[i]);
  }
  c.closePath();

  this._strokeAndFill(stroke, fill);
};

/**
 * Draw a line.
 *
 * Same as polygon, without closingPath before calling stroke/fill.
 *
 * @param x {Array<Number>}
 *        array of x coordinates.
 * @param y {Array<Number}
 *        array of y coordinates.
 * @param stroke {String}
 *        strokeStyle, or null to not stroke.
 * @param fill {String}
 *        fillStyle, or null to not fill.
 */
Canvas.prototype.line = function (x, y, stroke, fill) {
  var c = this.context;

  c.beginPath();
  c.moveTo(x[0], y[0]);
  for (var i=1, len=x.length; i<len; i++) {
    c.lineTo(x[i], y[i]);
  }

  this._strokeAndFill(stroke, fill);
};

/**
 * Stroke and fill the current path.
 *
 * @param context {Object}
 *        canvas context
 * @param stroke {String}
 *        strokeStyle, or null to not stroke.
 * @param fill {String}
 *        fillStyle, or null to not fill.
 */
Canvas.prototype._strokeAndFill = function (stroke, fill) {
  var c = this.context;

  if (stroke) {
    c.strokeStyle = stroke;
    c.stroke();
  }
  if (fill) {
    c.fillStyle = fill;
    c.fill();
  }
};


module.exports = Canvas;
