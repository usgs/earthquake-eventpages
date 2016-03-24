/* global chai, describe, it, sinon */
'use strict';

var FocalMechanismModule = require('focal-mechanism/FocalMechanismModule');


var expect = chai.expect;


describe('focal-mechanism/FocalMechanismModule', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof FocalMechanismModule).to.equal('function');
    });
  });

  describe('destroy', function () {
    it('can be destroyed', function () {
      var module;

      module = FocalMechanismModule();
      expect(module.destroy).to.not.throw(Error);
    });
  });

  describe('render', function () {
    it('calls renderContent, renderFooter, and renderHeader', function () {
      var module,
          product;

      product = {};

      module = FocalMechanismModule();
      sinon.stub(module, 'getProduct', function () {
        return product;
      });
      sinon.stub(module, 'renderContent', function () {});
      sinon.stub(module, 'renderFooter', function () {});
      sinon.stub(module, 'renderHeader', function () {});

      module.render();
      expect(module.renderContent.calledWith(product)).to.equal(true);
      expect(module.renderFooter.calledWith(product)).to.equal(true);
      expect(module.renderHeader.calledWith(product)).to.equal(true);

      module.getProduct.restore();
      module.renderContent.restore();
      module.renderFooter.restore();
      module.renderHeader.restore();
      module.destroy();
      module = null;
    });
  });

  describe('renderContent', function () {
    it('shows error when no product', function () {
      var el,
          module;

      module = FocalMechanismModule();
      module.renderContent(null);
      el = module.content.firstChild;
      expect(el.classList.contains('alert')).to.equal(true);
      expect(el.classList.contains('error')).to.equal(true);
      expect(el.innerHTML).to.equal('No Focal Mechanism Found!');
    });
  });

  describe('renderFooter', function () {
    it('appends product footer', function () {
      var el,
          module,
          product;

      el = document.createElement('div');
      product = {};

      module = FocalMechanismModule();
      sinon.stub(module, 'getProductFooter', function () {
        return el;
      });

      module.renderFooter(product);
      expect(module.footer.firstChild).to.equal(el);

      module.getProductFooter.restore();
      module.destroy();
      module = null;
      el = null;
    });
  });


  describe('renderHeader', function () {
    it('appends product header', function () {
      var el,
          module,
          product;

      el = document.createElement('div');
      product = {};

      module = FocalMechanismModule();
      sinon.stub(module, 'getProductHeader', function () {
        return el;
      });

      module.renderHeader(product);
      expect(module.header.lastChild).to.equal(el);

      module.getProductHeader.restore();
      module.destroy();
      module = null;
      el = null;
    });
  });
});
