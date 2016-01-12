'use strict';

var D3View = require('d3/D3View'),
    D3LineView = require('d3/D3LineView'),
    Util = require('util/Util');

var IntensityGraphView = function (options) {
  var _this,
      _initialize,

      _buildLineView,
      _parseData,
      _parseDataIntoArray;

  _this = D3View(Util.extend({
    title: 'Intensity vs. Distance Plot',
    xLabel: 'Intensity (mmi)',
    yLabel: 'Hypocentral Distance (km)'
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
      if (dataset.class === 'estimated1') {
        _buildLineView(dataset);
      }
      if (dataset.class === 'estimated2') {
        _buildLineView(dataset);
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
      data: _parseDataIntoArray(dataset.data)
    });
    _this.views.add(line);
  };

    /**
   * Unbind event listeners and free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _buildLineView = null;
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