'use strict';


var Attribution = require('core/Attribution'),
    Formatter = require('core/Formatter'),
    MagnitudesView = require('origin/MagnitudesView'),
    Model = require('mvc/Model'),
    PhasesView = require('origin/PhasesView'),
    ProductView = require('core/ProductView'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _DEFAULTS = {};
var NOT_REPORTED = '&ndash;';


var OriginView = function (options) {

  var _this,
      _initialize,

      _formatter,
      _geoserve,
      _magnitudesView,
      _phases,
      _phasesView,
      _region,
      _tabList,
      _url;

  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
    _phases = options.phases || null;
    _geoserve = options.geoserve || null;

    // Bind to geoserve model change
    _region = Model();
    _region.on('change:regions', 'buildFeRegionView', _this);

    if (options.eventConfig &&
        options.eventConfig.hasOwnProperty('GEOSERVE_WS_URL')) {
      _url = options.eventConfig.GEOSERVE_WS_URL;
    } else {
      _url = options.url;
    }
  };

  _this.destroy = Util.compose(function () {
    _region.off('change:regions', 'buildFeRegionView', _this);

    if (_tabList && _tabList.destroy) {
      _tabList.destroy();
      _tabList = null;
    }

    if (_phasesView && _phasesView.destroy) {
      _phasesView.destroy();
      _phasesView = null;
    }

    if (_magnitudesView && _magnitudesView.destroy) {
      _magnitudesView.destroy();
      _magnitudesView = null;
    }

    _formatter = null;
    _geoserve = null;
    _phases = null;
    _region = null;
    _url = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Build Fe Region string from the hazdev-geoserve-ws project.
   *
   * If no data is available a default message is displayed
   */
  _this.buildFeRegionView = function () {
    var fe,
        feElement,
        feName,
        feNumber;

    feElement = _this.el.querySelector('.fe-info');

    try {
      fe = _region.get('regions').fe.features[0].properties;
      feName = fe.name.toUpperCase();
      feNumber = fe.number;
      feElement.innerHTML = (feNumber ? feName + ' (' + feNumber + ')' : feName);
    } catch (e) {
      feElement.innerHTML = NOT_REPORTED;
    }
  };


  /**
   * Converts a product into an identifiable catalog and id string.
   *
   * @param product {Product}
   *    a Product model
   */
  _this.getCatalogDetail = function (product) {
    var eventId,
        eventSource,
        eventSourceCode,
        props;

    props = product.properties;
    eventSource = props.eventsource;
    eventSourceCode = props.eventsourcecode;
    eventId = '';

    if (!eventSource) {
      return NOT_REPORTED;
    }

    eventId = (eventSource + eventSourceCode).toLowerCase();
    return eventSource.toUpperCase() + ' <small>(' + eventId + ')</small>';
  };

/**
 * Get fe region information.
 *
 * Attempts to load from a geoserve product first.
 * If no such product is found _getGeoserveFeRegion() is called
 * to retreive the fe region string from the geoserve ws.
 *
 * Once load is complete, _buildFeRegionView is called.
 */
  _this.getFeRegion = function () {
    var geoserveJson,
        that;

    that = _this;

    if (_geoserve) {
      geoserveJson = _geoserve.getContent('geoserve.json');
    }

    if (geoserveJson) {
      // if a geoserve product exists, use it
      Xhr.ajax({
        url: geoserveJson.get('url'),
        success: function (geoserve) {
          that.formatFeRegion(geoserve.fe);
        },
        error: function () {
          that.formatFeRegion(null);
        }
      });
    } else {
      // make a geoserve request
      _this.getGeoserveFeRegion();
    }
  };

  /**
   * Set this._geoserve with fe region data from the geoserve ws
   */
  _this.getGeoserveFeRegion = function () {
    var latitude,
        longitude,
        properties;

    // get location
    properties = _this.model.get('properties');
    if (properties) {
      latitude = properties.latitude;
      longitude = properties.longitude;
    }

    if (latitude !== null && longitude !== null) {
      // request region information
      Xhr.ajax({
        url: _url + 'regions.json',
        data: {
          latitude: latitude,
          longitude: longitude,
          type: 'fe'
        },
        success: function (data) {
          _region.set({
            regions: data
          });
        },
        error: function () {
          throw new Error('Geoserve web service not found');
        }
      });
    }
  };

  /**
   * Builds markup for origin detail table
   *
   * @param product {Product}
   *    a Product model
   *
   * @return {string}
   *    html markup for the origin table
   */
  _this.getOriginDetailTable = function (product) {
    var azimuthalGap,
        buf,
        depth,
        depthError,
        eventTime,
        horizontalError,
        latitude,
        longitude,
        magnitude,
        magnitudeError,
        magnitudeSource,
        magnitudeType,
        minimumDistance,
        numPhases,
        numStations,
        originSource,
        p,
        reviewStatus,
        standardError;

    buf = [];
    p = product.properties;

    // required attributes for origins
    latitude = p.latitude;
    longitude = p.longitude;
    eventTime = p.eventtime;

    // optional attributes for origins
    magnitude = p.magnitude || null;
    magnitudeType = p['magnitude-type'] || null;
    magnitudeError = p['magnitude-error'] || null;
    horizontalError = p['horizontal-error'] || null;
    depth = p.depth || null;
    depthError = p['vertical-error'] || null;
    numStations = p['num-stations-used'] || null;
    numPhases = p['num-phases-used'] || null;
    minimumDistance = p['minimum-distance'] || null;
    standardError = p['standard-error'] || null;
    azimuthalGap = p['azimuthal-gap'] || null;
    reviewStatus = p['review-status'] || 'automatic';
    originSource = p['origin-source'] || product.source;
    magnitudeSource = p['magnitude-source'] || product.source;


    buf.push(
      '<div class="horizontal-scrolling">',
      '<table class="origin-detail"><tbody>'
    );

    buf.push('<tr><th scope="row">Magnitude',
        (magnitudeError ? '<span class="uncertainty">uncertainty</span>' : ''),
        '</th><td>',
        _formatter.magnitude(magnitude, magnitudeType, magnitudeError),
        '</td></tr>');

    buf.push('<tr><th scope="row">Location',
        (horizontalError ? '<span class="uncertainty">uncertainty</span>' : ''),
        '</th><td>',
        _formatter.location(latitude, longitude),
        _formatter.uncertainty(horizontalError, 1, NOT_REPORTED, 'km'),
        '</td></tr>');

    buf.push('<tr><th scope="row">Depth',
        (depthError ? '<span class="uncertainty">uncertainty</span>' : ''),
        '</th><td>',
        _formatter.depth(depth, 'km', depthError) +
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
        _formatter.distance((minimumDistance * 0.0174532925 * 6378.1), 'km'),
        ' (', _formatter.angle(minimumDistance, 2), ')',
        '</td></tr>');

    buf.push('<tr><th scope="row">Travel Time Residual</th><td>',
        (standardError === null ? NOT_REPORTED : standardError + ' s'),
        '</td></tr>');

    buf.push('<tr><th scope="row">Azimuthal Gap</th><td>',
        _formatter.angle(azimuthalGap),
        '</td></tr>');

    buf.push('<tr>',
        '<th scope="row">',
          '<abbr title="Flinn Engdahl">FE</abbr> Region',
        '</th>',
        '<td class="fe-info">' + _this.getFeRegion() + '</td></tr>');

    buf.push('<tr><th scope="row">Review Status</th><td>',
        reviewStatus.toUpperCase().replace('REVIEWED', 'MANUAL'),
        '</td></tr>');

    buf.push(
        '<tr><th scope="row">Catalog</th><td>',
          _this.getCatalogDetail(product),
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

    buf.push('</tbody></table></div>');

    return buf.join('');
  };

  /**
   * Massage data from geoserve product into the same model object
   * that FeRegionView expects.
   *
   * @param fe {Object}
   *          fe.number {Number} fe region number.
   *          fe.name {String} fe region name.
   */
  _this.formatFeRegion = function(fe) {
    // only update model if an object is passed
    if (!fe) {
      return;
    }

    // set the (massaged) fe object
    _region.set({
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

  _this.render = function () {
    var content,
        product,
        quakeml;

    // Destroy tablist if it already exists
    if (_tabList && _tabList.destroy) {
      _tabList.destroy();
    }

    _tabList = TabList({
      el: _this.el,
      tabs: []
    });

    product = _this.model.get();
    if (product) {
      content = _this.getOriginDetailTable(product);
      _tabList.addTab({
        'title': 'Origin Detail',
        'content': content
      });
    } else {
      content = '<p class="alert error">' +
        'No Origin product exists.' +
        '</p>';
    }

    if (_phases) {
      quakeml = _phases.getContent('quakeml.xml');

      _phasesView = PhasesView({
        el: document.createElement('div'),
        model: quakeml,
        product: _phases
      });

      _tabList.addTab({
        'title': 'Phases',
        'content': _phasesView.el,
        onDestroy: function () {
          _phasesView.destroy();
        },
        onSelect: function () {
          _phasesView.render();
        }
      });

      _magnitudesView = MagnitudesView({
        el: document.createElement('div'),
        model: quakeml,
        product: _phases
      });

      _tabList.addTab({
        'title': 'Magnitudes',
        'content': _magnitudesView.el,
        onDestroy: function () {
          _magnitudesView.destroy();
        },
        onSelect: function () {
          _magnitudesView.render();
        }
      });
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = OriginView;
