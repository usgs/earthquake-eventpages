/* global chai, describe, it */
'use strict';


var FiniteFaultPinView = require('finite-fault/FiniteFaultPinView');


var expect;

expect = chai.expect;


describe('finite-fault/FiniteFaultPinView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof FiniteFaultPinView).to.equal('function');
    });

    it('can be initialized', function () {
      expect(FiniteFaultPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = FiniteFaultPinView();

      expect(view.destroy).to.not.throw(Error);

      view.destroy(); // Catches double-destroy bug
    });
  });
});
