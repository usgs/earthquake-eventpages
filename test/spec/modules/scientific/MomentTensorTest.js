/* global chai, describe, it */
'use strict';

var expect = chai.expect,
    MomentTensorPage = require('scientific/MomentTensorPage'),
    ScientificModule = require('scientific/ScientificModule'),

    nc72119970 = require('./nc72119970'),
    nc72119971 = require('./nc72119971'),

    options,
    page;


options = {
  eventDetails: nc72119970,
  module: new ScientificModule(),
  productTypes: ['moment-tensor'],
  title: 'Moment Tensor',
  hash: 'tensor'
};
page = new MomentTensorPage(options);


/**
 * Test for Moment Tensor Summary page
 */
describe('MomentTensorSummary test suite.', function () {

  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(page).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      expect(page).to.be.an.instanceof(MomentTensorPage);
    });
  });

  describe('getDetailContent()', function () {

    var expect = chai.expect,
    options = {
      eventDetails: nc72119971,
      module: new ScientificModule(),
      productTypes: ['moment-tensor'],
      title: 'Moment Tensor',
      hash: 'tensor'
    },
    page = new MomentTensorPage(options);

    it('Can get product details.', function () {
      var content = page.getContent();
      expect(typeof content).to.equal('object');
    });

    // _getInfo()
    it('Can build info table', function () {
      var content = page.getContent();
      var info_table = content.querySelector('.info-table');
      /* jshint -W030 */
      expect(info_table).not.to.be.null;
      /* jshint +W030 */
    });

    // _getAxes()
    it('Can build principal axes table', function () {
      var content = page.getContent();
      var principal_axes = content.querySelector('.principal-axes-table');
      /* jshint -W030 */
      expect(principal_axes).not.to.be.null;
      /* jshint +W030 */
    });

    // _getPlanes()
    it('Can build nodal planes table', function () {
      var content = page.getContent();
      var nodal_plane = content.querySelector('.nodal-plane-table');
      /* jshint -W030 */
      expect(nodal_plane).not.to.be.null;
      /* jshint +W030 */
    });

    // getSummary()
    it('Can build beachball', function () {
      var content = page.getContent();
      var canvas = content.querySelector('canvas');
      /* jshint -W030 */
      expect(canvas).not.to.be.null;
      /* jshint +W030 */
    });

  });

}); // close MomentTensorSummary test suite
