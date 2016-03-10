/* global chai, describe, it, sinon */
'use strict';

var EventPage = require('core/EventPage');

var expect = chai.expect;


describe('core/EventPage', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof EventPage).to.equal('function');
    });
  });

  describe('isScenarioMode', function () {
    it('returns true when in scenario mode', function () {
      var eventPage;
      eventPage = EventPage({
        config: {
          scenarioMode: true
        }
      });
      expect(eventPage.isScenarioMode()).to.equal(true);
    });

    it('returns false otherwise', function () {
      var eventPage;
      eventPage = EventPage();

      expect(eventPage.isScenarioMode()).to.equal(false);
    });
  });

  describe('moduleHasContent', function () {

    it('calls module hasContent method when defined', function () {
      var eventPage,
          module;

      eventPage = EventPage();
      module = {
        hasContent: sinon.stub().returns(true)
      };
      eventPage.moduleHasContent(module);
      expect(module.hasContent.calledOnce).to.equal(true);
    });

    it('checks module TYPES array', function () {
      var eventPage,
          module;

      eventPage = EventPage();
      module = {
        TYPES: ['abc', 'def']
      };

      expect(eventPage.moduleHasContent(module, ['abc'])).to.equal(true);
      expect(eventPage.moduleHasContent(module, ['def'])).to.equal(true);
      expect(eventPage.moduleHasContent(module, ['abc-scenario'])).to.equal(false);
    });

    it('adds scenario suffix when event is in scenario mode', function () {
      var eventPage,
          module;

      eventPage = EventPage({
        config: {
          scenarioMode: true
        }
      });
      module = {
        TYPES: ['abc', 'def']
      };

      expect(eventPage.moduleHasContent(module, ['abc-scenario'])).to.equal(true);
      expect(eventPage.moduleHasContent(module, ['def-scenario'])).to.equal(true);
      expect(eventPage.moduleHasContent(module, ['abc'])).to.equal(false);
    });
  });

});
