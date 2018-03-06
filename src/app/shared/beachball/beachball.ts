/* This is based on code in GMT, utilmeca.c. */
'use strict';

import { Canvas } from './canvas';
import { Tensor } from './tensor';
import { ElementRef } from '@angular/core';


const _D2R = Math.PI / 180;
const _R2D = 180 / Math.PI;
const _EPSILON = 1e-16;

// threshold x and y pixel difference when polygons should be merged.
// Pixels are in the range [-1, 1], so 0.02 represents a 1% difference.
const _MERGE_THRESHOLD = 0.02;

// threshold takeoff angle when polygons should be split.
const _SPLIT_THRESHOLD = 85 * _D2R;


let __0To2Pi,
    __axisCache,
    __getOption;

/**
 * Make sure number is between 0 and 2pi.
 *
 * @param value {Number}
 *     angle in radians.
 * @return {Number}
 *     angle in radians, in the range [0, 2pi).
 */
__0To2Pi = function (value) {
  const twoPi = 2 * Math.PI;

  while (value < 0) {
    value += twoPi;
  }
  while (value >= twoPi) {
    value -= twoPi;
  }
  return value;
};

/**
 * Compute trig values of axis.
 *
 * @param axis {Vector3}
 *        principal axis, with value property.
 * @return {Object} with these keys:
 *         v: value,
 *         a: azimuth,
 *         ca: cos(azimuth),
 *         sa: sin(azimuth),
 *         p: plunge,
 *         cp: cos(plunge),
 *         sp: sin(plunge).
 */
__axisCache = function (axis) {
  let azimuth,
      plunge;

  // Vector azimuth method returns clockwise from north
  // code in this file expects counter-clockwise from east
  azimuth = (Math.PI / 2) - axis.vector.azimuth();
  plunge = axis.vector.plunge();
  // make axis plunge downward (negative values are up)
  if (plunge < 0) {
    plunge *= -1;
    azimuth += Math.PI;
  }
  // make azimuth in range [0, 2*PI)
  azimuth = __0To2Pi(azimuth, 0, Math.PI * 2);

  return {
    v: axis.eigenvalue,
    a: azimuth,
    ca: Math.cos(azimuth),
    sa: Math.sin(azimuth),
    p: plunge,
    cp: Math.cos(plunge),
    sp: Math.sin(plunge)
  };
};


__getOption = function (options: any, name: string, defaultValue: any = null): any {
  if (options && (name in options)) {
    return options[name];
  }
  return defaultValue;
};


export class Beachball {

  static zeroToTwoPi = __0To2Pi;

  public axisSize: number = null;
  public bgColor = '#fff';
  public fillColor = '#ddd';
  public height: number = null;
  public labelAxes = true;
  public labelAxesFont = '24px Arial';
  public labelPlanes = true;
  public labelPlanesFont = '14px Arial';
  public lineColor = '#000';
  public lineWidth = 0.25;
  public plotAxes = false;
  public plotPlanes = true;
  public radius: number = null;
  public size = 200;
  public width: number = null;
  public x0: number = null;
  public y0: number = null;

  /**
   * Create and render a beachball.
   *
   * @param tensor
   * @param el
   * @param options
   */
  static render(tensor: Tensor, el: any, options?: any) {
    new Beachball(tensor, el, options).render();
  }

  constructor (
    public tensor: Tensor,
    public el: any,
    options?: any
  ) {
    this.bgColor = __getOption(options, 'bgColor', this.bgColor);
    this.fillColor = __getOption(options, 'fillColor', this.fillColor);
    this.labelAxes = __getOption(options, 'labelAxes', this.labelAxes);
    this.labelAxesFont = __getOption(options, 'labelAxesFont', this.labelAxesFont);
    this.labelPlanes = __getOption(options, 'labelPlanes', this.labelPlanes);
    this.labelPlanesFont = __getOption(options, 'labelPlanesFont', this.labelPlanesFont);
    this.lineColor = __getOption(options, 'lineColor', this.lineColor);
    this.lineWidth = __getOption(options, 'lineWidth', this.lineWidth);
    this.plotAxes = __getOption(options, 'plotAxes', this.plotAxes);
    this.plotPlanes = __getOption(options, 'plotPlanes', this.plotPlanes);
    this.size = __getOption(options, 'size', this.size);
    // options with computed defaults
    this.radius = __getOption(options, 'radius', Math.floor((this.size - 2) / 2));
    this.axisSize = __getOption(options, 'axisSize', Math.floor(this.radius / 12.5));
    this.height = __getOption(options, 'height', this.size);
    this.width = __getOption(options, 'width', this.size);
    this.x0 = __getOption(options, 'x0', this.width / 2);
    this.y0 = __getOption(options, 'y0', this.height / 2);
  }


  /**
   * Complete polygon, by inserting points at edge of circle.
   *
   * @param poly {Object}
   *     polygon to potentially complete.
   * @return {Object}
   *     completed polygon.
   */
  completePolygon (polygon) {
    let az,
        az1,
        az2,
        x,
        y;

    if (polygon.x.length === 360) {
      // already a complete polygon
      return polygon;
    }

    az1 = polygon.startAz.az;
    az2 = polygon.endAz.az;
    x = polygon.x;
    y = polygon.y;
    // fill in circle portion of polygons
    if (az1 - az2 > Math.PI) {
      az1 -= 2 * Math.PI;
    }
    if (az2 - az1 > Math.PI) {
      az1 += 2 * Math.PI;
    }
    if (az1 < az2) {
      for (az = az2 - _D2R; az > az1; az -= _D2R) {
        x.push(Math.sin(az));
        y.push(Math.cos(az));
      }
    } else {
      for (az = az2 + _D2R; az < az1; az += _D2R) {
        x.push(Math.sin(az));
        y.push(Math.cos(az));
      }
    }

    return polygon;
  }

  /**
   * Compute azimuth label relative positioning.
   *
   * @param label {Object}
   * @return {Object}
   *     same `label` object, with additional properties:
   *     - `align` {String}
   *         'left' or 'right'
   *     - `size` {Object}
   *         `width` and `height` of label
   *     - `tick` {Object}
   *         `x` and `y` relative tick coordinates.
   *     - `x` {Number}
   *         relative x coordinate of label.
   *     - `y` {Number}
   *         relative y coordinate of label.
   */
  computeAzimuthLabel (label) {
    let align,
        point,
        labelOffset,
        size,
        tickLength,
        x,
        y;

    // point on edge
    point = this.getPoint(label.azimuth, 0);
    x = point.x;
    y = point.y;
    align = (x < 0) ? 'right' : 'left';
    size = this.measureText(label.text, label.font);

    labelOffset = (this.radius + 10) / this.radius;
    tickLength = (this.radius + 5) / this.radius;

    label.align = align;
    label.size = size;
    label.tick = {
      x: [x, x * tickLength],
      y: [y, y * tickLength],
    };
    label.x = x * labelOffset;
    label.y = y * labelOffset;

    if (y < 0) {
      // shift label down when in bottom half
      label.y = y * (this.radius + 10 + Math.abs(y) * size.height / 2) / this.radius;
    }

    return label;
  }

  /**
   * Create a Canvas object for plotting.
   * Mainly here for testing.
   */
  createCanvas (): Canvas {
    return new Canvas(
      this.el,
      this.height,
      this.width
    );
  }

  /**
   * Get a line for a nodal plane.
   *
   * @param np {Object}
   *     Nodal plane object with keys `strike`, `dip`, and `rake` and
   *     values in degrees.
   * @return {Object}
   *     With properties `x` and `y` that are Arrays of points in the
   *     range [-1, 1].
   */
  getPlaneLine (np): any {
    let dip,
        j,
        point,
        strike,
        tanDip,
        vertical,
        x,
        y;

    strike = np.strike * _D2R;
    dip = np.dip * _D2R;
    x = [];
    y = [];

    vertical = (Math.abs(dip - Math.PI / 2)) < _EPSILON;
    if (vertical) {
      x.push(Math.sin(strike), Math.sin(strike + Math.PI));
      y.push(Math.cos(strike), Math.cos(strike + Math.PI));
    } else {
      tanDip = Math.tan(dip);
      for (j = 0; j <= Math.PI; j += _D2R) {
        // dip from [0,0,0] to intersection of plane and focal sphere
        // at azimuth `strike + j`
        dip = Math.atan(tanDip * Math.sin(j));
        point = this.getPoint(strike + j, dip);
        x.push(point.x);
        y.push(point.y);
      }
    }

    return {
      x: x,
      y: y
    };
  }

  /**
   * Get x, y coordinates for a vector.
   *
   * @param vector {Vector}
   *     vector reprenenting point.
   * @return {Object}
   *     with properties `x` and `y` in the range [-1, 1] representing location
   *     of point in focal sphere.
   */
  getPoint (azimuth, plunge) {
    let r,
        x,
        y;

    if (plunge < 0) {
      plunge *= -1;
      azimuth += Math.PI;
    }
    azimuth = __0To2Pi(azimuth);

    r = Math.sqrt(1 - Math.sin(plunge));
    x = r * Math.sin(azimuth);
    y = r * Math.cos(azimuth);

    return {
      x: x,
      y: y
    };
  }

  /**
   * Get Polygons representing pressure and tension regions of the beachball.
   *
   * May swap foreground and background colors.
   *
   * @param tensor {Tensor}
   *        tensor.
   * @return {Array<Object>} each object will have properties:
   *         x: {Array<Number>} x coordinates of line,
   *         y: {Array<Number} y coordinates of line,
   *         startAz: {Object} start azimuth of line,
   *         endAz: {Object} end azimuth of line.
   */
  getPolygons (tensor) {
    let alphan,
        az,
        azes,
        azp,
        c,
        cfi,
        f,
        fir,
        i,
        iso,
        n,
        p,
        polygon,
        polygons,
        r,
        s,
        s2alphan,
        sfi,
        swapColors,
        t,
        tmp,
        takeoff,
        vi,
        x,
        xe,
        xn,
        xz,
        y;

    t = __axisCache(tensor.T);
    n = __axisCache(tensor.N);
    p = __axisCache(tensor.P);

    azes = [];
    polygons = [];


    vi = (t.v + n.v + p.v) / 3;
    t.v -= vi;
    n.v -= vi;
    p.v -= vi;

    // compute f, iso
    f = (-n.v / t.v) || _EPSILON;
    iso = (vi / t.v) || _EPSILON;

    // build azes
    swapColors = false;
    for (i = 0; i < 360; i++) {
      fir = i * _D2R;
      sfi = Math.sin(fir);
      cfi = Math.cos(fir);
      s2alphan = (2 + 2 * iso) / (3 + (1 - 2 * f) * Math.cos(2 * fir));
      if (Math.abs(1 - s2alphan) <= _EPSILON) {
        s2alphan = 1;
      }
      if (s2alphan > 1) {
        // swap axes
        tmp = t;
        t = p;
        p = tmp;
        // swap bg/fill colors
        swapColors = !swapColors;
        // recompute f, iso, s2alphan
        f = (-n.v / t.v) || _EPSILON;
        iso = (vi / t.v) || _EPSILON;
        s2alphan = (2 + 2 * iso) / (3 + (1 - 2 * f) * Math.cos(2 * fir));
      }
      // compute z,n,e components
      alphan = Math.asin(Math.sqrt(s2alphan));
      s = Math.sin(alphan);
      c = Math.cos(alphan);
      xz = c * t.sp        + s * sfi * n.sp        + s * cfi * p.sp;
      xn = c * t.cp * t.ca + s * sfi * n.cp * n.ca + s * cfi * p.cp * p.ca;
      xe = c * t.cp * t.sa + s * sfi * n.cp * n.sa + s * cfi * p.cp * p.sa;
      // compute azimuth and takeoff angle
      if (Math.abs(xn) < _EPSILON && Math.abs(xe) < _EPSILON) {
        az = 0;
        takeoff = 0;
      } else {
        az = __0To2Pi(Math.atan2(xe, xn));
        takeoff = Math.acos(xz / Math.sqrt(xz * xz + xn * xn + xe * xe));
        if (takeoff > Math.PI / 2) {
          az = __0To2Pi(az + Math.PI);
          takeoff = Math.PI - takeoff;
        }
      }
      // save for later
      azes.push({
        az: az,
        takeoff: takeoff
      });
    }

    // build polygons
    polygon = null;
    for (i = 0; i < azes.length; i++) {
      az = azes[i];
      r = Math.SQRT2 * Math.sin(az.takeoff / 2);
      x = r * Math.sin(az.az);
      y = r * Math.cos(az.az);
      if (polygon !== null) {
        // check if current point should be part of this polygon
        azp = azes[(i === 0) ? azes.length - 1 : i - 1];
        if (Math.abs(Math.abs(az.az - azp.az) - Math.PI) < 10 * _D2R) {
          // polygons should only end at edge of beachball
          if (az.takeoff > _SPLIT_THRESHOLD &&
              azp.takeoff > _SPLIT_THRESHOLD) {
            // end a polygon
            if (polygon !== null) {
              polygon.endAz = azp;
              polygons.push(polygon);
              polygon = null;
            }
          }
        }
      }
      if (polygon === null) {
        // start a polygon
        polygon = {
          x: [],
          y: [],
          startAz: az,
          endAz: null
        };
      }
      // add point to current polygon
      polygon.x.push(x);
      polygon.y.push(y);
    }
    // close last polygon
    polygon.endAz = azes[azes.length - 1];
    polygons.push(polygon);

    // fix up polygons
    polygons = this.mergePolygons(polygons);
    polygons = polygons.map((poly) => this.completePolygon(poly));
    polygons.swapColors = swapColors;
    return polygons;
  }

  /**
   * Call getPoint using a Vector.
   *
   * Vector azimuth is reported counter-clockwise from east.
   * getPoint expects azimuth to be clockwise from north.
   *
   * @param vector {Vector}
   *     the vector.
   * @return {Object}
   *     relative point within focal sphere.
   */
  getVectorPoint (vector) {
    return this.getPoint(
      (Math.PI / 2) - vector.azimuth(),
      vector.plunge()
    );
  }

  /**
   * Measure pixel size of text.
   *
   * @param text {String}
   *     text to measure.
   * @param font {String}
   *     css/canvas font property.
   * @return {Object}
   *     with `width` and `height` properties that are the pixel size of `text`.
   */
  measureText (text, font) {
    let el,
        size;

    // create hidden element with text content
    el = document.createElement('div');
    el.setAttribute('style',
        'height:auto;' +
        'position:absolute;' +
        'visibility:hidden;' +
        'white-space:nowrap;' +
        'width:auto;' +
        'font:' + font + ';');
    el.innerText = text;

    // add to document and measure
    document.body.appendChild(el);
    size = {
      height: el.scrollHeight,
      width: el.scrollWidth
    };

    // clean up
    el.parentNode.removeChild(el);
    el = null;

    return size;
  }

  /**
   * Adjust size to make room for text labels.
   *
   * Updates _canvas, _height, _width, _x0, and _y0.
   * Resets canvas content, any rendering should occur after calling.
   *
   * @param {string} size
   *        size of text, as computed by #measureText
   * @param {Object} point
   *        unprojected point where text will plot.
   * @param {'left'|'right'|'center'} align
   *        alignment of text relative to point
   */
  makeRoomForLabel (size, point, align) {
    let bottom,
        left,
        right,
        top,
        x,
        y;

    x = this.projectX(point.x);
    y = this.projectY(point.y);

    // measure actual top/right/bottom/left
    bottom = 0;
    left = 0;
    right = 0;
    top = 0;

    bottom = y - size.height;
    top = y + size.height;
    if (align === 'left') {
      left = x;
      right = x + size.width;
    } else if (align === 'right') {
      left = x - size.width;
      right = x;
    } else { // center
      const halfWidth = Math.ceil(size.width / 2);
      left = x - halfWidth;
      right = x + halfWidth;
    }

    // convert from actual size to relative size increase
    if (bottom < 0) {
      bottom = Math.abs(bottom);
    } else {
      bottom = 0;
    }
    if (top > this.height) {
      top = top - this.height;
    } else {
      top = 0;
    }
    if (left < 0) {
      left = Math.abs(left);
    } else {
      left = 0;
    }
    if (right > this.width) {
      right = right - this.width;
    } else {
      right = 0;
    }

    // change size
    this.width = this.width + left + right;
    this.x0 = this.x0 + left;
    this.height = this.height + top + bottom;
    this.y0 = this.y0 + top;
  }

  /**
   * Merge adjacent lines that should be part of the same polygon.
   *
   * @param polygons {Array<Object>}
   *     array of polygons to potentially merge.
   * @return {Array<Object>}
   *     array of polygons that remain after any merges.
   */
  mergePolygons (polygons) {
    let i,
        nextI,
        p1,
        p1x,
        p1y,
        p2,
        p2x,
        p2y;

    if (polygons.length === 1) {
      // nothing to merge
      return polygons;
    }

    for (i = 0; i < polygons.length; i++) {
      nextI = (i === polygons.length - 1 ? 0 : i + 1);
      p1 = polygons[i];
      p1x = p1.x;
      p1y = p1.y;
      p2 = polygons[nextI];
      p2x = p2.x;
      p2y = p2.y;
      if (Math.abs(p1x[p1x.length - 1] - p2x[0]) < _MERGE_THRESHOLD &&
          Math.abs(p1y[p1y.length - 1] - p2y[0]) < _MERGE_THRESHOLD) {
        // merge polygons
        p1x.push.apply(p1x, p2x);
        p1y.push.apply(p1y, p2y);
        p1.endAz = p2.endAz;
        polygons.splice(nextI, 1);
      }
    }
    return polygons;
  }

  /**
   * Convert a relative x coordinate to a canvas pixel coordinate.
   *
   * @param x {Number}
   *     relative x coordinate.
   * @return {Number}
   *     canvas pixel x coordinate.
   */
  projectX (x) {
    return this.x0 + this.radius * x;
  }

  /**
   * Convert a relative y coordinate to a canvas pixel coordinate.
   *
   * @param y {Number}
   *     relative y coordinate.
   * @return {Number}
   *     canvas pixel y coordinate.
   */
  projectY (y) {
    return this.height - (this.y0 + this.radius * y);
  }

  /**
   * Render view based on current model settings.
   */
  render () {
    let azimuthLabels,
        canvas,
        point,
        polygons,
        tmp,
        x,
        y;

    // compute label information, since it may affect plot size.

    azimuthLabels = [];
    // create azimuth labels, for now only nodal planes.
    if (this.labelPlanes) {
      [this.tensor.NP1, this.tensor.NP2].forEach((np) => {
        let azimuth,
            text;

        azimuth = np.strike * _D2R;
        text = '(' +
            np.strike.toFixed(0) + ', ' +
            np.dip.toFixed(0) + ', ' +
            np.rake.toFixed(0) +
            ')';

        const label = this.computeAzimuthLabel({
          'azimuth': azimuth,
          'font': this.labelPlanesFont,
          'text': text
        });
        this.makeRoomForLabel(
            label.size,
            {x: label.x, y: label.y},
            label.align);
        azimuthLabels.push(label);
      });
    }

    if (this.labelAxes) {
      [this.tensor.T, this.tensor.P].forEach((axis) => {
        this.makeRoomForLabel(
            this.measureText(axis.name, this.labelAxesFont),
            this.getVectorPoint(axis.vector),
            'center');
      });
    }

    // create canvas, now that size is known
    canvas = this.createCanvas();

    canvas.context.lineWidth = this.lineWidth;

    // get polygons
    // represents either solid regions (swapColors = false),
    // or holes (swapColors = true)
    polygons = this.getPolygons(this.tensor);
    if (polygons.swapColors) {
      tmp = this.bgColor;
      this.bgColor = this.fillColor;
      this.fillColor = tmp;
    }

    // center of beachball.
    x = this.projectX(0);
    y = this.projectY(0);

    // plot circle outline, with background color
    // in case polygons represent holes
    canvas.circle(x, y, this.radius * 2, this.lineColor, this.bgColor);

    // draw polygons
    polygons.forEach((p) => {
      canvas.polygon(
          p.x.map((x0) => this.projectX(x0)),
          p.y.map((y0) => this.projectY(y0)),
          this.lineColor,
          this.fillColor);
    });

    // draw nodal plane lines
    if (this.plotPlanes) {
      [this.tensor.NP1, this.tensor.NP2].forEach((np) => {
        let line;
        line = this.getPlaneLine(np);
        canvas.line(
            line.x.map((x0) => this.projectX(x0)),
            line.y.map((y0) => this.projectY(y0)),
            this.lineColor,
            null);
      });
    }

    // plot circle without fill, in case polygons covered outline.
    canvas.circle(x, y, this.radius * 2, this.lineColor, null);

    if (this.labelAxes) {
      [this.tensor.P, this.tensor.T].forEach((axis) => {
        point = this.getVectorPoint(axis.vector);
        canvas.text(axis.name,
            this.labelAxesFont,
            this.projectX(point.x),
            this.projectY(point.y),
            null,
            'black',
            'center');
      });
    } else if (this.plotAxes) {
      point = this.getVectorPoint(this.tensor.P.vector);
      canvas.circle(point.x, point.y, this.axisSize, 'white', 'black');
      point = this.getVectorPoint(this.tensor.T.vector);
      canvas.circle(point.x, point.y, this.axisSize, 'black', 'white');
    }

    // draw azimuth labels
    azimuthLabels.forEach((label) => {
      let tick;

      tick = label.tick;
      canvas.line(
          tick.x.map((tickX) => this.projectX(tickX)),
          tick.y.map((tickY) => this.projectY(tickY)),
          'black',
          null);
      canvas.text(label.text, label.font,
          this.projectX(label.x),
          this.projectY(label.y),
          null,
          'black',
          label.align);
    });

    canvas = null;
  }
}
