/* global before, chai, describe, it */
'use strict';

var DYFIResponsesView = require('dyfi/DYFIResponsesView'),
    Xhr = require('util/Xhr');


var expect = chai.expect;

describe('dyfi/DYFIResponsesView', function () {
  var xhr;

  before(function (done) {
    Xhr.ajax({
      url: '/products/dyfi/us10004u1y/us/1457013501095/cdi_zip.xml',
      success: function (r, x) {
        xhr = x;
        done();
      }
    });
  });

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof DYFIResponsesView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DYFIResponsesView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('onError', function () {
    var view;

    before(function () {
      view = DYFIResponsesView();
    });

    it('should use static message', function () {
      expect(view.el.innerHTML).to.not.equal(
          DYFIResponsesView.NO_CONTENT_MESSAGE);

      view.onError('Custom Message');

      expect(view.el.innerHTML).to.equal(DYFIResponsesView.NO_CONTENT_MESSAGE);
    });
  });

  describe('onSuccess', function () {
    var view;

    before(function () {
      view = DYFIResponsesView();
    });

    it('should create a list', function () {
      /* jshint -W030 */
      expect(view.el.getElementsByClassName(
          'dyfi-response-table').length).to.equal(0);
      /* jshint +W030 */

      view.onSuccess(null, xhr);

      /* jshint -W030 */
      expect(view.el.getElementsByClassName(
          'dyfi-response-table').length).to.not.equal(0);
      /* jshint +W030 */
    });
  });

  describe('buildResponsesCollection', function () {
    var response,
        view = DYFIResponsesView();

    it('should create a collection', function () {
      response = view.buildResponsesCollection(xhr.responseXML);

      /* jshint -W030 */
      expect(response.data().length).to.not.equal(0);
      /* jshint +W030 */
    });
  });

  describe('onToggleButtonClick', function () {
    var view = DYFIResponsesView();

    it('should toggle clasname', function () {
      view.onSuccess(null, xhr);

      expect(view.el.getElementsByClassName('full-list').length).to.equal(0);

      view.onToggleButtonClick();

      expect(view.el.getElementsByClassName('full-list').length).to.not.equal(0);
    });
  });

});
