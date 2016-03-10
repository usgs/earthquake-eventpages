/* global chai, describe, it */
'use strict';

var DYFIIntensityGraphView = require('dyfi/DYFIIntensityGraphView');


var expect = chai.expect;


describe('dyfi/DYFIIntensityGraphView', function () {

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof DYFIIntensityGraphView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DYFIIntensityGraphView).to.not.be.null;
      /* jshint +W030 */
    });
  });

});