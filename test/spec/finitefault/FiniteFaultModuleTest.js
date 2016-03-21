/* global chai, describe, it */
'use strict';

var FiniteFaultModule = require('finitefault/FiniteFaultModule');


var expect = chai.expect;


describe('finitefault/FiniteFaultModule', function () {

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof FiniteFaultModule).to.equal('function');
    });
  });

});