/* global before, chai, describe, it */
'use strict';


var Attribution = require('core/Attribution'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('core/Attribution', function () {
  var eventDetails;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (response) {
        eventDetails = response;
        done();
      },
      error: function () {
        done();
      }
    });
  });


  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof Attribution).to.equal('object');
    });
  });

  describe('getProductAttribution', function () {
    it('gets basic attribution', function () {
      var product,
          result;

      result = document.createElement('small');

      // No special handling for a lossPAGER
      product = Product(eventDetails.properties.products.losspager[0]);

      result.innerHTML = Attribution.getProductAttribution(product);

      expect(result.childNodes.length).to.equal(1);
    });

    it('adds on origin-source if different', function () {
      var product,
          result;

      result = document.createElement('small');

      // First make sure it skips if the same
      product = Product(eventDetails.properties.products.origin[0]);
      product.setProperty({'origin-source': product.get('source')});
      product.setProperty({'magnitude-source': product.get('source')});
      product.setProperty({'beachball-source': product.get('source')});

      result.innerHTML = Attribution.getProductAttribution(product);
      expect(result.childNodes.length).to.equal(1);

      // Now make sure it adds if different
      product.setProperty({'origin-source': 'nc'});
      result.innerHTML = Attribution.getProductAttribution(product);
      expect(result.childNodes.length).to.equal(2);
    });

    it('adds magnitude-source if different', function () {
      var product,
          result;

      result = document.createElement('small');

      // First make sure it skips if the same
      product = Product(eventDetails.properties.products.origin[0]);
      product.setProperty({'origin-source': product.get('source')});
      product.setProperty({'magnitude-source': product.get('source')});
      product.setProperty({'beachball-source': product.get('source')});

      result.innerHTML = Attribution.getProductAttribution(product);
      expect(result.childNodes.length).to.equal(1);

      // Now make sure it adds if different
      product.setProperty({'magnitude-source': 'nc'});
      result.innerHTML = Attribution.getProductAttribution(product);
      expect(result.childNodes.length).to.equal(2);
    });

    it('adds beachball-source if different', function () {
      var product,
          result;

      result = document.createElement('small');

      // First make sure it skips if the same
      product = Product(eventDetails.properties.products['moment-tensor'][0]);
      product.setProperty({'origin-source': product.get('source')});
      product.setProperty({'magnitude-source': product.get('source')});
      product.setProperty({'beachball-source': product.get('source')});

      result.innerHTML = Attribution.getProductAttribution(product);
      expect(result.childNodes.length).to.equal(1);

      // Now make sure it adds if different
      product.setProperty({'beachball-source': 'nc'});
      result.innerHTML = Attribution.getProductAttribution(product);
      expect(result.childNodes.length).to.equal(2);
    });
  });
});
