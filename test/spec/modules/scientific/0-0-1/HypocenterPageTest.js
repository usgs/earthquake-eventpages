/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',
	'require',

	'util/Xhr',
	'util/Util',
	'./usb000kqnc',

	'scientific/ScientificModule',
	'scientific/HypocenterPage',
	'quakeml/Quakeml',
	'tablist/TabList'
], function (
	chai,
	sinon,
	require,

	Xhr,
	Util,
	eventDetails,

	ScientificModule,
	HypocenterPage,
	Quakeml,
	TabList
) {
	'use strict';

	var expect = chai.expect,
	    summaryOptions,
	    detailOptions,
	    SummaryPage,
	    DetailPage;

	summaryOptions = {
		eventDetails: eventDetails,
		module: new ScientificModule(),
		// source: 'us',
		productTypes: [
			'origin',
			'phase-data'
		],
		title: 'Hypocenter',
		hash: 'hypocenter'
	};
	SummaryPage = new HypocenterPage(summaryOptions);

	detailOptions = Util.extend({}, summaryOptions, {code: 'us_usb000kqnc'});
	DetailPage = new HypocenterPage(detailOptions);

	var getClickEvent = function () {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);
		return clickEvent;
	};

	before( function (done) {
		Xhr.ajax({
			url: require.toUrl('./usc000njrq_phase-data.xml'),
			success: function (xml) {
				// use quakeml parser to make xml into quakeml
				DetailPage._quakeml = new Quakeml({xml: xml});
				done();
			},
			error: function () {
				done('failed to parse quakeml');
			}
		});
	});

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

			it('Loads phases when tab is clicked.', function () {
				// The phase element should be empty
				expect(DetailPage._phaseEl.innerHTML).to.equal('');
				DetailPage._tabList._tabs[1].select();
				expect(DetailPage._phaseEl.innerHTML).to.not.equal('');
			});

			it('Loads magnitudes when tab is clicked.', function () {
				// The magnitude element should be empty
				expect(DetailPage._magnitudeEl.innerHTML).to.equal('');
				DetailPage._tabList._tabs[2].select();
				// The phase element should not be empty anymore
				expect(DetailPage._magnitudeEl.innerHTML).to.not.equal('');
			});

			it('Can be awesome.', function () {
				var content = null;
				// Just because it can be.
				content = 'Awesome!';
				expect(content).to.equal('Awesome!');
			});

			it('Toggles magnitude details.', function () {
				var magEl,
				    linkEl;

				DetailPage._tabList._tabs[2].select();
				magEl = DetailPage._tabList.el.querySelector('.networkmagnitude');
				linkEl = magEl.querySelector('.expand');

				expect(magEl.classList.contains('show-networkmagnitude-details')).
						to.equal(false);
				DetailPage._toggleMagnitudeDetails({target: linkEl});
				expect(magEl.classList.contains('show-networkmagnitude-details')).
						to.equal(true);
				DetailPage._toggleMagnitudeDetails({target: linkEl});
				expect(magEl.classList.contains('show-networkmagnitude-details')).
						to.equal(false);
			});

		});

		describe('getFeString', function () {
			var hp = null,
			    product = null,
			    ajaxStub = null;

			beforeEach(function () {
				hp = new HypocenterPage(summaryOptions);

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
