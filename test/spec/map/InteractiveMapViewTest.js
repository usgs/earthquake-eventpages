/* global afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';


var CatalogEvent = require('pdl/CatalogEvent'),
    InteractiveMapView = require('map/InteractiveMapView'),
    Model = require('mvc/Model'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var eventDetails,
    expect = chai.expect;


var _createMapView = function (config) {
  config = config || {};

  return InteractiveMapView({
    model: Model({
      'event': CatalogEvent(eventDetails),
      'config': config
    })
  });
};

describe('map/InteractiveMapView', function () {
  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        eventDetails = data;
        done();
      },
      error: function () {
        eventDetails = {};
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

  describe('createEpicenterMarker', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = InteractiveMapView();
    });


    it('creates a marker', function () {
      var marker;

      marker = view.createEpicenterMarker(0, 0, 0);

      /* jshint -W030 */
      expect(marker).to.not.be.undefined;
      /* jshint +W030 */
    });

    it('uses the correct coordinates', function () {
      var latitude,
          longitude,
          marker;

      latitude = 0.0;
      longitude = 0.0;

      marker = view.createEpicenterMarker(latitude, longitude, 0);

      expect(marker.getLatLng().lat).to.equal(latitude);
      expect(marker.getLatLng().lng).to.equal(longitude);
    });

    it('creates good popup text', function () {
      var marker;

      marker = view.createEpicenterMarker(0, 0, 0);

      expect(marker.getPopup().getContent()).to.equal(
        'Epicenter M0.0<br/>0.000&deg;N&nbsp;0.000&deg;E'
      );
    });
  });

  describe('getAvailableBaseLayers', function () {
    it('should return some layers', function () {
      var view;

      view = InteractiveMapView();
      expect(Object.keys(view.getAvailableBaseLayers()).length).to.equal(4);

      view.destroy();
    });
  });

  describe('getAvailableOverlays', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = _createMapView();
    });

    it('does nothing when there is no event', function () {
      var emptyView;

      emptyView = InteractiveMapView();
      expect(Object.keys(emptyView.getAvailableOverlays()).length).to.equal(0);

      emptyView.destroy();
    });

    it('creates an epicenter marker', function () {
      var overlays,
          spy;

      spy = sinon.spy(view, 'createEpicenterMarker');
      overlays = view.getAvailableOverlays();

      expect(spy.callCount).to.equal(1);
      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.EPICENTER_OVERLAY)).to.be.true;
      /* jshint +W030 */

      spy.restore();
    });

    it('adds the plates overlays', function () {
      var overlays;

      overlays = view.getAvailableOverlays();

      /* jshint -W030 */
      expect(overlays.hasOwnProperty(
          InteractiveMapView.PLATES_OVERLAY)).to.be.true;
      /* jshint +W030 */
    });

    it('adds DYFI overlays', function () {
      var spy;

      spy = sinon.spy(view, 'addDyfiOverlays');
      view.getAvailableOverlays();

      expect(spy.callCount).to.equal(1);

      spy.restore();
    });

    it('adds ShakeMap overlays', function () {
      var spy;

      spy = sinon.spy(view, 'addShakeMapOverlays');
      view.getAvailableOverlays();

      expect(spy.callCount).to.equal(1);

      spy.restore();
    });
  });

  describe('render', function () {
    var view;

    afterEach(function () {
      // view.el.parentNode.removeChild(view.el);
      view.destroy();
    });

    beforeEach(function () {
      view = _createMapView();
    });


    it('checks baseLayers', function () {
      var baseLayers,
          spy;

      baseLayers = view.getAvailableBaseLayers();
      spy = sinon.spy(Object, 'keys');

      view.render();

      /* jshint -W030 */
      expect(spy.calledWith(baseLayers)).to.be.true;
      /* jshint +W030 */

      spy.restore();
    });

    it('checks overlays', function () {
      var overlays,
          spy;

      overlays = view.getAvailableBaseLayers();
      spy = sinon.spy(Object, 'keys');

      view.render();

      /* jshint -W030 */
      expect(spy.calledWith(overlays)).to.be.true;
      /* jshint +W030 */

      spy.restore();
    });
  });
});
