'use strict';

var Util = require('util/Util');

/**
 * Convert a product map to an array.
 *
 * @param map {Object}
 *        keys are product types.
 *        values are arrays of products.
 * @return {Array}
 *         array containing all products.
 */
var productMapToList = function (map) {
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
var getWithoutSuperseded = function (list) {
  var unique = {},
      products;
  list.forEach(function (product) {
    var key,
        modified;
    key = product.source + '_' + product.type + '_' + product.code;
    modified = -1;
    if (unique.hasOwnProperty(key)) {
      modified = unique[key].updateTime;
    }
    if (modified < product.updateTime) {
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
var getWithoutDeleted = function (list) {
  var withoutDeleted = [];
  list.forEach(function (product) {
    if (product.status.toUpperCase() !== 'DELETE') {
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
var getSortedMostPreferredFirst = function (list) {
  var sorted = list.splice(0);
  sorted.sort(function (p1, p2) {
    var diff;
    diff = p2.preferredWeight - p1.preferredWeight;
    if (diff !== 0) {
      return diff;
    }
    diff = p2.updateTime - p1.updateTime;
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
var productHasOriginProperties = function (product) {
  var props = product.properties;
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
 * Products are sorted using getSortedMostPreferredFirst before checking
 * for properties.
 *
 * @param list {Array}
 *        array of products.
 * @return {Object}
 *         most preferred product with origin properties.
 */
var getProductWithOriginProperties = function (list) {
  var i,
      product;
  list = getSortedMostPreferredFirst(list);
  for (i = 0; i < list.length; i++) {
    product = list[i];
    if (productHasOriginProperties(product)) {
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
 * Products are sorted using getSortedMostPreferredFirst before checking
 * for properties.
 *
 * @param list {Array}
 *        array of products.
 * @return {Object}
 *         most preferred product with event id properties.
 */
var getProductWithEventIdProperties = function (list) {
  var i,
      props;
  list = getSortedMostPreferredFirst(list);
  for (i = 0; i < list.length; i++) {
    props = list[i].properties;
    if (props.hasOwnProperty('eventsource') &&
        props.hasOwnProperty('eventsourcecode')) {
      return list[i];
    }
  }
  return null;
};


var removePhases = function (products) {
  var product,
      originProducts = {},
      phaseProducts = {},
      newProducts = [],
      loaded = {},
      key,
      i;

  for (i = 0; i < products.length; i++) {
    product = products[i];
    key = product.source + product.code;

    if (product.type === 'origin'){
      originProducts[key] = product;
    } else if (product.type === 'phase-data') {
      phaseProducts[key] = product;
    }
  }

  for (i = 0; i < products.length; i++) {
    product = products[i];
    key = product.source + product.code;

    if (product.type !== 'origin' && product.type !== 'phase-data') {
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

  _initialize = function () {
    _products = {};
    _properties = {};
    if (typeof eventDetails !== 'undefined') {
      _products = eventDetails.properties.products;
      _properties = Util.extend({}, eventDetails.properties, {products:null});
    }
    _summary = null;
    // clean up
    eventDetails = null;
  };

  /**
   * Add a product to this event.
   *
   * @param product {Object}
   *        product to add.
   */
  _this.addProduct = function (product) {
    var type = product.type;
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
    var type = product.type,
        typeProducts,
        index;
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
   * Get all versions of a product (type, souce, code).
   */
  _this.getAllProductVersions = function (type, source, code) {
    var products = [],
        product;

    for (var i = 0; i < _products[type].length; i++) {
      product = _products[type][i];
      if (product.source === source && product.code === code) {
        products.push(product);
      }
    }
    // sort most recent first.
    products.sort(function (p1, p2) {
      return p2.updateTime - p1.updateTime;
    });
    return products;
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
      props = product.properties;
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
      return product.properties.eventsource;
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
      return product.properties.eventsourcecode;
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
      return new Date(product.properties.eventtime);
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
      return Number(product.properties.latitude);
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
      return Number(product.properties.longitude);
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
      props = product.properties;
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
      props = product.properties;
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
        product.status.toUpperCase() !== 'DELETE' &&
        productHasOriginProperties(product)) {
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
    if (product === null) {
      product = _this.getProductWithEventIdProperties();
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
      product = getProductWithOriginProperties(
          getWithoutDeleted(getWithoutSuperseded(
              _products.origin)));
      if (product !== null) {
        return product;
      }
      // origin products superseded by a delete
      product = getProductWithOriginProperties(
          getWithoutSuperseded(getWithoutDeleted(
              _products.origin)));
      if (product !== null) {
        return product;
      }
    }
    // products not superseded or deleted
    product = getProductWithOriginProperties(
        getWithoutDeleted(getWithoutSuperseded(
            productMapToList(_products))));
    if (product !== null) {
      return product;
    }
    // products superseded by a delete
    product = getProductWithOriginProperties(
        getWithoutSuperseded(getWithoutDeleted(
            productMapToList(_products))));
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
      product = getProductWithOriginProperties(
          getWithoutDeleted(getWithoutSuperseded(
              _products.origin)));
      if (product !== null) {
        return product;
      }
      // origin products not superseded that have event id
      product = getProductWithEventIdProperties(
          getWithoutSuperseded(_products.origin));
      if (product !== null) {
        return product;
      }
      // origin exists, but is incomplete
      return null;
    }
    // products not superseded or deleted
    product = getProductWithOriginProperties(
        getWithoutDeleted(getWithoutSuperseded(
            productMapToList(_products))));
    if (product !== null) {
      return product;
    }
    // products not superseded that have eventid.
    product = getProductWithEventIdProperties(
        getWithoutSuperseded(productMapToList(_products)));
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

    withoutSuperseded = getWithoutSuperseded(
        productMapToList(_products));
    withoutSuperseded.forEach(function (product) {
      var key,
          eventCode,
          eventSource,
          props,
          subEvent,
          subEventId;
      key = product.source + '_' + product.type + '_' + product.code;
      props = product.properties || {};
      eventSource = props.eventsource || null;
      eventCode = props.eventsourcecode || null;
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

    productMapToList(_products).forEach(function (product) {
      var key;
      if (withoutSuperseded.indexOf(product) !== -1) {
        return;
      }
      key = product.source + '_' + product.type + '_' + product.code;
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
      time: null
    };
    _summary.isDeleted = _this.isDeleted();

    eventIdProduct = _this.getEventIdProduct();
    if (eventIdProduct !== null) {
      props = eventIdProduct.properties;
      _summary.id = props.eventsource + props.eventsourcecode;
      _summary.source = props.eventsource;
      _summary.sourceCode = props.eventsourcecode;
    }

    originProduct = _this.getProductWithOriginProperties();
    if (originProduct !== null) {
      props = originProduct.properties;
      _summary.depth = Number(props.depth);
      _summary.latitude = Number(props.latitude);
      _summary.longitude = Number(props.longitude);
      _summary.time = new Date(props.eventtime);
    }

    magnitudeProduct = _this.getPreferredMagnitudeProduct();
    if (magnitudeProduct !== null) {
      _summary.magnitude = Number(magnitudeProduct.properties.magnitude);
    }

    _summary.eventCodes = _this.getAllEventCodes();
    _summary.properties = _properties;

    return _summary;
  };


  _initialize();
  return _this;
};


// add static methods
CatalogEvent.productMapToList = productMapToList;
CatalogEvent.getWithoutDeleted = getWithoutDeleted;
CatalogEvent.getWithoutSuperseded = getWithoutSuperseded;
CatalogEvent.getSortedMostPreferredFirst = getSortedMostPreferredFirst;
CatalogEvent.productHasOriginProperties = productHasOriginProperties;
CatalogEvent.removePhases = removePhases;


module.exports = CatalogEvent;
