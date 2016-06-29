/* global before, chai, describe, it */
'use strict';


var ExecutiveSummaryModule = require('general/ExecutiveSummaryModule'),
    Xhr = require('util/Xhr');


var expect;

expect = chai.expect;


describe('general/ExecutiveSummaryModule', function () {
  var EVENT_DATA;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        EVENT_DATA = data;
        done();
      },
      error: function () {
        done(new Error('Failed to fetch event data for testing...'));
      }
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ExecutiveSummaryModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ExecutiveSummaryModule).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var module;

      module = ExecutiveSummaryModule();
      expect(module.destroy).to.not.throw(Error);

      module.destroy(); // Catches double-destroy problems
    });
  });
});
