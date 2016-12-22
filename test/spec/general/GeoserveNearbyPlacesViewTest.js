/* global before, chai, describe, it */
'use strict';

var GeoserveNearbyPlacesView = require('general/GeoserveNearbyPlacesView'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('general/GeoserveNearbyPlacesView', function () {
  var data,
      xhr;

  before(function (done) {
    Xhr.ajax({
      url: 'https://earthquake.usgs.gov/ws/geoserve/places.json?type=event&latitude=39.75&longitude=-105.2',
      success: function (r, x) {
        data = r;
        xhr = x;
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof GeoserveNearbyPlacesView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(GeoserveNearbyPlacesView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('onSuccess', function () {
    var placesView;

    before(function () {
      placesView = GeoserveNearbyPlacesView();
    });

    it('should create a list', function () {
      placesView.onSuccess(data, xhr);

      /* jshint -W030 */
      expect(placesView.el.querySelector('ul')).to.not.be.null;
      /* jshint +W030 */
    });

    it('should return 5 locations', function () {
      /* jshint -W030 */
      expect(data.event.features.length).to.equal(5);
      /* jshint +W030 */
    });

    it('should contain direction, distance, name, admin1_name,' +
        ' and, country_name', function () {
      /* jshint -W030 */
      expect(data.event.features[0].properties.direction).to.not.be.null;
      expect(data.event.features[0].properties.distance).to.not.be.null;
      expect(data.event.features[0].properties.name).to.not.be.null;
      expect(data.event.features[0].properties.admin1_name).to.not.be.null;
      expect(data.event.features[0].properties.country_name).to.not.be.null;
      /* jshint +W030 */
    });
  });
});
