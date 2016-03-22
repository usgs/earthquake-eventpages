/* global before, beforeEach, chai, describe, it, sinon */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    FiniteFaultModule = require('finitefault/FiniteFaultModule'),
    Model = require('mvc/Model'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('finitefault/FiniteFaultModule', function () {
  var eventModel;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (details) {
        eventModel = Model({
          'event': CatalogEvent(details),
          'config': {}
        });
        done();
      },
      error: function () {
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof FiniteFaultModule).to.equal('function');
    });
  });

  describe('render', function () {
    var module;

    beforeEach(function () {
      module = FiniteFaultModule({
        el: document.createElement('div'),
        model: eventModel
      });
    });

    it('adds the header title', function () {
      var header;
      module.render();

      header = module.header.querySelector('h3');
      /* jshint -W030 */
      expect(header).to.not.be.null;
      /* jshint +W030 */
      expect(header.innerHTML).to.equal('Finite Fault');
    });

    it('includes the default module header', function () {
      var spy;

      spy = sinon.spy(module, 'getProductHeader');
      module.render();

      expect(spy.callCount).to.equal(1);
      spy.restore();
    });

    it('includes basic footer', function () {
      var footer;

      module.render();
      footer = module.footer;

      /* jshint -W030 */
      expect(footer).to.not.be.null;
      /* jshint +W030 */
      expect(module.el.lastElementChild).to.equal(footer);
    });
  });

});