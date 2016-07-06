/* global before, chai, describe, it */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    InteractiveMapPinView = require('map/InteractiveMapPinView'),
    Model = require('mvc/Model'),
    Xhr = require('util/Xhr');

var _data,
    expect = chai.expect;

describe('map/InteractiveMapPinView', function () {
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
      expect(typeof InteractiveMapPinView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(InteractiveMapPinView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderPinContent', function () {
    it('renders Interactive Map content in the pin', function () {
      var el,
          view;

      view = InteractiveMapPinView({
        el: document.createElement('div'),
        model: Model({
          'event': CatalogEvent(_data),
          'config': {}
        })
      });

      el = view.content;

      expect(el.innerHTML).to.contain('interactive-map-view');
    });
  });
});
