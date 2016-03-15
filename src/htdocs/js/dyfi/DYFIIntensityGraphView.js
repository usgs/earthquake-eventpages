'use strict';


var ContentView = require('core/ContentView'),
    d3 = require('d3'),
    D3LineView = require('d3/D3LineView'),
    D3View = require('d3/D3View'),
    StandardDevationLineView = require('dyfi/StandardDeviationLineView'),
    Util = require('util/Util');


/**
 * This class extends the {ContentView} class and is specifically used
 * for rendering "dyfi_plot_atten.json" for the dyfi product.
 *
 * @param options {Object}
 *     An object containing configuration options for this view.
 *
 */
var DYFIIntensityGraphView = function (options) {
  var _this,

      _graph;

    _this = ContentView(options);

  /**
   * Adds a line view to the D3View (w/ connecting lines, this function is
   * called to build the line view when, dataset.class: "estimated1" or
   * class: "estimated2".
   *
   * @param {object} dataset
   *    an object used to describe a set of data
   *
   *    dataset.class = identifier for type of data
   *    dataset.legend = the dataset name, used by the legend
   *    dataset.data = the point data to plot
   */
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

  /**
   * Adds a line view to the D3View (w/o connecting lines), this function is
   * called to build the line view when, dataset.class: "median".
   *
   * @param {object} dataset
   *    an object used to describe a set of data
   *
   *    dataset.class = identifier for type of data
   *    dataset.legend = the dataset name, used by the legend
   *    dataset.data = the point data to plot
   */
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

  /**
   * Adds a scatter plot D3View, this function is called to build
   * the line view when, dataset.class: "scatterplot1".
   *
   * @param {object} dataset
   *    an object used to describe a set of data
   *
   *    dataset.class = identifier for type of data
   *    dataset.legend = the dataset name, used by the legend
   *    dataset.data = the point data to plot
   */
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

  /**
   * Adds a StandardDeviationLineView to the D3View, this function is called
   * to graph the standard devaiation binned data when, dataset.class: "binned"
   *
   * @param {object} dataset
   *    an object used to describe a set of data
   *
   *    dataset.class = identifier for type of data
   *    dataset.legend = the dataset name, used by the legend
   *    dataset.data = the point data to plot
   */
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

  /**
   * Unbind event listeners and free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }
    if (_graph) {
      _graph.views.forEach(function (view) {
        view.destroy();
      });
      _graph.destroy();
      _graph = null;
    }
    _this = null;
  }, _this.destroy);

  /**
   * Builds the D3View that will display all of the datasets returned by the
   * ContentView.fetchData Xhr request.
   *
   * @param {object} data
   *    Data returned by the Xhr request for dyfi_plot_atten.json
   */
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

  /**
   * Scans all datasets returned in the XHR response and determines
   * which type of view will be added to the D3View.
   *
   * @param {array} data
   *    An array of datasets to be plotted in the D3View
   */
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

  /**
   * Massages the point data into a new format that is expected by the
   * D3LineView and StandardDevationLineView.
   *
   * @param {array} dataPoints
   *    An array of objects that contain "x" and "y" attributes that represent
   *    point data.
   */
  _this.parseDataIntoArray = function (dataPoints) {
    var data;

    data = [];
    dataPoints.forEach(function (point) {
      data.push([point.x, point.y]);
    });

    return data;
  };

  options = null;
  return _this;
};

module.exports = DYFIIntensityGraphView;