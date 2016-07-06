/* global chai, describe, it */
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
    var view;

    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        var product;

        product = Product(data.properties.products.shakemap[0]);

        view = ShakeMapPinView({
          model: product,
          module: {ID: 'shakemap', TITLE: 'ShakeMap'}
        });
      },
      error: function (e) {
        console.log(e);
      }
    });

    it('displays map content correctly', function () {
      view.renderPinContent();
      expect(view.el.querySelectorAll('.shakemap-tvmap > img').length).to.equal(1);
    });
  });
});
