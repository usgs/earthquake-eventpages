/* global after, before, chai, describe, it, sinon */
'use strict';


var expect = chai.expect;


var CatalogEvent = require('pdl/CatalogEvent'),
    NearbySeismicity = require('core/NearbySeismicity'),
    Xhr = require('util/Xhr');


describe('core/NearbySeismicity', function () {
  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof NearbySeismicity).to.equal('function');
    });
  });

  describe('destroy', function () {
    it('can be called', function () {
      expect(function () {
        var obj;

        obj = NearbySeismicity();
        obj.destroy();
      }).to.not.throw(Error);
    });
  });

  describe('getLatestEarthquakesLink', function () {
    it('generates a link to the map/list', function () {
      var nearbySeismicity,
          obj,
          params,
          url;

      nearbySeismicity = NearbySeismicity();
      sinon.stub(nearbySeismicity, 'getMapPosition', function () {
        return [1, 2, 3];
      });
      params = {
        maxlatitude: 5,
        maxlongitude: 6,
        minlatitude: 7,
        minlongitude: 8
      };

      url = nearbySeismicity.getLatestEarthquakesLink({
        eventid: 'testid',
        params: params
      });

      expect(nearbySeismicity.getMapPosition.getCall(0).args[0]).
          to.equal(params);

      obj = JSON.parse(decodeURIComponent(url.split('#')[1]));
      expect(obj.autoUpdate).to.equal(false);
      expect(obj.event).to.equal('testid');
      expect(obj.feed).to.equal(obj.search.id);
      expect(obj.mapposition).to.deep.equal([1, 2, 3]);
      expect(obj.search.params.maxlatitude).to.equal(5);
      expect(obj.search.params.maxlongitude).to.equal(6);
      expect(obj.search.params.minlatitude).to.equal(7);
      expect(obj.search.params.minlongitude).to.equal(8);
    });
  });

  describe('getMapPosition', function () {
    var nearbySeismicity;

    before(function () {
      nearbySeismicity = NearbySeismicity();
    });

    after(function () {
      nearbySeismicity = null;
    });

    it('defaults to the world', function () {
      expect(nearbySeismicity.getMapPosition({})).
          to.deep.equal([[-85, -180], [85, 180]]);
    });

    it('uses min/max params', function () {
      expect(nearbySeismicity.getMapPosition({
        maxlatitude: 1,
        maxlongitude: 2,
        minlatitude: 3,
        minlongitude: 4
      })).to.deep.equal([[3, 4], [1, 2]]);
    });

    it('computes extent for radius search', function () {
      expect(nearbySeismicity.getMapPosition({
        latitude: 34,
        longitude: -118,
        maxradiuskm: NearbySeismicity.KM_PER_DEGREE
      })).to.deep.equal([[33, -119], [35, -117]]);
    });
  });

  describe('getNearbySeismicityLink', function () {
    it('chains other method calls', function () {
      var nearbySeismicity,
          params,
          summary;

      nearbySeismicity = NearbySeismicity();
      params = {};
      summary = {id: 'testid'};

      sinon.stub(nearbySeismicity, 'getNearbySeismicityParams', function () {
        return params;
      });
      sinon.stub(nearbySeismicity, 'getLatestEarthquakesLink', function () {
        return 'test url';
      });

      expect(nearbySeismicity.getNearbySeismicityLink(summary)).
          to.equal('test url');
      expect(nearbySeismicity.getNearbySeismicityParams.
          getCall(0).args[0]).to.equal(summary);
      expect(nearbySeismicity.getLatestEarthquakesLink.
          getCall(0).args[0].params).to.equal(params);
    });
  });

  describe('getNearbySeismicityParams', function () {
    var ev;

    before(function (done) {
      Xhr.ajax({
        url: '/events/us10004u1y.json',
        success: function (data) {
          ev = CatalogEvent(data);
          done();
        },
        error: function () {
          done(false);
        }
      });
    });

    after(function () {
      ev.destroy();
      ev = null;
    });

    it('generates nearby seismicity parameters', function () {
      var nearbySeismicity,
          params,
          summary;

      nearbySeismicity = NearbySeismicity();
      summary = ev.getSummary();
      params = nearbySeismicity.getNearbySeismicityParams(summary);

      expect(params.minmagnitude).to.equal(5);
      expect(params.latitude).to.equal(summary.latitude);
      expect(params.longitude).to.equal(summary.longitude);
      expect(params.maxradiuskm).to.equal(150);
      expect(params.starttime).to.equal('2016-02-10T12:49:48.360Z');
      expect(params.endtime).to.equal('2016-03-23T12:49:48.360Z');
    });
  });

});
