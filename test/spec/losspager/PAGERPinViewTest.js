/* global  before, chai, describe, it */
'use strict';

var PAGERPinView = require('losspager/PAGERPinView'),
    Product = require('pdl/Product');

var expect = chai.expect;

describe('losspager/PAGERPinView', function () {
  var product;

  before(function () {
    var stub;

    stub = '/products/losspager/us10004u1y/us/1456938181480';

    product = Product({
      contents: {
        'pager.xml': {url: stub + '/pager.xml'},
        'exposure.png': {url: stub + '/exposure.png'},
        'alertecon.pdf': {url: stub + '/alertecon.pdf'},
        'alertecon_smaller.png': {url: stub + '/alertecon_smaller.png'},
        'alertfatal.pdf': {url: stub + '/alertfatal.pdf'},
        'alertfatal_smaller.png': {url: stub + '/alertfatal_smaller.png'}
      },
      properties: {
        maxmmi: 7.0,
      },
      source: 'us',
      status: 'UPDATE',
      type: 'losspager'
    });

  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof PAGERPinView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(PAGERPinView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderPinContent', function () {
    it('renders Pager content in the pin', function () {
      var el,
          view;

      view = PAGERPinView({
        el: document.createElement('div'),
        model: product,
        module: {'ID': 'pager', 'title': 'Pager'}
      });

      el = view.content;

      expect(el.innerHTML).to.be.equal('');

      view.renderPinContent();

      expect(el.innerHTML).to.not.be.equal('');
    });
  });

});
