/* global chai, describe, it */
'use strict';

var PAGERModule = require('pager/PAGERModule');


var expect = chai.expect;


describe('pager/PAGERModule', function () {

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof PAGERModule).to.equal('function');
    });
  });

});