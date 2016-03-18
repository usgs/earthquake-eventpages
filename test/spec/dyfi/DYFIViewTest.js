/* global afterEach, before, beforeEach, chai, describe, it, sinon */
'use strict';


var DYFIView = require('dyfi/DYFIView'),
    Model = require('mvc/Model'),
    Product = require('pdl/Product'),
    View = require('mvc/View'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('dyfi/DYFIView', function () {
  var dyfiProductJson;

  before(function (done) {
    Xhr.ajax({
      url: '/events/us10004u1y.json',
      success: function (data) {
        dyfiProductJson = data.properties.products.dyfi[0];
        done();
      },
      error: function () {
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof DYFIView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(DYFIView).to.not.throw(Error);
    });
  });

  describe('createImageTab', function () {
    var view;

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = DYFIView();
    });

    it('includes a link if provided', function () {
      var content,
          tab;

      tab = view.createImageTab({
        alt: '',
        href: 'expected-result',
        image: ''
      });

      content = tab.content();

      expect(content.nodeName).to.equal('A');
      expect(content.getAttribute('href')).to.equal('expected-result');
    });

    it('skips a link if not provided', function () {
      var content,
          tab;

      tab = view.createImageTab({
        alt: '',
        image: ''
      });

      content = tab.content();

      expect(content.nodeName).to.equal('DIV');
    });

    it('uses an svg image map if provided', function () {
      var content,
          tab;

      tab = view.createImageTab({
        map: 'some-map',
      });

      content = tab.content();

      /* jshint -W030 */
      expect(content.classList.contains('svgimagemap')).to.be.true;
      /* jshint +W030 */
    });
  });

  describe('createSubViewTab', function () {
    var factory,
        subview,
        view;

    factory = function (options) {
      subview = View(options);
      return subview;
    };

    afterEach(function () {
      view.destroy();
    });

    beforeEach(function () {
      view = DYFIView();
    });


    it('creates a subview', function () {
      var spy,
          tab;

      spy = sinon.spy(factory);

      tab = view.createSubViewTab({
        constructor: spy,
        content: Model(),
        title: 'Some Title'
      });

      expect(spy.callCount).to.equal(1);
    });

    it('destroys the subview on destroy', function () {
      var spy,
          tab;

      tab = view.createSubViewTab({
        constructor: factory,
        content: Model(),
        title: 'Some Title'
      });

      spy = sinon.spy(subview, 'destroy');
      tab.onDestroy();

      expect(spy.callCount).to.equal(1);

      spy.restore();
    });

    it('renders the subview on select', function () {
      var spy,
          tab;

      tab = view.createSubViewTab({
        constructor: factory,
        content: Model(),
        title: 'Some Title'
      });

      spy = sinon.spy(subview, 'render');
      tab.onSelect();

      expect(spy.callCount).to.equal(1);

      spy.restore();
    });
  });

  describe('createTab', function () {
    it('does not create a tab if unsufficient data given', function () {
      var tab,
          view;

      view = DYFIView();
      tab = view.createTab({});

      /* jshint -W030 */
      expect(tab).to.be.undefined;
      /* jshint +W030 */

      view.destroy();
    });

    it('delegates to sub-view method when appropirate', function () {
      var spy,
          tab,
          view;

      view = DYFIView({
        model: Product(dyfiProductJson)
      });
      spy = sinon.spy(view, 'createSubViewTab');
      tab = view.createTab({
        subview: View,
        subviewContent: 'contents.xml'
      });

      expect(spy.callCount).to.equal(1);
      /* jshint -W030 */
      expect(tab).to.not.be.undefined;
      /* jshint +W030 */

      spy.restore();
      view.destroy();
    });

    it('delegates to image method when appropriate', function () {
      var spy,
          tab,
          view;

      view = DYFIView({
        model: Product(dyfiProductJson)
      });
      spy = sinon.spy(view, 'createImageTab');
      tab = view.createTab({
        suffix: '_ciim.jpg'
      });

      expect(spy.callCount).to.equal(1);
      /* jshint -W030 */
      expect(tab).to.not.be.undefined;
      /* jshint +W030 */

      spy.restore();
      view.destroy();
    });
  });

  describe('destroy', function () {
    it('does not blow up on unrendered views', function () {
      var view;

      view = DYFIView();

      expect(view.destroy).to.not.throw(Error);
    });
  });

  describe('render', function () {
    it('calls createTab for each resource', function () {
      var spy,
          view;

      view = DYFIView();
      spy = sinon.spy(view, 'createTab');

      view.render();

      expect(spy.callCount).to.equal(7);

      spy.restore();
      view.destroy();
    });
  });
});
