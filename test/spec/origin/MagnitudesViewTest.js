/* global afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';


var MagnitudesView = require('origin/MagnitudesView');


var expect = chai.expect;


describe('origin/MagnitudesView', function () {
  var contribution,
      magnitude;

  before(function () {
    contribution = {
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

    magnitude = {
      contributions: [contribution],
      creationInfo: {
        agencyID: 'agencyId'
      },
      mag: {
        value: 'value',
        uncertainty: 'uncertainty'
      },
      stationCount: 'stationCount',
      type: 'type'
    };
  });

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
      var result,
          view;

      view = MagnitudesView();
      result = document.createElement('tbody');

      result.innerHTML = view.getStationTableRow(contribution);

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

  describe('getContributionsMarkup', function () {
    var result,
        view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = MagnitudesView();
      result = document.createElement('div');
    });

    it('returns message when no contributors provided', function () {
      result.innerHTML = view.getContributionsMarkup();
      /* jshint -W030 */
      expect(result.querySelector('.alert')).to.not.be.null;
      /* jshint +W030 */

      result.innerHTML = view.getContributionsMarkup([]);
      /* jshint -W030 */
      expect(result.querySelector('.alert')).to.not.be.null;
      /* jshint +W030 */
    });

    it('returns markup for contributions', function () {
      result.innerHTML = view.getContributionsMarkup([contribution]);

      /* jshint -W030 */
      expect(result.querySelector('.horizontal-scrolling')).to.not.be.null;
      expect(result.querySelector('table')).to.not.be.null;
      /* jshint +W030 */
    });

    it('delegates each contribution to sub methods', function () {
      var headerSpy,
          contentSpy;

      headerSpy = sinon.spy(view, 'getStationTableHeaderRow');
      contentSpy = sinon.spy(view, 'getStationTableRow');

      view.getContributionsMarkup([contribution]);

      expect(headerSpy.callCount).to.equal(1);
      expect(contentSpy.callCount).to.equal(1);
      expect(contentSpy.calledWith(contribution)).to.equal(true);

      headerSpy.restore();
      contentSpy.restore();
    });
  });

  describe('getErrorMarkup', function () {
    it('returns expected markup', function () {
      var result,
          view;

      view = MagnitudesView();
      result = document.createElement('ul');

      result.innerHTML = view.getErrorMarkup('value');

      expect(result.querySelectorAll('span').length).to.equal(2);
      expect(result.querySelectorAll('abbr').length).to.equal(1);
      expect(result.querySelector('span > span').innerHTML).to.equal('value');

      view.destroy();
    });
  });

  describe('getMagnitudeMarkup', function () {
    var result,
        view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = MagnitudesView();
      result = document.createElement('div');
    });

    it('returns expected structure', function () {
      result.innerHTML = view.getMagnitudeMarkup(magnitude);

      expect(result.querySelectorAll('.magnitude-view-item').length)
          .to.equal(1);
      expect(result.querySelector('.magnitude-view-item > h3').innerHTML)
          .to.equal('type');
      expect(result.querySelectorAll('.magnitude-summary').length)
          .to.equal(1);
      expect(result.querySelectorAll('.accordion-toggle').length)
          .to.equal(1);
      expect(result.querySelectorAll('.accordion-content').length)
          .to.equal(1);
    });

    it('delegates to sub methods', function () {
      var contributionsSpy,
          errorSpy,
          sourceSpy,
          stationsSpy,
          valueSpy;

      contributionsSpy = sinon.spy(view, 'getContributionsMarkup');
      errorSpy = sinon.spy(view, 'getErrorMarkup');
      sourceSpy = sinon.spy(view, 'getSourceMarkup');
      stationsSpy = sinon.spy(view, 'getStationsMarkup');
      valueSpy = sinon.spy(view, 'getValueMarkup');

      view.getMagnitudeMarkup(magnitude);

      expect(contributionsSpy.callCount).to.equal(1);
      expect(errorSpy.callCount).to.equal(1);
      expect(sourceSpy.callCount).to.equal(1);
      expect(stationsSpy.callCount).to.equal(1);
      expect(valueSpy.callCount).to.equal(1);

      contributionsSpy.restore();
      errorSpy.restore();
      sourceSpy.restore();
      stationsSpy.restore();
      valueSpy.restore();
    });
  });

  describe('getMagnitudesMarkup', function () {
    it('loops over all magnitudes', function () {
      var stub,
          view;

      view = MagnitudesView();

      stub = sinon.stub(view, 'getMagnitudeMarkup', function () {
        return '';
      });

      view.getMagnitudesMarkup([1, 2, 3]);

      expect(stub.callCount).to.equal(3);
      expect(stub.calledWith(1)).to.equal(true);
      expect(stub.calledWith(2)).to.equal(true);
      expect(stub.calledWith(3)).to.equal(true);

      stub.restore();
      view.destroy();
    });
  });

  describe('getSourceMarkup', function () {
    it('returns expected markup', function () {
      var result,
          view;

      view = MagnitudesView();
      result = document.createElement('ul');

      result.innerHTML = view.getSourceMarkup('value');

      expect(result.querySelectorAll('span').length).to.equal(2);
      expect(result.querySelectorAll('abbr').length).to.equal(1);
      expect(result.querySelector('span > span').innerHTML).to.equal('VALUE');

      view.destroy();
    });
  });

  describe('getStationsMarkup', function () {
    it('returns expected markup', function () {
      var result,
          view;

      view = MagnitudesView();
      result = document.createElement('ul');

      result.innerHTML = view.getStationsMarkup('value');

      expect(result.querySelectorAll('span').length).to.equal(2);
      expect(result.querySelectorAll('abbr').length).to.equal(1);
      expect(result.querySelector('span > span').innerHTML).to.equal('value');

      view.destroy();
    });
  });

  describe('getValueMarkup', function () {
    it('returns expected markup', function () {
      var result,
          view;

      view = MagnitudesView();
      result = document.createElement('ul');

      result.innerHTML = view.getValueMarkup('value');

      expect(result.querySelectorAll('span').length).to.equal(2);
      expect(result.querySelectorAll('abbr').length).to.equal(1);
      expect(result.querySelector('span > span').innerHTML).to.equal(
          '<strong>value</strong>');

      view.destroy();
    });
  });
});
