/* global chai, describe, it */
'use strict';

var BeachBallView = require('moment-tensor/BeachBallView');


var expect = chai.expect;


describe('moment-tensor/BeachBallView', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof BeachBallView).to.equal('function');
    });
  });

  describe('projectX', function () {
    it('uses radius and x0', function () {
      var view;

      view = BeachBallView({
        radius: 123,
        x0: 456
      });

      expect(view.projectX(789)).to.equal(456 + 123 * 789);
    });
  });

  describe('projectY', function () {
    it('uses height, radius, and y0', function () {
      var view;

      view = BeachBallView({
        height: 123,
        radius: 456,
        y0: 789
      });

      expect(view.projectY(101)).to.equal(123 - (789 + 456 * 101));
    });
  });

});
