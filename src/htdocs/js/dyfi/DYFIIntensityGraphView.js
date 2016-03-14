'use strict';


var ContentView = require('core/ContentView'),
    d3 = require('d3'),
    D3LineView = require('d3/D3LineView'),
    D3View = require('d3/D3View'),
    Formatter = require('core/Formatter'),
    StandardDevationLineView = require('impact/StandardDeviationLineView'),
    Util = require('util/Util');


/**
 * This class extends the {ContentView} class and is specifically used
 * for rendering "contents.xml" for a given product. The `options.model` should
 * be of type {Content}.
 *
 *
 * @param options {Object}
 *     An object containing configuration options for this view.
 *
 * @param options.formatter {Formatter}
 *     The formatter object to use for formatting intrinsic values.
 */
var DYFIIntensityGraphView = function (options) {
  var _this,
      _initialize,

      _formatter,
      _graph;

    _this = ContentView(options);

  /**
   * @Constructor
   *
   * Initializes the view. See class level documentation for details.
   */
  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.buildLineView = function (dataset) {
    var line = D3LineView({
      view: _graph,
      showPoints: (dataset.showPoints ? dataset.showPoints : false),
      data: _this.parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      showLegendPoint: false
    });
    _graph.views.add(line);
  };

  _this.buildMedianDataView = function (dataset) {
    var medianData = D3LineView({
      view: _graph,
      showLine: false,
      data: _this.parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      pointRadius: 3
    });
    _graph.views.add(medianData);
  };

  _this.buildScatterPlotView = function (dataset) {
    var scatterplot = D3LineView({
      view: _graph,
      showLine: false,
      data: _this.parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      pointRadius: 2
    });
    _graph.views.add(scatterplot);
  };

  _this.buildStandardDeviationLineView = function (dataset) {
    var standardDevationLineView = StandardDevationLineView({
      view: _graph,
      data: _this.parseDataIntoArray(dataset.data),
      histogram: dataset.data,
      className: dataset.class,
      label: dataset.legend,
      pointRadius: 5,
      showLine: false
    });
    _graph.views.add(standardDevationLineView);
  };


  _this.onSuccess = function (data) {
    var datasets;

    datasets = data.datasets;

    if (datasets && datasets.length && datasets.length > 0) {
      _graph = D3View(Util.extend({
        title: 'Intensity vs. Distance Plot',
        xLabel: 'Hypocentral Distance (km)',
        yLabel: 'Intensity (mmi)',
        xAxisScale: d3.scale.log(),
        xAxisFormat: function (value) {
          return value;
        },
        yAxisTicks: [1,2,3,4,5,6,7,8,9,10],
        yExtent: [1,10],
        marginLeft: 10,
        paddingLeft:70
      }, options));
      _this.el.innerHTML = '';
      _this.el.classList.add('IntensityGraphView');
      _this.el.appendChild(_graph.el);
      _this.parseData(datasets);
    } else {
      _this.el.innerHTML = '<p class="alert warning">Intensity vs. Distance ' +
          'data does not exist.</p>';
    }
  };

  _this.parseData = function (data) {
    data.forEach(function (dataset) {
      if (dataset.class === 'estimated1' ||
          dataset.class === 'estimated2') {
        _this.buildLineView(dataset);
      }
      if (dataset.class === 'scatterplot1') {
        _this.buildScatterPlotView(dataset);
      }
      if (dataset.class === 'median') {
        _this.buildMedianDataView(dataset);
      }
      if (dataset.class === 'binned') {
        _this.buildStandardDeviationLineView(dataset);
      }
    });
  };

  _this.parseDataIntoArray = function (dataPoints) {
    var data;

    data = [];
    dataPoints.forEach(function (point) {
      data.push([point.x, point.y]);
    });

    return data;
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = DYFIIntensityGraphView;