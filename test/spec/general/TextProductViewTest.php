/* global chai, describe, it */
'use strict';


var Content = require('pdl/Content');

var expect = chai.expect;


describe('pdl/Content', function () {

  describe('constructor', function () {

    it('is defined', function () {
      expect(typeof Content).to.equal('function');
    });

  });
});