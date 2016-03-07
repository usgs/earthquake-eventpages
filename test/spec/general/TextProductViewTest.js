/* global chai, describe, it */
'use strict';


var Product = require('pdl/Product'),
    TextProductView = require('general/TextProductView');

var product = Product({
    code: 'code',
    contents: {
      '': {
        'contentType': 'text/plain',
        'length': 'some text'.length,
        'lastModified': 1234,
        'bytes': 'some text'
      }
    },
    id: 'id',
    indexid: 'indexid',
    indexTime: 1234,
    links: {
      'rel': ['uri1', 'uri2']
    },
    preferredWeight: 1,
    properties: {
      prop1: 'value1',
      prop2: 'value2'
    },
    source: 'source',
    status: Product.STATUS_UPDATE,
    type: 'type',
    updateTime: new Date().getTime()
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