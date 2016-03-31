/* global chai, describe, it, sinon */
'use strict';


var ScientificSummaryModule = require('scientific/ScientificSummaryModule');


var expect = chai.expect;


describe('scientific/ScientificSummaryModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ScientificSummaryModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ScientificSummaryModule).to.not.throw(Error);
    });
  });

  describe('getFiniteFaultSumary', function () {
    it('calls createSummary', function () {
      var view;

      view = ScientificSummaryModule();

      sinon.stub(view, 'createSummary', function () {});

      view.getFiniteFaultSummary();

      expect(view.createSummary.callCount).to.equal(1);

      view.destroy();
    });
  });

  describe('getFiniteFaultRow', function () {
    it('', function () {

    });
  });
});
