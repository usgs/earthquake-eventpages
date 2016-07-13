/* global afterEach, beforeEach, chai, describe, it, L, sinon */
'use strict';


var CatalogEvent = require('pdl/CatalogEvent'),
    Model = require('mvc/Model'),
    Product = require('pdl/Product'),
    RegionalInfoModule = require('general/RegionalInfoModule'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('general/RegionalInfoModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof RegionalInfoModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(RegionalInfoModule).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var module;

      module = RegionalInfoModule();

      expect(module.destroy).to.not.throw(Error);
      module.destroy();
    });
  });

  describe('getNearbyPlacesProduct', function () {
    var config,
        ev,
        module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      config = {};
      ev = CatalogEvent();

      module = RegionalInfoModule({
        model: Model({
          event: ev,
          config: config
        })
      });
    });


    it('checks the origins and nearby-cities on the event', function () {

      sinon.spy(ev, 'getProducts');
      module.getNearbyPlacesProduct(ev, config);

      expect(ev.getProducts.callCount).to.equal(2);
      expect(ev.getProducts.calledWith('nearby-cities')).to.equal(true);
      expect(ev.getProducts.calledWith('origin')).to.equal(true);

      ev.getProducts.restore();
    });

    it('returns null if none exist', function () {
      var product;

      // No products, must be null
      product = module.getNearbyPlacesProduct(ev, config);
      expect(product).to.equal(null);

      // Now add some products that match and ensure still null
      ev.addProduct(Product({
        type: 'origin',
        source: 'at',
        code: 'product1'
      }));
      ev.addProduct(Product({
        type: 'nearby-cities',
        source: 'us',
        code: 'product1'
      }));

      product = module.getNearbyPlacesProduct(ev, config);
      expect(product).to.equal(null);
    });

    it('returns the non-automatic when exists', function () {
      var product;

      ev.addProduct(Product({
        type: 'origin',
        source: 'at',
        code: 'product1'
      }));
      ev.addProduct(Product({
        type: 'nearby-cities',
        source: 'us',
        code: 'product1'
      }));
      ev.addProduct(Product({
        type: 'nearby-cities',
        source: 'us',
        code: 'product2'
      }));

      product = module.getNearbyPlacesProduct(ev, config);
      expect(product).to.not.equal(null);
      expect(product.get('code')).to.equal('product2');
    });
  });

  describe('isAutomaticNearbyCity', function () {
    var config,
        ev,
        module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      config = {};
      ev = CatalogEvent();

      module = RegionalInfoModule({
        model: Model({
          event: ev,
          config: config
        })
      });
    });

    it('checks the correct properties', function () {
      var city,
          origin;

      city = Product();
      origin = Product();

      sinon.spy(city, 'get');
      sinon.spy(origin, 'get');

      module.isAutomaticNearbyCity(city, origin);

      expect(city.get.calledWith('source')).to.equal(true);
      expect(city.get.calledWith('code')).to.equal(true);
      expect(origin.get.calledWith('code')).to.equal(true);

      city.get.restore();
      origin.get.restore();
    });

    it('returns expected value', function () {
      var city,
          origin;

      city = Product({source: 'us', code: 'product1'});
      origin = Product({source: 'at', code: 'product1'});

      expect(module.isAutomaticNearbyCity(city, origin)).to.equal(true);

      city.set({source: 'at'});

      expect(module.isAutomaticNearbyCity(city, origin)).to.equal(false);
    });
  });

  describe('onNearbyPlaces', function () {
    it('calls fit bounds', function () {
      var args,
          config,
          ev,
          module,
          places;

      config = {};
      ev = CatalogEvent();
      ev.addProduct(Product({
        type: 'origin',
        source: 'us',
        code: 'product1',
        properties: {
          eventsource: 'us',
          eventsourcecode: 'product1',
          latitude: 0,
          longitude: 0,
          eventtime: 0
        }
      }));

      module = RegionalInfoModule({
        model: Model({
          event: ev,
          config: config
        })
      });

      places = [
        {distance: 222.4}
      ];

      module.map = {
        fitBounds: function () {},
        remove: function () {}
      };

      sinon.spy(module.map, 'fitBounds');
      module.onNearbyPlaces(places);

      args = module.map.fitBounds.getCall(0).args;
      expect(args[0]).to.deep.equal([[2, 2],[-2, -2]]);

      module.map.fitBounds.restore();
      module.destroy();
    });
  });

  describe('onOtherRegionComplete', function () {
    it('renders into the container', function () {
      var admin,
          data,
          module;

      module = RegionalInfoModule();
      data = {
        admin: {
          features: [
            {
              properties: {
                iso: 'USA',
                country: 'United States',
                region: 'Colorado'
              }
            }
          ]
        }
      };

      module.onOtherRegionComplete(data);

      admin = module.content.querySelector('.regional-info-module-admin');

      expect(admin).to.not.equal(null);

      expect(admin.childNodes.length).to.equal(6);

      module.destroy();
    });
  });

  describe('render', function () {
    it('calls sub-methods appropriately', function () {
      var module;

      module = RegionalInfoModule();

      sinon.spy(module, 'renderHeader');
      sinon.spy(module, 'renderMap');
      sinon.spy(module, 'renderOtherRegionInfo');
      sinon.spy(module, 'renderNearbyPlaces');
      sinon.spy(module, 'renderTectonicSummary');
      sinon.spy(module, 'renderFooter');

      module.render();

      expect(module.renderHeader.callCount).to.equal(1);
      expect(module.renderMap.callCount).to.equal(1);
      expect(module.renderOtherRegionInfo.callCount).to.equal(1);
      expect(module.renderNearbyPlaces.callCount).to.equal(1);
      expect(module.renderTectonicSummary.callCount).to.equal(1);
      expect(module.renderFooter.callCount).to.equal(1);

      module.renderHeader.restore();
      module.renderMap.restore();
      module.renderOtherRegionInfo.restore();
      module.renderNearbyPlaces.restore();
      module.renderTectonicSummary.restore();
      module.renderFooter.restore();

      module.destroy();
    });
  });

  describe('renderMap', function () {
    it('creates a map', function () {
      var ev,
          module;

      module = RegionalInfoModule();
      ev = CatalogEvent();
      ev.addProduct(Product({
        type: 'origin',
        source: 'us',
        code: 'product1',
        properties: {
          eventsource: 'us',
          eventsourcecode: 'product1',
          latitude: 0,
          longitude: 0,
          eventtime: 0
        }
      }));

      sinon.spy(L, 'map');
      module.renderMap(ev);

      expect(module.map).to.not.equal(null);
      expect(L.map.callCount).to.equal(1);

      L.map.restore();
      module.destroy();
    });
  });

  describe('renderNearbyPlaces', function () {
    it('creates the scaffold', function () {
      var el,
          ev,
          module;

      module = RegionalInfoModule();
      ev = CatalogEvent();

      module.renderNearbyPlaces(ev);

      el = module.content.querySelector('.regional-info-module-places');
      expect(el.innerHTML).to.not.equal('');

      module.destroy();
    });
  });

  describe('renderOtherRegionInfo', function () {
    it('calls geoserve regions endpoint', function () {
      var ev,
          module;

      module = RegionalInfoModule();
      ev = CatalogEvent();
      ev.addProduct(Product({
        type: 'origin',
        source: 'us',
        code: 'product1',
        properties: {
          eventsource: 'us',
          eventsourcecode: 'product1',
          latitude: 0,
          longitude: 0,
          eventtime: 0
        }
      }));

      sinon.spy(Xhr, 'ajax');

      module.renderOtherRegionInfo(ev);

      expect(Xhr.ajax.callCount).to.equal(1);

      Xhr.ajax.restore();
      module.destroy();
    });
  });

  describe('renderTectonicSummary', function () {
    it('calls geoserve regions endpoint', function () {
      var ev,
          module;

      module = RegionalInfoModule();
      ev = CatalogEvent();
      ev.addProduct(Product({
        type: 'origin',
        source: 'us',
        code: 'product1',
        properties: {
          eventsource: 'us',
          eventsourcecode: 'product1',
          latitude: 0,
          longitude: 0,
          eventtime: 0
        }
      }));

      sinon.spy(Xhr, 'ajax');

      module.renderTectonicSummary(ev);

      expect(Xhr.ajax.callCount).to.equal(1);

      Xhr.ajax.restore();
      module.destroy();
    });
  });
});
