/* global chai, describe, it, before, beforeEach */
'use strict';

var expect = chai.expect,
    PagerXmlParser = require('losspager/PagerXmlParser'),
    Xhr = require('util/Xhr'),

    pagerInfo = null;


describe('PagerXmlParser test suite.', function () {
  before(function (done) {
    Xhr.ajax({
      url: 'spec/modules/impact/pager.xml',
      success: function (r, xhr) {
        pagerInfo = PagerXmlParser.parse(xhr.responseXml || r);
        done();
      },
      error: function () {
        done('Failed to fetch pager.xml');
      }
    });
  });

  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(PagerXmlParser).not.to.be.undefined;
      /* jshint +W030 */
    });
  });

  describe('Conforms to API', function () {
    it('Has a version method', function () {
      expect(PagerXmlParser).to.respondTo('version');
    });
    it('Has a parse method', function () {
      expect(PagerXmlParser).to.respondTo('parse');
    });
  });

  describe('parse()', function () {
    it('returns an object', function () {
      expect(pagerInfo).to.be.an.instanceOf(Object);
    });
  });

  describe('_parseAlerts()', function () {
    var alerts;

    beforeEach(function () {
      alerts = pagerInfo.alerts;
    });

    it('has both an economic and fatality alert', function () {
      expect(alerts).to.have.ownProperty('economic');
      expect(alerts).to.have.ownProperty('fatality');
    });

    it('properly reports alert levels', function () {
      expect(alerts.economic.level).to.equal('yellow');
      expect(alerts.economic.units).to.equal('USD');

      expect(alerts.fatality.level).to.equal('green');
      expect(alerts.fatality.units).to.equal('fatalities');
    });

  });

  describe('_parseExposures()', function () {
    var exposures;

    beforeEach(function () {
      exposures = pagerInfo.exposures;
    });

    it('has the proper number of exposures', function () {
      expect(exposures.length).to.equal(9); // 1 - 10, but 2+3 are combined
    });

    it('properly parses exposures', function () {
      expect(exposures[0].population).to.equal(271);
      expect(exposures[1].population).to.equal(9012995); // II+III
      expect(exposures[2].population).to.equal(5832303);
      expect(exposures[3].population).to.equal(2601074);
      expect(exposures[4].population).to.equal(926959);
      expect(exposures[5].population).to.equal(38091);
      expect(exposures[6].population).to.equal(0);
      expect(exposures[7].population).to.equal(0);
      expect(exposures[8].population).to.equal(0);

      expect(exposures[0].populationDisplay).to.equal('0k*');
      expect(exposures[1].populationDisplay).to.equal('9,013k*'); // II+III
      expect(exposures[2].populationDisplay).to.equal('5,832k');
      expect(exposures[3].populationDisplay).to.equal('2,601k');
      expect(exposures[4].populationDisplay).to.equal('927k');
      expect(exposures[5].populationDisplay).to.equal('38k');
      expect(exposures[6].populationDisplay).to.equal('0k');
      expect(exposures[7].populationDisplay).to.equal('0k');
      expect(exposures[8].populationDisplay).to.equal('0k');
    });
  });

  describe('_parseCities()', function () {
    var cities;

    beforeEach(function () {
      cities = pagerInfo.cities;
    });

    it('has the proper number of cities', function () {
      expect(cities.length).to.equal(300);
    });

    it('properly sorts the cities', function () {
      expect(cities[0].name).to.equal('Brea');
      expect(cities[1].name).to.equal('La Habra Heights');
      expect(cities[2].name).to.equal('La Habra');
      expect(cities[3].name).to.equal('Fullerton');
      expect(cities[4].name).to.equal('Placentia');
      expect(cities[5].name).to.equal('Rowland Heights');
      expect(cities[6].name).to.equal('Anaheim');
      expect(cities[7].name).to.equal('Santa Ana');
      expect(cities[8].name).to.equal('Long Beach');
      expect(cities[9].name).to.equal('Riverside');
      expect(cities[10].name).to.equal('Los Angeles');
      expect(cities[299].name).to.equal('San Pasqual');

      expect(cities[0].populationDisplay).to.equal('39k');
      expect(cities[1].populationDisplay).to.equal('5k');
      expect(cities[2].populationDisplay).to.equal('60k');
      expect(cities[3].populationDisplay).to.equal('135k');
      expect(cities[4].populationDisplay).to.equal('51k');
      expect(cities[5].populationDisplay).to.equal('49k');
      expect(cities[6].populationDisplay).to.equal('336k');
      expect(cities[7].populationDisplay).to.equal('325k');
      expect(cities[8].populationDisplay).to.equal('462k');
      expect(cities[9].populationDisplay).to.equal('304k');
      expect(cities[10].populationDisplay).to.equal('3,793k');
      expect(cities[299].populationDisplay).to.equal('2k');
    });
  });

  describe('_parseComments()', function () {
    var comments;

    beforeEach(function () {
      comments = pagerInfo.comments;
    });

    it('parses all the comments', function () {
      expect(comments).to.have.ownProperty('structure');
      expect(comments).to.have.ownProperty('effects');
      expect(comments).to.have.ownProperty('impact');
      expect(comments.impact).to.have.length(2);
    });
  });
});
