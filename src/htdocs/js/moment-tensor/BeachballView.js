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
  bgColor: '#fff',
  fillColor: '#ddd',
  height: null,
  labelAxes: true,
  labelAxesFont: '24px Arial',
  labelPlanes: false,
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
      _swapColors,
      _tensor,
      _width,
      _x0,
      _y0;

  _this = View(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _bgColor = options.bgColor;
    _canvas = null;
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
        i,
        j,
        qpi,
        r,
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
      qpi = Math.PI / 4;
      tanDip = Math.tan(dip);

      /**
       * j starts at strike, and moves halfway around plane z=0
       *
       * Math.atan(tanDip * Math.sin(j)) computes the effective dip angle
       * from the plane z=0 to the intersection of the dipping plane, beneath
       * the azimuth strike + j.
       *
       * Math.sqrt(1 - effectiveDip) is the the distance from the origin in
       * the plane z=0 to where the dipping plane intersects the focal sphere
       * at azimuth (from north) strike + j.
       */
      for (j = 0; j <= Math.PI; j += _D2R) {
        i = strike + j;
        r = Math.sqrt(1 - Math.sin(Math.atan(tanDip * Math.sin(j))));
        x.push(r * Math.sin(i));
        y.push(r * Math.cos(i));
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

  _this.getVectorPoint = function (vector) {
    return _this.getPoint(
      (Math.PI / 2) - vector.azimuth(),
      vector.plunge()
    );
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
        swapColors = !swapColors;
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

  _this.measureText = function (text, font) {
    var el,
        size;

    el = document.createElement('div');
    el.setAttribute('style',
        'height:auto;' +
        'position:absolute;' +
        'visibility:hidden;' +
        'white-space:nowrap' +
        'width:auto;' +
        'font:' + font + ';');
    _this.el.appendChild(el);
    size = {
      height: el.scrollHeight,
      width: el.scrollWidth
    };

    _this.el.removeChild(el);
    el = null;

    return size;
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


  _this.projectX = function (x) {
    return _x0 + _radius * x;
  };

  _this.projectY = function (y) {
    return _height - (_y0 + _radius * y);
  };

  /**
   * Render view based on current model settings.
   */
  _this.render = function () {
    var point,
        polygons,
        tmp;

    Util.empty(_this.el);
    _canvas = Canvas({
      height: _height,
      width: _width
    });
    _this.el.appendChild(_canvas.canvas);


    _swapColors = false;
    polygons = _this.getPolygons(_tensor);
    if (polygons.swapColors) {
      tmp = _bgColor;
      _bgColor = _fillColor;
      _fillColor = tmp;
    }

    // plot circle outline, with background color
    // in case polygons represent holes
    _canvas.circle(_x0, _y0, _radius * 2, _lineColor, _bgColor);

    // polygons
    polygons.forEach(function(p) {
      _canvas.polygon(
          p.x.map(_this.projectX),
          p.y.map(_this.projectY),
          _lineColor,
          _fillColor);
    });

    // nodal plane lines
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

    if (_labelAxes) {
      point = _this.getVectorPoint(_tensor.P);
      _canvas.text('P',
          _labelAxesFont,
          _this.projectX(point.x),
          _this.projectY(point.y),
          null,
          'black',
          'center');
      point = _this.getVectorPoint(_tensor.T);
      _canvas.text('T',
          _labelAxesFont,
          _this.projectX(point.x),
          _this.projectY(point.y),
          null,
          'black',
          'center');
    }

    // plot circle without fill, in case polygons covered outline.
    _canvas.circle(_x0, _y0, _radius * 2, _lineColor);

    _canvas.destroy();
    _canvas = null;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = BeachBallView;
