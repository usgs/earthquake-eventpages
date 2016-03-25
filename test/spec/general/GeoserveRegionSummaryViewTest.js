/* global after, before, chai, describe, it, sinon */
'use strict';

var GeoserveRegionSummaryView = require('general/GeoserveRegionSummaryView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('general/GeoserveRegionSummaryView', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof GeoserveRegionSummaryView).to.equal('function');
    });
  });

  describe('fetchData', function () {
    var args;

    before(function () {
      sinon.stub(Xhr, 'ajax', function () {
        args = arguments;
      });
    });

    after(function () {
      Xhr.ajax.restore();
    });

    it('uses configured url and correct search parameters', function () {
      var view;

      view = GeoserveRegionSummaryView({
        url: 'testurl',
        model: Product({
          properties: {
            latitude: 1.23,
            longitude: 4.56
          }
        })
      });

      view.fetchData();
      expect(args[0].url).to.equal('testurl');
      expect(args[0].data).to.deep.equal({
        latitude: 1.23,
        longitude: 4.56,
        type: 'tectonic'
      });

      view.destroy();
    });
  });

  describe('onError', function () {
    it('shows alert if response is empty', function () {
      var view;

      view = GeoserveRegionSummaryView();
      view.onError();
      expect(view.el.firstChild.classList.contains('alert')).to.equal(true);
      expect(view.el.firstChild.classList.contains('error')).to.equal(true);
    });
  });

  describe('onSuccess', function () {
    it('uses summary from first feature', function () {
      var view;

      view = GeoserveRegionSummaryView();
      view.onSuccess({
        tectonic: {
          features: [
            {
              properties: {
                summary: 'test summary'
              }
            }
          ]
        }
      });
      expect(view.el.innerHTML).to.equal('test summary');
    });

    it('shows alert if response is empty', function () {
      var view;

      view = GeoserveRegionSummaryView();
      view.onSuccess({
        tectonic: {
          features: []
        }
      });
      expect(view.el.firstChild.classList.contains('alert')).to.equal(true);
      expect(view.el.firstChild.classList.contains('info')).to.equal(true);
    });
  });

});
