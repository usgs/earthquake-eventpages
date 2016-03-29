/* global after, before, chai, describe, it, sinon */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    GeneralSummaryModule = require('general/GeneralSummaryModule'),
    Model = require('mvc/Model'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('general/GeneralSummaryModule', function () {
  var us10004u1y;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        us10004u1y = CatalogEvent(data);
        done();
      },
      error: function () {
        done(false);
      }
    });
  });

  after(function () {
    us10004u1y = null;
  });


  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof GeneralSummaryModule).to.equal('function');
    });
  });

  describe('hasContent', function () {
    it('has content if there is an event', function () {
      var model;

      model = Model({
        event: {}
      });
      expect(GeneralSummaryModule.hasContent(model)).to.equal(true);
    });

    it('does not have content if there is no event', function () {
      var model;

      model = Model({
        event: null
      });
      expect(GeneralSummaryModule.hasContent(model)).to.equal(false);
    });
  });

  describe('render', function () {
    it('calls component render methods with model event', function () {
      var ev,
          model,
          module;

      ev = {};
      model = Model({
        event: ev
      });
      module = GeneralSummaryModule({
        model: model
      });

      sinon.stub(module, 'renderHeader');
      sinon.stub(module, 'renderLocation');
      sinon.stub(module, 'renderTime');
      sinon.stub(module, 'renderNearbyPlaces');
      sinon.stub(module, 'renderGeneralText');
      sinon.stub(module, 'renderTectonicSummary');
      sinon.stub(module, 'renderGeneralLink');
      sinon.stub(module, 'renderFooter');

      module.render();
      expect(module.renderHeader.calledWith(ev)).to.equal(true);
      expect(module.renderLocation.calledWith(ev)).to.equal(true);
      expect(module.renderTime.calledWith(ev)).to.equal(true);
      expect(module.renderNearbyPlaces.calledWith(ev)).to.equal(true);
      expect(module.renderGeneralText.calledWith(ev)).to.equal(true);
      expect(module.renderTectonicSummary.calledWith(ev)).to.equal(true);
      expect(module.renderGeneralLink.calledWith(ev)).to.equal(true);
      expect(module.renderFooter.calledWith(ev)).to.equal(true);

      module.destroy();
    });
  });

  describe('renderFooter', function () {
    it('appends downloads', function () {
      var el,
          module;

      el = document.createElement('div');
      module = GeneralSummaryModule();
      sinon.stub(module, 'getProductFooter', function () {
        return el;
      });

      module.renderFooter(us10004u1y);
      expect(module.footer.lastChild).to.equal(el);
      module.destroy();
      module = null;
      el = null;
    });
  });

  describe('renderGeneralLink', function () {
    it('adds a list item for each general-link product', function () {
      var module;

      module = GeneralSummaryModule();
      module.renderGeneralLink(us10004u1y);
      expect(module.el.querySelectorAll(
            '.generalsummary-general-link > ul > li'
          ).length).to.equal(us10004u1y.getProducts('general-link').length);
      module.destroy();
    });
  });

  describe('renderGeneralText', function () {
    it('adds a section for each general-text product', function () {
      var module;

      module = GeneralSummaryModule();
      module.renderGeneralText(us10004u1y);
      expect(module.el.querySelectorAll(
            '.generalsummary-general-text > section'
          ).length).to.equal(us10004u1y.getProducts('general-text').length);
      module.destroy();
    });
  });

  describe('renderNearbyPlaces', function () {
    it('requests nearby-cities product content when available', function () {
      var args,
          module;

      module = GeneralSummaryModule();
      sinon.stub(Xhr, 'ajax', function () {});
      module.renderNearbyPlaces(us10004u1y);
      args = Xhr.ajax.getCall(0).args;
      expect(args[0].url.indexOf('nearby-cities.json')).to.not.equal(-1);
      Xhr.ajax.restore();
      module.destroy();
    });

    it('requests geoserve content when product not available', function () {
      var args,
          module;

      module = GeneralSummaryModule();
      sinon.stub(Xhr, 'ajax', function () {});
      sinon.stub(us10004u1y, 'getPreferredProduct', function () {
        return null;
      });
      sinon.stub(us10004u1y, 'getPreferredOriginProduct', function () {
        return us10004u1y.getProducts('origin')[0];
      });
      module.renderNearbyPlaces(us10004u1y);
      args = Xhr.ajax.getCall(0).args;
      expect(args[0].url.indexOf('nearby-cities.json')).to.equal(-1);
      Xhr.ajax.restore();
      us10004u1y.getPreferredProduct.restore();
      us10004u1y.getPreferredOriginProduct.restore();
    });
  });

  describe('renderTectonicSummary', function () {
    it('does not render for sonic booms', function () {
      var ev,
          module;

      ev = {
        getSummary: function () {
          return {
            properties: {
              type: 'sonic boom'
            }
          };
        }
      };
      module = GeneralSummaryModule();
      module.renderTectonicSummary(ev);
      expect(module.el.querySelector('.generalsummary-tectonic-summary > *')).
          to.equal(null);
    });

    it('requests tectonic-summary product content when available', function () {
      var args,
          module;

      module = GeneralSummaryModule();
      sinon.stub(Xhr, 'ajax', function () {});
      module.renderTectonicSummary(us10004u1y);
      args = Xhr.ajax.getCall(0).args;
      expect(args[0].url.indexOf('tectonic-summary.inc.html')).to.not.equal(-1);
      Xhr.ajax.restore();
      module.destroy();
    });

    it('requests geoserve content when product not available', function () {
      var args,
          module;

      module = GeneralSummaryModule();
      sinon.stub(Xhr, 'ajax', function () {});
      sinon.stub(us10004u1y, 'getPreferredProduct', function () {
        return null;
      });
      sinon.stub(us10004u1y, 'getPreferredOriginProduct', function () {
        return us10004u1y.getProducts('origin')[0];
      });
      module.renderTectonicSummary(us10004u1y);
      args = Xhr.ajax.getCall(0).args;
      expect(args[0].url.indexOf('tectonic-summary.inc.html')).to.equal(-1);
      Xhr.ajax.restore();
      us10004u1y.getPreferredProduct.restore();
      us10004u1y.getPreferredOriginProduct.restore();
    });
  });
});
