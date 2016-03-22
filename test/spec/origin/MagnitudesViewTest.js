/* global chai, describe, it */
'use strict';


var MagnitudesView = require('origin/MagnitudesView');


var expect = chai.expect;


describe('origin/MagnitudesView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof MagnitudesView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(MagnitudesView).to.not.throw(Error);
    });
  });

  describe('destroy', function () {
    it('can be destroyed', function () {
      var view;

      view = MagnitudesView();
      expect(view.destroy).to.not.throw(Error);
    });
  });

  describe('getStationTableHeaderRow', function () {
    it('should produce the correct headers', function () {
      var result,
          view;

      view = MagnitudesView();
      result = document.createElement('thead');

      result.innerHTML = view.getStationTableHeaderRow();
      expect(result.querySelectorAll('th').length).to.equal(7);

      view.destroy();
    });
  });

  describe('getStationTableRow', function () {
    it('should produce the correct markup', function () {
      var info,
          result,
          view;

      view = MagnitudesView();
      result = document.createElement('tbody');
      info = {
        stationMagnitude: {
          amplitude: {
            evaluationMode: 'evaluationMode',
            genericAmplitude: {
              value: 'amplitude'
            },
            period: {
              value: 'period'
            },
            unit: 'unit'
          },
          mag: {
            value: 'magnitude'
          },
          type: 'type',
          waveformID: {
            networkCode: 'networkCode',
            stationCode: 'stationCode',
            channelCode: 'channelCode',
            locationCode: 'locationCode'
          }
        },
        weight: 'weight'
      };

      result.innerHTML = view.getStationTableRow(info);

      expect(result.querySelectorAll('th').length).to.equal(1);
      expect(result.querySelectorAll('td').length).to.equal(6);

      expect(result.querySelector('th').innerHTML).to.equal(
          'networkCode stationCode channelCode locationCode');
      expect(result.querySelector('.type').innerHTML).to.equal(
          'type');
      expect(result.querySelector('.amplitude').innerHTML).to.equal(
          'amplitude&nbsp;unit');
      expect(result.querySelector('.period').innerHTML).to.equal(
          'period s');
      expect(result.querySelector('.status').innerHTML).to.equal(
          'evaluationMode');
      expect(result.querySelector('.magnitude').innerHTML).to.equal(
          'magnitude');
      expect(result.querySelector('.weight').innerHTML).to.equal(
          'weight');

      view.destroy();
    });
  });
});
