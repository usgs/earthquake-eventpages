/* global chai, describe, it */
'use strict';

var Product = require('pdl/Product');

var expect = chai.expect;


describe('pdl/Product', function () {

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof Product).to.equal('function');
    });

    it('upconverts Content objects', function () {
      var content,
          product;

      product = Product({
        contents: {
          'test.txt': {
            'bytes': 'some text'
          }
        }
      });

      content = product.get('contents').get('test.txt');
      expect(content).to.not.equal(null);
      expect(content.get('bytes')).to.equal('some text');
    });
  });

  describe('toJSON', function () {
    it('is the same after a round trip', function () {
      var json,
          product;

      product = {
        code: 'code',
        contents: {
          'test.txt': {
            'contentType': 'text/plain',
            'length': 'some text'.length,
            'lastModified': 1234,
            'bytes': 'some text'
          }
        },
        id: 'id',
        indexid: 'indexid',
        indexTime: 1234,
        links: {
          'rel': ['uri1', 'uri2']
        },
        preferredWeight: 1,
        properties: {
          prop1: 'value1',
          prop2: 'value2'
        },
        source: 'source',
        status: Product.STATUS_UPDATE,
        type: 'type',
        updateTime: new Date().getTime()
      };

      json = JSON.stringify(Product(product).toJSON());
      expect(json).to.equal(JSON.stringify(product));
    });
  });

  describe('getBaseType', function () {
    it('works for internal products', function () {
      var product;

      product = Product({type: 'internal-type'});
      expect(Product.getBaseType(product.get('type'))).to.equal('type');

      product.destroy();
    });

    it('works for scenario products', function () {
      var product;

      product = Product({type: 'type-scenario'});
      expect(Product.getBaseType(product.get('type'))).to.equal('type');

      product.destroy();
    });

    it('fails gracefully', function () {
      var graceful,
          product,
          result;

      product = Product();

      graceful = function () {
        result = Product.getBaseType(product.get('type'));
      };

      expect(graceful).to.not.throw(Error);
      expect(result).to.equal(null);

      product.destroy();
    });
  });
});
