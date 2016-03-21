/* global afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';

var PAGERView = require('losspager/PAGERView'),
    ImpactModule = require('impact/ImpactModule'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

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
          'pager.xml': {url:
              '/etc/products/losspager/us10004u1y/us/1456938181480/pager.xml'},
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

describe('losspager/PAGERView', function () {
  var response,
      xhr;

  before(function (done) {
    Xhr.ajax({
      url: '/products/losspager/us10004u1y/us/1456938181480/pager.xml',
      success: function (r, x) {
        xhr = x;
        response = r;
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof PAGERView).to.equal('function');
    });

    it('can be constructed', function () {
      expect(PAGERView).to.not.throw(Error);
    });
  });

  describe('createExposureItem', function () {
    it('returns expected markup', function () {
      var cell,
          tBody,
          view;

      tBody = document.createElement('tbody');
      view = PAGERView();

      tBody.innerHTML = view.createExposureItem({
        css: 'this',
        label: 'is',
        perc: 'a',
        populationDisplay: 'test'
      });

      cell = tBody.querySelector('.exposure-mmi');
      /* jshint -W030 */
      expect(cell).to.not.be.null;
      /* jshint +W030 */

      cell = tBody.querySelector('.mmi');
      /* jshint -W030 */
      expect(cell).to.not.be.null;
      /* jshint +W030 */
      expect(cell.innerHTML).to.equal('is');

      cell = tBody.querySelector('.exposure-perc');
      /* jshint -W030 */
      expect(cell).to.not.be.null;
      /* jshint +W030 */
      expect(cell.innerHTML).to.equal('a');

      cell = tBody.querySelector('.exposure-population');
      /* jshint -W030 */
      expect(cell).to.not.be.null;
      /* jshint +W030 */
      expect(cell.innerHTML).to.equal('test');
    });
  });






  describe('createScaffolding()', function () {
    var view;

    before(function () {
      view = PAGERView();
    });

    it('should create a scaffolding for the view', function () {
      view.createScaffolding(response, xhr);

      /* jshint -W030 */
      expect(view.el.querySelector('.alert-wrapper')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.pager-pending')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.fatality-histogram')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.economic-histogram')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.pager-content')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.exposure-map')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.exposure-population')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.comment-wrapper')).to.not.be.null;
      /* jshint +W030 */

      /* jshint -W030 */
      expect(view.el.querySelector('.exposure-city')).to.not.be.null;
      /* jshint +W030 */

    });
  });

  // describe('fetchData()', function () {
  //   var view;
  //
  //   before(function () {
  //     view = PAGERView();
  //   });
  //
  //   view.fetchData(response, xhr);
  //
  //   // it('calls onSucces when data is found', function () {
  //   //   /* -W030 */
  //   //   expect(view.event).to.equal('stuff');
  //   //   /* -W030 */
  //   // });
  //
  // });

  describe('getAlertComment', function () {

  });

  // describe('onCityClick', function () {
  //   var page,
  //       content,
  //       exposureClickSpy,
  //       cityClickSpy;
  //
  //   beforeEach(function (done) {
  //     exposureClickSpy = sinon.spy(PAGERView, 'onCityClick');
  //     cityClickSpy = sinon.spy(PAGERView, 'onCityClick');
  //
  //     page = new PAGERView({
  //       renderCallback: done,
  //       eventDetails: eventInfo,
  //       'module': new ImpactModule()
  //     });
  //     content = page.getContent();
  //   });
  //
  //   afterEach(function () {
  //     exposureClickSpy.restore();
  //     cityClickSpy.restore();
  //   });
  //
  //   it('responds to click events on city list', function () {
  //     _fireClickEvent(content.querySelector('.toggle'));
  //     expect(cityClickSpy.callCount).to.equal(1);
  //   });
  // });

  describe('onError', function() {
    var view;

    before(function () {
      view = PAGERView();
    });

    it('should use default message', function () {
      view.onError();
      expect(view.el.innerHTML).to.equal('Error loading PAGER view');
    });
  });


  describe('', function() {

  });
});
