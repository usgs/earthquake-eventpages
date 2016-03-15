/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';

var Content = require('pdl/Content'),
    DYFIIntensityGraphView = require('dyfi/DYFIIntensityGraphView'),
    Util = require('util/Util');


var expect = chai.expect;

var content = Content({
  id: 'dyfi_plot_atten.json',
  contentType: 'application/json',
  lastModified: 1457013500000,
  length: 3075,
  url: '/products/dyfi/us10004u1y/us/1457013501095/dyfi_plot_atten.json'
});

describe('dyfi/DYFIIntensityGraphView', function () {

  describe('constructor', function () {

    it('should be defined', function () {
      expect(typeof DYFIIntensityGraphView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DYFIIntensityGraphView()).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('render', function () {
    var dyfiIntensityGraphView,
        el;

    beforeEach(function (done) {
      el = document.createElement('div');
      dyfiIntensityGraphView = DYFIIntensityGraphView({
        el: el,
        model: content
      });
      sinon.stub(dyfiIntensityGraphView, 'onSuccess', Util.compose(dyfiIntensityGraphView.onSuccess, done));
      dyfiIntensityGraphView.render();
    });

    afterEach(function () {
      dyfiIntensityGraphView.destroy();
    });

    it('creates buildLineView', function () {
      /* jshint -W030 */
      expect(el.querySelector('.estimated1')).to.not.be.null;
      expect(el.querySelector('.estimated2')).to.not.be.null;
      /* jshint +W030 */
    });

    it('calls buildMedianDataView', function () {
      /* jshint -W030 */
      expect(el.querySelector('.median')).to.not.be.null;
      /* jshint +W030 */
    });

    it('calls buildScatterPlotView', function () {
      /* jshint -W030 */
      expect(el.querySelector('.scatterplot1')).to.not.be.null;
      /* jshint +W030 */
    });

    it('calls buildStandardDeviationLineView', function () {
      /* jshint -W030 */
      expect(el.querySelector('.binned')).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('destroy', function () {

    it('calls destroy', function () {
      var view = DYFIIntensityGraphView();
      view.destroy();
      /* jshint -W030 */
      expect(view.el).to.be.null;
      expect(view.model).to.be.null;
      /* jshint +W030 */
    });
  });

});