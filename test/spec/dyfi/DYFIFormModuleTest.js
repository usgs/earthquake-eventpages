/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';


var DYFIFormModule = require('dyfi/DYFIFormModule'),
    Events = require('util/Events'),
    Xhr = require('util/Xhr');


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

  describe('destroy', function () {
    it('can be destroyed', function () {
      var module;

      module = DYFIFormModule();

      expect(module.destroy).to.not.throw(Error);
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

  describe('onContentClick', function () {
    var div,
        module,
        spy;

    afterEach(function () {
      module.destroy();
      spy.restore();
    });

    beforeEach(function () {
      div = document.createElement('div');
      module = DYFIFormModule();
      spy = sinon.spy(module, 'showForm');
    });


    it('calls the showForm method when it should', function () {
      div.classList.add('show-form');

      module.onContentClick({
        target: div
      });

      expect(spy.callCount).to.equal(1);
    });

    it('does nothing when it should not', function () {
      module.onContentClick({
        target: div
      });

      expect(spy.callCount).to.equal(0);
    });
  });

  describe('onSubmit', function () {
    it('submits the request', function () {
      var module,
          stub;

      module = DYFIFormModule();
      stub = sinon.stub(Xhr, 'ajax', function () {
        // do nothing
      });

      module.onSubmit();
      expect(stub.callCount).to.equal(1);

      stub.restore();
      module.destroy();
    });
  });

  describe('onSubmitError', function () {
    it('renders the error', function () {
      var e,
          message,
          module;

      module = DYFIFormModule();

      message = 'Some error!';
      module.onSubmitError(message);
      e = module.el.querySelector('.error');

      /* jshint -W030 */
      expect(e).to.not.be.null;
      /* jshint +W030 */

      expect(e.innerHTML).to.equal(message);

      module.destroy();
    });
  });

  describe('onSubmitSuccess', function () {
    var module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      module = DYFIFormModule();
    });

    it('parses a fully-formed message', function () {
      var dl,
          message;

      message = '<dl><dt>Some</dt><dd>Message</dd></dl>';

      module.onSubmitSuccess('<html><body><div>' + message +
          '</div></body></html>');
      dl = module.el.querySelector('dl');

      /* jshint -W030 */
      expect(dl).to.not.be.null;
      /* jshint +W030 */

      expect(dl.outerHTML).to.equal(message);
    });

    it('parses a partial message', function () {
      var e,
          message;

      message = '<p>Some Error</p>';
      module.onSubmitSuccess('<html><body><div>' + message);
      e = module.el.querySelector('.error');

      /* jshint -W030 */
      expect(e).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('render', function () {
    it('shows the form by default', function () {
      var module,
          spy;

      module = DYFIFormModule();
      spy = sinon.spy(module, 'showForm');

      module.render();
      expect(spy.callCount).to.equal(1);

      spy.restore();
      module.destroy();
    });
  });

  describe('showForm', function () {
    it('Puts the modal in the DOM', function () {
      var module;

      module = DYFIFormModule();
      module.showForm();

      /* jshint -W030 */
      expect(document.querySelector('.modal')).to.not.be.null;
      /* jsint +W030 */

      module.destroy();
    });
  });
});
