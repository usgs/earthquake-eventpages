/* global chai, describe, it */
'use strict';


var ImpactSummaryModule = require('impact/ImpactSummaryModule');


var expect = chai.expect;


describe('impact/ImpactSummaryModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ImpactSummaryModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ImpactSummaryModule).to.not.throw(Error);
    });
  });

  // TODO :: More tests?
});
