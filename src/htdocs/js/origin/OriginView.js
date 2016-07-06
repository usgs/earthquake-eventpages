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


var _DEFAULTS = {
  url: 'http://earthquake.usgs.gov/ws/geoserve/'
};
var NOT_REPORTED = '&ndash;';


var OriginView = function (options) {

  var _this,
      _initialize,

      _formatter,
      _geoserve,
      _region,
      _magnitudesView,
      _phasesView,
      _tabList,
      _url;

  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
    _geoserve = options.geoserve || null;
    _url = options.url;

    // Bind to geoserve model change
    _region = Model();
    _region.on('change:regions', 'buildFeRegionView', _this);
  };

  _this.destroy = Util.compose(function () {
    _region.off('change:regions', 'buildFeRegionView', _this);

    if (_tabList && _tabList.destroy) {
      _tabList.destroy();
      _tabList = null;
    }

    _formatter = null;
    _geoserve = null;
    _magnitudesView = null;
    _phasesView = null;
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
        eventSourceCode;

    eventSource = product.getProperty('eventsource');
    eventSourceCode = product.getProperty('eventsourcecode');
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
   * Set _region with fe region data from the geoserve ws
   */
  _this.getGeoserveFeRegion = function () {
    var latitude,
        longitude;

    // get location
    latitude = _this.model.getProperty('latitude');
    longitude = _this.model.getProperty('longitude');

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
        reviewStatus,
        standardError;

    buf = [];

    // required attributes for origins
    latitude = product.getProperty('latitude');
    longitude = product.getProperty('longitude');
    eventTime = product.getProperty('eventtime');

    // optional attributes for origins
    magnitude = product.getProperty('magnitude');
    magnitudeType = product.getProperty('magnitude-type');
    magnitudeError = product.getProperty('magnitude-error');
    horizontalError = product.getProperty('horizontal-error');
    depth = product.getProperty('depth');
    depthError = product.getProperty('vertical-error');
    numStations = product.getProperty('num-stations-used');
    numPhases = product.getProperty('num-phases-used');
    minimumDistance = product.getProperty('minimum-distance');
    standardError = product.getProperty('standard-error');
    azimuthalGap = product.getProperty('azimuthal-gap');
    reviewStatus = product.getProperty('review-status') || 'automatic';
    originSource = product.getProperty('origin-source') || product.get('source');
    magnitudeSource = product.getProperty('magnitude-source') || product.get('source');


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
        reviewStatus.toUpperCase(),
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
          Attribution.getContributorReference(product.get('source')),
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

    product = _this.model;
    if (product) {
      content = _this.getOriginDetailTable(product);
      _tabList.addTab({
        'title': 'Origin Detail',
        'content': content
      });

      if (product.get('type') === 'phase-data') {
        quakeml = product.getContent('quakeml.xml');

        _phasesView = PhasesView({
          el: document.createElement('div'),
          model: quakeml,
          product: product
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
          product: product
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

    } else {
      content = '<p class="alert error">' +
        'No Origin product exists.' +
        '</p>';
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = OriginView;
