/* global chai, sinon, describe, it, before, after */
'use strict';

var expect = chai.expect,
    SummaryModule = require('summary/SummaryModule'),
    SummaryPage = require('summary/SummaryPage'),
    Xhr = require('util/Xhr'),

    geoserve = require('./geoserve'),
    eventData = require('./usc000lnnb'),
    eventData_nogeoserve = require('./usc000lnnb-nogeoserve'),
    eventData_nonearbycities = require('./usc000lnnb-nonearbycities');

// inject a general-header product
eventData.properties.products['general-header'] = [
  {
    contents: {
      '': {
        bytes: '<div class="general-header-1">General Header Text 1</div>'
      }
    }
  },
  {
    contents: {
      '': {
        bytes: '<div class="general-header-2">General Header Text 2</div>'
      }
    }
  }
];

var options = {
  hash: 'summary',
  title: 'Summary',
  eventDetails: eventData,
  module: new SummaryModule({eventDetails: eventData})
};
var options_nogeoserve = {
  hash: 'summary',
  title: 'Summary',
  eventDetails: eventData_nogeoserve,
  module: new SummaryModule({eventDetails: eventData_nogeoserve})
};
var options_nonearbycities = {
  hash: 'summary',
  title: 'Summary',
  eventDetails: eventData_nonearbycities,
  module: new SummaryModule({eventDetails: eventData_nonearbycities})
};


describe('SummaryPage test suite.', function () {

  var content, page, stub;

  before(function() {

    stub = sinon.stub(Xhr, 'ajax', function () {});

    page = new SummaryPage(options);
    page._ajaxSuccessTectonicSummary(geoserve.tectonicSummary.text);
    page._ajaxSuccessNearbyCities(geoserve.cities);
    content = page.getContent();
  });

  describe('Constructor', function () {

    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(SummaryPage).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      expect(page).to.be.an.instanceof(SummaryPage);
    });

    it('Detects nearby cities', function () {
      expect(page._nearbyCitiesFlag).to.equal(true);
    });

    it('Detects tectonic summary', function () {
      expect(page._tectonicSummaryFlag).to.equal(true);
    });

    it('Does not throw exception if no geoserve product', function () {
      var page_nogeoserve = null;

      try {
        page_nogeoserve = new SummaryPage(options_nogeoserve);
      } catch (e) { }

      /* jshint -W030 */
      expect(page_nogeoserve).to.not.be.null;
      /* jshint +W030 */

      expect(page_nogeoserve).to.be.an.instanceOf(SummaryPage);

      /* jshint -W030 */
      expect(page._nearbyCitiesFlag).to.equal(true);
      /* jshint +W030 */
    });

    it('Correctly deals with no nearbycities in product', function () {
      var page_nonearbycities = null;

      try {
        page_nonearbycities = new SummaryPage(options_nonearbycities);
      } catch (e) { }

      expect(page_nonearbycities._nearbyCitiesFlag).to.equal(false);

    });

  });

  describe('getContent', function () {

    it('can get contents', function () {
      expect(content).to.be.a('object');
    });

    it('can get a static map', function () {
      var map = content.querySelector('.summary-map');
      expect(map.childNodes.length).to.not.equal(0);
    });

    it('can get nearby cities', function () {
      var cities = content.querySelector('.summary-nearby-cities');
      expect(cities.childNodes.length).to.not.equal(0);
    });

    it('can get tectonic summary', function () {
      var tectonic = content.querySelector('.summary-tectonic-summary');
      expect(tectonic.childNodes.length).to.not.equal(0);
    });

    it('can get related links', function () {
      var links = content.querySelector('.general-links');
      expect(links.childNodes.length).to.not.equal(0);
    });

    it('can get general-text', function () {
      var general = content.querySelector('.summary-general-text');
      expect(general.childNodes.length).to.not.equal(0);
    });

    it('can get impact-text', function () {
      var impact = content.querySelector('.summary-impact-text');
      expect(impact.childNodes.length).to.not.equal(0);
    });

  });

  describe('_loadTextualContent', function () {

    it('does not add a title if null', function () {
      var container = document.createElement('div');

      page._loadTextualContent(container, 'general-header', null);

      /* jshint -W030 */
      expect(container.querySelector('h3')).to.be.null;
      /* jshint +W030 */
    });

    it('loops over all products available', function () {
      var container = document.createElement('div');

      page._loadTextualContent(container, 'general-header', null);

      /* jshint -W030 */
      expect(container.querySelector('.general-header-1')).not.to.be.null;
      expect(container.querySelector('.general-header-2')).not.to.be.null;
      /* jshint +W030 */
    });
  });

  after(function () {
    stub.restore();
  });

});
