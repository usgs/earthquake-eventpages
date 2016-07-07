/* global before, chai, describe, it, sinon */
'use strict';


var CatalogEvent = require('pdl/CatalogEvent'),
    ImpactPinView = require('impact/ImpactPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


var _createEvent = function (eventDetails) {
  return CatalogEvent(JSON.parse(JSON.stringify(eventDetails)));
};

describe('impact/ImpactPinView', function () {
  var EVENT_DETAILS;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        EVENT_DETAILS = data;
        done();
      },
      error: function () {
        done(new Error('Failed to load event data'));
      }
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ImpactPinView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ImpactPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = ImpactPinView();

      expect(view.destroy).to.not.throw(Error);

      view.destroy();
    });
  });

  describe('createBubble', function () {
    it('returns expected element', function () {
      var bubble,
          view;

      view = ImpactPinView();

      bubble = view.createBubble();

      expect(bubble).to.not.equal(null);
      expect(bubble.classList.contains('impact-pin-view-bubble'))
          .to.equal(true);

      view.destroy();
    });
  });

  describe('getAttribution', function () {
    it('returns a string', function () {
      var view;

      view = ImpactPinView();

      expect(typeof view.getAttribution()).to.equal('string');

      view.destroy();
    });

    it('returns expected attribution', function () {
      var ev,
          result,
          view;

      ev = CatalogEvent();

      view = ImpactPinView({
        event: ev
      });

      ev.addProduct(Product({
        type: 'dyfi',
        source: 'us'
      }));

      ev.addProduct(Product({
        type: 'shakemap',
        source: 'ci'
      }));

      result = view.getAttribution();
      expect(result).to.equal([
        '<span class="contributor-reference" data-id="ci">CI</span>, ',
        '<span class="contributor-reference" data-id="us">US</span>'
      ].join(''));

      view.destroy();
    });
  });

  describe('getDyfiBubble', function () {
    it('returns an element regardless of parameters', function () {
      var result,
          view;

      view = ImpactPinView();

      result = view.getDyfiBubble();
      expect(result).to.be.an.instanceOf(DocumentFragment);

      result = view.getDyfiBubble({properties: {cdi: 1}});
      expect(result).to.be.an.instanceOf(DocumentFragment);

      view.destroy();
    });

    it('contains expected value', function () {
      var result,
          view;

      view = ImpactPinView();

      result = view.getDyfiBubble({properties: {cdi: 1}});
      result = result.firstChild; // Pull bubble off the fragment
      expect(result.classList.contains('mmiI')).to.equal(true);
      expect(result.querySelector('.impact-pin-view-value').innerHTML)
          .to.equal('I');

      view.destroy();
    });
  });

  describe('getPagerBubble', function () {
    it('returns an element regardless of parameters', function () {
      var result,
          view;

      view = ImpactPinView();

      result = view.getPagerBubble();
      expect(result).to.be.an.instanceOf(DocumentFragment);

      result = view.getPagerBubble({properties: {alert: 'green'}});
      expect(result).to.be.an.instanceOf(DocumentFragment);

      view.destroy();
    });

    it('contains expected value', function () {
      var result,
          view;

      view = ImpactPinView();

      result = view.getPagerBubble({properties: {alert: 'green'}});
      result = result.firstChild; // Pull bubble off the fragment
      expect(result.classList.contains('pager-alertlevel-green'))
          .to.equal(true);
      expect(result.querySelector('.impact-pin-view-value').innerHTML)
          .to.equal('GREEN');

      view.destroy();
    });
  });

  describe('getShakeMapBubble', function () {
    it('returns an element regardless of parameters', function () {
      var result,
          view;

      view = ImpactPinView();

      result = view.getShakeMapBubble();
      expect(result).to.be.an.instanceOf(DocumentFragment);

      result = view.getShakeMapBubble({properties: {mmi: 1}});
      expect(result).to.be.an.instanceOf(DocumentFragment);

      view.destroy();
    });

    it('contains expected value', function () {
      var result,
          view;

      view = ImpactPinView();

      result = view.getShakeMapBubble({properties: {mmi: 1}});
      result = result.firstChild; // Pull bubble off the fragment
      expect(result.classList.contains('mmiI')).to.equal(true);
      expect(result.querySelector('.impact-pin-view-value').innerHTML)
          .to.equal('I');

      view.destroy();
    });
  });

  describe('renderPinContent', function () {
    it('calls each sub-method', function () {
      var view;

      view = ImpactPinView({
        event: _createEvent(EVENT_DETAILS)
      });

      sinon.spy(view, 'getDyfiBubble');
      sinon.spy(view, 'getPagerBubble');
      sinon.spy(view, 'getShakeMapBubble');

      view.render();
      expect(view.getDyfiBubble.callCount).to.equal(1);
      expect(view.getPagerBubble.callCount).to.equal(1);
      expect(view.getShakeMapBubble.callCount).to.equal(1);

      view.getDyfiBubble.restore();
      view.getPagerBubble.restore();
      view.getShakeMapBubble.restore();

      view.destroy();
    });

    describe('renderPinFooter', function () {
      it('calls sub-method', function () {
        var view;

        view = ImpactPinView();

        sinon.spy(view, 'getAttribution');

        view.renderPinFooter();

        expect(view.getAttribution.callCount).to.equal(1);

        view.getAttribution.restore();
        view.destroy();
      });
    });
  });
});
