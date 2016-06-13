/* This is based on code in GMT, utilmeca.c. */
'use strict';

var Canvas = require('moment-tensor/Canvas'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _D2R,
    _DEFAULTS,
    _MERGE_THRESHOLD,
    _R2D,
    _SPLIT_THRESHOLD;

_D2R = Math.PI / 180;
_R2D = 180 / Math.PI;

// threshold x and y pixel difference when polygons should be merged.
// Pixels are in the range [-1, 1], so 0.02 represents a 1% difference.
_MERGE_THRESHOLD = 0.02;

// threshold takeoff angle when polygons should be split.
_SPLIT_THRESHOLD = 85 * _D2R;

_DEFAULTS = {
  axisSize: null,
  bgColor: '#fff',
  fillColor: '#ddd',
  height: null,
  labelAxes: true,
  labelAxesFont: '24px Arial',
  labelPlanes: true,
  labelPlanesFont: '14px Arial',
  lineColor: '#000',
  lineWidth: 0.25,
  plotAxes: false,
  plotPlanes: true,
  radius: null,
  size: 200,
  tensor: null,
  width: null,
  x0: null,
  y0: null
};


/**
 * Make sure number is between 0 and 2pi.
 *
 * @param value {Number}
 *     angle in radians.
 * @return {Number}
 *     angle in radians, in the range [0, 2pi).
 */
var __0To2Pi = function (value) {
  var twoPi;

  twoPi = 2 * Math.PI;
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
var __axisCache = function (axis) {
  var azimuth,
      plunge;

  // Vector azimuth method returns clockwise from north
  // code in this file expects counter-clockwise from east
  azimuth = (Math.PI / 2) - axis.azimuth();
  plunge = axis.plunge();
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


var BeachBallView = function (options) {
  var _this,
      _initialize,

      _axisSize,
      _bgColor,
      _canvas,
      _fillColor,
      _height,
      _labelAxes,
      _labelAxesFont,
      _labelPlanes,
      _labelPlanesFont,
      _lineColor,
      _lineWidth,
      _plotAxes,
      _plotPlanes,
      _radius,
      _size,
      _tensor,
      _width,
      _x0,
      _y0;

  _this = View(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _bgColor = options.bgColor;
    _fillColor = options.fillColor;
    _labelAxes = options.labelAxes;
    _labelAxesFont = options.labelAxesFont;
    _labelPlanes = options.labelPlanes;
    _labelPlanesFont = options.labelPlanesFont;
    _lineColor = options.lineColor;
    _lineWidth = options.lineWidth;
    _plotAxes = options.plotAxes;
    _plotPlanes = options.plotPlanes;
    _size = options.size;
    _tensor = options.tensor;

    // options with computed defaults
    _radius = options.radius || parseInt((_size - 2) / 2, 10);
    _axisSize = options.axisSize || parseInt(_radius / 12.5, 10);
    _height = options.height || _size;
    _width = options.width || _size;
    _x0 = options.x0 || _width / 2;
    _y0 = options.y0 || _height / 2;
  };


  /**
   * Complete polygon, by inserting points at edge of circle.
   *
   * @param poly {Object}
   *     polygon to potentially complete.
   * @return {Object}
   *     completed polygon.
   */
  _this.completePolygon = function (polygon) {
    var az,
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
  };

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
  _this.computeAzimuthLabel = function (label) {
    var align,
        point,
        labelOffset,
        size,
        tickLength,
        x,
        y;

    // point on edge
    point = _this.getPoint(label.azimuth, 0);
    x = point.x;
    y = point.y;
    align = (x < 0) ? 'right' : 'left';
    size = _this.measureText(label.text, label.font);

    labelOffset = (_radius + 10) / _radius;
    tickLength = (_radius + 5) / _radius;

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
      label.y = y * (_radius + 10 + Math.abs(y) * size.height / 2) / _radius;
    }

    return label;
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (!_this) {
      return;
    }

    _axisSize = null;
    _bgColor = null;
    _fillColor = null;
    _labelAxes = null;
    _labelAxesFont = null;
    _labelPlanes = null;
    _labelPlanesFont = null;
    _lineColor = null;
    _lineWidth = null;
    _plotAxes = null;
    _plotPlanes = null;
    _size = null;
    _tensor = null;

    _radius = null;
    _height = null;
    _width = null;
    _x0 = null;
    _y0 = null;

    _this = null;
    _initialize = null;
  }, _this.destroy);

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
  _this.getPlaneLine = function (np) {
    var dip,
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

    vertical = (Math.abs(dip - Math.PI / 2)) < Number.EPSILON;
    if (vertical) {
      x.push(Math.sin(strike), Math.sin(strike + Math.PI));
      y.push(Math.cos(strike), Math.cos(strike + Math.PI));
    } else {
      tanDip = Math.tan(dip);
      for (j = 0; j <= Math.PI; j += _D2R) {
        // dip from [0,0,0] to intersection of plane and focal sphere
        // at azimuth `strike + j`
        dip = Math.atan(tanDip * Math.sin(j));
        point = _this.getPoint(strike + j, dip);
        x.push(point.x);
        y.push(point.y);
      }
    }

    return {
      x: x,
      y: y
    };
  };

  /**
   * Get x, y coordinates for a vector.
   *
   * @param vector {Vector}
   *     vector reprenenting point.
   * @return {Object}
   *     with properties `x` and `y` in the range [-1, 1] representing location
   *     of point in focal sphere.
   */
  _this.getPoint = function (azimuth, plunge) {
    var r,
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
  };

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
  _this.getPolygons = function (tensor) {
    var alphan,
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
    f = (-n.v / t.v) || Number.EPSILON;
    iso = (vi / t.v) || Number.EPSILON;

    // build azes
    swapColors = false;
    for (i = 0; i < 360; i++) {
      fir = i * _D2R;
      sfi = Math.sin(fir);
      cfi = Math.cos(fir);
      s2alphan = (2 + 2 * iso) / (3 + (1 - 2 * f) * Math.cos(2 * fir));
      if (s2alphan > 1) {
        // swap axes
        tmp = t;
        t = p;
        p = tmp;
        // swap bg/fill colors
        swapColors = true;
        // recompute f, iso, s2alphan
        f = (-n.v / t.v) || Number.EPSILON;
        iso = (vi / t.v) || Number.EPSILON;
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
      if (Math.abs(xn) < Number.EPSILON && Math.abs(xe) < Number.EPSILON) {
        az = 0;
        takeoff = 0;
      } else {
        az = __0To2Pi(Math.atan2(xe, xn));
        takeoff = Math.acos(xz / Math.sqrt(xz*xz + xn*xn + xe*xe));
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
    polygons = _this.mergePolygons(polygons);
    polygons = polygons.map(_this.completePolygon);
    polygons.swapColors = swapColors;
    return polygons;
  };

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
  _this.getVectorPoint = function (vector) {
    return _this.getPoint(
      (Math.PI / 2) - vector.azimuth(),
      vector.plunge()
    );
  };

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
  _this.measureText = function (text, font) {
    var el,
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

    // add to view element and measure
    _this.el.appendChild(el);
    size = {
      height: el.scrollHeight,
      width: el.scrollWidth
    };

    // clean up
    _this.el.removeChild(el);
    el = null;

    return size;
  };

  /**
   * Label an axis.
   *
   * @param axis {Vector}
   *     axis to label.
   * @param text {String}
   *     axis label.
   */
  _this.labelAxis = function (axis, text) {
    var point;

    point = _this.getVectorPoint(axis);
    _canvas.text(text,
        _labelAxesFont,
        _this.projectX(point.x),
        _this.projectY(point.y),
        null,
        'black',
        'center');
  };

  /**
   * Draw an azimuth label.
   *
   * @param label {Object}
   *     label object with `azimuth`, `text`, and `font` properties.
   */
  _this.labelAzimuth = function (label) {
    var tick;

    if (!('size' in label)) {
      label = _this.computeAzimuthLabel(label);
    }

    tick = label.tick;
    _canvas.line(
        tick.x.map(_this.projectX),
        tick.y.map(_this.projectY),
        'black');

    _canvas.text(label.text, label.font,
        _this.projectX(label.x),
        _this.projectY(label.y),
        null,
        'black',
        label.align);
  };

  /**
   * Adjust size to make room for azimuth labels.
   *
   * Updates _canvas, _height, _width, _x0, and _y0.
   * Resets canvas content, any rendering should occur after calling.
   *
   * @param label {Object}
   *     label object with `azimuth`, `text`, and `font` properties.
   */
  _this.makeRoomForAzimuthLabel = function (label) {
    var bottom,
        left,
        right,
        size,
        top,
        x,
        y;

    if (!('size' in label)) {
      label = _this.computeAzimuthLabel(label);
    }

    x = _this.projectX(label.x);
    y = _this.projectY(label.y);
    size = label.size;

    // measure actual top/right/bottom/left
    bottom = 0;
    left = 0;
    right = 0;
    top = 0;
    bottom = y - size.height;
    top = y + size.height;
    if (label.align === 'left') {
      left = x;
      right = x + size.width;
    } else {
      left = x - size.width;
      right = x;
    }

    // convert from actual size to relative size increase
    if (bottom < 0) {
      bottom = Math.abs(bottom);
    } else {
      bottom = 0;
    }
    if (top > _height) {
      top = top - _height;
    } else {
      top = 0;
    }
    if (left < 0) {
      left = Math.abs(left);
    } else {
      left = 0;
    }
    if (right > _width) {
      right = right - _width;
    } else {
      right = 0;
    }

    // change size
    _width = _width + left + right;
    _x0 = _x0 + left;
    _height = _height + top + bottom;
    _y0 = _y0 + top;
  };

  /**
   * Merge adjacent lines that should be part of the same polygon.
   *
   * @param polygons {Array<Object>}
   *     array of polygons to potentially merge.
   * @return {Array<Object>}
   *     array of polygons that remain after any merges.
   */
  _this.mergePolygons = function (polygons) {
    var i,
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
  };

  /**
   * Convert a relative x coordinate to a canvas pixel coordinate.
   *
   * @param x {Number}
   *     relative x coordinate.
   * @return {Number}
   *     canvas pixel x coordinate.
   */
  _this.projectX = function (x) {
    return _x0 + _radius * x;
  };

  /**
   * Convert a relative y coordinate to a canvas pixel coordinate.
   *
   * @param y {Number}
   *     relative y coordinate.
   * @return {Number}
   *     canvas pixel y coordinate.
   */
  _this.projectY = function (y) {
    return _height - (_y0 + _radius * y);
  };

  /**
   * Render view based on current model settings.
   */
  _this.render = function () {
    var azimuthLabels,
        point,
        polygons,
        tmp,
        x,
        y;

    azimuthLabels = [];
    // create azimuth labels, for now only nodal planes.
    if (_labelPlanes) {
      [_tensor.NP1, _tensor.NP2].forEach(function (np) {
        var azimuth,
            text;

        azimuth = np.strike * _D2R;
        text = '(' +
            np.strike.toFixed(0) + ', ' +
            np.dip.toFixed(0) + ', ' +
            np.rake.toFixed(0) +
            ')';
        azimuthLabels.push({
          'azimuth': azimuth,
          'font': _labelPlanesFont,
          'text': text
        });
      });
    }
    // adjust plot area so labels are visible.
    azimuthLabels.forEach(_this.makeRoomForAzimuthLabel);

    _canvas = Canvas({
      height: _height,
      width: _width
    });
    _canvas.context.lineWidth = _lineWidth;

    // get polygons
    // represents either solid regions (swapColors = false),
    // or holes (swapColors = true)
    polygons = _this.getPolygons(_tensor);
    if (polygons.swapColors) {
      tmp = _bgColor;
      _bgColor = _fillColor;
      _fillColor = tmp;
    }

    // center of beachball.
    x = _this.projectX(0);
    y = _this.projectY(0);

    // plot circle outline, with background color
    // in case polygons represent holes
    _canvas.circle(x, y, _radius * 2, _lineColor, _bgColor);

    // draw polygons
    polygons.forEach(function(p) {
      _canvas.polygon(
          p.x.map(_this.projectX),
          p.y.map(_this.projectY),
          _lineColor,
          _fillColor);
    });

    // draw nodal plane lines
    if (_plotPlanes) {
      [_tensor.NP1, _tensor.NP2].forEach(function (np) {
        var line;
        line = _this.getPlaneLine(np);
        _canvas.line(
            line.x.map(_this.projectX),
            line.y.map(_this.projectY),
            _lineColor);
      });
    }

    // plot circle without fill, in case polygons covered outline.
    _canvas.circle(x, y, _radius * 2, _lineColor);

    if (_labelAxes) {
      _this.labelAxis(_tensor.P, 'P');
      _this.labelAxis(_tensor.T, 'T');
    } else if (_plotAxes) {
      point = _this.getVectorPoint(_tensor.P);
      _canvas.circle(point.x, point.y, _axisSize, 'white', 'black');
      point = _this.getVectorPoint(_tensor.T);
      _canvas.circle(point.x, point.y, _axisSize, 'black', 'white');
    }

    // draw azimuth labels
    azimuthLabels.forEach(_this.labelAzimuth);

    Util.empty(_this.el);
    _this.el.appendChild(_canvas.canvas);
    _canvas.destroy();
    _canvas = null;
  };


  _initialize(options);
  options = null;
  return _this;
};


BeachBallView.zeroToTwoPi = __0To2Pi;


module.exports = BeachBallView;
