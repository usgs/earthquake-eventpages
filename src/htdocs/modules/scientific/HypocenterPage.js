'use strict';

var Accordion = require('accordion/Accordion'),
    Attribution = require('base/Attribution'),
    Collection = require('mvc/Collection'),
    DataTable = require('mvc/DataTable'),
    EventModulePage = require('base/EventModulePage'),
    EventUtil = require('base/EventUtil'),
    Formatter = require('base/Formatter'),
    Quakeml = require('quakeml/Quakeml'),
    TabList = require('tablist/TabList'),
    Model = require('mvc/Model'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


// default options
var DEFAULTS = {
  formatter: new Formatter(),
  tabList: {
    tabPosition: 'top'
  }
};

var NOT_REPORTED = '&ndash;';

// columns for phase data table
var PHASE_DATA_COLUMNS = [
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
var PHASE_DATA_SORTS = [
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
 * Construct a new HypocenterPage.
 *
 * @param options {Object}
 *        page options.
 */
var HypocenterPage = function (options) {
  this._options = Util.extend({}, DEFAULTS, options);
  this._code = options.code;
  this._tabList = null;
  this._phaseEl = document.createElement('div');
  this._phaseRendered = false;
  this._magnitudeEl = document.createElement('div');
  this._magnitudeRendered = false;
  // Bind to geoserve model change
  this._geoserve = new Model();
  this._geoserve.on('change:regions', 'buildFeRegionView', this);

  if (this._options.eventConfig &&
      this._options.eventConfig.hasOwnProperty('GEOSERVE_WS_URL')) {
    this._geoserveUrl = this._options.eventConfig.GEOSERVE_WS_URL;
  }

  EventModulePage.call(this, this._options);
};

HypocenterPage.prototype = Object.create(EventModulePage.prototype);

/**
 * Clean up event bindings.
 *
 */
HypocenterPage.prototype.destroy = function () {
  this._geoserve.off('change:regions', 'buildFeRegionView', this);

  this._options = null;
  this._phaseEl = null;
  this._quakeml = null;
  this._geoserve = null;

  if (this._magnitudeEl) {
    this._magnitudeEl = null;
  }

  if (this._tabList) {
    this._tabList.destroy();
    this._tabList = null;
  }
  EventModulePage.prototype.destroy.call(this);
};

/**
 * Generates the attribution markup used at the top of the origin details page.
 *
 * @param originAuthor {String}
 * @param magnitudeAuthor {String}
 *
 * @return {String}
 */
HypocenterPage.prototype.getAttribution = function (product) {
  var magnitudeAuthor,
      originAuthor,
      props,
      updated;

  product = (product.phaseData) ? product.phaseData : product;
  props = product.properties;

  originAuthor = props['origin-source'] || product.source;
  magnitudeAuthor = props['magnitude-source'] || product.source;
  updated = this._formatter.datetime(product.updateTime, 0);

  return '<small class="attribution">Data source ' +
      (originAuthor === magnitudeAuthor ?
        Attribution.getContributorReference(originAuthor) :
        '<span>' +
          Attribution.getContributorReference(originAuthor) + ', ' +
          Attribution.getContributorReference(magnitudeAuthor) +
        '</span>') +
        ' last updated ' + updated +
      '</small>';
};

HypocenterPage.prototype.getProducts = function () {
  return EventUtil.getProducts(this._event, 'origin');
};

/**
 * Called by _setContentMarkup(), handles displaying all detailed information
 * for an origin product.
 *
 * @param  {object} product, origin product to display
 *
 */
HypocenterPage.prototype.getDetailsContent = function (product) {
  var el = document.createElement('div'),
      formatter,
      tabListDiv = document.createElement('section'),
      tabListContents = [],
      _this = this,
      originDetails;

  formatter = new Formatter();

  this._fe = null;
  this._el = el;

  if (product.phasedata) {
    product = product.phasedata;
  }

  this._product = product;

  originDetails = [
    this.getOriginDetail(product)
  ].join('');
  tabListContents.push({
    title: 'Origin Detail',
    content: originDetails
  });

  if ((product.type === 'phase-data' || product.type === 'origin') &&
      product.contents.hasOwnProperty('quakeml.xml')) {
    // build phase table
    tabListContents.push({
      title: 'Phases',
      content: function () {
        _this._getPhaseDetail();
        return _this._phaseEl;
      }
    });
    // build magnitude table
    tabListContents.push({
      title: 'Magnitudes',
      content: function () {
        _this._getMagnitudeDetail();
        return _this._magnitudeEl;
      }
    });
  }

  el.classList.add('origin');

  // Build TabList
  this._tabList = new TabList({
    el: el.appendChild(tabListDiv),
    tabPosition: 'top',
    tabs: tabListContents
  });

  // set FE region string
  this._loadFeRegion(product);

  return el;
};

/**
 * Load fe region information.
 *
 * Attempts to load from a geoserve product first.
 * If no such product is found, call _getGeoserveFeRegion()
 * to retreive the fe region string from the geoserve ws.
 *
 * Once load is complete, _buildFeRegionView is called.
 */
HypocenterPage.prototype._loadFeRegion = function (product) {
  var geoserveProduct = null,
      i, len, testProduct,
      geoProducts,
      prodEventSource,
      prodEventSourceCode,
      _this;

  _this = this;

  try {
    geoProducts = this._event.properties.products.geoserve;
    prodEventSource = product.properties.eventsource;
    prodEventSourceCode = product.properties.eventsourcecode;

    // Find geoserve product that corresponds to the given (origin) product
    for (i = 0, len = geoProducts.length; i < len; i++) {
      testProduct = geoProducts[i];

      if (testProduct.properties.eventsource === prodEventSource &&
          testProduct.properties.eventsourcecode === prodEventSourceCode) {
        geoserveProduct = testProduct;
        break;
      }
    }

    if (geoserveProduct) {
      // if a geoserve product exists, use it
      Xhr.ajax({
        url: geoserveProduct.contents['geoserve.json'].url,
        success: function (geoserve) {
          _this.formatFeRegion(geoserve.fe);
        },
        error: function () {
          _this.formatFeRegion(null);
        }
      });
    } else {
      // make a geoserve request
      this._getGeoserveFeRegion();
    }

  } catch (e) {
    this._getGeoserveFeRegion();
    console.log(e);
  }
};

/**
 * Build Fe Region string from the hazdev-geoserve-ws project.
 *
 * If no data is available a default message is displayed
 */
HypocenterPage.prototype.buildFeRegionView = function () {
  var fe,
      feElement,
      feName,
      feNumber;

  feElement = this._el.querySelector('.fe-info');

  try {
    fe = this._geoserve.get('regions').fe.features[0].properties;
    feName = fe.name.toUpperCase();
    feNumber = fe.number;
    feElement.innerHTML = (feNumber ? feName + ' (' + feNumber + ')' : feName);
  } catch (e) {
    feElement.innerHTML = NOT_REPORTED;
  }
};

/**
 * Massage data from geoserve product into the same model object
 * that FeRegionView expects.
 *
 * @param fe {Object}
 *          fe.number {Number} fe region number.
 *          fe.name {String} fe region name.
 */
HypocenterPage.prototype.formatFeRegion = function(fe) {
  // only update model if an object is passed
  if (!fe) {
    return;
  }

  // set the (massaged) fe object
  this._geoserve.set({
    'regions': {
      'fe': {
        'features': [
          {
            'properties': {
              'name': fe.longName,
              'number': fe.number
            }
          }
        ]
      }
    }
  });
};

/**
 * Set this._geoserve with fe region data from the geoserve ws
 */
HypocenterPage.prototype._getGeoserveFeRegion = function () {
   var latitude,
       longitude,
       _this;

  _this = this;

  // get location
  latitude = this._event.geometry.coordinates[1];
  longitude = this._event.geometry.coordinates[0];


  if (latitude !== null && longitude !== null) {
    // request region information
    Xhr.ajax({
      url: this._geoserveUrl + 'regions.json',
      data: {
        latitude: latitude,
        longitude: longitude,
        type: 'fe'
      },
      success: function (data) {
        _this._geoserve.set({
          regions: data
        });
      },
      error: function () {
        throw new Error('Geoserve web service not found');
      }
    });
  }
};

HypocenterPage.prototype._getPhaseDetail = function () {
  var xml = this._product.contents['quakeml.xml'];

  if (!this._quakeml) {
    this._parseQuakemlCallback = this._getPhaseDetail;
    this._parseQuakeml(xml);
  } else if (!this._phaseRendered) {
    this._renderPhases(this._phaseEl);
    this._phaseRendered = true;
  }
};

HypocenterPage.prototype._getMagnitudeDetail = function () {
  var xml = this._product.contents['quakeml.xml'];

  if (!this._quakeml) {
    this._parseQuakemlCallback = this._getMagnitudeDetail;
    this._parseQuakeml(xml);
  } else if (!this._magnitudeRendered) {
    this._magnitudeEl.innerHTML = this._getMagnitudesMarkup();
    new Accordion({
      el:this._magnitudeEl
    });
    this._magnitudeRendered = true;
  }
};

HypocenterPage.prototype._renderPhases = function (phaseEl) {
  var origins = this._quakeml.getOrigins(),
      origin, o, oLen,
      preferred = null,
      arrivals, a, aLen;

  for (o = 0, oLen = origins.length; o < oLen; o++) {
    origin = origins[o];
    if (origin.isPreferred) {
      preferred = origin;
      break;
    }
  }

  phaseEl.innerHTML = '<section class="hypocenter-phase">' +
      '<header><h3>Phase Arrival Times</h3></header>' +
      '<div class="datatable"></div>' +
      '</section>';

  if (!preferred || !preferred.arrivals) {
    phaseEl.querySelector('.datatable').innerHTML =
        '<p class="error alert">No Phase Data Exists</p>';
    return;
  }

  // add ids to arrivals
  arrivals = preferred.arrivals;
  for (a = 0, aLen = arrivals.length; a < aLen; a++) {
    arrivals[a].id = a;
  }

  this._phaseTable = new DataTable({
    el: phaseEl.querySelector('.datatable'),
    className: 'hypocenter-phase',
    collection: new Collection(preferred.arrivals),
    emptyMarkup: '<p class="error alert">No Phase Data Exists</p>',
    columns: PHASE_DATA_COLUMNS,
    sorts: PHASE_DATA_SORTS,
    defaultSort: 'distance'
  });

  phaseEl.querySelector('.datatable-data').classList.add('horizontal-scrolling');
};

HypocenterPage.prototype._getMagnitudesMarkup = function () {
  var buf = [],
      magnitudes = this._quakeml.getMagnitudes(),
      magnitude,
      m;

  if (magnitudes.length) {
    for (m = 0; m < magnitudes.length; m++) {
      magnitude = magnitudes[m];
      buf.push(this._getMagnitudeMarkup(magnitude));
    }
  } else {
    buf.push('<p class="error alert">No Magnitude Data Exists</p>');
  }
  return buf.join('');
};

HypocenterPage.prototype._getMagnitudeMarkup = function (magnitude) {
  var buf = [],
      contributions = magnitude.contributions,
      contribution,
      stationMagnitude,
      amplitude,
      station,
      amp,
      status,
      weight,
      period,
      a,
      source,
      magSource,
      type,
      mag,
      magError,
      numStations;

  source = this._product.source;
  if (magnitude.creationInfo) {
    magSource = magnitude.creationInfo.agencyID;
  } else {
    magSource = source;
  }

  type = magnitude.type || NOT_REPORTED;
  mag = magnitude.mag.value || NOT_REPORTED;
  magError = magnitude.mag.uncertainty || NOT_REPORTED;
  numStations = magnitude.stationCount || NOT_REPORTED;

  buf.push(
    '<section class="accordion accordion-section accordion-closed networkmagnitude">',
    '<h3>', type, '</h3>',
    '<ul class="networkmagnitude-summary">',
      '<li class="magnitude">',
        '<span><strong>', mag, '</strong></span>',
        '<abbr title="Magnitude">Mag</abbr>',
      '</li>',
      '<li>',
        '<span>', magError, '</span>',
        '<abbr title="Magnitude Error">Error</abbr>',
      '</li>',
      '<li>',
        '<span>', numStations, '</span>',
        '<abbr title="Number of Stations">Stations</abbr>',
      '</li>',
      '<li>',
        Attribution.getContributorReference(magSource),
        '<abbr title="Magnitude Data Source">Source</abbr>',
      '</li>',
    '</ul>'
  );

  buf.push(
    '<a class="accordion-toggle">Details</a>',
    '<div class="accordion-content">'
  );

  if (contributions.length === 0) {
    buf.push('<p class="alert info">' +
        'No amplitudes contributed for this magnitude' +
        '</p>');
  } else {
    buf.push(
      '<div class="horizontal-scrolling">',
      '<table class="networkmagnitude-stations">',
        '<thead><tr>',
          '<th>',
            '<abbr title="Network Station Channel Location">Channel</abbr>',
          '</th>',
          '<th>Type</th>',
          '<th>Amplitude</th>',
          '<th>Period</th>',
          '<th>Status</th>',
          '<th>Magnitude</th>',
          '<th>Weight</th>',
        '</tr></thead>',
      '<tbody>'
    );

    for (a = 0; a < contributions.length; a++) {
      contribution = contributions[a];
      stationMagnitude = contribution.stationMagnitude;
      type = stationMagnitude.type;
      amplitude = stationMagnitude.amplitude || {};
      station = stationMagnitude.waveformID || amplitude.waveformID;
      mag = stationMagnitude.mag.value || NOT_REPORTED;
      weight = contribution.weight;
      amp = NOT_REPORTED;
      period = NOT_REPORTED;

      if (amplitude.genericAmplitude) {
        amp = amplitude.genericAmplitude.value + ( amplitude.unit || '' );
      }
      if (amplitude.period) {
        period = amplitude.period.value + 's';
      }
      status = amplitude.evaluationMode || stationMagnitude.status ||
          'automatic';

      buf.push(
        '<tr>',
          '<th scope="row">',
            station.networkCode,
            ' ', station.stationCode,
            ' ', station.channelCode,
            ' ', station.locationCode,
          '</th>',
          '<td class="type">', type , '</td>',
          '<td class="amplitude">', amp , '</td>',
          '<td class="period">', period , '</td>',
          '<td class="status">', status , '</td>',
          '<td class="magnitude">', mag , '</td>',
          '<td class="weight">', weight , '</td>',
        '</tr>');
    }
    buf.push('</tbody></table></div>');
  }
  buf.push('</div></section>');
  return buf.join('');
};

HypocenterPage.prototype._parseQuakeml = function (quakemlInfo) {
  var that = this;

  if (quakemlInfo) {
    Xhr.ajax({
      url: quakemlInfo.url,
      success: function (xml) {
        // use quakeml parser to make xml into quakeml
        that._quakeml = new Quakeml({xml: xml});
        that._parseQuakemlCallback();
      },
      error: function () {
        console.log('Failed to parse quakeml');
      }
    });
  }
};

HypocenterPage.prototype.getOriginDetail = function (product) {
  var buf = [],
      formatter = this._options.formatter || new Formatter(),
      p = product.properties,
      // required attributes for origins
      latitude = p.latitude,
      longitude = p.longitude,
      eventTime = p.eventtime,
      // optional attributes for origins
      magnitude = p.magnitude || null,
      magnitudeType = p['magnitude-type'] || null,
      magnitudeError = p['magnitude-error'] || null,
      horizontalError = p['horizontal-error'] || null,
      depth = p.depth || null,
      depthError = p['vertical-error'] || null,
      numStations = p['num-stations-used'] || null,
      numPhases = p['num-phases-used'] || null,
      minimumDistance = p['minimum-distance'] || null,
      standardError = p['standard-error'] || null,
      azimuthalGap = p['azimuthal-gap'] || null,
      reviewStatus = p['review-status'] || 'automatic',
      originSource = p['origin-source'] || product.source,
      magnitudeSource = p['magnitude-source'] || product.source;

  buf.push('<table class="origin-detail"><tbody>');

  buf.push('<tr><th scope="row">Magnitude',
      (magnitudeError ? '<span class="uncertainty">uncertainty</span>' : ''),
      '</th><td>',
      formatter.magnitude(magnitude, magnitudeType, magnitudeError),
      '</td></tr>');

  buf.push('<tr><th scope="row">Location',
      (horizontalError ? '<span class="uncertainty">uncertainty</span>' : ''),
      '</th><td>',
      formatter.location(latitude, longitude),
      formatter.uncertainty(horizontalError, 1, '', 'km'),
      '</td></tr>');

  buf.push('<tr><th scope="row">Depth',
      (depthError ? '<span class="uncertainty">uncertainty</span>' : ''),
      '</th><td>',
      formatter.number(depth, formatter._options.depthDecimals,
          NOT_REPORTED, 'km') +
      formatter.uncertainty(depthError, formatter._options.depthDecimals, ''),
      '</td></tr>');

  buf.push('<tr><th scope="row">Origin Time</th><td>',
      (typeof eventTime === 'string' ?
          '<time datetime="' + eventTime + '">' +
              eventTime.replace('T', ' ').replace('Z', ' UTC') +
          '</time>' :
          ''),
      '</td></tr>');

  buf.push('<tr><th scope="row">Number of Stations</th><td>',
      (numStations === null ? NOT_REPORTED : numStations),
      '</td></tr>');

  buf.push('<tr><th scope="row">Number of Phases</th><td>',
      (numPhases === null ? NOT_REPORTED : numPhases),
      '</td></tr>');

  buf.push('<tr><th scope="row">Minimum Distance</th><td>',
      (minimumDistance === null ? NOT_REPORTED :
          (minimumDistance * 0.0174532925 * 6378.1).toFixed(2) + ' km' +
          ' (' + parseFloat(minimumDistance).toFixed(2) + '&deg;)'),
      '</td></tr>');

  buf.push('<tr><th scope="row">Travel Time Residual</th><td>',
      (standardError === null ? NOT_REPORTED : standardError + ' sec'),
      '</td></tr>');

  buf.push('<tr><th scope="row">Azimuthal Gap</th><td>',
      (azimuthalGap === null ? NOT_REPORTED : azimuthalGap + '&deg;'),
      '</td></tr>');

  // Placeholder, filled in asynchronously
  buf.push('<tr>',
      '<th scope="row">',
        '<abbr title="Flinn Engdahl">FE</abbr> Region',
      '</th>',
      '<td class="fe-info">' + NOT_REPORTED + '</td></tr>');

  buf.push('<tr><th scope="row">Review Status</th><td>',
      reviewStatus.toUpperCase().replace('REVIEWED', 'MANUAL'),
      '</td></tr>');

  buf.push(
      '<tr><th scope="row">Catalog</th><td>',
        this.getCatalogDetail(product),
      '</td></tr>',
      '<tr><th scope="row">Location Source</th><td>',
        Attribution.getContributorReference(originSource),
      '</td></tr>',
      '<tr><th scope="row">Magnitude Source</th><td>',
        Attribution.getContributorReference(magnitudeSource),
      '</td></tr>',
      '<tr><th scope="row">Contributor</th><td>',
        Attribution.getContributorReference(product.source),
      '</td></tr>');

  buf.push('</tbody></table>');

  return buf.join('');
};


module.exports = HypocenterPage;
