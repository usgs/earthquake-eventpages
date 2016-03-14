'use strict';

var d3 = require('d3'),
    ClassList = require('d3/ClassList'),
    D3LineView = require('d3/D3LineView'),
    D3SubView = require('d3/D3SubView'),
    Util = require('util/Util');


/**
 * This class extends the {D3SubView} class and is specifically used
 * for rendering binned standard deviation data as part of a D3LineView
 *
 * @param options {Object}
 *    An object containing configuration options for a D3LineView
 *
 * @param options.histogram {Object}
 *    An array of datapoints with standard deviation data
 *    [ {x: x1, y: y1, stdev: value}, ...]
 */
var StandardDeviationLineView = function (options) {
  var _this,
      _initialize,

      _data,
      _el,
      _histograms,
      _legend,
      _legendLine,
      _lineView,
      _x,
      _y;

  _this = D3SubView(options);

  /**
   * @Constructor
   *
   * Initializes the view. See class level documentation for details.
   */
  _initialize = function (options) {
    ClassList.polyfill(_this.el);
    _this.el.classList.add('StandardDeviationLineView');
    _el = d3.select(_this.el);

    _histograms = _el.append('g');
    _lineView = D3LineView(Util.extend({}, options, {
      el: _el.append('g').node(),
      legend: _this.legend
    }));

    _data = options.histogram;
  };

  /**
   * Renders a point with a histogram (for the standard deviation)
   * on the D3LineView.
   */
  _this.render = function () {
    _x = _this.view.model.get('xAxisScale');
    _y = _this.view.model.get('yAxisScale');

    _lineView.render();
    _histograms.selectAll('*').remove();

    if (_data.length === 0) {
      return;
    }

    // update standard deviation for each point
    _data.forEach(function (point) {
      var el,
          p0y,
          p1y,
          px,
          width;

      if (point.stdev === 0) {
        return;
      }

      width = 6;
      el = _histograms.append('path').attr('class', 'standard-deviation');
      px = _x(point.x);
      p0y = _y(point.y - point.stdev);
      p1y = _y(point.y + point.stdev);
      el.attr('d',
          'M ' + (px - width) + ' ' + p0y +
          'L ' + (px + width) + ' ' + p0y +
          'M ' + (px - width) + ' ' + p1y +
          'L ' + (px + width) + ' ' + p1y +
          'M ' + px + ' ' + p0y +
          'L ' + px + ' ' + p1y
      );
    });

    // update legend 
    if (_lineView.legend) {
      ClassList.polyfill(_this.legend);
      _legend = d3.select(_this.legend);
      _legendLine = _legend.select('path');
      _legendLine.attr('d',
          'M 1  -3 L 24 -3' +
          'M 1  -9 L 1   3' +
          'M 24 -9 L 24  3'
      ).attr('class', 'standard-deviation');
    }
  };

  /**
   * Unbind event listeners and free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _data = null;
    _el = null;
    _histograms = null;
    _legend = null;
    _legendLine = null;
    _lineView = null;
    _x = null;
    _y = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _initialize(options);
  options = null;
  return _this;
};

module.exports = StandardDeviationLineView;
