'use strict';


var Util = require('util/Util');


var _DEFAULTS = {
  mapUrl: '/earthquakes/map/',
  radius: 250
};

var _KM_PER_DEGREE = 111.12;


var NearbySeismicity = function (options) {
  var _this,
      _initialize,

      _mapUrl,
      _radius;


  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _mapUrl = options.mapUrl;
    _radius = options.radius;
  };


  _this.destroy = function () {
    _mapUrl = null;
    _radius = null;

    _initialize = null;
    _this = null;
  };

  /**
   * Generate a link to map/list based on search parameters.
   * @param options {Object}
   * @param options.eventid {String}
   *     event to select in map/list interface.
   *     default null.
   * @param options.params {Object}
   *     api parameters as object properties and values.
   */
  _this.getLatestEarthquakesLink = function (options) {
    var eventid,
        id,
        mapPosition,
        params,
        settings,
        url;

    eventid = options.eventid || null;
    params = options.params;

    id = eventid || ('' + new Date().getTime());
    mapPosition = _this.getMapPosition(params);

    // map/list url settings
    settings = {
      // do not auto update searches
      autoUpdate: false,
      // terrain basemap
      basemap: 'terrain',
      // selected event
      event: eventid,
      // feed needs to match search id
      feed: id,
      // center view based on point and radius
      mapposition: mapPosition,
      // search options
      search: {
        id: id,
        isSearch: true,
        // TODO: use a different name?
        name: 'Search Results',
        params: params
      }
    };

    url = _mapUrl + '#' + encodeURIComponent(JSON.stringify(settings));

    return url;
  };

  /**
   * Compute map position based on parameters.
   *
   * @param params {Object}
   *     search api parameters.
   * @return {Array<Array>}
   *     array representing map extent.
   */
  _this.getMapPosition = function (params) {
    var latitude,
        longitude,
        mapPosition,
        maxLatitude,
        maxLongitude,
        maxRadiusKm,
        minLatitude,
        minLongitude,
        radiusDegrees;

    // set defaults
    maxLatitude = params.maxlatitude || 85;
    maxLongitude = params.maxlongitude || 180;
    minLatitude = params.minlatitude || -85;
    minLongitude = params.minlongitude || -180;

    // compute based on radius search
    latitude = params.latitude;
    longitude = params.longitude;
    maxRadiusKm = params.maxradiuskm;
    if ((latitude || latitude === 0) &&
        (longitude || longitude === 0) &&
        (maxRadiusKm || maxRadiusKm === 0)) {
      radiusDegrees = maxRadiusKm / _KM_PER_DEGREE;
      maxLatitude = latitude + radiusDegrees;
      maxLongitude = longitude + radiusDegrees;
      minLatitude = latitude - radiusDegrees;
      minLongitude = longitude - radiusDegrees;
    }

    // format extent
    mapPosition = [
      [minLatitude, minLongitude],
      [maxLatitude, maxLongitude]
    ];

    return mapPosition;
  };

  /**
   * Convenience method that chains
   * getLatestEarthquakesLink with getNearbySeismicityParams.
   *
   * @param summary {Object}
   *     event summary object, as returned by CatalogEvent#getSummary().
   * @return {String}
   *     url to display nearby seismicity in map/list.
   */
  _this.getNearbySeismicityLink = function (summary) {
    var params;

    params = _this.getNearbySeismicityParams(summary);
    return _this.getLatestEarthquakesLink({
      eventid: summary.id,
      params: params
    });
  };

  /**
   * Get nearby seismicity API search parameters for an event.
   *
   * @param summary {Object}
   *     event summary object, as returned by CatalogEvent#getSummary().
   * @return {Object}
   *     object with search parameters
   */
  _this.getNearbySeismicityParams = function (summary) {
    var endtime,
        latitude,
        longitude,
        magnitude,
        minmagnitude,
        params,
        threeWeeks,
        starttime,
        time;

    latitude = summary.latitude;
    longitude = summary.longitude;
    magnitude = summary.magnitude;
    time = summary.time;

    if (!latitude || !longitude || !time) {
      return false;
    }

    minmagnitude = 1;
    if (magnitude !== null) {
      minmagnitude = Math.max(Math.floor(magnitude) - 3, 1);
    }

    threeWeeks = 3 * 7 * 24 * 60 * 60 * 1000;
    time = new Date(time).getTime();
    starttime = new Date(time - threeWeeks).toISOString();
    endtime = new Date(time + threeWeeks).toISOString();

    params = {
      endtime: endtime,
      latitude: latitude,
      longitude: longitude,
      maxradiuskm: _radius,
      minmagnitude: minmagnitude,
      starttime: starttime
    };

    return params;
  };


  _initialize(options);
  options = null;
  return _this;
};


NearbySeismicity.KM_PER_DEGREE = _KM_PER_DEGREE;


module.exports = NearbySeismicity;
