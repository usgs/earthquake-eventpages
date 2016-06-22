/* global after, before, chai, describe, it, sinon */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('pdl/CatalogEvent', function () {
  var realEvent;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        realEvent = CatalogEvent(data);
        done();
      },
      error: function () {
        done(false);
      }
    });
  });

  after(function () {
    realEvent = null;
  });

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof CatalogEvent).to.equal('function');
    });
  });

  describe('CatalogEvent.productMapToList', function () {
    it('merges nested arrays', function () {
      var map;

      map = {
        'a': ['b', 'c'],
        'd': ['e', 'f']
      };

      expect(CatalogEvent.productMapToList(map)).to.deep.equal(
          ['b', 'c', 'e', 'f']);
    });
  });

  describe('CatalogEvent.getWithoutSuperseded', function () {
    var p1,
        p2,
        p3;

    before(function () {
      p1 = Product({
        source: 'a',
        type: 'b',
        code: 'c',
        updateTime: 1
      });
      p2 = Product({
        source: 'a',
        type: 'b',
        code: 'c',
        updateTime: 2
      });
      p3 = Product({
        source: 'a',
        type: 'b',
        code: 'd',
        updateTime: 3
      });
    });

    it('removes superseded products', function () {
      expect(CatalogEvent.getWithoutSuperseded([p1, p2, p3])).to.deep.equal(
          [p2, p3]);
    });

    it('works regardless of product order', function () {
      expect(CatalogEvent.getWithoutSuperseded([p3, p2, p1])).to.deep.equal(
          [p3, p2]);
    });
  });


  describe('CatalogEvent.getWithoutDeleted', function () {
    it('removes deleted products', function () {
      var deleted,
          updated;

      deleted = {
        isDeleted: function () { return true; }
      };
      updated = {
        isDeleted: function () { return false; }
      };

      expect(CatalogEvent.getWithoutDeleted([deleted]).length).to.equal(0);
      expect(CatalogEvent.getWithoutDeleted([updated, deleted]).length).
          to.equal(1);
      expect(CatalogEvent.getWithoutDeleted([updated, updated]).length).
          to.equal(2);
    });
  });

  describe('CatalogEvent.getSortedMostPreferredFirst', function () {
    it('sorts by preferredWeight', function () {
      var p1,
          p2;

      p1 = Product({
        preferredWeight: 1
      });
      p2 = Product({
        preferredWeight: 2
      });

      expect(CatalogEvent.getSortedMostPreferredFirst([p1, p2])).
          to.deep.equal([p2, p1]);
      expect(CatalogEvent.getSortedMostPreferredFirst([p2, p1])).
          to.deep.equal([p2, p1]);

      p1.destroy();
      p2.destroy();
    });

    it('sorts by updateTime when preferredWeights equal', function () {
      var p1,
          p2;

      p1 = Product({
        preferredWeight: 2,
        updateTime: 1
      });
      p2 = Product({
        preferredWeight: 2,
        updateTime: 2
      });

      expect(CatalogEvent.getSortedMostPreferredFirst([p1, p2])).
          to.deep.equal([p2, p1]);
      expect(CatalogEvent.getSortedMostPreferredFirst([p2, p1])).
          to.deep.equal([p2, p1]);

      p1.destroy();
      p2.destroy();
    });
  });

  describe('CatalogEvent.productHasOriginProperties', function () {
    it('returns true if all properties set', function () {
      var p;

      p = Product({
        properties: {
          eventsource: null,
          eventsourcecode: null,
          latitude: null,
          longitude: null,
          eventtime: null
        }
      });
      expect(CatalogEvent.productHasOriginProperties(p)).to.equal(true);
      p.destroy();

      p = Product({
        properties: {
          eventsourcecode: null,
          latitude: null,
          longitude: null,
          eventtime: null
        }
      });
      expect(CatalogEvent.productHasOriginProperties(p)).to.equal(false);
      p.destroy();

      p = Product({
        properties: {
          eventsource: null,
          latitude: null,
          longitude: null,
          eventtime: null
        }
      });
      expect(CatalogEvent.productHasOriginProperties(p)).to.equal(false);
      p.destroy();

      p = Product({
        properties: {
          eventsource: null,
          eventsourcecode: null,
          longitude: null,
          eventtime: null
        }
      });
      expect(CatalogEvent.productHasOriginProperties(p)).to.equal(false);
      p.destroy();

      p = Product({
        properties: {
          eventsource: null,
          eventsourcecode: null,
          latitude: null,
          eventtime: null
        }
      });
      expect(CatalogEvent.productHasOriginProperties(p)).to.equal(false);
      p.destroy();

      p = Product({
        properties: {
          eventsource: null,
          eventsourcecode: null,
          latitude: null,
          longitude: null
        }
      });
      expect(CatalogEvent.productHasOriginProperties(p)).to.equal(false);
      p.destroy();
    });
  });

  describe('addProduct', function () {
    it('adds product to event', function () {
      var ev,
          product;

      ev = CatalogEvent();
      product = Product({
        'type': 'newtype'
      });

      ev.addProduct(product);
      expect(ev.getProducts('newtype')[0]).to.equal(product);
      product.destroy();
    });
  });

  describe('removeProduct', function () {
    it('removes product from event', function () {
      var ev,
          product;

      ev = CatalogEvent({
        properties: {
          products: {
            'newtype': [{
              type: 'newtype'
            }]
          }
        }
      });
      product = ev.getProducts('newtype')[0];
      ev.removeProduct(product);
      expect(ev.getProducts('newtype')).to.deep.equal([]);
      product.destroy();
    });
  });

  describe('getProducts', function () {
    it('returns all products when no type specified', function () {
      expect('origin' in realEvent.getProducts()).to.equal(true);
    });

    it('returns only products of specified type', function () {
      var products;

      products = realEvent.getProducts('origin');
      expect(Array.isArray(products)).to.equal(true);
      expect(products[0].get('type')).to.equal('origin');
    });

    it('returns empty array when no products of specified type', function () {
      expect(realEvent.getProducts('no-such-type')).to.deep.equal([]);
    });
  });

  describe('getPreferredProduct', function () {
    var ev;

    before(function () {
      ev = CatalogEvent({
        'properties': {
          'products': {
            'TYPE': [
              {
                source: 'source',
                type: 'TYPE',
                code: 'code',
                updateTime: 1,
                preferredWeight: 10
              },
              {
                source: 'source2',
                type: 'TYPE',
                code: 'code',
                updateTime: 1,
                preferredWeight: 11
              }
            ]
          }
        }
      });
    });

    after(function (){
      ev = null;
    });

    it('returns the most preferred product of specified type', function () {
      expect(ev.getPreferredProduct('TYPE').get('source')).to.equal('source2');
    });

    it('returns null if no product exists', function () {
      expect(ev.getPreferredProduct('no-such-type')).to.equal(null);
    });
  });


  describe('getAllProductVersions', function () {
    it('returns all matching versions', function () {
      var ev,
          versions;

      ev = CatalogEvent({
        'properties': {
          'products': {
            'TYPE': [
              {
                source: 'source',
                type: 'TYPE',
                code: 'code',
                updateTime: 1,
                preferredWeight: 10
              },
              {
                source: 'source2',
                type: 'TYPE',
                code: 'code',
                updateTime: 1,
                preferredWeight: 11
              },
              {
                source: 'source',
                type: 'TYPE',
                code: 'code',
                updateTime: 2,
                preferredWeight: 10
              }
            ]
          }
        }
      });

      versions = ev.getAllProductVersions('TYPE', 'source', 'code');
      expect(versions.length).to.equal(2);
      expect(versions[0].get('updateTime')).to.equal(2);
    });
  });

  describe('getProductById', function () {
    var ev;

    before(function () {
      ev = CatalogEvent({
        'properties': {
          'products': {
            'TYPE': [
              {
                source: 'source',
                type: 'TYPE',
                code: 'code',
                updateTime: 1,
                preferredWeight: 10
              },
              {
                source: 'source2',
                type: 'TYPE',
                code: 'code',
                updateTime: 1,
                preferredWeight: 11
              },
              {
                source: 'source',
                type: 'TYPE',
                code: 'code',
                updateTime: 2,
                preferredWeight: 10
              }
            ]
          }
        }
      });
    });

    after(function () {
      ev = null;
    });

    it('returns specific version', function () {
      var product;

      product = ev.getProductById('TYPE', 'source', 'code', 1);
      expect(product.get('type')).to.equal('TYPE');
      expect(product.get('code')).to.equal('code');
      expect(product.get('source')).to.equal('source');
      expect(product.get('updateTime')).to.equal(1);
    });

    it('returns most recent when updateTime not specified', function () {
      var product;

      product = ev.getProductById('TYPE', 'source', 'code');
      expect(product.get('type')).to.equal('TYPE');
      expect(product.get('code')).to.equal('code');
      expect(product.get('source')).to.equal('source');
      expect(product.get('updateTime')).to.equal(2);
    });
  });

  describe('getEventId', function () {
    it('returns the event id', function () {
      expect(realEvent.getEventId()).to.equal('us10004u1y');
    });
  });

  describe('getSource', function () {
    it('returns the event source', function () {
      expect(realEvent.getSource()).to.equal('us');
    });
  });

  describe('getSourceCode', function () {
    it('returns the event source code', function () {
      expect(realEvent.getSourceCode()).to.equal('10004u1y');
    });
  });

  describe('getTime', function () {
    it('returns the event time', function () {
      expect(realEvent.getTime().getTime()).to.equal(1456922988360);
    });
  });

  describe('getLatitude', function () {
    it('returns the event latitude', function () {
      expect(realEvent.getLatitude()).to.equal(-86.9082);
    });
  });

  describe('getLongitude', function () {
    it('returns the event latitude', function () {
      expect(realEvent.getLongitude()).to.equal(94.275);
    });
  });

  describe('getDepth', function () {
    it('returns the event depth', function () {
      expect(realEvent.getDepth()).to.equal(24);
    });
  });

  describe('getMagnitude', function () {
    it('returns the event magnitude', function () {
      expect(realEvent.getMagnitude()).to.equal(7.8);
    });
  });

  describe('getSummary', function () {
    it('uses appropriate methods and products', function () {
      var ev,
          eventIdProduct,
          magnitudeProduct,
          originProduct,
          summary;

      eventIdProduct = Product({
        properties: {
          depth: 1,
          eventsource: 'eventIdSource',
          eventsourcecode: 'eventIdSourceCode',
          eventtime: 2,
          latitude: 3,
          longitude: 4,
          magnitude: 5
        }
      });

      magnitudeProduct = Product({
        properties: {
          depth: 6,
          eventsource: 'magnitudeSource',
          eventsourcecode: 'magnitudeSourceCode',
          eventtime: 7,
          latitude: 8,
          longitude: 9,
          magnitude: 10
        }
      });


      originProduct = Product({
        properties: {
          depth: 11,
          eventsource: 'originSource',
          eventsourcecode: 'originSourceCode',
          eventtime: 12,
          latitude: 13,
          longitude: 14,
          magnitude: 15
        }
      });

      ev = CatalogEvent();
      sinon.stub(ev, 'getAllEventCodes',
          function () { return 'all-event-codes-return-value'; });
      sinon.stub(ev, 'getEventIdProduct',
          function () { return eventIdProduct; });
      sinon.stub(ev, 'getProductWithOriginProperties',
          function () { return originProduct; });
      sinon.stub(ev, 'getPreferredMagnitudeProduct',
          function () { return magnitudeProduct; });
      sinon.stub(ev, 'isDeleted',
          function () { return 'deleted-return-value'; });

      summary = ev.getSummary();
      expect(summary.id).to.equal('eventIdSourceeventIdSourceCode');
      expect(summary.source).to.equal('eventIdSource');
      expect(summary.sourceCode).to.equal('eventIdSourceCode');
      expect(summary.eventIdProduct).to.equal(eventIdProduct);
      expect(summary.depth).to.equal(11);
      expect(summary.latitude).to.equal(13);
      expect(summary.longitude).to.equal(14);
      expect(summary.time.getTime()).to.equal(12);
      expect(summary.originProduct).to.equal(originProduct);
      expect(summary.magnitude).to.equal(10);
      expect(summary.magnitudeProduct).to.equal(magnitudeProduct);
      expect(summary.eventCodes).to.equal('all-event-codes-return-value');
      expect(summary.isDeleted).to.equal('deleted-return-value');

      ev.getAllEventCodes.restore();
      ev.getEventIdProduct.restore();
      ev.getProductWithOriginProperties.restore();
      ev.getPreferredMagnitudeProduct.restore();
      ev.isDeleted.restore();
      eventIdProduct.destroy();
      magnitudeProduct.destroy();
      originProduct.destroy();
      ev = null;
      summary = null;
    });
  });

});
