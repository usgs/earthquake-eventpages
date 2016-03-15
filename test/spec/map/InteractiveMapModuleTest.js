/* global chai, describe, it */
'use strict';


var InteractiveMapModule = require('map/InteractiveMapModule');


var expect = chai.expect;


describe('map/InteractiveMapModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof InteractiveMapModule).to.equal('function');
    });
  });
});
