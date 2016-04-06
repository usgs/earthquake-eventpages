/* global after, before, chai, describe, it, sinon */
'use strict';


var Attribution = require('core/Attribution'),
    Formatter = require('core/Formatter'),
    Product = require('pdl/Product'),
    ScientificSummaryModule = require('scientific/ScientificSummaryModule'),
    Tensor = require('moment-tensor/Tensor'),
    Xhr = require('util/Xhr');


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
    var product;

    after(function () {
      product.destroy();
    });

    before(function (done) {
      Xhr.ajax({
        url: 'events/ci37528064.json',
        success: function (data) {
          product = Product(data.properties.products['focal-mechanism'][0]);
        },
        done: function () {
          done();
        }
      });
    });

    it('Creates a row with summary information', function () {
      var angleSpy,
          formatter,
          fromProductSpy,
          getCatalogMarkupSpy,
          getProductAttributionSpy,
          module,
          row;

      formatter = Formatter();
      module = ScientificSummaryModule({formatter: formatter});

      angleSpy = sinon.spy(formatter, 'angle');
      fromProductSpy = sinon.spy(Tensor, 'fromProduct');
      getCatalogMarkupSpy = sinon.spy(module, 'getCatalogMarkup');
      getProductAttributionSpy = sinon.spy(Attribution, 'getProductAttribution');


      row = module.getFocalMechanismRow(product, 0);

      expect(row.childNodes.length).to.equal(5);

      expect(angleSpy.callCount).to.equal(6);
      expect(fromProductSpy.callCount).to.equal(1);
      expect(getCatalogMarkupSpy.callCount).to.equal(1);
      expect(getProductAttributionSpy.callCount).to.equal(1);

      angleSpy.restore();
      fromProductSpy.restore();
      getCatalogMarkupSpy.restore();
      getProductAttributionSpy.restore();
      module.destroy();
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
    var product;

    after(function () {
      product.destroy();
    });

    before(function (done) {
      Xhr.ajax({
        url: 'events/ci37528064.json',
        success: function (data) {
          product = Product(data.properties.products['moment-tensor'][0]);
        },
        done: function () {
          done();
        }
      });
    });

    it('Creates a row with summary information', function () {
      var depthSpy,
          fromProductSpy,
          formatter,
          getCatalogMarkupSpy,
          getProductAttributionSpy,
          module,
          row;

      formatter = Formatter();
      module = ScientificSummaryModule({formatter: formatter});

      depthSpy = sinon.spy(formatter, 'depth');
      fromProductSpy = sinon.spy(Tensor, 'fromProduct');
      getCatalogMarkupSpy = sinon.spy(module, 'getCatalogMarkup');
      getProductAttributionSpy = sinon.spy(Attribution, 'getProductAttribution');


      row = module.getMomentTensorRow(product, 0);

      expect(row.childNodes.length).to.equal(6);

      expect(depthSpy.callCount).to.equal(1);
      expect(fromProductSpy.callCount).to.equal(1);
      expect(getCatalogMarkupSpy.callCount).to.equal(1);
      expect(getProductAttributionSpy.callCount).to.equal(1);

      depthSpy.restore();
      fromProductSpy.restore();
      getCatalogMarkupSpy.restore();
      getProductAttributionSpy.restore();
      module.destroy();
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
    it('Creates a row with summary information', function () {
      var product,
          row,
          view;

      view = ScientificSummaryModule();

      product = {
        getProperty: sinon.stub().returns('eventtime'),
        get: function () {
          return 'origin';
        }
      };

      sinon.stub(view, 'getCatalogMarkup', function () {
        return 'Catalog Markup';
      });

      row = view.getOriginRow(product, 0);

      expect(row.querySelectorAll('td').length).to.equal(6);
      expect(row.childNodes[0].innerHTML).to.equal('Catalog Markup');
      expect(row.childNodes[1].innerHTML).to.equal('NaN eventtime');
      expect(row.childNodes[2].innerHTML).to.equal('<abbr title="NaN-NaN-NaN NaN:NaN:NaN (UTC)">NaN:NaN:NaN</abbr>');
      expect(row.childNodes[3].innerHTML).to.equal('NaN');
      expect(row.childNodes[4].innerHTML).to.equal('EVENTTIME');
      expect(row.childNodes[5].innerHTML).to.equal('NaN°S&nbsp;NaN°W');

      view.destroy();
    });
  });
});
