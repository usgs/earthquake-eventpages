/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',

	'util/Xhr',
	'./usb000kqnc',

	'scientific/ScientificModule',
	'scientific/HypocenterDetailsPage',
	'scientific/HypocenterSummaryPage'
], function (
	chai,
	sinon,

	Xhr,
	eventDetails,

	ScientificModule,
	HypocenterDetailsPage,
	HypocenterSummaryPage
) {
	'use strict';
	var expect = chai.expect,
	    options = {
				eventDetails: eventDetails,
				module: new ScientificModule(),
				source: 'us',
				code: 'us_usb000kqnc'
			},
	    SummaryPage = new HypocenterSummaryPage(options);


	describe('HypocenterSummaryPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(HypocenterDetailsPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				expect(SummaryPage).to.be.an.instanceof(HypocenterSummaryPage);
			});
		});


		describe('getContent()', function () {

			it('Can get summary information.', function () {
				var content = SummaryPage.getContent();
				expect(content).to.be.a('object');
			});

			// _getInfo()
			it('Can summarize hypocenter data.', function () {
				var content = SummaryPage.getContent();
				var hypocenter_summary = content.querySelectorAll('.hypocenters');
				/* jshint -W030 */
				expect(hypocenter_summary.length).to.not.equal(0);
				/* jshint +W030 */
			});
		});

	}); // close Hypocenter Details test suite


	describe('HypocenterDetailsPage test suite.', function () {
		describe('getFeString', function () {
			var hp = null,
			    product = null,
			    ajaxStub = null;

			beforeEach(function () {
				hp = new HypocenterDetailsPage(options);

				product = hp.getProducts()[0];

				ajaxStub = sinon.stub(Xhr, 'ajax', function (o) {
					if (o.success) {
						o.success({fe: {longName: 'Foo', number: '1'}});
					}
				});
			});

			afterEach(function () {
				ajaxStub.restore();
				ajaxStub = null;

				product = null;

				if (hp.destroy) {
					hp.destroy();
				}
				hp = null;
			});

			it('Executes callback', function (done) {
				hp.getFeString(product, function () {
					/* jshint -W030 */
					expect(true).to.be.true;
					/* jshint +W030 */
					done();
				});

				ajaxStub.restore();
			});

			it('Properly formats string info', function (done) {
				hp.getFeString(product, function (feString) {
					expect(feString).to.equal('Foo (1)');
					done();
				});
			});

			it('Uses default string on error', function (done) {
				hp.getFeString(null, function (feString) {
					expect(feString).to.equal('-');
					done();
				});
			});

		});
	});
});
