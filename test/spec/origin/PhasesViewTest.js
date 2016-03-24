/* global chai, describe, it */
'use strict';


var PhasesView = require('origin/PhasesView');


var expect = chai.expect;


describe('origin/PhasesView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof PhasesView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(PhasesView).to.not.throw(Error);
    });
  });
});
