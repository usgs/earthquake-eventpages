/* global before, chai, describe, it, sinon */
'use strict';


var CatalogEvent = require('pdl/CatalogEvent'),
    DYFIModule = require('dyfi/DYFIModule'),
    Model = require('mvc/Model'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('dyfi/DYFIModule', function () {
  var _getEvent,
      eventDetails;

  _getEvent = function () {
    return CatalogEvent(JSON.parse(JSON.stringify(eventDetails)));
  };

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        eventDetails = data;
        done();
      },
      error: function () {
        done();
      }
    });
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof DYFIModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(DYFIModule).to.not.throw(Error);
    });
  });

  // Skipping until usgs/hazdev-svgimagemap#9 is resolved
  describe('render', function () {
    it('should call sub-methods', function () {
      var contentSpy,
          footerSpy,
          headerSpy,
          module;

      module = DYFIModule({
        model: Model({'event': _getEvent(), 'config': {}})
      });

      headerSpy = sinon.spy(module, 'renderHeader');
      contentSpy = sinon.spy(module, 'renderContent');
      footerSpy = sinon.spy(module, 'renderFooter');

      module.render();

      expect(headerSpy.callCount).to.equal(1);
      expect(contentSpy.callCount).to.equal(1);
      expect(footerSpy.callCount).to.equal(1);

      headerSpy.restore();
      contentSpy.restore();
      footerSpy.restore();
      module.destroy();
    });
  });

  // Skipping until usgs/hazdev-svgimagemap#9 is resolved
  describe('renderContent', function () {
    it('should create a view', function () {
      var module;

      module = DYFIModule({
        model: Model({'event': _getEvent(), 'config': {}})
      });

      module.renderContent();

      /* jshint -W030 */
      expect(module.content.classList.contains('dyfi-view')).to.be.true;
      /* jshint +W030 */

      module.destroy();
    });
  });

  // Skipping until usgs/hazdev-svgimagemap#9 is resolved
  describe('renderFooter', function () {
    it('should include downloads', function () {
      var module,
          spy;

      module = DYFIModule({
        model: Model({'event': _getEvent(), 'config': {}})
      });

      spy = sinon.spy(module, 'getProductFooter');

      module.renderFooter();

      expect(spy.callCount).to.equal(1);

      spy.restore();
      module.destroy();
    });
  });

  // Skipping until usgs/hazdev-svgimagemap#9 is resolved
  describe('renderHeader', function () {
    it('should include module header', function () {
      var module,
          spy;

      module = DYFIModule({
        model: Model({'event': _getEvent(), 'config': {}})
      });

      spy = sinon.spy(module, 'getProductHeader');

      module.renderHeader();

      expect(spy.callCount).to.equal(1);

      spy.restore();
      module.destroy();
    });
  });
});
