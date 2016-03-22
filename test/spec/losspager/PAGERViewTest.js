/* global  afterEach, before, beforeEach, chai, describe, it */
'use strict';

var PAGERView = require('losspager/PAGERView'),
    Product = require('pdl/Product'),
    //Util = require('util/Util'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('losspager/PAGERView', function () {
  var product,
      response,
      xhr;

  product = Product({
    source: 'us',
    status: 'UPDATE',
    properties: {
      maxmmi: 7.0,
    },
    contents: {
      'pager.xml': {url: '/products/losspager/us10004u1y/us/1456938181480/pager.xml'},
      'exposure.png': {url: '/products/losspager/us10004u1y/us/1456938181480/exposure.png'},
      'alertecon.pdf': {url: '/products/losspager/us10004u1y/us/1456938181480/alertecon.pdf'},
      'alertecon.png': {url: '/products/losspager/us10004u1y/us/1456938181480/alertecon.png'},
      'alertfatal.pdf': {url: '/products/losspager/us10004u1y/us/1456938181480/alertfatal.pdf'},
      'alertfatal.png': {url: '/products/losspager/us10004u1y/us/1456938181480/alertfatal.png'}
    }
  });

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

  describe('createScaffolding', function () {
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

  describe('fetchData()', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('gets data', function () {
      /* jshint -W030 */
      expect(product).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe.skip('getAlertComment', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('returns correct comment if passed fatality', function () {
      expect(view.getAlertComment('fatality')).to.equal(
          'Green alert for shaking-related fatalities and economic ' +
          'losses.  There is a low likelihood of casualties and damage.');
    });

    it('returns correct comment if passed economic', function () {
      expect(view.getAlertComment('economic')).to.equal(undefined);
    });
  });

  describe('onCityClick', function () {
    it('should toggle classname', function () {
      var view;

      view = PAGERView();

      /* jshint -W030 */
      expect(view.el.querySelector('.show-additional')).to.be.null;
      /* jshint +W030 */
      view.onCityClick();

      /* jshint -W030 */
      expect(view.el.querySelector('.show-additional')).to.not.be.null;
      /* jshint +W030 */

    });
  });

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


  describe.skip('onSuccess', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('calls renderFatalityHistogram', function () {
      /* jshint -W030 */
      expect(el.querySelector('.fatality-histogram img')).to.not.be.null;
      /* jshint +W030 */
    });

    it('calls renderEconomicHistogram', function () {
      /* jshint -W030 */
      expect(el.querySelector('.economic-histogram img')).to.not.be.null;
      /* jshint +W030 */
    });

    it('calls renderExposures', function () {
      /* jshint -W030 */
      expect(el.querySelector('.pager-exposures')).to.not.be.null;
      /* jshint +W030 */
    });

    it('calls renderCities', function () {
      /* jshint -W030 */
      expect(el.querySelector('.cities-population')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe.skip('renderCities', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('renders cities and length is correct', function () {
      expect(view.el.getElementsByClassName('cities-population').length)
          .to.equal(861);
    });
  });

  describe.skip('renderComments', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('Shows comments if they are avaliable', function () {
      /* jshint -W030 */
      expect(view.el.querySelector('.wrapper')).to.not.be.null;
      /* jshint +W030 */
    });

  });

  describe.skip('renderEconomicHistogram', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('redners histogram if alertLevel is not equal to pending', function () {
      /* jshint -W030 */
      expect(view.el.querySelector('.economic-histogram figure')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderExposureMap', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('renders renderExposureMap correctly', function () {
      /* jshint -W030 */
      expect(view.el.querySelector('.exposure-map img')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe.skip('renderFatalityHistogram', function () {
    var el,
        view;

    beforeEach(function (done) {
      var onSuccess;

      el = document.createElement('div');
      view = PAGERView({
        el: el,
        model: product
      });
      onSuccess = view.onSuccess;

      view.onSuccess = function (data, xhr) {
        try {
          onSuccess(data, xhr);
        } catch (e) {
          console.log(e);
          console.log(e.stack);
        }
        done();
      };

      view.render();

    });

    afterEach(function () {
      view.destroy();
    });

    it('redners histogram if alertLevel is not equal to pending', function () {
      /* jshint -W030 */
      expect(view.el.querySelector('.fatality-histogram figure')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderPending', function () {

  });
});
