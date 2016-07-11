/* global before, chai, describe, it */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    RegionalInfoPinView = require('general/RegionalInfoPinView'),
    Model = require('mvc/Model'),
    Xhr = require('util/Xhr');

var _data,
    expect = chai.expect;

describe('general/RegionalInfoPinView', function () {
  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y_orig.json',
      success: function (data) {
        _data = data;
        done();
      },
      error: function () {
        _data = {};
        done();
      }
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof RegionalInfoPinView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(RegionalInfoPinView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderPinContent', function () {
    it('renders Regional Map content in the pin', function () {
      var el,
          view;

      view = RegionalInfoPinView({
        el: document.createElement('div'),
        model: Model({
          'event': CatalogEvent(_data),
          'config': {}
        })
      });

      el = view.content;

      /* jshint -W030 */
      expect(el.innerHTML).to.not.be.null;
      /* jshint +W030 */
    });
  });
});
