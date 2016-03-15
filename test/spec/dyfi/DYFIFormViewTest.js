/* global before, chai, describe, it */
'use strict';

var DYFIFormView = require('dyfi/DYFIFormView'),
    Xhr = require('util/Xhr');


var expect = chai.expect;
  var data,
      xhr;

  before(function (done) {
    Xhr.ajax({
      url: '/products/dyfi/en.json',
      success: function (r, x) {
        data = r;
        xhr = x;
        done();
      }
    });
  });

describe('dyfi/DYFIFormView', function () {

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof DYFIFormView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DYFIFormView).to.not.be.null;
      /* jshint +W030 */
    });
  });

});
