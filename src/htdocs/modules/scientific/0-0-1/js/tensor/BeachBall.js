/* global define */
/* This is based on code in GMT, utilmeca.c. */
define([
	'./Canvas'
], function (
	Canvas
) {
	'use strict';

	// globals
	var sin = Math.sin,
	    asin = Math.asin,
	    cos = Math.cos,
	    acos = Math.acos,
	    tan = Math.tan,
	    atan = Math.atan,
	    atan2 = Math.atan2,
	    sqrt = Math.sqrt,
	    abs = Math.abs,
	    SQRT2 = Math.SQRT2,
	    PI = Math.PI,
	    TWO_PI = 2 * PI,
	    HALF_PI = PI / 2,
	    QUARTER_PI = PI / 4,
	    D2R = PI / 180,
	    EPSILON = -1e-16;

	/**
	 * Normalize a value into a range.
	 *
	 * @param value {Number}
	 *        value to normalize.
	 * @param min {Number}
	 *        range minimum.
	 * @param max {Number}
	 *        range maximum.
	 * @return {Number} normalized value.
	 */
	var _range = function (value, min, max) {
		var range = max - min;
		while (value < min) {
			value += range;
		}
		while (value >= max) {
			value -= range;
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
	var _axisCache = function (axis) {
		var azimuth = axis.azimuth(),
		    plunge = axis.plunge();

		// make axis plunge downward (negative values are up)
		if (plunge < 0) {
			plunge *= -1;
			azimuth += PI;
		}
		// make azimuth in range [0, 2*PI)
		azimuth = _range(azimuth, 0, TWO_PI);

		return {
			v: axis.value,
			a: azimuth,
			ca: cos(azimuth),
			sa: sin(azimuth),
			p: plunge,
			cp: cos(plunge),
			sp: sin(plunge)
		};
	};


	/**
	 * Construct a new BeachBall object.
	 *
	 * @param options {Object}
	 */
	var BeachBall = function (options) {
		var size = options.size || 200,
		    radius = parseInt(options.radius || (size - 2) / 2, 10);

		this._tensor = options.tensor;
		this._x0 = options.x0 || radius+1;
		this._y0 = options.y0 || radius+1;
		this._radius = radius;
		this._bgColor = options.bgColor || '#fff';
		this._fillColor = options.fillColor || '#ddd';
		this._lineColor = options.lineColor || '#000';
		this._lineWidth = options.lineWidth || 0.25;
		this._plotAxes = (options.plotAxes !== false);
		this._plotPlanes = (options.plotPlanes !== false);
		this._canvas = options.canvas || new Canvas({
			width: size,
			height: size
		});

		this._plot();
	};


	/**
	 * Get the canvas.
	 *
	 * @return {CanvasElement} canvas with beachball plot.
	 */
	BeachBall.prototype.getCanvas = function () {
		return this._canvas.canvas;
	};

	/**
	 * Plot the beachball on the canvas.
	 */
	BeachBall.prototype._plot = function () {
		var tensor = this._tensor,
		    x0 = this._x0,
		    y0 = this._y0,
		    radius = this._radius,
		    size = radius * 2,
		    axisSize = parseInt(radius / 12.5, 10),
		    canvas = this._canvas,
		    c = canvas.context,
		    lineColor = this._lineColor,
		    lineWidth = this._lineWidth,
		    lines,
		    line,
		    xy,
		    i;

		// make y axis go up
		c.save();
		c.translate(0, canvas.canvas.height);
		c.scale(1, -1);
		c.lineWidth = lineWidth;

		// this may change fg/bg colors
		lines = this._getPolygons();

		// outline of beachball
		canvas.circle(x0, y0, size, lineColor, this._bgColor);

		// polygons
		for (i = 0; i < lines.length; i++) {
			line = lines[i];
			canvas.polygon(line.x, line.y, lineColor, this._fillColor);
		}

		if (this._plotPlanes) {
			line = this._getPlaneLine(tensor.NP1);
			canvas.line(line.x, line.y, lineColor);
			line = this._getPlaneLine(tensor.NP2);
			canvas.line(line.x, line.y, lineColor);
		}

		if (this._plotAxes) {
			xy = this._getPoint(tensor.P.azimuth(), tensor.P.plunge());
			canvas.circle(xy.x, xy.y, axisSize, 'white', 'black');
			xy = this._getPoint(tensor.T.azimuth(), tensor.T.plunge());
			canvas.circle(xy.x, xy.y, axisSize, 'black', 'white');
		}

		// outline of beachball, without fill...
		canvas.circle(x0, y0, size, lineColor);

		c.restore();
	};

	/**
	 * Project a vector into xy coordinates.
	 *
	 * @param azimuth of vector.
	 * @param plunge of vector.
	 * @return {Object} with keys x and y; values are pixel coordinates.
	 */
	BeachBall.prototype._getPoint = function (azimuth, plunge) {
		var x0 = this._x0,
		    y0 = this._y0,
		    radius = this._radius,
		    r;

		if (plunge < 0) {
			plunge *= -1;
			azimuth += PI;
		}
		azimuth = _range(azimuth, 0, TWO_PI);

		r = Math.min(sqrt(1 - sin(plunge)), 0.97);
		return {
			x: x0 + radius * r * sin(azimuth),
			y: y0 + radius * r * cos(azimuth)
		};
	};

	/**
	 * Get Polygons representing pressure and tension regions of the beachball.
	 *
	 * May swap foreground and background colors.
	 *
	 * @return {Array<Object>} each object will have properties:
	 *         x: {Array<Number>} x coordinates of line,
	 *         y: {Array<Number} y coordinates of line,
	 *         startAz: {Object} start azimuth of line,
	 *         endAz: {Object} end azimuth of line.
	 */
	BeachBall.prototype._getPolygons = function () {
		var x0 = this._x0,
		    y0 = this._y0,
		    radius = this._radius,
		    mergeThreshold = radius / 8,
		    tensor = this._tensor,
		    T = _axisCache(tensor.T),
		    N = _axisCache(tensor.N),
		    P = _axisCache(tensor.P),
		    vi,
		    f,
		    iso,
		    fir,
		    sfi,
		    cfi,
		    s2alphan,
		    tmp,
		    takeoff,
		    alphan,
		    az,
		    azp,
		    xe,
		    xn,
		    xz,
		    c,
		    s,
		    azes = [],
		    lines = [],
		    line,
		    i,
		    nextI,
		    l1,
		    l2,
		    l1x,
		    l1y,
		    l2x,
		    l2y,
		    x,
		    y,
		    az1,
		    az2;

		vi = (T.v + N.v + P.v) / 3;
		T.v -= vi;
		N.v -= vi;
		P.v -= vi;

		// compute f, iso
		f = (-N.v / T.v) || EPSILON;
		iso = (vi / T.v) || EPSILON;

		// build azes
		for (i = 0; i < 360; i++) {
			fir = i * D2R;
			sfi = sin(fir);
			cfi = cos(fir);
			s2alphan = (2 + 2 * iso) / (3 + (1 - 2 * f) * cos(2 * fir));
			if (s2alphan > 1) {
				// swap axes
				tmp = T;
				T = P;
				P = tmp;
				// swap bg/fill colors
				tmp = this._bgColor;
				this._bgColor = this._fillColor;
				this._fillColor = tmp;
				// recompute f, iso, s2alphan
				f = (-N.v / T.v) || EPSILON;
				iso = (vi / T.v) || EPSILON;
				s2alphan = (2 + 2 * iso) / (3 + (1 - 2 * f) * cos(2 * fir));
			}
			// compute z,n,e components
			alphan = asin(sqrt(s2alphan));
			s = sin(alphan);
			c = cos(alphan);
			xz = c * T.sp        + s * sfi * N.sp        + s * cfi * P.sp;
			xn = c * T.cp * T.ca + s * sfi * N.cp * N.ca + s * cfi * P.cp * P.ca;
			xe = c * T.cp * T.sa + s * sfi * N.cp * N.sa + s * cfi * P.cp * P.sa;
			// compute azimuth and takeoff angle
			if (abs(xn) < EPSILON && abs(xe) < EPSILON) {
				az = 0;
				takeoff = 0;
			} else {
				az = _range(atan2(xe, xn), 0, TWO_PI);
				takeoff = acos(xz / sqrt(xz*xz + xn*xn + xe*xe));
				if (takeoff > HALF_PI) {
					az = _range(az + PI, 0, TWO_PI);
					takeoff = PI - takeoff;
				}
			}
			// save for later
			azes.push({
				az: az,
				takeoff: takeoff,
				r: SQRT2 * sin(takeoff / 2)
			});
		}

		// build lines
		line = null;
		for (i = 0; i < azes.length; i++) {
			az = azes[i];
			azp = azes[(i === 0) ? azes.length - 1 : i - 1];
			if (abs(abs(az.az - azp.az) - PI) < 10*D2R) {
				// end a line
				if (line !== null) {
					line.endAz = azp;
					lines.push(line);
					line = null;
				}
			}
			if (line === null) {
				// start a line
				line = {
					x: [],
					y: [],
					startAz: az,
					endAz: null
				};
			}
			// add point to current line
			line.x.push(x0 + radius * az.r * sin(az.az));
			line.y.push(y0 + radius * az.r * cos(az.az));
		}
		// close last line
		line.endAz = azes[azes.length - 1];
		lines.push(line);

		if (lines.length > 1) {
			// merge adjacent lines
			for (i = 0; i < lines.length; i++) {
				nextI = (i === lines.length - 1 ? 0 : i + 1);
				l1 = lines[i];
				l1x = l1.x;
				l1y = l1.y;
				l2 = lines[nextI];
				l2x = l2.x;
				l2y = l2.y;
				if (abs(l1x[l1x.length - 1] - l2x[0]) < mergeThreshold &&
						abs(l1y[l1y.length - 1] - l2y[0]) < mergeThreshold) {
					// merge lines
					l1x.push.apply(l1x, l2x);
					l1y.push.apply(l1y, l2y);
					l1.endAz = l2.endAz;
					lines.splice(nextI, 1);
				}
			}

			// fill in incomplete polygons
			if (lines.length > 1) {
				for (i = 0; i < lines.length; i++) {
					line = lines[i];
					az1 = line.startAz.az;
					az2 = line.endAz.az;
					x = line.x;
					y = line.y;
					// fill in circle portion of polygons
					if (az1 - az2 > PI) {
						az1 -= TWO_PI;
					}
					if (az2 - az1 > PI) {
						az1 += TWO_PI;
					}
					if (az1 < az2) {
						for (az = az2 - D2R; az > az1; az -= D2R) {
							x.push(x0 + radius * sin(az));
							y.push(y0 + radius * cos(az));
						}
					} else {
						for (az = az2 + D2R; az < az1; az += D2R) {
							x.push(x0 + radius * sin(az));
							y.push(y0 + radius * cos(az));
						}
					}
				}
			}
		}

		return lines;
	};

	/**
	 * Get a line for a nodal plane.
	 *
	 * @param np {Object}
	 *        nodal plane, should have strike and dip keys; values in degrees.
	 * @return {Object} with x and y keys; values are arrays of coordinates.
	 */
	BeachBall.prototype._getPlaneLine = function (np) {
		var x0 = this._x0,
		    y0 = this._y0,
		    radius = this._radius,
		    strike = np.strike * D2R,
		    dip = np.dip * D2R,
		    vertical = (abs(dip - QUARTER_PI) < EPSILON),
		    tanDip = tan(dip),
		    x = [],
		    y = [],
		    i,
		    j,
		    r;

		if (vertical) {
			// straight line
			x.push(
					x0 + radius * sin(strike),
					x0 + radius * sin(strike + PI));
			y.push(
					y0 + radius * cos(strike),
					y0 + radius * cos(strike + PI));
		} else {
			for (i = strike, j = 0; j <= 180; j++, i += D2R) {
				r = SQRT2 * sin(QUARTER_PI - (atan(tanDip * sin(i - strike))) / 2);
				x.push(x0 + radius * r * sin(i));
				y.push(y0 + radius * r * cos(i));
			}
		}

		return {
			x: x,
			y: y
		};
	};


	// return constructor
	return BeachBall;
});
