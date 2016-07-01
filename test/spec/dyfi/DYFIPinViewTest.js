/* global before, chai, describe, it */
'use strict';

var DYFIPinView = require('dyfi/DYFIPinView'),
    Product = require('pdl/Product');

var expect = chai.expect;

describe('dyfi/DYFIPinView', function () {
  var product;

  before(function () {
    product = Product({
      code: 'us10004u1y',
      contents: {
        'us10004u1y_ciim.jpg': {
          url: '/products/dyfi/us10004u1y/us/1457013501095/us10004u1y_ciim.jpg'
        }
      },
      properties: {
        maxmmi: '3.1',
      },
      source: 'us',
      status: 'UPDATE',
      type: 'dyfi'
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof DYFIPinView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DYFIPinView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderPinContent', function () {
    it('renders into the proper container', function () {
      var view;

      view = DYFIPinView({
        el: document.createElement('div'),
        model: product
      });
      view.renderPinContent();

      expect(view.content.innerHTML).to.not.equal('');
      expect(view.content.querySelectorAll('img').length).to.equal(1);
    });
  });

});



