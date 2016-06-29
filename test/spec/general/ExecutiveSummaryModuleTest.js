/* global chai, describe, it */
'use strict';


var ExecutiveSummaryModule = require('general/ExecutiveSummaryModule');


var expect;

expect = chai.expect;


describe('general/ExecutiveSummaryModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ExecutiveSummaryModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ExecutiveSummaryModule).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var module;

      module = ExecutiveSummaryModule();
      expect(module.destroy).to.not.throw(Error);

      module.destroy(); // Catches double-destroy problems
    });
  });
});
