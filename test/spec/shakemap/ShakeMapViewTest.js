/* global chai, describe, it */
'use strict';

var Product = require('pdl/Product'),
    ShakeMapView = require('shakemap/ShakeMapView');

var expect = chai.expect;

var shakemap = {
      source: 'us',
      code: 'usc000myqq',
      status: 'UPDATE',
      properties: {},
      contents: {
        'download/intensity.jpg': {url: 'intensity.jpg'},
        'download/pga.jpg': {url: 'pga.jpg'},
        'download/pgv.jpg': {url: 'pgv.jpg'},
        'download/psa03.jpg': {url: 'psa03.jpg'},
        'download/psa10.jpg': {url: 'psa10.jpg'},
        'download/psa30.jpg': {url: 'psa30.jpg'},
        'download/sd.jpg': {url: 'sd.jpg'},
        'download/stationlist.json': {url:'stationlist.json'},
      }
    };

describe('shakemap/ShakeMapView', function () {

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof ShakeMapView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(ShakeMapView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('Tabbed Content', function () {
    it('contains all images and station list', function () {
      var shakeMapView,
          tablistPanels;

      shakeMapView = ShakeMapView({
        el: document.createElement('div'),
        model: Product(shakemap)
      });

      shakeMapView.render();
      tablistPanels = shakeMapView.el.querySelectorAll('.tablist-panel');

      expect(tablistPanels.length).to.be.equal(6);
    });
  });

});