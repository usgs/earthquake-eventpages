/* global after, before, chai, describe, it, sinon */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    NearbySeismicityPinView =
        require('nearby-seismicity/NearbySeismicityPinView'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('nearby-seismicity/NearbySeismicityPinView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof NearbySeismicityPinView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(NearbySeismicityPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = NearbySeismicityPinView();
      expect(view.destroy).to.not.throw(Error);

      view.destroy();
    });
  });

  describe('getLinkUrl', function () {
    it('returns the correct url', function () {
      var pinView,
          stub;

      pinView = NearbySeismicityPinView();
      stub = sinon.stub(pinView.nearbySeismicity, 'getLatestEarthquakesLink',
          function () {
        return;
      });

      pinView.getLinkUrl();
      expect(stub.callCount).to.equal(1);

      stub.restore();
      pinView.destroy();
    });
  });

  describe('renderPinContent', function () {
    var ev;

    before(function (done) {
      Xhr.ajax({
        url: '/events/us10004u1y.json',
        success: function (data) {
          ev = CatalogEvent(data);
          done();
        },
        error: function () {
          done(false);
        }
      });
    });

    after(function () {
      ev.destroy();
      ev = null;
    });

    it('renders correct pin content', function () {
      var magnitudeEl,
          pinView,
          timeRangeEl;

      pinView = NearbySeismicityPinView({
        event: ev
      });

      pinView.renderPinContent();

      // create element to match HTML entity
      timeRangeEl = document.createElement('p');
      timeRangeEl.innerHTML = '&plusmn; Three Weeks';
      magnitudeEl = document.createElement('p');
      magnitudeEl.innerHTML = '&ge; 4.0';

      expect(pinView.content.querySelector('.nearby-seismicity-pin-time').
          innerHTML).to.equal(timeRangeEl.innerHTML);
      expect(pinView.content.querySelector('.nearby-seismicity-pin-maxradiuskm')
          .innerHTML).to.equal('250.0 km');
      expect(pinView.content.querySelector(
          '.nearby-seismicity-pin-min-magnitude')
          .innerHTML).to.equal(magnitudeEl.innerHTML);
    });
  });

  describe('renderPinFooter', function () {
    it('renders footer with correct text', function () {
      var pinView;

      pinView = NearbySeismicityPinView();
      pinView.renderPinFooter();

      expect(pinView.footer.innerHTML).to.equal('ANSS ComCat');

      pinView.destroy();
    });
  });
});
