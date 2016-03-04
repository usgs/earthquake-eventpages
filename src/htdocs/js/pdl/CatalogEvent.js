'use strict';

var Product = require('pdl/Product'),
    Util = require('util/Util');

/**
 * Convert a product map to an array.
 *
 * @param map {Object}
 *        keys are product types.
 *        values are arrays of products.
 * @return {Array}
 *         array containing all products.
 */
var __productMapToList = function (map) {
  var list = [],
      type;
  for (type in map) {
    list.push.apply(list, map[type]);
  }
  return list;
};


/**
 * Filter superseded products (old versions) from array.
 *
 * @param list {Array}
 *        array of products.
 * @return {Array}
 *         array without superseded versions.
 */
var __getWithoutSuperseded = function (list) {
  var unique = {},
      products;
  list.forEach(function (product) {
    var key,
        modified;

    key = product.get('source') + '_' +
        product.get('type') + '_' +
        product.get('code');
    modified = -1;
    if (unique.hasOwnProperty(key)) {
      modified = unique[key].get('updateTime');
    }
    if (modified < product.get('updateTime')) {
      unique[key] = product;
    }
  });
  products = [];
  for (var id in unique) {
    products.push(unique[id]);
  }
  return products;
};

/**
 * Filter deleted products from array.
 *
 * @param list {Array}
 *        array of products.
 * @return {Array}
 *         array without deleted versions.
 */
var __getWithoutDeleted = function (list) {
  var withoutDeleted = [];
  list.forEach(function (product) {
    if (!product.isDeleted()) {
      withoutDeleted.push(product);
    }
  });
  return withoutDeleted;
};

/**
 * Sort products based on preferred weight.
 *
 * When preferred weights are equal, most recent updateTime is preferred.
 *
 * @param list {Array}
 *        array of products.
 * @return {Array}
 *         sorted array, most preferred first.
 */
var __getSortedMostPreferredFirst = function (list) {
  var sorted = list.splice(0);
  sorted.sort(function (p1, p2) {
    var diff;
    diff = p2.get('preferredWeight') - p1.get('preferredWeight');
    if (diff !== 0) {
      return diff;
    }
    diff = p2.get('updateTime') - p1.get('updateTime');
    if (diff !== 0) {
      return diff;
    }
    return (p1.id > p2.id ? 1 : -1);
  });
  return sorted;
};

/**
 * Check whether product has origin properties.
 *
 * Origin properties include event id (eventsource, eventsourcecode) and
 * event location (latitude, longitude, eventtime).
 *
 * @param product {Object}
 *        product to check.
 * @return true if product has all origin properties, false otherwise.
 */
var __productHasOriginProperties = function (product) {
  var props = product.get('properties');
  if (props.hasOwnProperty('eventsource') &&
      props.hasOwnProperty('eventsourcecode') &&
      props.hasOwnProperty('latitude') &&
      props.hasOwnProperty('longitude') &&
      props.hasOwnProperty('eventtime')) {
    return true;
  }
  return false;
};

/**
 * Get the most preferred product with origin properties.
 *
 * Origin properties include event id (eventsource, eventsourcecode) and
 * event location (latitude, longitude, eventtime).
 *
 * Products are sorted using __getSortedMostPreferredFirst before checking
 * for properties.
 *
 * @param list {Array}
 *        array of products.
 * @return {Object}
 *         most preferred product with origin properties.
 */
var __getProductWithOriginProperties = function (list) {
  var i,
      product;
  list = __getSortedMostPreferredFirst(list);
  for (i = 0; i < list.length; i++) {
    product = list[i];
    if (__productHasOriginProperties(product)) {
      return product;
    }
  }
  return null;
};


/**
 * Get the most preferred product with event id properties.
 *
 * Event ID properties are eventsource and eventsourcecode.
 *
 * Products are sorted using __getSortedMostPreferredFirst before checking
 * for properties.
 *
 * @param list {Array}
 *        array of products.
 * @return {Object}
 *         most preferred product with event id properties.
 */
var __getProductWithEventIdProperties = function (list) {
  var i,
      props;
  list = __getSortedMostPreferredFirst(list);
  for (i = 0; i < list.length; i++) {
    props = list[i].get('properties');
    if (props.hasOwnProperty('eventsource') &&
        props.hasOwnProperty('eventsourcecode')) {
      return list[i];
    }
  }
  return null;
};


var __removePhases = function (products) {
  var product,
      originProducts = {},
      phaseProducts = {},
      newProducts = [],
      loaded = {},
      key,
      type,
      i;

  for (i = 0; i < products.length; i++) {
    product = products[i];
    key = product.get('source') + product.get('code');
    type = product.get('type');
    if (type === 'origin'){
      originProducts[key] = product;
    } else if (type === 'phase-data') {
      phaseProducts[key] = product;
    }
  }

  for (i = 0; i < products.length; i++) {
    product = products[i];
    key = product.get('source') + product.get('code');
    type = product.get('type');

    if (type !== 'origin' && type !== 'phase-data') {
      newProducts.push(product);
    } else if(originProducts.hasOwnProperty(key) &&
        phaseProducts.hasOwnProperty(key) &&
        loaded[key] !== true) {
      newProducts.push(originProducts[key]);
      loaded[key] = true;
    } else if (loaded[key] !== true) {
      newProducts.push(product);
    }
  }

  return newProducts;
};


/**
 * An event is a collection of products.
 */
var CatalogEvent = function (eventDetails) {
  var _this,
      _initialize,
      _products,
      _properties,
      _summary;

  _this = Object.create({});

  _initialize = function (eventDetails) {
    var type;

    _products = {};
    _properties = {};
    if (typeof eventDetails !== 'undefined') {
      _products = eventDetails.properties.products;
      _properties = Util.extend({}, eventDetails.properties, {products:null});
    }
    // convert all products to Product objects
    for (type in _products) {
      _products[type] = _products[type].map(Product);
    }
    _summary = null;
  };

  /**
   * Add a product to this event.
   *
   * @param product {Object}
   *        product to add.
   */
  _this.addProduct = function (product) {
    var type;

    type = product.get('type');
    if (!_products.hasOwnProperty(type)) {
      _products[type] = [];
    }
    _products[type].push(product);
    _summary = null;
  };

  /**
   * Remove a product from this event.
   *
   * @param product {Object}
   *        product to remove.
   */
  _this.removeProduct = function (product) {
    var type,
        typeProducts,
        index;
    type = product.get('type');
    if (_products.hasOwnProperty(type)) {
      typeProducts = _products[type];
      index = typeProducts.indexOf(product);
      if (index >= 0) {
        typeProducts = typeProducts.splice(index, 1);
        if (typeProducts.length === 0) {
          delete _products[type];
        } else {
          _products[type] = typeProducts;
        }
        _summary = null;
      }
    }
  };

  /**
   * Get event products.
   */
  _this.getProducts = function (type) {
    if (type) {
      return _products[type] || [];
    } else {
      return _products;
    }
  };

  /**
   * Get the preferred product of the specified type.
   *
   * @param type {String}
   *     type of product.
   * @return {Product}
   *     preferred product of type, or null if no product of that type exists.
   */
  _this.getPreferredProduct = function (type) {
    var products;
    products = _this.getProducts(type);
    products = __getSortedMostPreferredFirst(
        __getWithoutSuperseded(products));
    if (products.length > 0) {
      return products[0];
    }
    return null;
  };

  /**
   * Get all versions of a product (type, souce, code).
   */
  _this.getAllProductVersions = function (type, source, code) {
    var products;

    if (_products.hasOwnProperty(type)) {
      products = _products.filter(function (p) {
        return p.get('source') === source &&
            p.get('code') === code;
      });
    } else {
      products = [];
    }
    // sort most recent first.
    products.sort(function (p1, p2) {
      return p2.get('updateTime') - p1.get('updateTime');
    });
    return products;
  };

  /**
   * Gets a product based on the productId parameters.
   *
   * @param type {String}
   *     The type of the product to get
   * @param source {String}
   *     The source of the product to get
   * @param code {String}
   *     The code of the product to get
   * @param updateTime {Number} Optional.
   *     The updateTime of the product to get
   *
   * @return {Product}
   *     The product matching the given type, source, code, and updateTime. If
   *     no updateTime is specified, the most recently updated product matching
   *     type, source and code is returned instead.
   */
  _this.getProductById = function (type, source, code, updateTime) {
    var i,
        len,
        product,
        products;

    product = null;
    products = _this.getAllProductVersions(type, source, code);
    len = products.length;

    if (typeof updateTime !== 'undefined' && updateTime !== null) {
      for (i = 0; i < len; i++) {
        if (products[i].get('updateTime') === updateTime) {
          product = products[i];
          break;
        }
      }
    } else if (len) {
      // No updateTime specified, most recently updated product
      product = products[0]; // Products are sorted, so first is most recent
    }

    return product;
  };

  /**
   * Get the preferred event id.
   *
   * @return {String}
   *         the preferred event id, or null if none.
   */
  _this.getEventId = function () {
    var product = _this.getEventIdProduct(),
        props;
    if (product !== null) {
      props = product.get('properties');
      return props.eventsource + props.eventsourcecode;
    }
    return null;
  };

  /**
   * Get the preferred event source.
   *
   * @return {String}
   *         the preferred event source, or null if none.
   */
  _this.getSource = function () {
    var product = _this.getEventIdProduct();
    if (product !== null) {
      return product.getProperty('eventsource');
    }
    return null;
  };

  /**
   * Get the preferred event code.
   *
   * @return {String}
   *         the preferred event code, or null if none.
   */
  _this.getSourceCode = function () {
    var product = _this.getEventIdProduct();
    if (product !== null) {
      return product.getProperty('eventsourcecode');
    }
    return null;
  };

  /**
   * Get the preferred event time.
   *
   * @return {Date}
   *         the preferred origin time for this event, or null if none.
   */
  _this.getTime = function () {
    var product = _this.getProductWithOriginProperties();
    if (product !== null) {
      return new Date(product.getProperty('eventtime'));
    }
    return null;
  };

  /**
   * Get the preferred event latitude.
   *
   * @return {Number}
   *         the preferred latitude for this event, or null if none.
   */
  _this.getLatitude = function () {
    var product = _this.getProductWithOriginProperties();
    if (product !== null) {
      return Number(product.getProperty('latitude'));
    }
    return null;
  };

  /**
   * Get the preferred event longitude.
   *
   * @return {Number}
   *         the preferred longitude for this event, or null if none.
   */
  _this.getLongitude = function () {
    var product = _this.getProductWithOriginProperties();
    if (product !== null) {
      return Number(product.getProperty('longitude'));
    }
    return null;
  };

  /**
   * Get the preferred event depth.
   *
   * @return {Number}
   *         the preferred depth for this event, or null if none.
   */
  _this.getDepth = function () {
    var product = _this.getProductWithOriginProperties(),
        props;
    if (product !== null) {
      props = product.get('properties');
      return (props.hasOwnProperty('depth') ? Number(props.depth) : null);
    }
    return null;
  };

  /**
   * Get the preferred event magnitude.
   *
   * @return {Number}
   *         the preferred magnitude for this event, or null if none.
   */
  _this.getMagnitude = function () {
    var product = _this.getPreferredMagnitudeProduct(),
        props;
    if (product === null) {
      product = _this.getProductWithOriginProperties();
    }
    if (product !== null) {
      props = product.get('properties');
      return (props.hasOwnProperty('magnitude') ?
          Number(props.magnitude) : null);
    }
    return null;
  };

  /**
   * Check whether event is deleted.
   *
   * @return {Boolean}
   *         true if deleted, false otherwise.
   */
  _this.isDeleted = function () {
    var product = _this.getPreferredOriginProduct();
    if (product !== null &&
        !product.isDeleted() &&
        __productHasOriginProperties(product)) {
      // have "origin" product, that isn't deleted, and has origin properties.
      return false;
    }
    // otherwise, deleted
    return true;
  };

  /**
   * Get the product with event id properties.
   *
   * This may be a superseded or deleted product.
   *
   * @return {Number}
   *         the preferred latitude for this event, or null if none.
   */
  _this.getEventIdProduct = function () {
    var product = _this.getPreferredOriginProduct();
    if (product === null) {
      product = _this.getProductWithOriginProperties();
    }
    return product;
  };

  /**
   * Get the product with origin properties.
   *
   * This may be a superseded or deleted product.
   *
   * @return {Number}
   *         the product with origin properties this event, or null if none.
   */
  _this.getProductWithOriginProperties = function () {
    var product;
    if (_products.hasOwnProperty('origin')) {
      // origin products not superseded or deleted
      product = __getProductWithOriginProperties(
          __getWithoutDeleted(__getWithoutSuperseded(
              _products.origin)));
      if (product !== null) {
        return product;
      }
      // origin products superseded by a delete
      product = __getProductWithOriginProperties(
          __getWithoutSuperseded(__getWithoutDeleted(
              _products.origin)));
      if (product !== null) {
        return product;
      }
    }
    // products not superseded or deleted
    product = __getProductWithOriginProperties(
        __getWithoutDeleted(__getWithoutSuperseded(
            __productMapToList(_products))));
    if (product !== null) {
      return product;
    }
    // products superseded by a delete
    product = __getProductWithOriginProperties(
        __getWithoutSuperseded(__getWithoutDeleted(
            __productMapToList(_products))));
    return product;
  };

  /**
   * Get the preferred product with origin properties.
   *
   * If no preferred product has origin properties,
   * look for preferred product with event id.
   *
   * @return {Number}
   *         the preferred product with origin properties this event, or null.
   */
  _this.getPreferredOriginProduct = function () {
    var product;
    if (_products.hasOwnProperty('origin')) {
      // origin products not superseded or deleted
      product = __getProductWithOriginProperties(
          __getWithoutDeleted(__getWithoutSuperseded(
              _products.origin)));
      if (product !== null) {
        return product;
      }
      // origin products not superseded that have event id
      product = __getProductWithEventIdProperties(
          __getWithoutSuperseded(_products.origin));
      if (product !== null) {
        return product;
      }
      // origin exists, but is incomplete
      return null;
    }
    // products not superseded or deleted
    product = __getProductWithOriginProperties(
        __getWithoutDeleted(__getWithoutSuperseded(
            __productMapToList(_products))));
    if (product !== null) {
      return product;
    }
    // products not superseded that have eventid.
    product = __getProductWithEventIdProperties(
        __getWithoutSuperseded(__productMapToList(_products)));
    if (product !== null) {
      return product;
    }
    // products superseded by a delete that have eventid
    product = __getProductWithEventIdProperties(
        __getWithoutSuperseded(__getWithoutDeleted(
          __productMapToList(_products))));
    return product;
  };


  /**
   * Get the preferred magnitude product.
   *
   * Current calls getPreferredOriginProduct.  Method is a placeholder in case
   * moment-tensor or other products become preferred source of magnitude.
   *
   * @return {Object}
   *         the product that defines the magnitude for the event, or null.
   */
  _this.getPreferredMagnitudeProduct = function () {
    return _this.getPreferredOriginProduct();
  };

  /**
   * Break this event into events by contributor.
   *
   * All products that do not include an event id are included with the
   * preferred sub event.
   *
   * @return {Object}
   *         keys are event ids.
   *         values are CatalogEvents.
   */
  _this.getSubEvents = function () {
    var preferredEvent,
        preferredEventId,
        productEvents,
        subEvents,
        withoutSuperseded;

    preferredEventId = _this.getEventId();
    preferredEvent = CatalogEvent();
    productEvents = {};
    subEvents = {};
    subEvents[preferredEventId] = preferredEvent;

    withoutSuperseded = __getWithoutSuperseded(
        __productMapToList(_products));
    withoutSuperseded.forEach(function (product) {
      var key,
          eventCode,
          eventSource,
          subEvent,
          subEventId;
      key = product.get('source') + '_' +
          product.get('type') + '_' +
          product.get('code');
      eventSource = product.getProperty('eventsource');
      eventCode = product.getProperty('eventsourcecode');
      if (eventSource === null || eventCode === null) {
        subEvent = preferredEvent;
      } else {
        subEventId = eventSource + eventCode;
        if (!subEvents.hasOwnProperty(subEventId)) {
          subEvents[subEventId] = CatalogEvent();
        }
        subEvent = subEvents[subEventId];
      }
      subEvent.addProduct(product);
      productEvents[key] = subEvent;
    });

    __productMapToList(_products).forEach(function (product) {
      var key;
      if (withoutSuperseded.indexOf(product) !== -1) {
        return;
      }
      key = product.get('source') + '_' +
          product.get('type') + '_' +
          product.get('code');
      productEvents[key].addProduct(product);
    });

    return subEvents;
  };

  /**
   * Return a map of all event ids associated to this event.
   *
   * @param includeDeleted {Boolean}
   *        optional, default false.
   * @return {Object}
   *         keys are event sources.
   *         values are array of codes from the corresponding source.
   */
  _this.getAllEventCodes = function (includeDeleted) {
    var allEventCodes = {},
        codes,
        id,
        source,
        sourceCode,
        subEvents,
        subEvent;

    subEvents = _this.getSubEvents();
    for (id in subEvents) {
      subEvent = subEvents[id];
      // skip the deleted subEvent
      if (!includeDeleted && subEvent.isDeleted()) {
        continue;
      }

      source = subEvent.getSource();
      sourceCode = subEvent.getSourceCode();
      if (!(source in allEventCodes)) {
        allEventCodes[source] = [];
      }
      codes = allEventCodes[source];
      if (codes.indexOf(sourceCode) === -1) {
        codes.push(sourceCode);
      }
    }
    return allEventCodes;
  };

  /**
   * Get event summary.
   *
   * @return {Object}
   *         event summary.
   */
  _this.getSummary = function () {
    var eventIdProduct,
        originProduct,
        magnitudeProduct,
        props;

    if (_summary !== null) {
      return _summary;
    }

    _summary = {
      depth: null,
      eventCodes: null,
      id: null,
      isDeleted: null,
      latitude: null,
      longitude: null,
      magnitude: null,
      properties: null,
      source: null,
      sourceCode: null,
      time: null,
      // products for above information
      eventIdProduct: null,
      originProduct: null,
      magnitudeProduct: null
    };
    _summary.isDeleted = _this.isDeleted();

    eventIdProduct = _this.getEventIdProduct();
    if (eventIdProduct !== null) {
      props = eventIdProduct.get('properties');
      _summary.id = props.eventsource + props.eventsourcecode;
      _summary.source = props.eventsource;
      _summary.sourceCode = props.eventsourcecode;
      _summary.eventIdProduct = eventIdProduct;
    }

    originProduct = _this.getProductWithOriginProperties();
    if (originProduct !== null) {
      props = originProduct.get('properties');
      _summary.depth = Number(props.depth);
      _summary.latitude = Number(props.latitude);
      _summary.longitude = Number(props.longitude);
      _summary.time = new Date(props.eventtime);
      _summary.originProduct = originProduct;
    }

    magnitudeProduct = _this.getPreferredMagnitudeProduct();
    if (magnitudeProduct !== null) {
      _summary.magnitude = Number(magnitudeProduct.getProperty('magnitude'));
      _summary.magnitudeProduct = magnitudeProduct;
    }

    _summary.eventCodes = _this.getAllEventCodes();
    _summary.properties = _properties;

    return _summary;
  };


  _initialize(eventDetails);
  eventDetails = null;
  return _this;
};


// add static methods
CatalogEvent.productMapToList = __productMapToList;
CatalogEvent.getWithoutDeleted = __getWithoutDeleted;
CatalogEvent.getWithoutSuperseded = __getWithoutSuperseded;
CatalogEvent.getSortedMostPreferredFirst = __getSortedMostPreferredFirst;
CatalogEvent.productHasOriginProperties = __productHasOriginProperties;
CatalogEvent.removePhases = __removePhases;


module.exports = CatalogEvent;
