/* global after, before, chai, describe, it, sinon */
'use strict';

var MomentTensorView = require('moment-tensor/MomentTensorView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var expect = chai.expect;

describe('moment-tensor/MomentTensorView', function () {
  var product;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        product = Product(data.properties.products['moment-tensor'][0]);
        done();
      },
      error: done
    });
  });

  after(function () {
    product.destroy();
    product = null;
  });


  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof MomentTensorView).to.equal('function');
    });
  });

  describe('render', function () {
    it('calls methods for subclassability', function () {
      var view;

      view = MomentTensorView({
        model: product
      });
      sinon.spy(view, 'getTitle');
      sinon.spy(view, 'getInfo');
      sinon.spy(view, 'getPlanes');
      sinon.spy(view, 'getAxes');

      view.render();
      expect(view.getTitle.calledOnce).to.equal(true);
      expect(view.getInfo.calledOnce).to.equal(true);
      expect(view.getPlanes.calledOnce).to.equal(true);
      expect(view.getAxes.calledOnce).to.equal(true);

      view.getTitle.restore();
      view.getInfo.restore();
      view.getPlanes.restore();
      view.getAxes.restore();
      view.destroy();
    });
  });

});
