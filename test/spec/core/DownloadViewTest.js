/* global chai, describe, it */
'use strict';

var DownloadView = require('core/DownloadView');


var expect = chai.expect;


describe('core/DownloadView', function () {

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

  describe('render', function () {
    it('has a render method', function () {
      var view;

      view = DownloadView();

      expect(view).to.respondTo('render');
    });

  });
});
