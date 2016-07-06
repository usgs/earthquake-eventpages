/* global chai, describe, it */
'use strict';

var OriginPinView = require('origin/OriginPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('origin/OriginPinView', function () {
  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof OriginPinView).to.equal('function');
    });
  });

  describe('renderPinContent', function () {
    var view;

    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        var product;

        product = Product(data.properties.products['phase-data'][0]);

        view = OriginPinView({
          model: product,
          module: {ID: 'phase-data', TITLE: 'Origin'}
        });
      },
      error: function (e) {
        console.log(e);
      }
    });

    it('displays magnitude content correctly', function () {
      view.renderPinContent();
      expect(view.el.querySelector('.origin-magnitude').innerHTML).
          to.equal('7.8');
    });

    it('displays reviewStatus content correctly', function () {
      view.renderPinContent();
      expect(view.el.querySelector('.origin-review-status').innerHTML).
          to.equal('REVIEWED');
    });
  });
});
