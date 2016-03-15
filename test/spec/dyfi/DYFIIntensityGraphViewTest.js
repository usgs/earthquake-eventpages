/* global before, chai, describe, it */
'use strict';

var DYFIIntensityGraphView = require('dyfi/DYFIIntensityGraphView'),
    Product = require('pdl/Product'),
    Xhr = require('util/Xhr');


var expect = chai.expect;

var dyfiProduct = Product({
  id: 'urn:usgs-product:us:dyfi:us10004u1y:1457013501095',
  type: 'dyfi',
  code: 'us10004u1y',
  source: 'us',
  contents: {
    'dyfi_plot_atten.json': {
      contentType: 'application/json',
      lastModified: 1457013500000,
      length: 3075,
      url: '/products/dyfi/us10004u1y/us/1457013501095/dyfi_plot_atten.json'
    }
  }
});

var dyfiIntensityGraphView = DYFIIntensityGraphView({
  el: document.createElement('div'),
  model: dyfiProduct.getContent('dyfi_plot_atten.json')
});
dyfiIntensityGraphView.render();

describe('dyfi/DYFIIntensityGraphView', function () {

  before(function () {
    Xhr.ajax({
      url: '/products/dyfi/us10004u1y/us/1457013501095/dyfi_plot_atten.json',
      success: dyfiIntensityGraphView.onSuccess,
      error: dyfiIntensityGraphView.onError
    });
  });

  describe('constructor', function () {

    it('should be defined', function () {
      expect(typeof DYFIIntensityGraphView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(dyfiIntensityGraphView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('render', function () {
    var el;

    before(function () {
      el = dyfiIntensityGraphView.el;
    });

    it('calls buildLineView', function () {
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

});