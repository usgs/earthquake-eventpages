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

});
