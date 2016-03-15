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
  canvas: null,
  fillColor: '#ddd',
  height: null,
  labelAxes: false,
  labelAxesFont: '24px Arial',
  labelPlanes: false,
  labelPlanesFont: '14px Arial',
  lineColor: '#000',
  lineWidth: 0.25,
  plotAxes: true,
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

      _swapColors;

  _this = View(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS,
        _this.model.get(),
        options,
        // in case model was passed to View
        {model: null});
    _this.model.set(options, {silent: true});
    options = _this.model.get();
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
  _this.getPoint = function (vector) {
    var azimuth,
        plunge,
        r,
        x,
        y;

    azimuth = (Math.PI / 2) - vector.azimuth();
    plunge = vector.plunge();
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
        _swapColors = !_swapColors;
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
    return polygons;
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
   * Render view based on current model settings.
   */
  _this.render = function () {
    var bgColor,
        canvas,
        fillColor,
        height,
        line,
        lineColor,
        lineWidth,
        model,
        polygons,
        projectX,
        projectY,
        radius,
        size,
        tensor,
        tmp,
        width,
        x0,
        y0;

    model = _this.model.get();
    bgColor = model.bgColor;
    fillColor = model.fillColor;
    lineColor = model.lineColor;
    lineWidth = model.lineWidth;
    tensor = model.tensor;
    size = model.size;
    // these have defaults based on size
    height = model.height || size;
    radius = model.radius || parseInt((size - 2) / 2, 10);
    width = model.width || size;
    x0 = model.x0 || (width / 2);
    y0 = model.y0 || (height / 2);

    canvas = Canvas({
      height: height,
      width: width
    });
    Util.empty(_this.el);
    _this.el.appendChild(canvas.canvas);

    projectX = function (x) {
      return x0 + radius * x;
    };

    projectY = function (y) {
      return height - (y0 + radius * y);
    };

    _swapColors = false;
    polygons = _this.getPolygons(tensor);
    if (_swapColors) {
      tmp = bgColor;
      bgColor = fillColor;
      fillColor = tmp;
    }

    // plot circle outline, with background color
    // in case polygons represent holes
    canvas.circle(x0, y0, radius * 2, lineColor, bgColor);

    // polygons
    polygons.forEach(function(p) {
      canvas.polygon(p.x.map(projectX), p.y.map(projectY), lineColor, fillColor);
    });

    // nodal plane lines
    line = _this.getPlaneLine(tensor.NP1);
    canvas.line(line.x.map(projectX), line.y.map(projectY), lineColor);
    line = _this.getPlaneLine(tensor.NP2);
    canvas.line(line.x.map(projectX), line.y.map(projectY), lineColor);

    // plot circle without fill, in case polygons covered outline.
    canvas.circle(x0, y0, radius * 2, lineColor);

    canvas.destroy();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = BeachBallView;
