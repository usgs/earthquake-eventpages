/* global chai, describe, it, sinon */
'use strict';

var AccordionView = require('core/AccordionView');


var expect = chai.expect;


describe('core/AccordionView', function () {

  describe('constructor', function () {
    it('is a function', function () {
      expect(typeof AccordionView).to.equal('function');
    });

    it('sets model options', function () {
      var view;

      view = AccordionView({
        classes: 'test classes',
        destroyView: 'test destroy view',
        expanded: 'test expanded',
        toggleElement: 'test element',
        toggleText: 'test text',
        view: 'test view'
      });

      expect(view.model.get('classes')).to.equal('test classes');
      expect(view.model.get('destroyView')).to.equal('test destroy view');
      expect(view.model.get('expanded')).to.equal('test expanded');
      expect(view.model.get('toggleElement')).to.equal('test element');
      expect(view.model.get('toggleText')).to.equal('test text');
      expect(view.model.get('view')).to.equal('test view');
    });
  });


  describe('destroyView option', function () {
    it('destroys view when set', function () {
      var accordionView,
          view;

      view = {
        destroy: sinon.spy()
      };
      accordionView = AccordionView({
        destroyView: true,
        view: view
      });
      accordionView.destroy();
      expect(view.destroy.calledOnce).to.equal(true);
    });

    it('does not destroy view when not set', function () {
      var accordionView,
          view;

      view = {
        destroy: sinon.spy()
      };
      accordionView = AccordionView({
        destroyView: false,
        view: view
      });
      accordionView.destroy();
      expect(view.destroy.calledOnce).to.equal(false);
    });
  });

  describe('expanded option', function () {
    it('calls view render when set', function () {
      var accordionView,
          view;

      view = {
        el: document.createElement('div'),
        render: sinon.spy()
      };
      accordionView = AccordionView({
        expanded: true,
        view: view
      });
      accordionView.render();
      expect(view.render.calledOnce).to.equal(true);
    });

    it('waits for click when not set', function () {
      var accordionView,
          view;

      view = {
        el: document.createElement('div'),
        render: sinon.spy()
      };
      accordionView = AccordionView({
        expanded: false,
        view: view
      });
      accordionView.render();
      expect(view.render.calledOnce).to.equal(false);
      accordionView.onClick();
      expect(view.render.calledOnce).to.equal(true);
    });
  });

});
