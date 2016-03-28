/* global chai, describe, it */
'use strict';


var FiniteFaultView = require('finite-fault/FiniteFaultView');


var expect = chai.expect;


describe('finite-fault/FiniteFaultView', function () {
  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof FiniteFaultView).to.equal('function');
    });
  });
});
