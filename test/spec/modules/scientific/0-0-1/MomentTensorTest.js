/* global define, describe, it */
define ([
	'chai',
	'sinon',
	'./nc72119970',
	'./nc72119971',
	'scientific/ScientificModule',
	'scientific/MomentTensorPage'
], function (
	chai,
	sinon,
	nc72119970,
	nc72119971,
	ScientificModule,
	MomentTensorPage
) {

'use strict';

	var expect = chai.expect,
			options = {
				eventDetails: nc72119970,
				module: new ScientificModule(),
				productTypes: ['moment-tensor'],
				title: 'Moment Tensor',
				hash: 'tensor'
			},
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

		describe('getSummaryContent', function () {

			it('Can get summary information.', function () {
				var content = page.getContent();
				expect(content).to.be.a('object');
			});

			// _getInfo()
			it('Can summarize moment tensor data.', function () {
				var content = page.getContent();
				var tensor_summary = content.querySelectorAll('.tensor-summary');
				/* jshint -W030 */
				expect(tensor_summary.length).to.not.equal(0);
				/* jshint +W030 */
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
				expect(content).to.be.a('object');
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

			// getDetail()
			it('Can build downloads section', function () {
				var content = page.getContent();
				var downloads = content.querySelector('.downloads');
				/* jshint -W030 */
				expect(downloads).not.to.be.null;
				/* jshint +W030 */
			});

		});

	}); // close MomentTensorSummary test suite



});