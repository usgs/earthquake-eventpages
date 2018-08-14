
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
export class Canvas {

  context: any;


  constructor (
    public canvas: any = null,
    public height = 100,
    public width = 100
  ) {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
    }
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.context = this.canvas.getContext('2d');
  }


  /**
   * Clear the canvas.
   */
  clear () {
    if (this.context.clearRect) {
      this.context.clearRect(0, 0, this.width, this.height);
    } else {
      this.canvas.width = this.canvas.width;
    }
  }

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
  circle (x, y, size, stroke, fill) {
    const c = this.context;

    c.beginPath();
    c.arc(x, y, size / 2, 0, Math.PI * 2, true);
    c.closePath();

    this._strokeAndFill(stroke, fill);
  }

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
  polygon (x, y, stroke, fill) {
    const c = this.context;

    c.beginPath();
    c.moveTo(x[0], y[0]);
    for (let i = 1, len = x.length; i < len; i++) {
      c.lineTo(x[i], y[i]);
    }
    c.closePath();

    this._strokeAndFill(stroke, fill);
  }

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
  line (x, y, stroke, fill) {
    const c = this.context;

    c.beginPath();
    c.moveTo(x[0], y[0]);
    for (let i = 1, len = x.length; i < len; i++) {
      c.lineTo(x[i], y[i]);
    }

    this._strokeAndFill(stroke, fill);
  }

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
  measureText (font, text) {
    const c = this.context;

    c.font = font;
    return c.measureText(text);
  }

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
  text (text, font, x, y, stroke, fill, align = 'left') {
    const c = this.context;

    c.font = font;
    if (align === 'center' || align === 'right') {
      const size = c.measureText(text);
      if (align === 'center') {
        x = x - size.width / 2;
      } else { // (align === 'right')
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
  }


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
  _strokeAndFill (stroke, fill) {
    const c = this.context;

    if (stroke) {
      c.strokeStyle = stroke;
      c.stroke();
    }
    if (fill) {
      c.fillStyle = fill;
      c.fill();
    }
  }

}
