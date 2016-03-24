'use strict';


var Attribution = require('core/Attribution'),
    Formatter = require('core/Formatter'),
    ProductView = require('core/ProductView'),
    TabList = require('tablist/TabList'),
    Util = require('util/Util');


var _DEFAULTS = {};
var NOT_REPORTED = '&ndash;';


var OriginView = function (options) {

  var _this,
      _initialize,

      _formatter,
      _tabList;

  options = Util.extend({}, _DEFAULTS, options);
  _this = ProductView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.destroy = Util.compose(function () {
    if (_tabList && _tabList.destroy) {
      _tabList.destroy();
    }

    _formatter = null;
    _initialize = null;
    _this = null;
  }, _this.destroy);

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

    // TODO :: create a FERegionView {ProductView}
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

  _this.render = function () {
    var content,
        product;

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
    } else {
      content = '<p class="alert error">' +
        'No Origin product exists.' +
        '</p>';
    }

    _tabList.addTab({
      'title': 'Origin Detail',
      'content': content
    });

  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = OriginView;
