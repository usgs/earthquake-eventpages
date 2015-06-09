/* global chai, sinon, describe, it, beforeEach, afterEach */
'use strict';

var expect = chai.expect,
    ImpactModule = require('impact/ImpactModule'),
    ShakeMapPage = require('impact/ShakeMapPage'),
    Xhr = require('util/Xhr'),

    nc72119970 = require('./nc72119970'),
    stationlist = require('./stationlist');


var eventDetails = {
  properties: {
    products: {
      shakemap: [{
        source: 'us',
        code: 'usc000myqq',
        status: 'UPDATE',
        contents: {
          'download/intensity.jpg': {url: 'intensity.jpg'},
          'download/pga.jpg': {url: 'pga.jpg'},
          'download/pgv.jpg': {url: 'pgv.jpg'},
          'download/psa03.jpg': {url: 'psa03.jpg'},
          'download/psa10.jpg': {url: 'psa10.jpg'},
          'download/psa30.jpg': {url: 'psa30.jpg'},
          'download/sd.jpg': {url: 'sd.jpg'},
          'download/stationlist.xml': {url:'stationlist.xml'},
        }
      }]
    }
  }
};


describe('ShakeMapPageTest test suite.', function () {

  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(ShakeMapPage).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      var page = new ShakeMapPage({
          'eventDetails': eventDetails,
          'productTypes': ['shakemap'],
          'module': new ImpactModule()
        });

      expect(page).to.be.an.instanceof(ShakeMapPage);
    });
  });

  describe('Tabbed Content', function () {
    it('contains all images and station list', function () {
      var page,
          tablistPanels;

      page = new ShakeMapPage({
        'eventDetails': eventDetails,
        'module': new ImpactModule()
      });
      tablistPanels = page.getContent().querySelectorAll('.tablist-panel');

      expect(tablistPanels.length).to.be.equal(7);
    });
  });

  describe('Station List Content', function () {
    var eventDetails,
        page,
        content,
        ajaxStub,
        stations,
        container;

    eventDetails = {
      properties: {
        products: {
          shakemap: [{
            source: 'US',
            code: 'us10001ldx',
            status: 'UPDATE',
            contents: {
              'download/stationlist.json': {
                url:'stationlist.json'
              }
            }
          }]
        }
      }
    };

    beforeEach(function () {
      ajaxStub = sinon.stub(Xhr, 'ajax', function (options) {
        if (options.success) {
          options.success(stationlist);
        }
      });

      page = new ShakeMapPage({
        'eventDetails': eventDetails,
        'module': new ImpactModule()
      });
      content = page.getContent();
      container = content.querySelector('.stations');
      stations = content.querySelectorAll('.accordion');
    });

    afterEach(function () {
      ajaxStub.restore();
      ajaxStub = null;
    });

    // check all stations are present
    it('has all stations', function () {
      expect(stations.length).to.be.equal(17);
    });

    // check summary details
    it('has summary details', function () {
      var stationDetails = stations[0].querySelectorAll('li');
      expect(stationDetails.length).to.be.equal(4);
    });

    // check detail information
    it('has station details', function () {
      var stationDetails,
          components,
          content;

      content = page.getContent();
      stationDetails = content.querySelector('.accordion-content');
      components = content.querySelector('.station-channels-list');

      expect(stationDetails.querySelector('dd').innerHTML).to.equal('OBSERVED');
      expect(components.querySelectorAll('tbody>tr').length).to.equal(1);
    });
  });

  describe('Summary section details', function () {
    var expect = chai.expect,
        options = {
          eventDetails: nc72119970,
          module: new ImpactModule(),
          productTypes: ['shakemap'],
          title: 'shakemap',
          hash: 'shakemap'
        },
        page = new ShakeMapPage(options);

    it('Can get product details', function () {
      var content = page.getContent();

      expect(content).to.be.a('object');
    });
  });
});
