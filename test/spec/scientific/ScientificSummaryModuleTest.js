/* global chai, describe, it */
'use strict';


var ScientificSummaryModule = require('scientific/ScientificSummaryModule');


var expect = chai.expect;


describe('scientific/ScientificSummaryModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ScientificSummaryModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ScientificSummaryModule).to.not.throw(Error);
    });
  });

  // TODO :: More tests?
});
