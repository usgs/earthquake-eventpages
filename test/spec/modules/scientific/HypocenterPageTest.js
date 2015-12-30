/* global chai, sinon, describe, it, beforeEach, afterEach, before */
'use strict';

var HypocenterPage = require('scientific/HypocenterPage'),
    Quakeml = require('quakeml/Quakeml'),
    ScientificModule = require('scientific/ScientificModule'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr'),

    eventDetails = require('./usb000kqnc');

var basicOptions,
    detailOptions,
    detailPage,
    expect;


var _fireClickEvent = function (target) {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);
  target.dispatchEvent(clickEvent);
};

expect = chai.expect;

basicOptions = {
  eventDetails: eventDetails,
  module: new ScientificModule(),
  // source: 'us',
  productTypes: [
    'origin',
    'phase-data'
  ],
  title: 'Origin',
  hash: 'origin'
};

detailOptions = Util.extend({}, basicOptions, {code: 'us_usb000kqnc'});
detailPage = new HypocenterPage(detailOptions);

before( function (done) {
  Xhr.ajax({
    url: '/spec/modules/scientific/usc000njrq_phase-data.xml',
    success: function (xml) {
      // use quakeml parser to make xml into quakeml
      detailPage._quakeml = new Quakeml({xml: xml});
      done();
    },
    error: function () {
      done('failed to parse quakeml');
    }
  });
});


describe('HypocenterPage test suite.', function () {
  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(HypocenterPage).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      expect(detailPage).to.be.an.instanceof(HypocenterPage);
    });
  });

  describe('getContent()', function () {
    it('Loads phases when tab is clicked.', function () {
      // The phase element should be empty
      expect(detailPage._phaseEl.innerHTML).to.equal('');
      // select phase tab
      _fireClickEvent(
          detailPage._content.querySelector('nav :nth-child(2)'));
      expect(detailPage._phaseEl.innerHTML).to.not.equal('');
    });

    it('Loads magnitudes when tab is clicked.', function () {
      // The magnitude element should be empty
      expect(detailPage._magnitudeEl.innerHTML).to.equal('');
      // select magnitude tab
      _fireClickEvent(
          detailPage._content.querySelector('nav :nth-child(3)'));
      // The phase element should not be empty anymore
      expect(detailPage._magnitudeEl.innerHTML).to.not.equal('');
    });
  });

  describe('formatFeRegion', function () {
    var hp = null,
        ajaxStub = null;

    beforeEach(function () {
      ajaxStub = sinon.stub(Xhr, 'ajax', function () {});
      hp = new HypocenterPage(detailOptions);
    });

    afterEach(function () {
      ajaxStub.restore();
      ajaxStub = null;

      if (hp.destroy) {
        hp.destroy();
      }
      hp = null;
    });

    it('Properly formats string info', function () {
      hp.formatFeRegion({longName: 'FOO', number: '1'});
      expect(hp._content.querySelector('.fe-info').innerHTML).to.equal('FOO (1)');
    });

    it('Uses default string on error', function () {
      var el = document.createElement('span');
      el.innerHTML = '&ndash;';
      hp.formatFeRegion({'default': 'string'});
      expect(hp._content.querySelector('.fe-info').innerHTML).to.equal(el.innerHTML);
    });

  });
});
