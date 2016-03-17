/* global afterEach, beforeEach, chai, describe, it */
'use strict';


var DYFIView = require('dyfi/DYFIView');


var expect = chai.expect;


describe('dyfi/DYFIView', function () {
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
});
