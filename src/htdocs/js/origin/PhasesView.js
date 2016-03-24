'use strict';


var Collection = require('mvc/Collection'),
    DataTable = require('mvc/DataTable'),
    QuakemlView = require('origin/QuakemlView'),
    Util = require('util/Util');


var _DEFAULTS,
    _PHASE_DATA_COLUMNS,
    _PHASE_DATA_SORTS;


_DEFAULTS = {

};

// columns for phase data table
_PHASE_DATA_COLUMNS = [
  {
    'className': 'channel',
    'title': 'Channel',
    'format': function (arrival) {
      var station = arrival.pick.waveformID;
      return station.networkCode + ' ' + station.stationCode +
          (station.channelCode ? ' ' + station.channelCode +
              (station.locationCode ? ' ' + station.locationCode : '')
              : '');
    },
    'header': true
  },
  {
    'className': 'distance',
    'title': 'Distance',
    'format': function (arrival) {
      return parseFloat(arrival.distance).toFixed(2) + '&deg;';
    },
    'downloadFormat': function (arrival) {
      return arrival.distance;
    }
  },
  {
    'className': 'azimuth',
    'title': 'Azimuth',
    'format': function (arrival) {
      return parseFloat(arrival.azimuth).toFixed(2) + '&deg;';
    },
    'downloadFormat': function (arrival) {
      return arrival.azimuth;
    }
  },
  {
    'className': 'phase',
    'title': 'Phase',
    'format': function (arrival) {
      return arrival.phase;
    }
  },
  {
    'className': 'time',
    'title': 'Arrival Time',
    'format': function (arrival) {
      var pick = arrival.pick,
          time;

      time = pick.time.value.split('T')[1].split('Z')[0].split(':');
      time[2] = parseFloat(time[2]).toFixed(2);
      if (time[2] < 10) {
        time[2] = '0' + time[2];
      }
      time = time.join(':');
      return time;
    },
    'downloadFormat': function (arrival) {
      return arrival.pick.time.value;
    }
  },
  {
    'className': 'status',
    'title': 'Status',
    'format': function (arrival) {
      return arrival.pick.evaluationMode;
    }
  },
  {
    'className': 'residual',
    'title': 'Residual',
    'format': function (arrival) {
      return parseFloat(arrival.timeResidual).toFixed(2);
    },
    'downloadFormat': function (arrival) {
      return arrival.timeResidual;
    }
  },
  {
    'className': 'weight',
    'title': 'Weight',
    'format': function (arrival) {
      return parseFloat(arrival.timeWeight).toFixed(2);
    },
    'downloadFormat': function (arrival) {
      return arrival.timeWeight;
    }
  }
];

// sort options for phase data table
_PHASE_DATA_SORTS = [
  {
    'id': 'channel',
    'title': 'Channel',
    'sortBy': function (arrival) {
      var station = arrival.pick.waveformID;
      return station.networkCode + ' ' + station.stationCode +
          ' ' + station.channelCode + ' ' + station.locationCode;
    }
  },
  {
    'id': 'distance',
    'title': 'Distance',
    'sortBy': function (arrival) {
      return parseFloat(arrival.distance);
    }
  },
  {
    'id': 'azimuth',
    'title': 'Azimuth',
    'sortBy': function (arrival) {
      return parseFloat(arrival.azimuth);
    }
  },
  {
    'id': 'phase',
    'title': 'Phase',
    'sortBy': function (arrival) {
      return arrival.phase;
    }
  },
  {
    'id': 'time',
    'title': 'Arrival Time',
    'sortBy': function (arrival) {
      return arrival.pick.time.value;
    }
  },
  {
    'id': 'residual',
    'title': 'Residual',
    'sortBy': function (arrival) {
      return parseFloat(arrival.timeResidual);
    }
  },
  {
    'id': 'weight',
    'title': 'Weight',
    'sortBy': function (arrival) {
      return parseFloat(arrival.timeWeight);
    }
  }
];


/**
 * View for rendering phase data.
 *
 * @see QuakemlView
 */
var PhasesView = function (options) {
  var _this,

      _phaseTable;


  options = Util.extend({}, _DEFAULTS, options);
  _this = QuakemlView(options);


  /**
   * Frees resources associated with this view.
   *
   */
  _this.destroy = Util.compose(function () {
    if (_phaseTable && _phaseTable.destroy) {
      _phaseTable.destroy();
    }
    _phaseTable = null;

    _this = null;
  }, _this.destroy);

  /**
   * Loops over all the given origins and looks for the preferred origin.
   *
   * @param origins {Array}
   *     An array of origin objects.
   */
  _this.getPreferredOrigin = function (origins) {
    var preferred;

    origins = origins || [];
    preferred = null;

    origins.some(function (origin) {
      if (origin.isPreferred) {
        preferred = origin;
        return true;
      }
    });

    return preferred;
  };

  /**
   * Returns markup for an error message when no phases exist.
   *
   * @param el {DOMElement}
   *     The DOM element into which to render.
   *
   * @return {String}
   */
  _this.renderNoPreferred = function (el) {
    el.innerHTML = '<p class="error alert">No Phase Data Exists</p>';
  };

  /**
   * Renders a table for the given origin
   *
   * @param origin {Object}
   *     An object containing origin information.
   * @param el {DOMElement}
   *     The DOM element into which to render.
   */
  _this.renderPreferred = function (origin, el) {
    var arrivals;

    origin = origin || {};

    // add ids to arrivals
    arrivals = origin.arrivals;
    arrivals.map(function (arrival, index) {
      arrival.id = index;
      return arrival;
    });

    _phaseTable = DataTable({
      el: el,
      className: 'hypocenter-phase',
      collection: Collection(arrivals),
      emptyMarkup: '<p class="error alert">No Phase Data Exists</p>',
      columns: _PHASE_DATA_COLUMNS,
      sorts: _PHASE_DATA_SORTS,
      defaultSort: 'distance'
    });

    el.querySelector('.datatable-data').classList.add('horizontal-scrolling');
  };

  /**
   * Renders the quakeml.
   *
   */
  _this.renderQuakeml = function () {
    var dataTableEl,
        origins,
        preferred;

    _this.el.innerHTML = '<section class="hypocenter-phase">' +
        '<header><h3>Phase Arrival Times</h3></header>' +
        '<div class="datatable"></div>' +
      '</section>';

    dataTableEl = _this.el.querySelector('.datatable');

    if (_this.quakeml) {
      origins = _this.quakeml.getOrigins();

      preferred = _this.getPreferredOrigin(origins);


      if (!preferred || !preferred.arrivals) {
        _this.renderNoPreferred(dataTableEl);
      } else {
        _this.renderPreferred(preferred, dataTableEl);
      }
    }
  };


  options = null;
  return _this;
};


module.exports = PhasesView;
