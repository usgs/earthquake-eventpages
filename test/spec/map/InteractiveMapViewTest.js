/* global before, chai, describe, it, sinon */
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
          spy,
          view;

      view = InteractiveMapView();

      dyfi = Product({
        contents: {
          'dyfi_geo_10km.geojson': {'url': '10k'},
          'dyfi_geo_1km.geojson': {'url': '1k'},
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      spy = sinon.spy(view, 'createDyfiUtmLayer');
      view.addDyfiOverlays(dyfi);

      expect(spy.callCount).to.equal(2);
      /* jshint -W030 */
      expect(spy.calledWith('10k')).to.be.true;
      expect(spy.calledWith('1k')).to.be.true;
      expect(spy.calledWith('default')).to.be.false;
      /* jshint -W030 */

      spy.restore();
      dyfi.destroy();
    });

    it('does not include default if either 10k or 1k is present', function () {
      var dyfi,
          spy,
          view;

      view = InteractiveMapView();

      // 10km is present
      dyfi = Product({
        contents: {
          'dyfi_geo_10km.geojson': {'url': '10k'},
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      spy = sinon.spy(view, 'createDyfiUtmLayer');
      view.addDyfiOverlays(dyfi);

      expect(spy.callCount).to.equal(1);
      /* jshint -W030 */
      expect(spy.calledWith('default')).to.be.false;
      /* jshint -W030 */

      // 1k is present
      spy.restore();
      dyfi.destroy();

      dyfi = Product({
        contents: {
          'dyfi_geo_1km.geojson': {'url': '1k'},
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      spy = sinon.spy(view, 'createDyfiUtmLayer');
      view.addDyfiOverlays(dyfi);

      expect(spy.callCount).to.equal(1);
      /* jshint -W030 */
      expect(spy.calledWith('default')).to.be.false;
      /* jshint -W030 */

      spy.restore();
      dyfi.destroy();
    });

    it('includes default if neither 10k or 1k is present', function () {
      var dyfi,
          spy,
          view;

      view = InteractiveMapView();

      dyfi = Product({
        contents: {
          'dyfi_geo.geojson': {'url': 'default'}
        }
      });

      spy = sinon.spy(view, 'createDyfiUtmLayer');
      view.addDyfiOverlays(dyfi);

      expect(spy.callCount).to.equal(1);
      /* jshint -W030 */
      expect(spy.calledWith('10k')).to.be.false;
      expect(spy.calledWith('1k')).to.be.false;
      expect(spy.calledWith('default')).to.be.true;
      /* jshint -W030 */

      spy.restore();
      dyfi.destroy();
    });
  });
});
