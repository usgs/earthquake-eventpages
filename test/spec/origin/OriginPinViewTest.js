/* global before, chai, describe, it */
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
    var product;

    before(function (done) {
      Xhr.ajax({
        url: '/events/us10004u1y.json',
        success: function (data) {
          product = Product(data.properties.products['phase-data'][0]);
          done();
        },
        error: function () {
          done();
        }
      });
    });

    it('displays origin info content', function () {
      var view;

      view = OriginPinView({
        model: product,
        module: {ID: 'phase-data', TITLE: 'Origin'}
      });

      view.renderPinContent();

      expect(view.el.querySelectorAll('dl').length).to.equal(1);
      expect(view.el.querySelectorAll('dt').length).to.equal(4);
      expect(view.el.querySelectorAll('dd').length).to.equal(4);

      expect(view.el.querySelector('.origin-pin-review-status').innerHTML).
          to.equal('REVIEWED');
      expect(view.el.querySelector('.origin-pin-location').innerHTML).
          to.equal('86.908°S&nbsp;94.275°E');
      expect(view.el.querySelector('.origin-pin-depth').innerHTML).
          to.equal('24.0 km');
      expect(view.el.querySelector('.origin-pin-time').innerHTML).
          to.equal('<time datetime="2016-03-02T12:49:48.360Z">2016-03-02<br>12:49:48.360 (UTC)</time>');

      view.destroy();
    });
  });
});
