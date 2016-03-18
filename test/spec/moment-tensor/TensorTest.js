/* global before, chai, describe, it */
'use strict';


var Product = require('pdl/Product'),
    Tensor = require('moment-tensor/Tensor'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('moment-tensor/Tensor', function () {

  var momentTensorProduct,
      shakemapProduct;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        momentTensorProduct = Product(data.properties.products['moment-tensor'][0]);
        shakemapProduct = Product(data.properties.products.shakemap[0]);
        done();
      },
      error: function () {
        done(false);
      }
    });
  });

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof Tensor).to.equal('function');
    });
  });

  describe('fromProduct', function () {
    it('supports moment-tensor products', function () {
      var props,
          tensor;

      props = momentTensorProduct.get('properties');
      tensor = Tensor.fromProduct(momentTensorProduct);
      expect(tensor).to.not.equal(null);

      expect(tensor.mrr).to.equal(Number(props['tensor-mrr']));
      expect(tensor.mtt).to.equal(Number(props['tensor-mtt']));
      expect(tensor.mpp).to.equal(Number(props['tensor-mpp']));
      expect(tensor.mrt).to.equal(Number(props['tensor-mrt']));
      expect(tensor.mrp).to.equal(Number(props['tensor-mrp']));
      expect(tensor.mtp).to.equal(Number(props['tensor-mtp']));
    });

    it('returns null for unsupported products', function () {
      var tensor;

      tensor = Tensor.fromProduct(shakemapProduct);
      expect(tensor).to.equal(null);
    });
  });
});
