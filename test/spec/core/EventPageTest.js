/* global after, before, chai, describe, it, sinon */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    EventPage = require('core/EventPage'),
    Events = require('util/Events'),
    Xhr = require('util/Xhr');

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
          SCENARIO_MODE: true
        }
      });
      expect(eventPage.isScenarioMode()).to.equal(true);
      eventPage.destroy();
    });

    it('returns false otherwise', function () {
      var eventPage;
      eventPage = EventPage();

      expect(eventPage.isScenarioMode()).to.equal(false);
      eventPage.destroy();
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
      eventPage.destroy();
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
      eventPage.destroy();
    });

    it('adds scenario suffix when event is in scenario mode', function () {
      var eventPage,
          module;

      eventPage = EventPage({
        config: {
          SCENARIO_MODE: true
        }
      });
      module = {
        TYPES: ['abc', 'def']
      };

      expect(eventPage.moduleHasContent(module, ['abc-scenario'])).to.equal(true);
      expect(eventPage.moduleHasContent(module, ['def-scenario'])).to.equal(true);
      expect(eventPage.moduleHasContent(module, ['abc'])).to.equal(false);
      eventPage.destroy();
    });
  });

  describe('onBack', function () {
    var ev;

    before(function (done) {
      Xhr.ajax({
        url: '/events/us10004u1y.json',
        success: function (data) {
          ev = CatalogEvent(data);
          done();
        },
        error: function () {
          done(false);
        }
      });
    });

    after(function () {
      if (ev) {
        ev.destroy();
        ev = null;
      }

      window.location.hash = '';
    });

    it('is called when "back" event triggered', function () {
      var eventPage;

      eventPage = EventPage();
      sinon.stub(eventPage, 'onBack', function () {});
      Events.trigger('back');
      expect(eventPage.onBack.calledOnce).to.equal(true);
      eventPage.onBack.restore();
      eventPage.destroy();
    });

    it('loads default module when not hasPrevious', function () {
      var eventPage;

      // start event page on moment tensor module
      window.location.hash = '#moment-tensor';
      eventPage = EventPage({
        'event': ev
      });
      expect(window.location.hash).to.equal('#moment-tensor');
      // has previous should not be true yet
      Events.trigger('back');
      expect(window.location.hash).to.equal('#executive');
      eventPage.destroy();
    });
  });

  describe('renderHeader', function () {
    it('does not modify existing content', function () {
      var after,
          before,
          page;

      page = EventPage();
      before = page.header.innerHTML;
      page.renderHeader();
      after = page.header.innerHTML;

      expect(after).to.equal(before);

      page.destroy();
    });
  });
});
