/* global chai, describe, it, sinon */
'use strict';


var Attribution = require('core/Attribution'),
    ScientificSummaryModule = require('scientific/ScientificSummaryModule');


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
      var args,
          product,
          row,
          view;

      view = ScientificSummaryModule();

      product = {
        getContent: sinon.stub().returns({
          get: function () {
            return 'image source';
          }
        })
      };

      sinon.stub(view, 'getCatalogMarkup', function () {
        return 'Catalog Markup';
      });

      sinon.stub(Attribution, 'getProductAttribution', function () {
        return 'Attribution';
      });

      row = view.getFiniteFaultRow(product, 0);
      expect(product.getContent.getCall(0).args[0]).to.equal('basemap.png');

      args = view.getCatalogMarkup.getCall(0).args;
      expect(args[1]).to.equal(product);
      expect(args[2]).to.equal(true);

      expect(Attribution.getProductAttribution.getCall(0).args[0]).to.equal(product);

      expect(row.childNodes[0].innerHTML).to.equal('Catalog Markup');
      expect(row.childNodes[1].firstChild.getAttribute('src')).to.equal('image source');
      expect(row.childNodes[2].innerHTML).to.equal('Attribution');

      Attribution.getProductAttribution.restore();
      view.destroy();

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

      expect(view.getLinksHeader().innerHTML).to.equal('Scientific and Technical Links');
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
