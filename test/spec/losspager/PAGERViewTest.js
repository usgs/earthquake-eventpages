/* global  afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';

var PAGERView = require('losspager/PAGERView'),
    PagerXmlParser = require('losspager/PagerXmlParser'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('losspager/PAGERView', function () {
  var pagerInfo,
      product,
      response,
      xhr;

  before(function (done) {
    var stub;

    stub = '/products/losspager/us10004u1y/us/1456938181480';

    product = Product({
      contents: {
        'pager.xml': {url: stub + '/pager.xml'},
        'exposure.png': {url: stub + '/exposure.png'},
        'alertecon.pdf': {url: stub + '/alertecon.pdf'},
        'alertecon.png': {url: stub + '/alertecon.png'},
        'alertfatal.pdf': {url: stub + '/alertfatal.pdf'},
        'alertfatal.png': {url: stub + '/alertfatal.png'}
      },
      properties: {
        maxmmi: 7.0,
      },
      source: 'us',
      status: 'UPDATE',
      type: 'losspager'
    });

    Xhr.ajax({
      url: '/products/losspager/us10004u1y/us/1456938181480/pager.xml',
      success: function (r, x) {
        pagerInfo = PagerXmlParser.parse(x.responseXML || r);

        response = r;
        xhr = x;

        done();
      },
      error: function () {
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

  describe('fetchData', function () {
    it('calls error when no content available', function () {
      var stub,
          view;

      view = PAGERView();
      stub = sinon.stub(view, 'onError', function () {
        // Do nothing
      });

      view.fetchData();
      expect(stub.callCount).to.equal(1);

      stub.restore();
      view.destroy();
    });

    it('calls onSuccess when content is available', function () {
      var ajaxStub,
          successStub,
          view;

      view = PAGERView({
        model: product
      });

      successStub = sinon.stub(view, 'onSuccess', function () {
        // Do no thing
      });

      ajaxStub = sinon.stub(Xhr, 'ajax', function (options) {
        options.success();
      });

      view.fetchData();
      expect(successStub.callCount).to.equal(1);

      successStub.restore();
      ajaxStub.restore();
      view.destroy();
    });
  });

  describe('getAlertComment', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = PAGERView();
      view.setPagerInfo({
        comments: {
          impact: [
            'Fatality comment',
            'Economic comment'
          ]
        }
      });
    });

    it('returns correct comment if passed fatality', function () {
      expect(view.getAlertComment('fatality')).to.equal(
          'Fatality comment');
    });

    it('returns correct comment if passed economic', function () {
      expect(view.getAlertComment('economic')).to.equal(
          'Economic comment');
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

      view.destroy();
    });
  });

  describe('onError', function() {
    it('should use default message', function () {
      var view;

      view = PAGERView();

      view.onError();
      expect(view.el.innerHTML).to.equal('Error loading PAGER view');

      view.destroy();
    });
  });


  describe('onSuccess', function () {
    it('calls each sub method', function () {
      var cityStub,
          econStub,
          expoStub,
          fatStub,
          view;

      view = PAGERView();

      cityStub = sinon.stub(view, 'renderCities', function () {});
      econStub = sinon.stub(view, 'renderEconomicHistogram', function () {});
      expoStub = sinon.stub(view, 'renderExposures', function () {});
      fatStub = sinon.stub(view, 'renderFatalityHistogram', function () {});

      view.onSuccess(response, xhr);

      expect(cityStub.callCount).to.equal(1);
      expect(econStub.callCount).to.equal(1);
      expect(expoStub.callCount).to.equal(1);
      expect(fatStub.callCount).to.equal(1);

      cityStub.restore();
      econStub.restore();
      expoStub.restore();
      fatStub.restore();

      view.destroy();
    });
  });

  describe('renderCities', function () {
    it('renders cities and length is correct', function () {
      var view;

      view = PAGERView({
        model: product,
      });

      view.setPagerInfo(pagerInfo);
      view.renderCities();

      expect(view.el.getElementsByClassName('cities-population').length)
          .to.equal(861);

      view.destroy();
    });
  });

  describe('renderComments', function () {
    it('Shows comments if they are avaliable', function () {
      var view;

      view = PAGERView({
        model: product
      });
      view.setPagerInfo(pagerInfo);

      view.renderComments();

      /* jshint -W030 */
      expect(view.el.querySelector('.wrapper')).to.not.be.null;
      /* jshint +W030 */

      view.destroy();
    });
  });

  describe('renderEconomicHistogram', function () {
    it('renders histogram if alertLevel is not equal to pending', function () {
      var view;

      view = PAGERView({
        model: product
      });
      view.setPagerInfo(pagerInfo);

      view.renderEconomicHistogram();

      /* jshint -W030 */
      expect(view.el.querySelector('.economic-histogram figure'))
          .to.not.be.null;
      /* jshint +W030 */

      view.destroy();
    });
  });

  describe('renderExposureMap', function () {
    it('renders renderExposureMap correctly', function () {
      var view;

      view = PAGERView({
        model: product
      });
      view.setPagerInfo(pagerInfo);

      view.renderExposureMap();

      /* jshint -W030 */
      expect(view.el.querySelector('.exposure-map img')).to.not.be.null;
      /* jshint +W030 */

      view.destroy();
    });
  });

  describe('renderFatalityHistogram', function () {
    it('renders histogram if alertLevel is not equal to pending', function () {
      var view;

      view = PAGERView({
        model: product
      });
      view.setPagerInfo(pagerInfo);

      view.renderFatalityHistogram();

      /* jshint -W030 */
      expect(view.el.querySelector('.fatality-histogram figure'))
          .to.not.be.null;
      /* jshint +W030 */

      view.destroy();
    });
  });
});
