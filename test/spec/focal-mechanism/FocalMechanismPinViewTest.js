/* global chai, describe, it */
'use strict';


var FocalMechanismPinView = require('focal-mechanism/FocalMechanismPinView');


var expect = chai.expect;


describe('focal-mechanism/FocalMechanismPinView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof FocalMechanismPinView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(FocalMechanismPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = FocalMechanismPinView();

      expect(view.destroy).to.not.throw(Error);

      view.destroy();
    });
  });
});
