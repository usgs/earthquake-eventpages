'use strict';


var ContentView = require('core/ContentView'),
    D3LineView = require('d3/D3LineView'),
    D3View = require('d3/D3View'),
    Util = require('util/Util');


/**
 * This class extends the {ContentView} class and is specifically used
 * for rendering "dyfi_plot_numresp.json" for the dyfi product.
 *
 * @param options {Object}
 *     An object containing configuration options for this view.
 *
 */
var DYFIResponsesGraphView = function (options) {
  var _this,
      _initialize,

      _data,
      _graph;

    _this = ContentView(options);


  _initialize = function () {
    _data = [];
  };

  /**
   * Adds a line view to the D3View (w/ connecting lines, this function is
   * called to build the line view when, dataset.class: "histogram"
   *
   * @param {object} dataset
   *    an object used to describe a set of data
   *
   *    dataset.class = identifier for type of data
   *    dataset.legend = the dataset name, used by the legend
   *    dataset.data = the point data to plot
   */
  _this.buildLineView = function (dataset) {
    var line;

    line = D3LineView({
      view: _graph,
      showPoints: (dataset.showPoints ? dataset.showPoints : false),
      data: _this.parseDataIntoArray(dataset.data),
      className: dataset.class,
      label: dataset.legend,
      showLegendPoint: false
    });

    return line;
  };


  /**
   * Unbind event listeners and free references.
   */
  _this.destroy = Util.compose(function () {
    var views;

    if (_this === null) {
      return;
    }

    if (_graph) {
      views = _graph.views.data();
      _graph.views.reset([], {'silent': true});
      views.forEach(function (view) {
        view.destroy();
      });
      _graph.destroy();
      _graph = null;
    }
    _data = null;
    _this = null;
  }, _this.destroy);

  /**
   * Builds the D3View that will display all of the datasets returned by the
   * ContentView.fetchData Xhr request.
   *
   * @param {object} data
   *    Data returned by the Xhr request for dyfi_plot_numresp.json
   */
  _this.onSuccess = function (data) {
    var datasets,
        title,
        xLabel,
        yLabel;

    datasets = data.datasets;
    title = data.title || 'Responses vs Time Plot';
    xLabel = data.xlabel || 'Number of Responses';
    yLabel = data.ylabel || 'Time Since Earthquake';

    if (datasets && datasets.length && datasets.length > 0) {
      _graph = D3View(Util.extend({
        title: title,
        xLabel: xLabel,
        yLabel: yLabel,
        legendPosition: 'bottomright',
        marginTop: 10,
        marginLeft: 10,
        paddingLeft:70
      }, options));
      _this.el.innerHTML = '';
      _this.el.classList.add('ResponsesGraphView');
      _this.el.appendChild(_graph.el);
      _this.parseData(datasets);
    } else {
      _this.el.innerHTML = '<p class="alert warning">' + title +
          ' data does not exist.</p>';
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
    _data = [];

    data.forEach(function (dataset) {
      if (dataset.class === 'histogram') {
        _data.push(_this.buildLineView(dataset));
      }
    });

    // Add all graphs to D3View
    if (_data) {
      _graph.views.addAll(_data);
    }
  };

  /**
   * Massages the point data into a new format that is expected by the
   * D3LineView.
   *
   * @param {array} dataPoints
   *    An array of objects that contain "x" and "y" attributes that represent
   *    point data.
   */
  _this.parseDataIntoArray = function (dataPoints) {
    var data,
        x,
        y;

    data = [];
    dataPoints.forEach(function (point) {
      x = point.x;
      y = point.y;
      // converts x,y values to floats if strings are provided
      if (typeof x === 'string') {
        x = parseFloat(x);
      }
      if (typeof y === 'string') {
        y = parseFloat(y);
      }
      data.push([x, y]);
    });

    return data;
  };


  options = null;
  _initialize();
  return _this;
};


module.exports = DYFIResponsesGraphView;
