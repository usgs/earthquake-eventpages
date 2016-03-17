/* global chai, describe, it */
'use strict';


var DYFIView = require('dyfi/DYFIView');


var expect = chai.expect;


describe('dyfi/DYFIView', function () {
  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof DYFIView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(DYFIView).to.not.throw(Error);
    });
  });
});
