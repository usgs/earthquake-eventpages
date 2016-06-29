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
});
