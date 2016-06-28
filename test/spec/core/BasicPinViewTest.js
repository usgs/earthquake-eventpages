/* global chai, describe, it, sinon */
'use strict';


var Attribution = require('core/Attribution'),
    BasicPinView = require('core/BasicPinView');


var expect;

expect = chai.expect;


describe('core/BasicPinView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof BasicPinView).to.equal('function');
    });

    it('can be initialized', function () {
      expect(BasicPinView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = BasicPinView();

      expect(view.destroy).to.not.throw(Error);

      view.destroy(); // Catches double-destroy bug
    });
  });

  describe('render', function () {
    it('calls sub-render methods', function () {
      var view;

      view = BasicPinView();

      sinon.spy(view, 'renderPinHeader');
      sinon.spy(view, 'renderPinContent');
      sinon.spy(view, 'renderPinFooter');

      view.render();

      expect(view.renderPinHeader.callCount).to.equal(1);
      expect(view.renderPinContent.callCount).to.equal(1);
      expect(view.renderPinFooter.callCount).to.equal(1);

      view.renderPinHeader.restore();
      view.renderPinContent.restore();
      view.renderPinFooter.restore();

      view.destroy();
    });
  });

  describe('renderPinContent', function () {
    it('renders into the proper container', function () {
      var view;

      view = BasicPinView();

      view.renderPinContent();
      expect(view.content.innerHTML).to.not.equal('');

      view.destroy();
    });
  });

  describe('renderPinFooter', function () {
    it('renders into the proper container', function () {
      var view;

      view = BasicPinView();
      sinon.spy(Attribution, 'getProductAttribution');

      view.renderPinFooter();
      expect(view.footer.innerHTML).to.not.equal('');
      expect(Attribution.getProductAttribution.callCount).to.equal(1);

      Attribution.getProductAttribution.restore();
      view.destroy();
    });
  });

  describe('renderPinHeader', function () {
    it('renders into the proper container', function () {
      var view;

      view = BasicPinView();

      view.renderPinHeader();
      expect(view.header.innerHTML).to.not.equal('');

      view.destroy();
    });
  });
});
