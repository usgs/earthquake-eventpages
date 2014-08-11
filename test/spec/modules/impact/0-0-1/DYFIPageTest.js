/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',

	'impact/DYFIPage',
	'impact/ImpactModule',
	'util/Xhr',

	'./Usb000ldeh',
	'./nc72119970',
	'./cdi_zip'
], function (
	chai,
	sinon,

	DYFIPage,
	ImpactModule,
	Xhr,

	Usb000ldeh,
	nc72119970,
	cdi_zip
) {
	'use strict';
	var expect = chai.expect;

	var event = Usb000ldeh;
	var module = new ImpactModule({eventDetails: event});
	var module_info = {hash:'maps', title:'Maps',
			eventDetails:event, module:module};

	var getClickEvent = function () {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);
		return clickEvent;
	};

	describe('DYFIPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(DYFIPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {

				var c = new DYFIPage(module_info);
				expect(c).to.be.an.instanceof(DYFIPage);
			});
		});

		describe('_setContentMarkup', function () {
			it('has such a method', function() {
				/* jshint -W030 */
				expect((new DYFIPage(module_info))._setContentMarkup).
						to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		// testing inheritance from EventModulePage
		describe('_initialize', function () {
			it('has such a method', function() {
				/* jshint -W030 */
				expect((new DYFIPage(module_info))._initialize).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		// just testing inheritance from EventModule.js
		describe('destroy()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new DYFIPage(module_info)).destroy).to.not.be.undefined;
				/* jshint +W030 */
			});
		});


		describe('getContent', function () {

			var expect = chai.expect,
			    stub, content, tbody, rows, hiddenRows, page,
			    module = new ImpactModule({eventDetails: nc72119970}),
			    module_info = {hash:'dyfi', title:'Did You Feel It?',
							eventDetails:event, module:module};

			beforeEach(function () {
				stub = sinon.stub(Xhr, 'ajax', function (options) {
					var xmlDoc;
					if (window.DOMParser) {
						var parser = new DOMParser();
						xmlDoc = parser.parseFromString(cdi_zip.xml,'text/xml');
					}
					options.success(xmlDoc, {responseXML: xmlDoc});
					// content = DYFIPage.prototype._buildResponsesTable(
					// 		DYFIPage.prototype._buildResponsesArray(xmlDoc));
				});

				page = new DYFIPage(module_info);
				page._setContentMarkup();

				// Select responses tab
				page._tablist._tabs[page._tablist._tabs.length - 1].select();

				content = page._content;
				tbody = content.querySelector('tbody');
				rows  = tbody.querySelectorAll('tr');
			});

			afterEach(function() {
				stub.restore();
			});

			it('can get content.', function () {
				// should equal 104
				expect(rows.length).not.to.equal(0);
			});

			it('has all 104 locations from event "nc72119970" in the DOM',
					function () {
				expect(rows.length).to.equal(104);
			});

			// TODO :: Re-enabled once CORS is configured
			it.skip('shows all 104 locations after the button click', function () {

				var button = content.querySelector('#showResponses');

				button.dispatchEvent(getClickEvent());

				rows  = tbody.querySelectorAll('tr');
				hiddenRows = tbody.querySelectorAll('.hidden');

				expect(rows.length - hiddenRows.length).to.equal(104);
			});

		});
	});
});
