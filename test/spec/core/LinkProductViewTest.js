/* global chai, describe, it */
'use strict';

var LinkProductView = require('core/LinkProductView'),
    Product = require('pdl/Product');


var expect = chai.expect;


describe('core/LinkProductView', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof LinkProductView).to.equal('function');
    });
  });

  describe('render', function () {
    it('adds class based on product type', function () {
      var product,
          view;

      product = Product({
        type: 'test-type'
      });
      view = LinkProductView({
        model: product
      });
      view.render();
      expect(view.el.firstChild.classList.contains('test-type')).to.equal(true);
    });

    it('uses anchor when url property set', function () {
      var product,
          view;

      product = Product({
        type: 'test-type',
        properties: {
          'url': 'testurl'
        }
      });
      view = LinkProductView({
        model: product
      });
      view.render();
      expect(view.el.firstChild.nodeName).to.equal('A');
      expect(view.el.firstChild.getAttribute('href')).to.equal('testurl');
    });

    it('uses span when url property not set', function () {
      var product,
          view;

      product = Product({
        type: 'test-type',
        properties: {
          'text': 'test text'
        }
      });
      view = LinkProductView({
        model: product
      });
      view.render();
      expect(view.el.firstChild.nodeName).to.not.equal('A');
    });

    it('uses text property for element content', function () {
      var product,
          view;

      product = Product({
        type: 'test-type',
        properties: {
          'text': 'test text'
        }
      });
      view = LinkProductView({
        model: product
      });
      view.render();
      expect(view.el.firstChild.nodeName).to.equal('SPAN');
      expect(view.el.firstChild.innerHTML).to.equal('test text');
    });

  });
});
