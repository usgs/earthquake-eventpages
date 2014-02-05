/* global define, describe, it */
define ([
	'chai',
	'sinon',
	'./nc72119970',
	'scientific/ScientificModule',
	'scientific/MomentTensorDetailsPage',
	'scientific/MomentTensorSummaryPage'
], function (
	chai,
	sinon,
	nc72119970,
	ScientificModule,
	MomentTensorDetailsPage,
	MomentTensorSummaryPage
) {

'use strict';

	var expect = chai.expect,
			options = {
				eventDetails: nc72119970,
				module: new ScientificModule(),
				source: 'nc',
				type: 'TMTS',
				code: 'nc_nc72119970_mt1'
			},
	    SummaryPage = new MomentTensorSummaryPage(options),
	    DetailsPage = new MomentTensorDetailsPage(options);


	/**
	 * Test for Moment Tensor Summary page
	 */
	describe('MomentTensorSummary test suite.', function () {

		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(MomentTensorSummaryPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				expect(SummaryPage).to.be.an.instanceof(MomentTensorSummaryPage);
			});
		});

		describe('getContent()', function () {

			it('Can get summary information.', function () {
				var content = SummaryPage.getContent();
				expect(content).to.be.a('object');
			});

			// _getInfo()
			it('Can summarize moment tensor data.', function () {
				var content = SummaryPage.getContent();
				var tensor_summary = content.querySelectorAll('.tensors');
				/* jshint -W030 */
				expect(tensor_summary.length).to.not.equal(0);
				/* jshint +W030 */
			});
		});

	}); // close MomentTensorSummary test suite





	/**
	 * Test for Moment Tensor Details page
	 */
	describe('MomentTensorDetails test suite.', function () {

		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(MomentTensorDetailsPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				expect(DetailsPage).to.be.an.instanceof(MomentTensorDetailsPage);
			});
		});

		describe('getContent()', function () {

			it('Can get product details.', function () {
				var content = DetailsPage.getContent();
				expect(content).to.be.a('object');
			});

			// _getInfo()
			it('Can build info table', function () {
				var content = DetailsPage.getContent();
				var info_table = content.querySelector('.info-table');
				/* jshint -W030 */
				expect(info_table).not.to.be.null;
				/* jshint +W030 */
			});

			// _getAxes()
			it('Can build principal axes table', function () {
				var content = DetailsPage.getContent();
				var principal_axes = content.querySelector('.principal-axes-table');
				/* jshint -W030 */
				expect(principal_axes).not.to.be.null;
				/* jshint +W030 */
			});

			// _getPlanes()
			it('Can build nodal planes table', function () {
				var content = DetailsPage.getContent();
				var nodal_plane = content.querySelector('.nodal-plane-table');
				/* jshint -W030 */
				expect(nodal_plane).not.to.be.null;
				/* jshint +W030 */
			});

			// getSummary()
			it('Can build beachball', function () {
				var content = DetailsPage.getContent();
				var canvas = content.querySelector('canvas');
				/* jshint -W030 */
				expect(canvas).not.to.be.null;
				/* jshint +W030 */
			});

			// getDetail()
			it('Can build downloads section', function () {
				var content = DetailsPage.getContent();
				var downloads = content.querySelector('.downloads');
				/* jshint -W030 */
				expect(downloads).not.to.be.null;
				/* jshint +W030 */
			});

		});

	}); // close MomentTensorSummary test suite



});