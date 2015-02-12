/* global define */
define([
], function (
) {
  'use strict';


  // --------------------------------------------------
  // Configuration options can be passed to constructor
  // --------------------------------------------------


  var DEFAULTS = {
    serviceBase: 'http://server.arcgisonline.com/arcgis/rest/services',
    serviceName: 'NatGeo_World_Map',

    mapSpan: 10,    // Decimal degree dimension (lat and lon) for map extent
    mapWidth: 256,  // Width of resulting image in pixels
    mapHeight: 256, // Height of resulting image in pixels

    imageFormat: 'jpg',
    imageTransparent: 'true',
    imageDpi: 96,
  };

  var CM2M = 100;               // How many centimeters in a meter
  var CM2INCH = 2.54;           // How many centimeters in an inch
  var EARTH_RADIUS = 6378137.0; // Radius of the earth in meters

  // Custom parameter used for web mercator projection
  var WEB_MERC_DEG = 0.017453292519943295;


  // --------------------------------------------------
  // Static Helper Methods
  // --------------------------------------------------


  /**
   * Converts input geographic coordinate given in decimal degrees, to web
   * mercator coordinates in meters.
   *
   * @param longitude {Number}
   *      Decimal degrees longitude. -180.0 < lon < +180.0
   * @param latitude {Number}
   *      Decimal degrees latitude. -90.0 < lat < +90.0
   *
   * @return {Array}
   *      An array containing web mercator coordinates for the given input
   *      coordinate pair. The first element in the array (index: 0) is the
   *      longitude and the second element in the array (index: 1) is the
   *      latitude.
   */
  var toWebMercator = function (extent) {
    var lngMin = extent[0], numMin,
        latMin = extent[1], aMin,
        lngMax = extent[2], numMax,
        latMax = extent[3], aMax;

    if (Math.abs(lngMin) > 180 || Math.abs(lngMax) > 180 ||
        Math.abs(latMin) > 90 || Math.abs(latMax) > 90) {
      return; // TODO :: Error?
    }

    numMin = lngMin * WEB_MERC_DEG;
    aMin = latMin * WEB_MERC_DEG;

    numMax = lngMax * WEB_MERC_DEG;
    aMax = latMax * WEB_MERC_DEG;

    return [
      EARTH_RADIUS * numMin,
      (EARTH_RADIUS / 2) * Math.log(
          (1.0 + Math.sin(aMin)) / (1.0 - Math.sin(aMin))),

      EARTH_RADIUS * numMax,
      (EARTH_RADIUS / 2) * Math.log(
          (1.0 + Math.sin(aMax)) / (1.0 - Math.sin(aMax)))
    ];
  };

  /**
   * Converts an object hash containing URL parameters into a URL query string.
   *
   * @param object {Object}
   *      A hash of parameters to convert to a query string
   */
  var toQueryString = function (object) {
    var key, buffer = [];

    for (key in object) {
      // TODO :: Should this use encodeURIComponent ?
      buffer.push(key + '=' + object[key]);
    }

    return buffer.join('&');
  };


  // --------------------------------------------------
  // Constructor/Initializers
  // --------------------------------------------------

  /**
   * @constructor
   * @param options {Object}
   *      Configuration options. See DEFAULS (above) for details.
   *
   * @see StaticMap#DEFAULTS
   */
  var StaticMap = function (options) {
    options = options || DEFAULTS;
    this._options = {};

    // Base URL for image requests
    this._serviceBase = (options.serviceBase || DEFAULTS.serviceBase) + '/' +
        (options.serviceName || DEFAULTS.serviceName) + '/MapServer/export/';

    // Map configuration (or default) parameters
    this.setMapSpan(options.mapSpan || DEFAULTS.mapSpan);
    this.setMapWidth(options.mapWidth || DEFAULTS.mapWidth);
    this.setMapHeight(options.mapHeight || DEFAULTS.mapHeight);

    this.setImageFormat(options.imageFormat || DEFAULTS.imageFormat);
    // options.hasOwnProperty('imageTransparent') ?
    //    this.setImageTransparent(options.imageTransparent) :
    //    this.setImageTransparent(DEFAULTS.imageTransparent);
    this.setImageDpi(options.imageDpi || DEFAULTS.imageDpi);
  };

  // --------------------------------------------------
  // Public Getter/Setter Methods
  // --------------------------------------------------

  StaticMap.prototype.getMapSpan = function () {
    return this._options.mapSpan;
  };

  StaticMap.prototype.getMapWidth = function () {
    return this._options.mapWidth;
  };

  StaticMap.prototype.getMapHeight = function () {
    return this._options.mapHeight;
  };

  StaticMap.prototype.getImageFormat = function () {
    return this._options.imageFormat;
  };

  StaticMap.prototype.getImageTransparent = function () {
    return this._options.imageTransparent;
  };

  StaticMap.prototype.getImageDpi = function () {
    return this._options.imageDpi;
  };

  StaticMap.prototype.setMapSpan = function (mapSpan) {
    this._options.mapSpan = mapSpan;
  };

  StaticMap.prototype.setMapWidth = function (mapWidth) {
    this._options.mapWidth = mapWidth;
  };

  StaticMap.prototype.setMapHeight = function (mapHeight) {
    this._options.mapHeight = mapHeight;
  };

  StaticMap.prototype.setImageFormat = function (imageFormat) {
    this._options.imageFormat = imageFormat;
  };

  /**
   * If imageTransparent is "truthy", but not the string literal "false", then
   * sets image transparency to true. False otherwise.
   *
   * @param imageTransparent {Mixed}
   *      Flag to indicate if image transparency should be enabled. Note: Not
   *      all image formats support transparency.
   */
  StaticMap.prototype.setImageTransparent = function (imageTransparent) {
    if (!imageTransparent || imageTransparent === 'false') {
      this._options.imageTransparent = 'false';
    } else {
      this._options.imageTransparent = 'true';
    }
  };

  StaticMap.prototype.setImageDpi = function (imageDpi) {
    this._options.imageDpi = imageDpi;
  };


  // --------------------------------------------------
  // API Methods
  // --------------------------------------------------


  /**
   * Creates an image element for appending to the DOM.
   *
   * @param extent {Array}
   *      Map extent as returned by StaticMap.getExtent.
   * @param width {Integer} Optional
   *      Image width in pixels. If not specified, uses configured
   *      options.mapWidth.
   * @param height {Integer} Optional
   *      Image height in pixels. If not specified, uses configured
   *      options.mapHeight.
   *
   * @return {DOMElement}
   *      An image element for the requested extent.
   *
   * @see StaticMap#getExtent
   */
  StaticMap.prototype.getImage = function (extent, width, height) {
    var img = document.createElement('img');

    img.src = this.getImageUrl(extent, width, height);
    img.alt = this.getImageAlt(extent);

    return img;
  };

  /**
   * Creates image HTML markup the requested map image.
   *
   * @param extent {Array}
   *      Map extent as returned by StaticMap.getExtent.
   * @param width {Integer} Optional
   *      Image width in pixels. If not specified, uses configured
   *      options.mapWidth.
   * @param height {Integer} Optional
   *      Image height in pixels. If not specified, uses configured
   *      options.mapHeight.
   *
   * @return {String}
   *      Markup for the requested map image.
   *
   * @see StaticMap#getExtent
   */
  StaticMap.prototype.getImageMarkup = function (extent, width, height) {
    var url = this.getImageUrl(extent, width, height),
        alt = this.getImageAlt(extent);

    return [
      '<img ', 'src="', url.replace('&', '&amp;'), '" ',
          'alt="', alt, '"', '/>'
    ].join('');
  };

  /**
   * @param extent {Array}
   *      Map extent as returned by StaticMap.getExtent.
   * @param width {Integer} Optional
   *      Image width in pixels. If not specified, uses configured
   *      options.mapWidth.
   * @param height {Integer} Optional
   *      Image height in pixels. If not specified, uses configured
   *      options.mapHeight.
   *
   * @return {String}
   *      A URL for a map with the given extent and dimensions.
   *
   * @see StaticMap#getExtent
   */
  StaticMap.prototype.getImageUrl = function (extent, width, height) {
    var deltaLng, deltaLat, scale, params,
        mercatorExtent = toWebMercator(extent);

    if (!width) {
      width = this._options.mapWidth;
    }

    if (!height) {
      height = this._options.mapHeight;
    }

    deltaLng = Math.abs(mercatorExtent[0] - mercatorExtent[2]);
    deltaLat = Math.abs(mercatorExtent[1] - mercatorExtent[3]);

    if (deltaLng > deltaLat) {
      scale = this._computeScale(deltaLng, width);
    } else {
      scale = this._computeScale(deltaLat, height);
    }

    // TODO :: Add support for more map parameters
    params = {
      bbox: mercatorExtent.join(','),
      size: width + ',' + height,
      format: this._options.imageFormat,
      transparent: this._options.imageTransparent,
      mapScale: scale,
      f: 'image'
    };

    return  [
      this._serviceBase, '?', toQueryString(params)
    ].join('');
  };

  /**
   * @param extent {Array}
   *      A map extent as returned by the StaticMap.getExtent function.
   *
   * @return {String}
   *      Alt text to describe the generated image.
   *
   * @see StaticMap#getExtent
   * TODO :: Make this better/more descriptive.
   */
  StaticMap.prototype.getImageAlt = function (extent) {
    return 'Map showing extent (w,s,e,n) = (' + extent.join(', ') + ')';
  };

  /**
   * Computes an extent centered on an input coordinate.
   *
   * @param longitude {Number}
   *      Decimal degrees longitude for center of extent.
   * @param latitude {Number}
   *      Decimal degrees latitude for center of extent.
   * @param spanLng {Number} Optional
   *      Decimal degrees span for extent longitudes. If not specified, defaults
   *      to use the configured options.mapSpan property.
   * @param spanLat {Number} Optional
   *      Decimal degrees span for extent latitudes. If not specified, defaults
   *      to use the spanLng value.
   *
   * @return {Array}
   *      An extent consisting of [west, south, east, north] coordinates. Note:
   *      This order is convenient for use with the ESRI map API.
   */
  StaticMap.prototype.getExtent = function (longitude, latitude, spanLng,
      spanLat) {
    var halfLatSpan, halfLngSpan;
    
    if (!spanLng) {
      spanLng = this._options.mapSpan;
    }
    
    if (!spanLat) {
      spanLat = spanLng;
    }
    
    halfLngSpan = spanLng / 2;
    halfLatSpan = spanLat / 2;

    return [
      Math.max(longitude - halfLngSpan, -180.0),
      Math.max(latitude - halfLatSpan, -90.0),
      Math.min(longitude + halfLngSpan, 180.0),
      Math.min(latitude + halfLatSpan, 90.0)
    ];
  };


  // --------------------------------------------------
  // Private Helper Methods
  // --------------------------------------------------


  StaticMap.prototype._computeScale = function (meterSpan, pixelSpan) {
    var ratio = meterSpan / pixelSpan;

    return (ratio * this._options.imageDpi * CM2M) / CM2INCH;
  };


  // -- END Class Definition -- //


  // Static instance used for convenience
  var __INSTANCE__ = new StaticMap();

  // Static access for basic image accepting all default configurations
  StaticMap.getImage = function () {
    return StaticMap.prototype.getImage.apply(__INSTANCE__, arguments);
  };

  StaticMap.getImageMarkup = function () {
    return StaticMap.prototype.getImageMarkup.apply(__INSTANCE__, arguments);
  };

  StaticMap.getImageUrl = function () {
    return StaticMap.prototype.getImageUrl.apply(__INSTANCE__, arguments);
  };

  StaticMap.getImageAlt = function () {
    return StaticMap.prototype.getImageAlt.apply(__INSTANCE__, arguments);
  };

  StaticMap.getExtent = function () {
    return StaticMap.prototype.getExtent.apply(__INSTANCE__, arguments);
  };

  // Accessor to expose the pre-constructed instance
  StaticMap.getInstance = function () {
    return __INSTANCE__;
  };

  return StaticMap;
});
