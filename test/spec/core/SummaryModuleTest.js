/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';


var SummaryModule = require('core/SummaryModule');


var expect = chai.expect;


describe('core/SummaryModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof SummaryModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(SummaryModule).to.not.throw(Error);
    });
  });

  describe('createRow', function () {
    var module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      module = SummaryModule();
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

  describe('createSummary', function () {
    var module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      module = SummaryModule();
    });

    it('does nothing if no products or labels are provided', function () {
      var container;

      // No products
      container = document.createElement('div');
      container.appendChild(module.createSummary([], 'Foo', ['Label 1'],
          function () {}));

      expect(container.innerHTML).to.equal('');
      expect(container.childNodes.length).to.equal(0);

      // No labels
      container.appendChild(module.createSummary([0], 'Foo', [],
          function () {}));

      expect(container.innerHTML).to.equal('');
      expect(container.childNodes.length).to.equal(0);
    });

    it('produces expected markup sections', function () {
      var container;

      container = document.createElement('div');
      container.appendChild(module.createSummary([0, 1], 'Foo',
          ['Label 0', 'Label 1'], module.createRow));

      expect(container.querySelectorAll('h3').length)
          .to.equal(1);
      expect(container.querySelectorAll('.horizontal-scrolling').length)
          .to.equal(1);
      expect(container.querySelectorAll('div > .table-summary').length)
          .to.equal(1);
      expect(container.querySelectorAll('tbody > tr').length).to.equal(2);
    });

    it('executes the callback formatter', function () {
      var spy;

      spy = sinon.spy(function () { return document.createElement('row'); });

      module.createSummary([0], 'Foo', ['Label'], spy);
      expect(spy.callCount).to.equal(1);
    });
  });
});
