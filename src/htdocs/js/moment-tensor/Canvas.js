'use strict';

var Util = require('util/Util');


var _DEFAULTS = {
  canvas: null,
  height: 100,
  width: 100
};


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
  var _this,
      _initialize,

      _canvas,
      _context;

  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _canvas = options.canvas;
    if (_canvas === null) {
      _canvas = document.createElement('canvas');
      _canvas.width = options.width;
      _canvas.height = options.height;
    }
    _context = _canvas.getContext('2d');
    // expose these as public properties
    _this.canvas = _canvas;
    _this.context = _context;
  };


  /**
   * Clear the canvas.
   */
  _this.clear = function () {
    if (_context.clearRect) {
      _context.clearRect(0, 0, _canvas.width, _canvas.height);
    } else {
      _canvas.width = _canvas.width;
    }
  };

  /**
   * Free references.
   */
  _this.destroy = function () {
    _canvas = null;
    _context = null;
    _initialize = null;
    _this = null;
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
  _this.circle = function (x, y, size, stroke, fill) {
    var c;

    c = _context;
    c.beginPath();
    c.arc(x, y, size/2, 0, Math.PI*2, true);
    c.closePath();

    _this._strokeAndFill(stroke, fill);
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
  _this.polygon = function (x, y, stroke, fill) {
    var c,
        i,
        len;

    c = _context;
    c.beginPath();
    c.moveTo(x[0], y[0]);
    for (i = 1, len = x.length; i < len; i++) {
      c.lineTo(x[i], y[i]);
    }
    c.closePath();

    _this._strokeAndFill(stroke, fill);
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
  _this.line = function (x, y, stroke, fill) {
    var c,
        i,
        len;

    c = _context;
    c.beginPath();
    c.moveTo(x[0], y[0]);
    for (i = 1, len = x.length; i < len; i++) {
      c.lineTo(x[i], y[i]);
    }

    this._strokeAndFill(stroke, fill);
  };

  /**
   * Measure how many pixels are needed to plot text in the given font.
   *
   * @param font {String}
   *     context font property.
   * @param text {String}
   *     text to plot.
   * @return {TextMetrics}
   *     size of text once plotted, "width" is the only widely supported
   *     TextMetrics property.
   */
  _this.measureText = function (font, text) {
    var c;

    c = _context;
    c.font = font;
    return c.measureText(text);
  };

  /**
   * Draw text.
   *
   * @param text {String}
   *        text to draw.
   * @param font {String}
   *        font to use, e.g. '30px Arial'.
   * @param x {Number}
   *        x coordinate.
   * @param y {Number}
   *        y coordinate.
   * @param stroke {String}
   *        strokeStyle, or null to not stroke.
   * @param fill {String}
   *        fillStyle, or null to not fill.
   * @param align {String} default 'left'
   *        where to align text around x.
   *        'left' starts at x.
   *        'center' centers around x.
   *        'right' ends at x.
   */
  _this.text = function (text, font, x, y, stroke, fill, align) {
    var c,
        size;

    c = _context;
    align = align || 'left';

    c.font = font;
    if (align !== 'left') {
      size = c.measureText(text);
      if (align === 'center') {
        x = x - size.width / 2;
      } else if (align === 'right') {
        x = x - size.width;
      }
    }

    if (stroke) {
      c.strokeStyle = stroke;
      c.strokeText(text, x, y);
    }

    if (fill) {
      c.fillStyle = fill;
      c.fillText(text, x, y);
    }
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
  _this._strokeAndFill = function (stroke, fill) {
    var c;

    c = _context;

    if (stroke) {
      c.strokeStyle = stroke;
      c.stroke();
    }
    if (fill) {
      c.fillStyle = fill;
      c.fill();
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = Canvas;
