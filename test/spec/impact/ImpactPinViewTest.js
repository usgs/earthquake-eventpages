/* global before, chai, describe, it */
'use strict';


var //CatalogEvent = require('pdl/CatalogEvent'),
    ImpactPinView = require('impact/ImpactPinView'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


// var _createEvent = function (eventDetails) {
//   return CatalogEvent(JSON.parse(JSON.stringify(eventDetails)));
// };

describe('impact/ImpactPinView', function () {
  var EVENT_DETAILS;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        EVENT_DETAILS = data;
        done();
      },
      error: function () {
        done(new Error('Failed to load event data'));
      }
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof ImpactPinView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(ImpactPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = ImpactPinView();

      expect(view.destroy).to.not.throw(Error);

      view.destroy();
    });
  });
});
