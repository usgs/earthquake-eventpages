/* global define, describe, it */
define([
	'chai',

	'dyfi/DYFIGraphPage',
	'dyfi/DYFIModule',
	'./Usb000ldeh'
], function (
	chai,

	DYFIGraphPage,
	DYFIModule,
	Usb000ldeh
) {
	'use strict';
	var expect = chai.expect;

	var event = Usb000ldeh;
	var module = new DYFIModule({eventDetails: event});
	var module_info = {hash:'graph', title:'Graphs', eventDetails:event, module:module};

	describe('DYFIGraphPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(DYFIGraphPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {

				var c = new DYFIGraphPage(module_info);
				expect(c).to.be.an.instanceof(DYFIGraphPage);
			});
		});

		describe('_setContentMarkup', function () {
			it('has such a method', function() {
				/* jshint -W030 */
				expect((new DYFIGraphPage(module_info))._setContentMarkup).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		// testing inheritance from EventModulePage
		describe('_initialize', function () {
			it('has such a method', function() {
				/* jshint -W030 */
				expect((new DYFIGraphPage(module_info))._initialize).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		// just testing inheritance from EventModule.js
		describe('destroy()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new DYFIGraphPage(module_info)).destroy).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

	});
});
