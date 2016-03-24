/* global chai, describe, it, sinon */
'use strict';


var CatalogEvent = require('pdl/CatalogEvent'),
    Model = require('mvc/Model'),
    OriginModule = require('origin/OriginModule'),
    Product = require('pdl/Product');


var expect = chai.expect;


describe('origin/OriginModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof OriginModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(OriginModule).to.not.throw(Error);
    });
  });

  describe('destroy', function () {
    it('can be destroyed', function () {
      var module;

      module = OriginModule();
      expect(module.destroy).to.not.throw(Error);
    });
  });

  describe('getOriginProduct', function () {
    it('returns an origin if no corresponding phase-data exists', function () {
      var ev,
          module,
          result;

      ev = CatalogEvent({
        properties: {
          products: {
            origin: [
              {type: 'origin', source: 'test', code: 'expected'}
            ]
          }
        }
      });

      module = OriginModule({
        model: Model({event: ev})
      });

      result = module.getOriginProduct();

      expect(result.get('type')).to.equal('origin');
      expect(result.get('source')).to.equal('test');
      expect(result.get('code')).to.equal('expected');

      module.destroy();
    });
    it('returns a phase-data that matches the origin', function () {
      var ev,
          module,
          result;

      ev = CatalogEvent({
        properties: {
          products: {
            origin: [
              {type: 'origin', source: 'test', code: 'expected'}
            ],
            'phase-data': [
              {type: 'phase-data', source: 'test', code: 'expected'}
            ]
          }
        }
      });

      module = OriginModule({
        model: Model({event: ev})
      });

      result = module.getOriginProduct();

      expect(result.get('type')).to.equal('phase-data');
      expect(result.get('source')).to.equal('test');
      expect(result.get('code')).to.equal('expected');

      module.destroy();
    });
  });

  describe('render', function () {
    it('calls each sub-method', function () {
      var module,
          stub1,
          stub2,
          stub3,
          stub4;

      module = OriginModule();

      stub1 = sinon.stub(module, 'getOriginProduct', function () {});
      stub2 = sinon.stub(module, 'renderContent', function () {});
      stub3 = sinon.stub(module, 'renderFooter', function () {});
      stub4 = sinon.stub(module, 'renderHeader', function () {});

      module.render();

      expect(stub1.callCount).to.equal(1);
      expect(stub2.callCount).to.equal(1);
      expect(stub3.callCount).to.equal(1);
      expect(stub4.callCount).to.equal(1);

      stub1.restore();
      stub2.restore();
      stub3.restore();
      stub4.restore();
      module.destroy();
    });
  });

  describe('renderContent', function () {
    it('renders an error message when no product provided', function () {
      var module;

      module = OriginModule();
      module.renderContent();

      /* jshint -W030 */
      expect(module.el.querySelector('.alert')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderFooter', function () {
    it('delegates to getProductFooter', function () {
      var module,
          stub;

      module = OriginModule();
      stub = sinon.stub(module, 'getProductFooter', function () {});

      module.renderFooter(Product());

      expect(stub.callCount).to.equal(1);

      stub.restore();
      module.destroy();
    });
  });

  describe('renderHeader', function () {
    it('delegates to getProductHeader', function () {
      var module,
          stub;

      module = OriginModule();
      stub = sinon.stub(module, 'getProductHeader', function () {});

      module.renderHeader(Product());

      expect(stub.callCount).to.equal(1);

      stub.restore();
      module.destroy();
    });
  });
});
