'use strict';

var Content = require('pdl/Content'),

    Collection = require('mvc/Collection'),
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
 * @param options.source {String}
 *        product source.
 * @param options.type {String}
 *        product type.
 * @param options.code {String}
 *        product code.
 * @param options.updateTime {Number}
 *        product update time.
 * @param options.status {String}
 *        product status.
 *        default Product.STATUS_UPDATE,
 *        use Product.STATUS_DELETE for deletes.
 * @param options.properties {Object}
 *        keys are property names.
 *        values must be strings.
 * @param options.links {Object}
 *        keys are link relation names.
 *        values are arrays of uri Strings for relation.
 * @param options.contents {Collection<Content>}.
 * @param options.preferredWeight {Number}
 *        optional, current preferred weight of product.
 */
var Product = function (options) {
  var _this,
      _initialize;

  _this = Model(Util.extend({
    id: null,
    source: null,
    type: null,
    code: null,
    updateTime: null,
    status: _STATUS_UPDATE,
    properties: {},
    links: {},
    contents: null,
    preferredWeight: null
  }, options));

  _initialize = function (/*options*/) {
    var contents = _this.get('contents'),
        contentsGood = true;

    if (!contents) {
      contents = [];
    }

    if (Array.isArray(contents)) {
      // Handle case if given an array
      contentsGood = false;
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
      contentsGood = false;
      contents = Object.keys(contents).map(function (key) {
        return Content(
            Util.extend({}, {id: key}, contents[key]));
      });
      contents = Collection(contents);
    }

    if (!contentsGood) {
      _this.set({contents: contents}, {silent: true});
    }
    _this.set({'contents': contents});
  };


  _this.toJSON = Util.compose(_this.toJSON, function (json) {
    var objectContents = {};

    json.contents.forEach(function (content) {
      objectContents[content.id] = {
        contentType: content.contentType,
        length: content.length,
        lastModified: content.lastModified
      };

      if (content.hasOwnProperty('url') && content.url !== null) {
        objectContents[content.id].url = content.url;
      } else if (content.hasOwnProperty('bytes') && content.bytes !== null) {
        objectContents[content.id].bytes = content.bytes;
      }

      // Maybe add path = id here ?
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
