/* global chai, describe, it */
'use strict';


var InteractiveMapView = require('map/InteractiveMapView');


var expect = chai.expect;


describe('map/InteractiveMapView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof InteractiveMapView).to.equal('function');
    });
  });
});
