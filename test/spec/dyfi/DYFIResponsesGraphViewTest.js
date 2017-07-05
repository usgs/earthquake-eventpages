/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';

var Content = require('pdl/Content'),
    DYFIResponsesGraphView = require('dyfi/DYFIResponsesGraphView'),
    Util = require('util/Util');


var expect = chai.expect;

var content = Content({
  id: 'dyfi_plot_numresp.json',
  contentType: 'application/json',
  lastModified: 1457013500000,
  length: 3075,
  url: '/products/dyfi/us10004u1y/us/1457013501095/dyfi_plot_numresp.json'
});

describe('dyfi/DYFIResponsesGraphView', function () {

  describe('constructor', function () {

    it('should be defined', function () {
      expect(typeof DYFIResponsesGraphView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DYFIResponsesGraphView()).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('render', function () {
    var dyfiResponseGraphView,
        el;

    beforeEach(function (done) {
      el = document.createElement('div');
      dyfiResponseGraphView = DYFIResponsesGraphView({
        el: el,
        model: content
      });
      sinon.stub(dyfiResponseGraphView, 'onSuccess', Util.compose(dyfiResponseGraphView.onSuccess, done));
      dyfiResponseGraphView.render();
    });

    afterEach(function () {
      dyfiResponseGraphView.destroy();
    });

    it('creates buildLineView', function () {
      /* jshint -W030 */
      expect(el.querySelector('.histogram')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('destroy', function () {

    it('calls destroy', function () {
      var view = DYFIResponsesGraphView();
      view.destroy();
      /* jshint -W030 */
      expect(view.el).to.be.null;
      expect(view.model).to.be.null;
      /* jshint +W030 */
    });
  });

});