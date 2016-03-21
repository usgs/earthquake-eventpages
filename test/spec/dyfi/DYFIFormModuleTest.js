/* global chai, describe, it, sinon */
'use strict';


var DYFIFormModule = require('dyfi/DYFIFormModule'),
    Events = require('util/Events');


var expect = chai.expect;


describe('dyfi/DYFIFormModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof DYFIFormModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(DYFIFormModule).to.not.throw(Error);
    });
  });

  describe('onCancel', function () {
    it('triggers a back event', function () {
      var module,
          spy;

      module = DYFIFormModule();
      spy = sinon.spy();
      Events.on('back', spy);

      module.onCancel();

      expect(spy.callCount).to.equal(1);
      module.destroy();
    });
  });

  describe('onSubmit', function () {
    it('TODO :: Write test...', function () {
      // TODO
    });
  });

  describe('render', function () {
    it('TODO :: Write test...', function () {
      // TODO
    });
  });

  describe('showForm', function () {
    it('TODO :: Write test...', function () {
      // TODO
    });
  });
});
