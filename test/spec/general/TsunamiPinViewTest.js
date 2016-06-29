/* global chai, describe, it */
'use strict';


var TsunamiPinView = require('general/TsunamiPinView');


var expect = chai.expect;


describe('general/TsunamiPinView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof TsunamiPinView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(TsunamiPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = TsunamiPinView();
      expect(view.destroy).to.not.throw(Error);

      view.destroy(); // Catches double destroy errors
    });
  });

  describe('getLinkUrl', function () {
    it('returns a tsunami link', function () {
      var result,
          view;

      view = TsunamiPinView();
      result = view.getLinkUrl();

      expect(result).to.equal('http://www.tsunami.gov/');

      view.destroy();
    });
  });

  describe('renderPinContent', function () {
    it('includes an image and some text', function () {
      var view;

      view = TsunamiPinView();
      view.renderPinContent();

      expect(view.content.querySelector('img')).to.not.equal(null);
      expect(view.content.querySelector('.disclaimer')).to.not.equal(null);

      view.destroy();
    });
  });

  describe('renderPinFooter', function () {
    it('creates a link', function () {
      var view;

      view = TsunamiPinView();
      view.renderPinFooter();

      expect(view.footer.querySelector('a')).to.not.equal(null);

      view.destroy();
    });
  });
});
