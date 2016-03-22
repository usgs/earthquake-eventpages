/* global afterEach, before, beforeEach, chai, describe, it */
'use strict';


var OriginView = require('origin/OriginView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var expect = chai.expect;


describe('origin/OriginView', function () {
  var product;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        product = Product(data.properties.products.origin[0]);
        done();
      },
      error: function () {
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof OriginView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(OriginView).to.not.throw(Error);
    });
  });

  describe('formats output', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {

      view = OriginView({
        model: product
      });
    });

    it('displays the catalog details', function () {
      var name;

      name = view.getCatalogDetail(product.get());

      expect(name).to.equal('US <small>(us10004u1y)</small>');
    });

    it('displays the origin details', function () {
      var el,
          rows;

      el = document.createElement('div');
      el.innerHTML = view.getOriginDetailTable(product.get());
      rows = el.querySelectorAll('tr');

      expect(rows.count).to.not.equal(0);
    });
  });

});