'use strict';

var d3 = require('d3'),
    D3View = require('d3/D3View'),
    D3LineView = require('d3/D3LineView'),
    //D3SubView = require('d3/D3SubView'),
    Util = require('util/Util');

var IntensityGraphView = function (options) {
  var _this,
      _initialize,

      _buildBinnedDataView,
      _buildLineView,
      _buildMedianDataView,
      _buildScatterPlotView,
      _drawStandardDeviation,
      _getStandardDeviationPoints,
      _parseData,
      _parseDataIntoArray;

  _this = D3View(Util.extend({
    title: 'Intensity vs. Distance Plot',
    xLabel: 'Hypocentral Distance (km)',
    yLabel: 'Intensity (mmi)',
    xAxisScale: d3.scale.log(),
    xAxisTicks: [100,200,500,1000],
    xAxisFormat: function (value) {
      return value;
    },
    xExtent: [100,1000],
    yAxisTicks: [1,2,3,4,5,6,7,8,9,10],
    yExtent: [1,10]
  }, options));

  _initialize = function (options) {
    _this.el.classList.add('IntensityGraphView');
    _this.data = options.data || {};
    if (options.data && options.data.length && options.data.length > 0) {
      _parseData();
    } else {
      _this.el.innerHTML = '<p class="alert error">Sorry Brah, no data.</p>';
    }
  };

  _parseData = function () {
    _this.data.forEach(function (dataset) {
      if (dataset.class === 'estimated1' ||
          dataset.class === 'estimated2') {
        _buildLineView(dataset);
      }
      if (dataset.class === 'scatterplot1') {
        _buildScatterPlotView(dataset);
      }
      if (dataset.class === 'median') {
        _buildMedianDataView(dataset);
      }
      if (dataset.class === 'binned') {
        _buildBinnedDataView(dataset);
      }
    });
    console.log(_this.data);
  };

  _parseDataIntoArray = function (dataPoints) {
    var data;

    data = [];
    dataPoints.forEach(function (point) {
      data.push([point.x, point.y]);
    });

    return data;
  };

  _buildLineView = function (dataset) {
    var line = D3LineView({
      view: _this,
      showPoints: (dataset.showPoints ? dataset.showPoints : false),
      data: _parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      showLegendPoint: false
    });
    _this.views.add(line);
  };

  _buildScatterPlotView = function (dataset) {
    var scatterplot = D3LineView({
      view: _this,
      showLine: false,
      data: _parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      pointRadius: 2
    });
    _this.views.add(scatterplot);
  };


  _buildMedianDataView = function (dataset) {
    var medianData = D3LineView({
      view: _this,
      showLine: false,
      data: _parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      pointRadius: 4
    });
    _this.views.add(medianData);
  };


  _buildBinnedDataView = function (dataset) {
    _drawStandardDeviation(dataset.data);

    var binnedData = D3LineView({
      view: _this,
      showLine: false,
      data: _parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      pointRadius: 6
    });
    _this.views.add(binnedData);

  };

  _drawStandardDeviation = function (dataset) {
    // loop through each data point and draw the STDEV
    dataset.forEach(function (data) {
      var standardDeviationData = D3LineView({
        view: _this,
        showPoints: false,
        data: _getStandardDeviationPoints(data),
        className: 'stdev',
        legend: null
      });
      _this.views.add(standardDeviationData);
    });
  };

  _getStandardDeviationPoints = function (point) {
    var stdev;

    stdev = [
      [point.x, point.y],
      [point.x, (point.y + point.stdev)], // top-middle
      [(point.x - 15), (point.y + point.stdev)], // top-left
      [(point.x + 15), (point.y + point.stdev)], // top-right
      [point.x, (point.y + point.stdev)], // top-middle
      [point.x, (point.y - point.stdev)], // bottom-middle
      [(point.x - 15), (point.y - point.stdev)], // bottom-left
      [(point.x + 15), (point.y - point.stdev)], // bottom-right
    ];

    return stdev;
  };

    /**
   * Unbind event listeners and free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _buildBinnedDataView = null;
    _buildLineView = null;
    _buildMedianDataView = null;
    _buildScatterPlotView = null;
    _drawStandardDeviation = null;
    _getStandardDeviationPoints = null;
    _parseData = null;
    _parseDataIntoArray = null;
    _initialize = null;
    _this = null;

  }, _this.destroy);

  _initialize(options);
  options = null;
  return _this;
};

module.exports = IntensityGraphView;