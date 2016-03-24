/* global chai, describe, DocumentFragment, it */
'use strict';

var FocalMechanismView = require('focal-mechanism/FocalMechanismView');


var expect = chai.expect;


describe('focal-mechanism/FocalMechanismView', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof FocalMechanismView).to.equal('function');
    });
  });

  describe('getAxes', function () {
    it('returns no elements', function () {
      var fragment,
          view;

      view = FocalMechanismView();
      fragment = view.getAxes();
      expect(fragment).to.be.instanceof(DocumentFragment);
      expect(fragment.firstChild).to.equal(null);
      view.destroy();
      view = null;
    });
  });

});
