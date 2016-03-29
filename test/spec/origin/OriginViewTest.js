/* global afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';


var OriginView = require('origin/OriginView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');

var expect = chai.expect;


describe('origin/OriginView', function () {
  var geoserve,
      origin;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        origin = Product(data.properties.products['phase-data'][0]);
        geoserve = Product(data.properties.products.geoserve[0]);
        done();
      },
      error: function () {
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof OriginView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(OriginView).to.not.throw(Error);
    });
  });

  describe('destroy', function () {
    it('can be destroyed', function () {
      var view;

      view = OriginView();
      expect(view.destroy).to.not.throw(Error);
    });
  });


  describe('formats output', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = OriginView({
        model: origin,
        geoserve: geoserve
      });
    });

    it('displays the catalog details', function () {
      var name;

      name = view.getCatalogDetail(origin);

      expect(name).to.equal('US <small>(us10004u1y)</small>');
    });

    it('displays the origin details', function () {
      var el,
          rows;

      el = document.createElement('div');
      el.innerHTML = view.getOriginDetailTable(origin);
      rows = el.querySelectorAll('tr');

      expect(rows.count).to.not.equal(0);
    });
  });

  describe('formatFeRegion', function () {
    var view = null,
        ajaxStub = null;

    beforeEach(function () {
      ajaxStub = sinon.stub(Xhr, 'ajax', function () {});
      view = OriginView({
        model: origin,
        geoserve: geoserve
      });
      view.render();
    });

    afterEach(function () {
      ajaxStub.restore();
      ajaxStub = null;

      if (view.destroy) {
        view.destroy();
      }
      view = null;
    });

    it('Properly formats string info', function () {
      view.formatFeRegion({longName: 'FOO', number: '1'});
      expect(view.el.querySelector('.fe-info').innerHTML).to.equal('FOO (1)');
    });

    it('Uses default string on error', function () {
      var el = document.createElement('span');
      el.innerHTML = '&ndash;';
      view.formatFeRegion({'default': 'string'});
      expect(view.el.querySelector('.fe-info').innerHTML).to.equal(el.innerHTML);
    });

  });

});