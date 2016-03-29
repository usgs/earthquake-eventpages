/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';


var CatalogEvent = require('pdl/CatalogEvent'),
    ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Model = require('mvc/Model');


var expect = chai.expect;


describe('impact/ImpactSummaryModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ImpactSummaryModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ImpactSummaryModule).to.not.throw(Error);
    });
  });

  describe('render', function () {
    var module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      module = ImpactSummaryModule({
        'model': Model({
          'event': CatalogEvent({})
        })
      });
    });

    it('gets products of each type', function () {
      var spy;

      spy = sinon.spy(module, 'getProducts');
      module.render();

      expect(spy.callCount).to.equal(6);

      /* jshint -W030 */
      expect(spy.calledWith('impact-header')).to.be.true;
      expect(spy.calledWith('dyfi')).to.be.true;
      expect(spy.calledWith('shakemap')).to.be.true;
      expect(spy.calledWith('losspager')).to.be.true;
      expect(spy.calledWith('impact-text')).to.be.true;
      expect(spy.calledWith('impact-link')).to.be.true;
      /* jshint +W030 */

      spy.restore();
    });

    it('calls each summary method', function () {
      sinon.spy(module, 'getTexts');
      sinon.spy(module, 'getDyfiSummary');
      sinon.spy(module, 'getPagerSummary');
      sinon.spy(module, 'getShakeMapSummary');
      sinon.spy(module, 'getLinks');

      module.render();

      expect(module.getTexts.callCount).to.equal(2); // -header and -text
      expect(module.getDyfiSummary.callCount).to.equal(1);
      expect(module.getPagerSummary.callCount).to.equal(1);
      expect(module.getShakeMapSummary.callCount).to.equal(1);
      expect(module.getLinks.callCount).to.equal(1);

      module.getTexts.restore();
      module.getDyfiSummary.restore();
      module.getPagerSummary.restore();
      module.getShakeMapSummary.restore();
      module.getLinks.restore();
    });
  });
});
