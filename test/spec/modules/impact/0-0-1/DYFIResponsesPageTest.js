/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',
	'impact/ImpactModule',
	'impact/DYFIPage',
	'./nc72119970',
	'./cdi_zip',
	'util/Xhr'
], function (
	chai,
	sinon,
	DYFIModule,
	DYFIResponsesPage,
	eventData,
	cdi_zip,
	Xhr
) {

	'use strict';

	var expect = chai.expect,
			stub, content, tbody, rows, hiddenRows,
			options = {
					hash: 'responses',
					title: 'Responses',
					eventDetails: eventData,
					module: new DYFIModule({eventDetails: eventData})
			},
			page = new DYFIResponsesPage(options);

	var getClickEvent = function () {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);
		return clickEvent;
	};

	describe('DYFIResponsesPage test suite.', function () {

		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(DYFIResponsesPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				expect(page).to.be.an.instanceof(DYFIResponsesPage);
			});
		});

		describe('getContent', function () {

			beforeEach(function() {

				stub = sinon.stub(Xhr, 'ajax', function () {
					var xmlDoc;
					if (window.DOMParser) {
						var parser=new DOMParser();
						xmlDoc=parser.parseFromString(cdi_zip.xml,'text/xml');
					}
					content = DYFIResponsesPage.prototype._buildResponsesTable(DYFIResponsesPage.prototype._buildResponsesArray(xmlDoc));
				});

				page = new DYFIResponsesPage(options);
				page._setContentMarkup();

				tbody = content.querySelector('tbody');
				rows  = tbody.querySelectorAll('tr');
				hiddenRows = tbody.querySelectorAll('.hidden');
			});

			afterEach(function() {
				stub.restore();
			});

			it('can get content.', function () {
				// should equal 104
				expect(rows.length).not.to.equal(0);
			});

			it('will only display 10 rows by default', function () {
				expect(rows.length - hiddenRows.length).to.equal(10);
			});

			it('has all 104 locations from event "nc72119970" in the DOM',
					function () {
				expect(rows.length).to.equal(104);
			});

			it('shows all 104 locations after the button click', function () {

				var button = content.querySelector('#showResponses');

				button.dispatchEvent(getClickEvent());

				rows  = tbody.querySelectorAll('tr');
				hiddenRows = tbody.querySelectorAll('.hidden');

				expect(rows.length - hiddenRows.length).to.equal(104);
			});

		});
	});




});