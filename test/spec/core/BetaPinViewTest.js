/* global chai, describe, it */
'use strict';


var BetaPinView = require('core/BetaPinView');


var expect = chai.expect;


describe('core/BetaPinView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof BetaPinView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(BetaPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = BetaPinView();
      expect(view.destroy).to.not.throw(Error);

      view.destroy(); // Catches double destroy errors
    });
  });

  describe('getLinkUrl', function () {
    it('returns beta link', function () {
      var result,
          view;

      view = BetaPinView({eventId: '123'});
      result = view.getLinkUrl();

      expect(result).to.equal('/beta/earthquakes/eventpage/123');

      view.destroy();
    });
  });

  describe('renderPinContent', function () {
    it('includes some content text', function () {
      var view;

      view = BetaPinView();
      view.renderPinContent();

      expect(view.content.querySelector('p')).to.not.equal(null);
      expect(view.content.querySelector('.beta-pin-view-announcement')).to.not.equal(null);

      view.destroy();
    });
  });

  describe('renderPinFooter', function () {
    it('includes some footer text', function () {
      var view;

      view = BetaPinView();
      view.renderPinFooter();

      expect(view.footer).to.not.equal(null);

      view.destroy();
    });
  });
});
