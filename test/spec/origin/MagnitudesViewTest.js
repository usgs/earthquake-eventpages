/* global chai, describe, it */
'use strict';


var MagnitudesView = require('origin/MagnitudesView');


var expect = chai.expect;


describe('origin/MagnitudesView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof MagnitudesView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(MagnitudesView).to.not.throw(Error);
    });
  });

  describe('destroy', function () {
    it('can be destroyed', function () {
      var view;

      view = MagnitudesView();
      expect(view.destroy).to.not.throw(Error);
    });
  });
});
