/* global chai, describe, it */
'use strict';


var Product = require('pdl/Product'),
    TextProductView = require('general/TextProductView');

var product = Product({
    contents: {
      '': {
        'contentType': 'text/plain',
        'length': 'some text'.length,
        'lastModified': 1234,
        'bytes': 'some text'
      }
    }
  });

var expect = chai.expect;


describe('general/TextProductView', function () {

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof TextProductView).to.equal('function');
    });
  });

  describe('render', function () {

    // create text product view
    var textProductView = TextProductView({
      el: document.createElement('div'),
      model: product
    });

    textProductView.render();

    it('displays bytes for text like product', function () {
      expect(textProductView.el.innerHTML).to.equal('some text');
    });

  });
});