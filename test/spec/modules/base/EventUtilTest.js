/* global after, before, chai, describe, it */
'use strict';


var EventUtil = require('base/EventUtil');


var expect;

expect = chai.expect;


describe('EventUtil', function () {
  describe('Basic Structure', function () {
    it('conforms to the API', function () {
      expect(EventUtil).to.respondTo('getAttribution');
      expect(EventUtil).to.respondTo('getCodeFromHash');
      expect(EventUtil).to.respondTo('getProducts');
    });
  });

  describe('getAttribution()', function () {
    it('returns an empty string when no product is given', function () {
      expect(EventUtil.getAttribution()).to.equal('');
    });

    it('returns an attribution string when a product is given', function () {
      var div,
          product;

      product = {
        source: 'us',
        updateTime: (new Date(0)).getTime()
      };

      div = document.createElement('div');
      div.innerHTML = EventUtil.getAttribution(product);

      /* jshint -W030 */
      expect(div.querySelector('.attribution')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('getCodeFromHash()', function () {
    var originalHash,
        testCode,
        testHash;

    before(function () {
      testCode = 'us_usabcd1234';
      testHash = '#scientific_origin:' + testCode;
      originalHash = window.location.hash;

      window.location.hash = testHash;
    });

    after(function () {
      window.location.hash = originalHash;
    });

    it('returns the expected code info', function () {
      expect(EventUtil.getCodeFromHash()).to.equal(testCode);
    });
  });

  describe('getProducts', function () {
    it('returns an empty array when no products are found', function () {
      var products;

      products = EventUtil.getProducts({
        properties: {
          products: {}
        }
      }, 'faketype');

      try {
        expect(products.length).to.equal(0);
      } catch (e) {
        expect('Exception thrown: ' + e.message).to.equal('');
      }
    });

    it('returns a list of products', function () {
      var products;

      products = EventUtil.getProducts({
        properties: {
          products: {
            sometype: [{}, {}],
            anothertype: [{}, {}, {}, {}]
          }
        }
      }, 'sometype');

      expect(products.length).to.equal(2);
    });
  });
});
