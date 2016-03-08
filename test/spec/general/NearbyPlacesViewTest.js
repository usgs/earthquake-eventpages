/* global before, chai, describe, it */
'use strict';

var NearbyPlacesView = require('general/NearbyPlacesView'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('general/NearbyPlacesView', function () {
  var data,
      xhr;

  before(function (done) {
    Xhr.ajax({
      url: '/products/nearby-cities/us10004u1y/us/1456926111040/nearby-cities.json',
      success: function (r, x) {
        data = r;
        xhr = x;
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof NearbyPlacesView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(NearbyPlacesView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('onSuccess', function () {
    var placesView;

    before(function () {
      placesView = NearbyPlacesView();
    });

    it('should create a list', function () {
      placesView.onSuccess(data, xhr);

      /* jshint -W030 */
      expect(placesView.el.querySelector('ul')).to.not.be.null;
      /* jshint +W030 */
    });

    it('should return 5 locations', function () {
      /* jshint -W030 */
      expect(data.length).to.equal(5);
      /* jshint +W030 */
    });

    it('should contain direction, distance, latitude, longitude,' +
        ' name, and population', function () {
      /* jshint -W030 */
      expect(data[0].direction).to.not.be.null;
      expect(data[0].distance).to.not.be.null;
      expect(data[0].latitude).to.not.be.null;
      expect(data[0].longitude).to.not.be.null;
      expect(data[0].name).to.not.be.null;
      expect(data[0].population).to.not.be.null;
      /* jshint +W030 */
    });
  });
});
