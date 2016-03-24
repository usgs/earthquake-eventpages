/* global afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';


var Quakeml = require('quakeml/Quakeml'),
    QuakemlView = require('origin/QuakemlView'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('origin/QuakemlView', function () {
  var quakeml;

  before(function (done) {
    Xhr.ajax({
      url: '/products/phase-data/ci37528064/ci/1456278769730/quakeml.xml',
      success: function (data) {
        quakeml = data;
        done();
      },
      error: function () {
        done();
      }
    });
  });


  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof QuakemlView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(QuakemlView).to.not.throw(Error);
    });
  });

  describe('onError', function () {
    it('creates an error message', function () {
      var view;

      view = QuakemlView();
      view.onError();

      /* jshint -W030 */
      expect(view.el.querySelector('.error')).to.not.be.null;
      /* jshint +W030 */

      view.destroy();
    });
  });

  describe('onSuccess', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = QuakemlView();
    });


    it('calls render', function () {
      var stub;

      stub = sinon.stub(view, 'render', function () {});
      view.onSuccess(quakeml);

      expect(stub.callCount).to.equal(1);

      stub.restore();
    });

    it('triggers quakeml event', function () {
      var spy;

      spy = sinon.spy();
      view.on('quakeml', spy);

      view.onSuccess(quakeml);

      expect(spy.callCount).to.equal(1);
    });
  });

  describe('render', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = QuakemlView();
    });


    it('fetches data if needed', function () {
      var stub;

      stub = sinon.stub(view, 'fetchData', function () {});
      view.render();

      expect(stub.callCount).to.equal(1);

      stub.restore();
    });

    it('renders quakeml if ready', function () {
      var stub;

      stub = sinon.stub(view, 'renderQuakeml', function () {});
      view.setQuakeml(Quakeml({xml: quakeml}));
      view.render();

      expect(stub.callCount).to.equal(1);

      stub.restore();
    });
  });

  describe('renderQuakeml', function () {
    it('has such a function', function () {
      var view;

      view = QuakemlView();
      expect(view).to.respondTo('renderQuakeml');

      view.destroy();
    });
  });

  describe('setQuakeml', function () {
    it('has such a function', function () {
      var view;

      view = QuakemlView();
      expect(view).to.respondTo('setQuakeml');

      view.destroy();
    });
  });
});
