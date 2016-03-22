/* global chai, describe, it */
'use strict';

var ShakeMapInfoView = require('shakemap/ShakeMapInfoView');


var expect = chai.expect;


describe('shakemap/ShakeMapInfoView', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof ShakeMapInfoView).to.equal('function');
    });
  });

  describe('formatOutputGroundMotions', function () {
    var el,
        view;

    view = ShakeMapInfoView();
    el = document.createElement('div');
    el.innerHTML = view.formatOutputGroundMotions({
      'unknown': {
        bias: 4,
        max: 5,
        max_grid: 6,
        units: 'y'
      },
      'intensity': {
        bias: 1,
        max: 2,
        max_grid: 3,
        units: 'x'
      }
    });

    // uses expected heading for known ground motions,
    // and places known fields first
    expect(el.querySelector('tbody > tr > th').innerHTML).to.equal('Intensity');
    // displays unknown ground motions, after known
    expect(el.querySelector('tbody > tr + tr > th').innerHTML).to.equal(
        'unknown');
  });

  describe('formatProcessingGroundMotions', function () {
    var el,
        view;

    view = ShakeMapInfoView();
    el = document.createElement('div');
    el.innerHTML = view.formatProcessingGroundMotions({
      'unknown': {
        module: 'x',
        reference: 'y'
      },
      'directivity': {
        module: 'u',
        reference: 'v'
      }
    });

    // uses expected heading for known ground motions,
    // and places known fields first
    expect(el.querySelector('tbody > tr > th').innerHTML).to.equal(
        'Directivity');
    // displays unknown ground motions, after known
    expect(el.querySelector('tbody > tr + tr > th').innerHTML).to.equal(
        'unknown');

  });

});
