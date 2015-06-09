/* global chai, sinon, describe, it, beforeEach, afterEach */
'use strict';

var expect = chai.expect,
    ImpactModule = require('impact/ImpactModule'),
    PagerPage = require('impact/PagerPage');


var eventInfo = {
  properties: {
    products: {
      losspager: [{
        source: 'us',
        status: 'UPDATE',
        properties: {
          maxmmi: 7.0
        },
        contents: {
          'pager.xml': {url: '/spec/modules/impact/pager.xml'},
          'exposure.png': {url: 'exposure.png'},
          'alertecon.pdf': {url: 'alertecon.pdf'},
          'alertecon.png': {url: 'alertecon.png'},
          'alertfatal.pdf': {url: 'alertfatal.pdf'},
          'alertfatal.png': {url: 'alertfatal.png'}
        }
      }]
    }
  }
};

var _fireClickEvent = function (target) {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);
  target.dispatchEvent(clickEvent);
};


describe('PagerPage test suite.', function () {
  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(PagerPage).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      var c = new PagerPage({
        el: document.createElement('div'),
        eventDetails: eventInfo,
        'module': new ImpactModule()
      });
      expect(c).to.be.an.instanceof(PagerPage);
    });
  });

  describe('_setContentMarkup()', function () {
    var page, container;

    beforeEach(function (done) {
      page = new PagerPage({
        renderCallback: done,
        eventDetails: eventInfo,
        'module': new ImpactModule()
      });
      container = page.getContent();
    });

    // Basic rendering tests

    it('contains economic and fatality alerts', function () {
      expect(container.querySelectorAll('.alert-wrapper > div'))
          .to.have.length(2);
    });

    it('contains all expected exposures', function () {
      expect(container.querySelectorAll('.pager-exposures'))
          .to.have.length(1);
      expect(container.querySelectorAll('.pager-exposures > tbody > tr'))
          .to.have.length(9);
    });

    it('contains all expected comments', function () {
      expect(container.querySelectorAll('.comment-wrapper > div'))
          .to.have.length(2);
      expect(container.querySelectorAll('.alert-wrapper figcaption'))
          .to.have.length(2);
    });

    it('contains all expected cities', function () {
      expect(container.querySelectorAll('.pager-cities'))
          .to.have.length(1);
      expect(container.querySelectorAll('.pager-cities > tbody > tr'))
          .to.have.length(300);
    });

    // More detailed tests for render methods
    // TODO
  });

  describe('event bindings', function () {
    var page,
        content,
        exposureClickSpy,
        cityClickSpy;

    beforeEach(function (done) {
      exposureClickSpy = sinon.spy(PagerPage.prototype, '_onExposureClick');
      cityClickSpy = sinon.spy(PagerPage.prototype, '_onCityClick');

      page = new PagerPage({
        renderCallback: done,
        eventDetails: eventInfo,
        'module': new ImpactModule()
      });
      content = page.getContent();
    });

    afterEach(function () {
      exposureClickSpy.restore();
      cityClickSpy.restore();
    });

    it('responds to click events on city list', function () {
      _fireClickEvent(content.querySelector('.city-wrapper'));
      expect(cityClickSpy.callCount).to.equal(1);
    });

    it('only toggles city list if click is on control', function () {
      // First make sure not expanded
      var list = content.querySelector('.show-additional');
      if (list) {
        list.classList.remove('show-additional');
      }
      expect(content.querySelectorAll('.show-additional')).to.have.length(0);

      // Click on list itself; should NOT expand
      page._onCityClick({
          target: content.querySelector('.pager-cities')});
      expect(content.querySelectorAll('.show-additional')).to.have.length(0);

      // Click on control; should expand
      page._onCityClick.call(content.querySelector('.city-wrapper'),
        {target: content.querySelector('.city-wrapper .toggle')});
      expect(content.querySelectorAll('.show-additional')).to.have.length(1);
    });
  });
});
