/* global before, chai, describe, it */
'use strict';

var DownloadView = require('core/DownloadView'),
    Xhr = require('util/Xhr');


var expect = chai.expect;


describe('core/DownloadView', function () {
  var xhr;

  before(function (done) {
    Xhr.ajax({
      url: '/products/shakemap/us10004u1y/us/1456937483212/contents.xml',
      success: function (r, x) {
        xhr = x;
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof DownloadView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DownloadView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('onError', function () {
    var view;

    before(function () {
      view = DownloadView();
    });

    it('should use static message', function () {
      expect(view.el.innerHTML).to.not.equal(DownloadView.NO_CONTENT_MESSAGE);

      view.onError('Custom Message');

      expect(view.el.innerHTML).to.equal(DownloadView.NO_CONTENT_MESSAGE);
    });
  });

  describe('onSuccess', function () {
    var view;

    before(function () {
      view = DownloadView();
    });

    it('should create a list', function () {
      /* jshint -W030 */
      expect(view.el.querySelector('ul')).to.be.null;
      /* jshint +W030 */

      view.onSuccess(null, xhr);

      /* jshint -W030 */
      expect(view.el.querySelector('ul')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('parse', function () {
    it('should create an array of file data structures', function () {
      var result,
          view;

      view = DownloadView();
      result = view.parse(xhr.responseXML);

      /* jshint -W030 */
      expect(Array.isArray(result)).to.be.true;
      /* jshint +W030 */

      expect(result.length).to.equal(33);
    });
  });

  describe('parseFile', function () {
    it('should create a file data structure', function () {
      var format,
          parsed,
          view;

      view = DownloadView();
      parsed = view.parse(xhr.responseXML);
      parsed = parsed[0];

      /* jshint -W030 */
      expect(parsed.hasOwnProperty('id')).to.be.true;
      expect(parsed.hasOwnProperty('title')).to.be.true;
      expect(parsed.hasOwnProperty('caption')).to.be.true;
      expect(parsed.hasOwnProperty('formats')).to.be.true;

      format = parsed.formats[0];

      expect(format.hasOwnProperty('href')).to.be.true;
      expect(format.hasOwnProperty('type')).to.be.true;
      expect(format.hasOwnProperty('url')).to.be.true;
      expect(format.hasOwnProperty('length')).to.be.true;
      /* jshint +W030 */
    });
  });

  describe('renderFile', function () {
    it('should create expected components', function () {
      var el,
          file,
          view;

      el = document.createElement('ul');

      file = {
        title: 'My Title',
        caption: 'My Caption',
        formats: []
      };

      view = DownloadView();

      el.innerHTML = view.renderFile(file);

      /* jshint -W030 */
      expect(el.querySelector('.download-file')).to.not.be.null;
      expect(el.querySelector('.download-title')).to.not.be.null;
      expect(el.querySelector('.download-caption')).to.not.be.null;
      expect(el.querySelector('.download-formats')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('renderFormat', function () {
    it('should create the expected components', function () {
      var el,
          format,
          link,
          view;

      el = document.createElement('ul');

      format = {
        url: '/foo.ext',
        href: 'foo.ext',
        length: 10
      };

      view = DownloadView();

      el.innerHTML = view.renderFormat(format);

      /* jshint -W030 */
      expect(el.querySelector('.format')).to.not.be.null;
      expect(el.querySelector('a')).to.not.be.null;
      /* jshint +W030 */

      link = el.querySelector('a');
      expect(link.getAttribute('href')).to.equal(format.url);
      expect(link.innerHTML).to.equal('EXT (10 B)');
    });
  });
});
