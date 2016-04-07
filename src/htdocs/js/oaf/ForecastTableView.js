'use strict';


var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var ForecastTableView = function (options) {
  var _this,
      _initialize,

      _formatter;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ContentView(options);

  _initialize = function (options) {
    _this.el.classList.add('oaf-forecast-table-view');
    _this.el.classList.add('horizontal-scrolling');

    _formatter = options.formatter || Formatter();
  };

  _this.destroy = Util.compose(function () {
    _this.el.classList.remove('horizontal-scrolling');
    _this.el.classList.remove('oaf-forecast-table-view');

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.getRowHeader = function (info) {
    var th;

    th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.setAttribute('rowspan', info.bins.length);

    th.innerHTML = [
      info.label,
      '<br/>',
      'Starting on ',
      _formatter.date(new Date(info.timeStart)),
      ' to the end of ',
      _formatter.date(new Date(info.timeEnd))
    ].join('');

    return th;
  };

  _this.getTable = function (data) {
    var table;

    table = document.createElement('table');

    table.innerHTML = [
      '<thead>',
        '<tr>',
          '<th scope="col">',
            'Time Window for Analysis',
          '</th>',
          '<th scope="col">',
            'Magnitude (M) range of aftershocks considered',
          '</th>',
          '<th scope="col">',
            'Most likely number of aftershocks (95 % condidence)',
          '</th>',
          '<th scope="col">',
            'Probability of one or more aftershocks',
          '</th>',
        '</tr>',
      '</thead>'
    ].join('');

    table.appendChild(_this.getTableBody(data));

    return table;
  };

  _this.getTableBody = function (data) {
    var body;

    body = document.createElement('tbody');

    data.forecast.forEach(function (info) {
      body.appendChild(_this.getTableRow(info));
    });

    return body;
  };

  _this.getTableRow = function (info) {
    var fragment,
        row;

    fragment = document.createDocumentFragment();

    row = fragment.appendChild(document.createElement('tr'));
    row.appendChild(_this.getRowHeader(info));

    info.bins.forEach(function (bin, index) {
      var detailRow;

      if (index === 0) {
        detailRow = row;
      } else {
        detailRow = fragment.appendChild(document.createElement('tr'));
      }

      detailRow.appendChild(_this.getTableRowDetails(bin));
    });

    return fragment;
  };

  _this.getTableRowDetails = function (bin) {
    var expCell,
        magCell,
        p95Cell,
        row;

    row = document.createDocumentFragment();

    // Magnitude
    magCell = row.appendChild(document.createElement('td'));
    magCell.innerHTML = '&ge; ' + bin.magnitude;

    // 95 % confidence
    p95Cell = row.appendChild(document.createElement('td'));
    p95Cell.innerHTML = bin.p95minimum + ' to ' + bin.p95maximum;

    // Expectation
    expCell = row.appendChild(document.createElement('td'));
    expCell.innerHTML = bin.probability;

    return row;
  };

  _this.onSuccess = function (data/*, xhr*/) {
    _this.el.innerHTML = '';

    _this.el.appendChild(_this.getTable(data));
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ForecastTableView;
