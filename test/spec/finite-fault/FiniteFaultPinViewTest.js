/* global before, chai, describe, it */
'use strict';


var FiniteFaultPinView = require('finite-fault/FiniteFaultPinView'),
    Product = require('pdl/Product'),
    Xhr = require('Util/Xhr');


var expect;

expect = chai.expect;


describe('finite-fault/FiniteFaultPinView', function () {
  var product;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        product = Product(data.properties.products['finite-fault'][0]);
        done();
      },
      error: function () {
        done();
      }
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof FiniteFaultPinView).to.equal('function');
    });

    it('can be initialized', function () {
      expect(FiniteFaultPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = FiniteFaultPinView();

      expect(view.destroy).to.not.throw(Error);

      view.destroy(); // Catches double-destroy bug
    });
  });

  describe('renderPinContent', function () {
    it('renders into the proper container', function () {
      var view;

      view = FiniteFaultPinView({
        el: document.createElement('div'),
        model: product
      });
      view.renderPinContent();

      expect(view.content.innerHTML).to.not.equal('');
      expect(view.content.querySelectorAll('img').length).to.equal(1);
    });
  });
});
