/* global  before, chai, describe, it */
'use strict';

var PAGERPinView = require('losspager/PAGERPinView'),
    PagerXmlParser = require('losspager/PagerXmlParser'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var expect = chai.expect;

describe('losspager/PAGERView', function () {
  var pagerInfo,
      product,
      response,
      xhr;

  before(function (done) {
    var stub;

    stub = '/products/losspager/us10004u1y/us/1456938181480';

    product = Product({
      contents: {
        'pager.xml': {url: stub + '/pager.xml'},
        'exposure.png': {url: stub + '/exposure.png'},
        'alertecon.pdf': {url: stub + '/alertecon.pdf'},
        'alertecon.png': {url: stub + '/alertecon.png'},
        'alertfatal.pdf': {url: stub + '/alertfatal.pdf'},
        'alertfatal.png': {url: stub + '/alertfatal.png'}
      },
      properties: {
        maxmmi: 7.0,
      },
      source: 'us',
      status: 'UPDATE',
      type: 'losspager'
    });

    Xhr.ajax({
      url: '/products/losspager/us10004u1y/us/1456938181480/pager.xml',
      success: function (r, x) {
        pagerInfo = PagerXmlParser.parse(x.responseXML || r);

        response = r;
        xhr = x;

        done();
      },
      error: function () {
        done();
      }
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

});
