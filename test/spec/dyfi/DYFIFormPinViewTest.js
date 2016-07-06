/* global chai, describe, it */
'use strict';


var DYFIFormPinView = require('dyfi/DYFIFormPinView');


var expect = chai.expect;


describe('dyfi/DYFIFormPinView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof DYFIFormPinView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(DYFIFormPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = DYFIFormPinView();
      expect(view.destroy).to.not.throw(Error);

      view.destroy(); // Catches double destroy errors
    });
  });
});
