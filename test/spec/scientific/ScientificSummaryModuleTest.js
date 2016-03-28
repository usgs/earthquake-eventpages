/* global afterEach, beforeEach, chai, describe, it */
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

  describe('createRow', function () {
    var module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      module = ScientificSummaryModule();
    });

    it('returns a row', function () {
      var row;

      row = module.createRow();

      expect(row.nodeName).to.equal('TR');
    });

    it('includes the preferred class if specified', function () {
      var row;

      row = module.createRow(true);

      expect(row.classList.contains('preferred')).to.equal(true);
    });

    it('skips the preferred class if not specified', function () {
      var row;

      row = module.createRow(false);

      expect(row.classList.contains('preferred')).to.equal(false);
    });
  });
});
