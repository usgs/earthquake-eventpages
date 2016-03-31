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
    it('Creates a row with summary information', function () {

    });
  });

  describe('getFocalMechanismSummary', function () {
    it('calls createSummary', function () {
      var view;

      view = ScientificSummaryModule();

      sinon.stub(view, 'createSummary', function () {});

      view.getFocalMechanismSummary();

      expect(view.createSummary.callCount).to.equal(1);

      view.destroy();
    });
  });

  describe('getFocalMechanismRow', function () {
    it('', function () {

    });
  });

  describe('getLinksHeader', function () {
    it('returns header', function () {
      var view;

      view = ScientificSummaryModule();

      expect(view.getLinksHeader()).to.equal('<h3>Scientific and Technical Links</h3>');
    });
  });

  describe('getMomentTensorSummary', function () {
    it('calls createSummary', function () {
      var view;

      view = ScientificSummaryModule();

      sinon.stub(view, 'createSummary', function () {});

      view.getMomentTensorSummary();

      expect(view.createSummary.callCount).to.equal(1);

      view.destroy();
    });
  });

  describe('getMomentTensorRow', function () {
    it('', function () {

    });
  });

  describe('getOriginProducts', function () {
    it('', function () {

    });
  });

  describe('getOriginSummary', function () {
    it('calls createSummary', function () {
      var view;

      view = ScientificSummaryModule();

      sinon.stub(view, 'createSummary', function () {});

      view.getOriginSummary();

      expect(view.createSummary.callCount).to.equal(1);

      view.destroy();
    });
  });

  describe('getOriginRow', function () {
    it('', function () {

    });
  });

  describe('getFiniteFaultRow', function () {
    it('', function () {

    });
  });
});
