/* global chai, describe, it */
'use strict';


var OriginView = require('origin/OriginView');


var expect = chai.expect;


describe('origin/OriginView', function () {

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof OriginView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(OriginView).to.not.throw(Error);
    });
  });
});