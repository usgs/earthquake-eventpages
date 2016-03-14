/* global chai, describe, it */
'use strict';


var FiniteFaultView = require('finitefault/FiniteFaultView');


var expect = chai.expect;


describe('finitefault/FiniteFaultView', function () {
  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof FiniteFaultView).to.equal('function');
    });
  });
});
