/* global before, chai, describe, it */
'use strict';

var ShakeMapPinView = require('shakemap/ShakeMapPinView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('shakemap/ShakeMapPinView', function () {
  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof ShakeMapPinView).to.equal('function');
    });
  });

  describe('renderPinContent', function () {
    var product;

    before(function (done) {
      Xhr.ajax({
        url: '/events/us10004u1y.json',
        success: function (data) {
          product = Product(data.properties.products.shakemap[0]);
          done();
        },
        error: function () {
          done();
        }
      });
    });

    it('displays map content correctly', function () {
      var view;

      view = ShakeMapPinView({
        model: product
      });

      view.renderPinContent();
      expect(view.el.querySelectorAll('.shakemap-tvmap > img').length).to.equal(1);

      view.destroy();
    });
  });
});
