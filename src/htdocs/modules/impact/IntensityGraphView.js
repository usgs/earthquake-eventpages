'use strict';

var d3 = require('d3'),
    D3View = require('d3/D3View'),
    D3LineView = require('d3/D3LineView'),
    StandardDevationLineView = require('impact/StandardDeviationLineView'),
    Util = require('util/Util');

var IntensityGraphView = function (options) {
  var _this,
      _initialize,

      _buildLineView,
      _buildMedianDataView,
      _buildScatterPlotView,
      _buildStandardDeviationLineView,
      _parseData,
      _parseDataIntoArray;

  _this = D3View(Util.extend({
    title: 'Intensity vs. Distance Plot',
    xLabel: 'Hypocentral Distance (km)',
    yLabel: 'Intensity (mmi)',
    xAxisScale: d3.scale.log(),
    //xAxisTicks: [100,200,500,1000],
    xAxisFormat: function (value) {
      return value;
    },
    // xExtent: [100,1000],
    yAxisTicks: [1,2,3,4,5,6,7,8,9,10],
    yExtent: [1,10],
    marginLeft: 10,
    paddingLeft:70
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
        _buildStandardDeviationLineView(dataset);
      }
    });
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


  _buildStandardDeviationLineView = function (dataset) {
    var standardDevationLineView = StandardDevationLineView({
      view: _this,
      data: _parseDataIntoArray(dataset.data),
      histogram: dataset.data,
      className: dataset.class,
      label: dataset.legend,
      pointRadius: 6,
      showLine: false
    });
    _this.views.add(standardDevationLineView);
  };

    /**
   * Unbind event listeners and free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _buildLineView = null;
    _buildMedianDataView = null;
    _buildScatterPlotView = null;
    _buildStandardDeviationLineView = null;
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