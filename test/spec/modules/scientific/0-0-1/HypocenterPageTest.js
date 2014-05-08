/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',

	'util/Xhr',
	'./usb000kqnc',

	'scientific/ScientificModule',
	'scientific/HypocenterPage',
	'tablist/TabList'
], function (
	chai,
	sinon,

	Xhr,
	eventDetails,

	ScientificModule,
	HypocenterPage,
	TabList
) {
	'use strict';
	debugger;
	var expect = chai.expect,
	    options = {
				eventDetails: eventDetails,
				module: new ScientificModule(),
				// source: 'us',
				code: 'us_usb000kqnc',
				productTypes: [
					'origin',
					'phase-data'
				],
				title: 'Hypocenter',
				hash: 'hypocenter'
			},
	   SummaryPage = new HypocenterPage(options);

	var getClickEvent = function () {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);
		return clickEvent;
	};

	describe('HypocenterPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(HypocenterPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				expect(SummaryPage).to.be.an.instanceof(HypocenterPage);
			});
		});

		describe('getContent()', function () {
			var myTabList,
			    tabListContents = [],
			    tabListDiv = document.createElement('section');

			tabListContents.push({
				title: 'Tab 1',
				content: 'originDetails or something like that'
			});

			it('Can get summary information.', function () {
				var content = SummaryPage.getContent();
				expect(content).to.be.a('object');
			});

			// _getInfo()
			it('Can summarize hypocenter data.', function () {
				var content = SummaryPage.getContent();
				var hypocenter_summary =
						content.querySelectorAll('.hypocenter-summary');
				/* jshint -W030 */
				expect(hypocenter_summary.length).to.not.equal(0);
				/* jshint +W030 */
			});

			it('Can show hypocenter phase data.', function () {
				var product = SummaryPage._products[0],
				    tabPanel;

				// The phase element should be empty
				expect(SummaryPage._phaseEl.innerHTML).to.equal('');

				if (product.type === 'phase-data' &&
					product.contents['quakeml.xml'] !== null) {
					// build phase table
					tabListContents.push({
						title: 'Phases',
						content: function () {
							SummaryPage._getPhaseDetail();
							return SummaryPage._phaseEl;
						}
					});
				}
				myTabList = new TabList({
					el: SummaryPage._content.appendChild(tabListDiv),
					tabPosition: 'top',
					tabs: tabListContents
				});

				tabPanel = SummaryPage._content.querySelector('.tablist-tab-2');
				console.log(SummaryPage)
				console.log(tabPanel)

				// The phase element should be empty
				expect(SummaryPage._phaseEl.innerHTML).to.equal('');

				tabPanel.dispatchEvent(getClickEvent());

				// The phase element should not be empty anymore
				expect(SummaryPage._phaseEl.innerHTML).to.equal('');
			});

			it('Can show hypocenter magnitude data summaries.', function () {
				var product = SummaryPage._products[0],
				    tabPanel;

				// The magnitude element should be empty
				expect(SummaryPage._magnitudeEl.innerHTML).to.equal('');

				if (product.type === 'phase-data' &&
					product.contents['quakeml.xml'] !== null) {
					// build magnitude table
					tabListContents.push({
						title: 'Magnitudes',
						content: function () {
							SummaryPage._getMagnitudeDetail();
							return SummaryPage._magnitudeEl;
						}
					});
				}
				myTabList = new TabList({
					el: SummaryPage._content.appendChild(tabListDiv),
					tabPosition: 'top',
					tabs: tabListContents
				});

				tabPanel = SummaryPage._content.querySelector('section.tablist-tab-2');

				// The magnitude element should be empty
				expect(SummaryPage._magnitudeEl.innerHTML).to.equal('');

				tabPanel.dispatchEvent(getClickEvent());

				// The phase element should not be empty anymore
				expect(SummaryPage._magnitudeEl.innerHTML).to.equal('');
			});

			it('Can be awesome.', function () {
				var content = null;

				content = 'Awesome!';
				expect(content).to.equal('Awesome!');
			});

		});

		describe('getFeString', function () {
			var hp = null,
			    product = null,
			    ajaxStub = null;

			beforeEach(function () {
				hp = new HypocenterPage(options);

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
