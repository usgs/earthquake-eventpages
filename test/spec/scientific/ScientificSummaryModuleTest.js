/* global chai, describe, it */
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
    it('creates the summary section for the finite fault product', function () {
      var product,
          view;

      product = [];
      view = ScientificSummaryModule();

      sinon.stub(view, 'getFiniteFaultRow', function () {});

      view.getFiniteFaultSumary();

      expect(view.getFiniteFaultRow.callCount).to.equal(1);

      view.destroy();
    });
  });
});
