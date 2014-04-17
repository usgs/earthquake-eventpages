/* global define, describe, it, before, after */
define([
	'chai',
	'sinon',
	'summary/SummaryModule',
	'summary/SummaryPage',
	'./usc000lnnb',
	'./usc000lnnb-nogeoserve',
	'./geoserve',
	'util/Xhr'
], function (
	chai,
	sinon,
	SummaryModule,
	SummaryPage,
	eventData,
	eventData_nogeoserve,
	geoserve,
	Xhr
) {

	'use strict';

	var expect = chai.expect;
	var options = {
		hash: 'summary',
		title: 'Summary',
		eventDetails: eventData,
		module: new SummaryModule({eventDetails: eventData})
	};
	var options_nogeoserve = {
		hash: 'summary',
		title: 'Summary',
		eventDetails: eventData_nogeoserve,
		module: new SummaryModule({eventDetails: eventData_nogeoserve})
	};


	describe('SummaryPage test suite.', function () {

		var content, page, stub;

		before(function() {

			stub = sinon.stub(Xhr, 'ajax', function () {});

			page = new SummaryPage(options);
			page._ajaxSuccess(geoserve);
			content = page.getContent();
		});

		describe('Constructor', function () {

			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(SummaryPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				expect(page).to.be.an.instanceof(SummaryPage);
			});

			it('Does not throw exception if no geoserve product', function () {
				var page_nogeoserve = null;

				try {
					page_nogeoserve = new SummaryPage(options_nogeoserve);
				} catch (e) { }

				/* jshint -W030 */
				expect(page_nogeoserve).to.not.be.null;
				/* jshint +W030 */
			});

		});

		describe('getContent', function () {

			it('can get contents', function () {
				//console.log(content);
				expect(content).to.be.a('object');
			});

			it('can get a static map', function () {
				var map = content.querySelector('.summary-map');
				expect(map.childNodes.length).to.not.equal(0);
			});

			it('can get nearby cities', function () {
				var cities = content.querySelector('.summary-nearby-cities');
				expect(cities.childNodes.length).to.not.equal(0);
			});

			it('can get tectonic summary', function () {
				var tectonic = content.querySelector('.summary-tectonic-summary');
				expect(tectonic.childNodes.length).to.not.equal(0);
			});

			it('can get related links', function () {
				var links = content.querySelector('.summary-related-links');
				expect(links.childNodes.length).to.not.equal(0);
			});

			it('can get attribution', function () {
				var attribution = content.querySelector('.summary-attribution');
				expect(attribution.childNodes.length).to.not.equal(0);
			});

			it('can get general-text', function () {
				var general = content.querySelector('.summary-general-text');
				expect(general.childNodes.length).to.not.equal(0);
			});

			it('can get impact-text', function () {
				var impact = content.querySelector('.summary-impact-text');
				expect(impact.childNodes.length).to.not.equal(0);
			});

		});

		after(function () {
			stub.restore();
		});

	});

});