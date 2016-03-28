/* global after, before, chai, describe, it */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    GeneralSummaryModule = require('general/GeneralSummaryModule'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('general/GeneralSummaryModule', function () {
  var us10004u1y;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        us10004u1y = CatalogEvent(data);
        done();
      },
      error: function () {
        done(false);
      }
    });
  });

  after(function () {
    us10004u1y = null;
  });


  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof GeneralSummaryModule).to.equal('function');
    });
  });

});
