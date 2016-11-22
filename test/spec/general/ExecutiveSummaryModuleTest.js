/* global afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';


var CatalogEvent = require('pdl/CatalogEvent'),
    ExecutiveSummaryModule = require('general/ExecutiveSummaryModule'),
    Model = require('mvc/Model'),
    Product = require('pdl/Product'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var expect;

expect = chai.expect;


describe('general/ExecutiveSummaryModule', function () {
  var EVENT_DATA;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        EVENT_DATA = data;
        done();
      },
      error: function () {
        done(new Error('Failed to fetch event data for testing...'));
      }
    });
  });

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

  describe('clearPins', function () {
    it('clears the pins and resets as expected', function () {
      var module;

      module = ExecutiveSummaryModule();

      module.clearPins();

      expect(module.pinViews).to.equal(null);

      module.clearPins(true);
      expect(module.pinViews).to.not.equal(null);
      expect(module.pinViews.length).to.equal(0);

      module.destroy();
    });
  });

  describe('createPinContainer', function () {
    var module;

    beforeEach(function () {
      module = ExecutiveSummaryModule();
    });

    afterEach(function () {
      module.destroy();
    });


    it('returns a dom element', function () {
      var result;

      result = module.createPinContainer();

      expect(result).to.be.an.instanceOf(HTMLElement);
    });

    it('returns an element with the expected classes', function () {
      var classes,
          result;

      classes = ['class1', 'class2', 'class3'];
      result = module.createPinContainer(null, classes);

      classes.forEach(function (className) {
        expect(result.classList.contains(className)).to.equal(true);
      });
    });

    it('appends the element to the parent', function () {
      var parent,
          result;

      parent = document.createElement('ul');
      result = module.createPinContainer(parent);

      expect(result.parentNode).to.equal(parent);
    });
  });

  describe('getLinksHeader', function () {
    it('works as expected', function () {
      var header,
          module;

      module = ExecutiveSummaryModule();
      header = module.getLinksHeader();

      expect(header).to.be.an.instanceOf(HTMLElement);
      expect(header.nodeName).to.equal('H3');
      expect(header.innerHTML).to.equal('For More Information');

      module.destroy();
    });
  });

  describe('isDuplicate', function () {
    it('correctly identifies duplicates', function () {
      var haystack,
          module,
          needle;

      module = ExecutiveSummaryModule();
      needle = Product({properties: {url: 'url1'}});
      haystack = [
        Product({properties: {url: 'url2'}}),
        Product({properties: {url: 'url3'}}),
        Product({properties: {url: 'url4'}}),
        Product({properties: {url: 'url5'}})
      ];

      expect(module.isDuplicate(needle, haystack)).to.equal(false);

      haystack.push(needle);
      expect(module.isDuplicate(needle, haystack)).to.equal(true);
    });
  });

  describe('removeDuplicateLinks', function () {
    it('works as expected', function () {
      var links,
          module,
          result;

      module = ExecutiveSummaryModule();
      links = [
        Product({properties: {url: 'url1'}}),
        Product({properties: {url: 'url2'}}),
        Product({properties: {url: 'url3'}}),
        Product({properties: {url: 'url4'}}),
        Product({properties: {url: 'url1'}}),
        Product({properties: {url: 'url2'}}),
        Product({properties: {url: 'url3'}}),
        Product({properties: {url: 'url4'}})
      ];

      result = module.removeDuplicateLinks(links);
      expect(result.length).to.equal(4);

      result = module.removeDuplicateLinks(result);
      expect(result.length).to.equal(4);
    });
  });

  describe('render', function () {
    var module;

    beforeEach(function () {
      module = ExecutiveSummaryModule({
        model: Model({
          // Always use a _copy_ of EVENT_DATA
          event: CatalogEvent(JSON.parse(JSON.stringify(EVENT_DATA)))
        })
      });
    });

    afterEach(function () {
      module.destroy();
    });


    it('clears previous results', function () {
      sinon.spy(module, 'clearTexts');
      sinon.spy(module, 'clearLinks');
      sinon.spy(module, 'clearPins');
      sinon.spy(Util, 'empty');

      module.render();

      expect(module.clearTexts.callCount).to.equal(1);
      expect(module.clearLinks.callCount).to.equal(1);
      expect(module.clearPins.callCount).to.equal(1);

      expect(Util.empty.callCount).to.be.least(3);
      expect(Util.empty.calledWith(module.header)).to.equal(true);
      expect(Util.empty.calledWith(module.content)).to.equal(true);
      expect(Util.empty.calledWith(module.footer)).to.equal(true);

      module.clearTexts.restore();
      module.clearLinks.restore();
      module.clearPins.restore();
      Util.empty.restore();
    });

    it('calls required sub-methods', function () {
      sinon.spy(module, 'removeDuplicateLinks');
      sinon.spy(module, 'getPins');
      sinon.spy(module, 'getTexts');
      sinon.spy(module, 'getLinks');
      sinon.spy(module, 'getProductFooter');

      module.render();

      expect(module.removeDuplicateLinks.callCount).to.equal(1);
      expect(module.getPins.callCount).to.equal(1);
      expect(module.getTexts.callCount).to.equal(2);
      expect(module.getLinks.callCount).to.equal(1);
      expect(module.getProductFooter.callCount).to.equal(1);

      module.removeDuplicateLinks.restore();
      module.getPins.restore();
      module.getTexts.restore();
      module.getLinks.restore();
      module.getProductFooter.restore();
    });
  });

  describe('getPins', function () {
    var module;

    beforeEach(function () {
      module = ExecutiveSummaryModule({
        model: Model({
          // Always use a _copy_ of EVENT_DATA
          event: CatalogEvent(JSON.parse(JSON.stringify(EVENT_DATA)))
        })
      });
    });

    afterEach(function () {
      module.destroy();
    });


    it('returns an HTMLElement', function () {
      var result;

      result = module.getPins();

      expect(result).to.be.an.instanceOf(HTMLElement);
    });

    it('looks for each product type', function () {
      var ev;

      ev = module.model.get('event');
      sinon.spy(ev, 'getPreferredProduct');

      module.getPins(ev);

      expect(ev.getPreferredProduct.callCount).to.be.least(5);
      expect(ev.getPreferredProduct.calledWith('dyfi')).to.equal(true);
      expect(ev.getPreferredProduct.calledWith('shakemap')).to.equal(true);
      expect(ev.getPreferredProduct.calledWith('losspager')).to.equal(true);
      expect(ev.getPreferredProduct.calledWith('moment-tensor')).to.equal(true);
      expect(ev.getPreferredProduct.calledWith('finite-fault')).to.equal(true);

      ev.getPreferredProduct.restore();
    });
  });
});
