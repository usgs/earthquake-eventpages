/* global afterEach, before, beforeEach, chai, describe, it */
'use strict';


var InteractiveMapView = require('map/InteractiveMapView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('map/InteractiveMapView', function () {
  var eventDetails;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      sucecss: function (data) {
        eventDetails = data;
      },
      error: function () {
        eventDetails = {};
      },
      done: function () {
        done();
      }
    });
  });


  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof InteractiveMapView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(InteractiveMapView).to.not.throw(Error);
    });
  });

  describe('addDyfiOverlays', function () {
    it('includes 10k and 1k when present', function () {
      var dyfi,
          overlays,
          view;

      view = InteractiveMapView();

      dyfi = Product({
        contents: {
          'dyfi_geo_10km.geojson': {'url': '10k'},
          'dyfi_geo_1km.geojson': {'url': '1k'},
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      overlays = view.addDyfiOverlays(dyfi);

      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.DYFI_10K_OVERLAY)).to.be.true;
      expect(overlays.hasOwnProperty(
          InteractiveMapView.DYFI_1K_OVERLAY)).to.be.true;
      expect(overlays.hasOwnProperty(
          InteractiveMapView.DYFI_DEFAULT_OVERLAY)).to.be.false;
      /* jshint +W030 */

      dyfi.destroy();
    });

    it('does not include default if either 10k or 1k is present', function () {
      var dyfi,
          overlays,
          view;

      view = InteractiveMapView();

      // 10km is present
      dyfi = Product({
        contents: {
          'dyfi_geo_10km.geojson': {'url': '10k'},
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      overlays = view.addDyfiOverlays(dyfi);

      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.DYFI_DEFAULT_OVERLAY)).to.be.false;
      /* jshint -W030 */

      dyfi.destroy();


      // 1k is present
      dyfi = Product({
        contents: {
          'dyfi_geo_1km.geojson': {'url': '1k'},
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      overlays = view.addDyfiOverlays(dyfi);

      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.DYFI_DEFAULT_OVERLAY)).to.be.false;
      /* jshint -W030 */

      dyfi.destroy();
    });

    it('includes default if neither 10k or 1k is present', function () {
      var dyfi,
          overlays,
          view;

      view = InteractiveMapView();

      dyfi = Product({
        contents: {
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      overlays = view.addDyfiOverlays(dyfi);

      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.DYFI_DEFAULT_OVERLAY)).to.be.true;
      /* jshint -W030 */

      dyfi.destroy();
    });
  });

  describe('addShakeMapOverlays', function () {
    var shakemap,
        view;

    afterEach(function () {
      view.destroy();
      shakemap.destroy();
    });

    beforeEach(function () {
      view = InteractiveMapView();

      shakemap = Product({
        contents: {
          'download/cont_mi.json': {url: 'contours'},
          'download/stationlist.json': {url: 'stationlist'}
        }
      });
    });


    it('includes contours when present', function () {
      var overlays;

      overlays = view.addShakeMapOverlays(shakemap);

      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.SHAKEMAP_CONTOURS)).to.be.true;
      /* jshint +W030 */
    });

    it('includes stationlist when present', function () {
      var overlays;

      overlays = view.addShakeMapOverlays(shakemap);

      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.SHAKEMAP_STATIONS)).to.be.true;
      /* jshint +W030 */
    });
  });
});
