/* global chai, describe, it */
'use strict';

var ShakeMapView = require('shakemap/ShakeMapView');

var expect = chai.expect;

describe('shakemap/ShakeMapView', function () {

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof ShakeMapView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(ShakeMapView).to.not.be.null;
      /* jshint +W030 */
    });
  });

});