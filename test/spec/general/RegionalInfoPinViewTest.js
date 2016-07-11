/* global before, chai, describe, it */
'use strict';

var RegionalInfoPinView = require('general/RegionalInfoPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var product,
    expect = chai.expect;

describe('general/RegionalInfoPinView', function () {
  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y_orig.json',
      success: function (data) {
        product = Product(data.properties.products['phase-data'][0]);
        done();
      },
      error: function () {
        product = {};
        done();
      }
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof RegionalInfoPinView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(RegionalInfoPinView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderPinContent', function () {
    it('renders Regional Map content in the pin', function () {
      var el,
          view,
          mapEl;

      view = RegionalInfoPinView({
        el: document.createElement('div'),
        model: product
      });

      el = view.content;
      mapEl = el.querySelector('.regional-info-map');
      view.render();

      expect(mapEl.innerHTML).to.not.equal('');
    });
  });
});
