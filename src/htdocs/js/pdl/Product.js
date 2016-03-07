'use strict';

var Collection = require('mvc/Collection'),
    Content = require('pdl/Content'),
    Model = require('mvc/Model'),
    Util = require('util/Util');


var _STATUS_UPDATE = 'UPDATE',
    _STATUS_DELETE = 'DELETE';


/**
 * A product object.
 *
 * Typically created from an event detail feed.
 * Created manually for new products.
 *
 * @param options {Object}
 *        a product object from an event detail feed.
 * @param options.code {String}
 *        product code.
 * @param options.contents {Collection<Content>}.
 * @param options.id {String}
 *        product id URN, unique per product.
 * @param options.indexid {String}
 *        server id for product, may vary between servers.
 * @param options.indexTime {Number}
 *        millisecond epoch timestamp when product was indexed on server.
 * @param options.links {Object}
 *        keys are link relation names.
 *        values are arrays of uri Strings for relation.
 * @param options.preferredWeight {Number}
 *        optional, current preferred weight of product.
 * @param options.properties {Object}
 *        keys are property names.
 *        values must be strings.
 * @param options.source {String}
 *        product source.
 * @param options.status {String}
 *        product status.
 *        default Product.STATUS_UPDATE,
 *        use Product.STATUS_DELETE for deletes.
 * @param options.type {String}
 *        product type.
 * @param options.updateTime {Number}
 *        product update time.
 */
var Product = function (options) {
  var _this,
      _initialize;


  _this = Model(Util.extend({
    code: null,
    contents: null,
    id: null,
    indexid: null,
    indexTime: null,
    links: {},
    preferredWeight: null,
    properties: {},
    source: null,
    status: _STATUS_UPDATE,
    type: null,
    updateTime: null
  }, options));

  _initialize = function (/*options*/) {
    var contents,
        properties;

    // make sure contents and properties are defined
    contents = _this.get('contents') || [];
    properties = _this.get('properties') || [];

    // make sure contents are Content objects
    if (Array.isArray(contents)) {
      // Handle case if given an array
      contents = contents.map(function (content) {
        if (!content.get) {
          content = Content(content);
        }
        return content;
      });
      contents = Collection(contents);
    } else if (!contents.hasOwnProperty('get') ||
        !contents.hasOwnProperty('add')) {
      // Handle case when given an object map (like from data feed)
      contents = Object.keys(contents).map(function (key) {
        return Content(Util.extend({'id': key}, contents[key]));
      });
      contents = Collection(contents);
    }

    _this.set({
      'contents': contents,
      'properties': properties
    });
  };

  /**
   * Convenience method to access product content.
   *
   * @param path {String}
   *     content path.
   * @return {Content}
   *     content object, or null if not found.
   */
  _this.getContent = function (path) {
    var contents;
    contents = _this.get('contents');
    return contents.get(path);
  };

  /**
   * Convenience method to access product property..
   *
   * @param name {String}
   *     property name.
   * @return {Content}
   *     property value, or null if not found.
   */
  _this.getProperty = function (name) {
    var properties;
    properties = _this.get('properties');
    if (properties.hasOwnProperty(name)) {
      return properties[name];
    }
    return null;
  };

  /**
   * Check whether product is deleted.
   *
   * @return {Boolean}
   *     true, if product status is Product.STATUS_DELETE.
   *     false, otherwise.
   */
  _this.isDeleted = function () {
    var status;
    status = this.get('status').toUpperCase();
    if (status === Product.STATUS_DELETE) {
      return true;
    }
    return false;
  };

  /**
   * Check whether product is reviewed.
   *
   * @return {Boolean}
   *    true, if product review-status property is `reviewed`,
   *    false, if product review-status property is any other value,
   *    null, if product does not have a review-status property.
   */
  _this.isReviewed = function () {
    var reviewed;
    reviewed = _this.getProperty('review-status');
    if (reviewed !== null) {
      return (reviewed.toUpperCase() === 'REVIEWED');
    }
    return null;
  };

  /**
   * Override toJSON method so contents are output as object map.
   *
   * @param json {Object}
   *     JSONified object from Model.toJSON.
   * @return {Object}
   *     object, with contents as an object with content paths as keys.
   */
  _this.toJSON = Util.compose(_this.toJSON, function (json) {
    var objectContents = {};

    json.contents.forEach(function (content) {
      var id;

      id = content.id;

      objectContents[id] = {
        contentType: content.contentType,
        length: content.length,
        lastModified: content.lastModified
      };

      if (content.hasOwnProperty('url') && content.url !== null) {
        objectContents[id].url = content.url;
      } else if (content.hasOwnProperty('bytes') && content.bytes !== null) {
        objectContents[id].bytes = content.bytes;
      }
    });

    json.contents = objectContents;

    return json;
  });


  _initialize(options);
  options = null;
  return _this;
};


Product.STATUS_UPDATE = _STATUS_UPDATE;
Product.STATUS_DELETE = _STATUS_DELETE;


module.exports = Product;
