/* global chai, describe, it */
'use strict';


var PhasesView = require('origin/PhasesView');


var expect = chai.expect;


describe('origin/PhasesView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof PhasesView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(PhasesView).to.not.throw(Error);
    });
  });

  describe('destroy', function () {
    it('can be destroyed', function () {
      var view;

      view = PhasesView();
      expect(view.destroy).to.not.throw(Error);
    });
  });

  describe('getPreferredOrigin', function () {
    it('returns expected object', function () {
      var origins,
          preferred,
          view;

      view = PhasesView();

      origins = [
        {id: 1, isPreferred: false},
        {id: 2, isPreferred: true},
        {id: 3, isPreferred: false}
      ];

      preferred = view.getPreferredOrigin(origins);
      expect(preferred.id).to.equal(2);

      view.destroy();
    });
  });

  describe('renderNoPreferred', function () {
    it('creates an error message', function () {
      var el,
          view;

      el = document.createElement('div');
      view = PhasesView();

      view.renderNoPreferred(el);

      /* jshint -W030 */
      expect(el.querySelector('.error')).to.not.be.null;
      /* jshint +W030 */

      view.destroy();
    });
  });

  describe('renderPreferred', function () {
    it('creates a table', function () {
      var el,
          view;

      el = document.createElement('div');
      view = PhasesView();

      view.renderPreferred({arrivals: []}, el);
      /* jshint -W030 */
      expect(el.querySelector('.datatable-data')).to.not.be.null;
      /* jshint +W030 */

      view.destroy();
    });
  });

  describe('renderQuakeml', function () {
    it('creates the scaffolding', function () {
      var view;

      view = PhasesView();
      view.renderQuakeml();

      /* jshint -W030 */
      expect(view.el.querySelector('.hypocenter-phase')).to.not.be.null;
      expect(view.el.querySelector('.datatable')).to.not.be.null;
      /* jshint +W030 */
    });
  });
});
