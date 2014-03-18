/* global define, describe, it */
define([
	'chai',

	'dyfi/DYFIMapPage',
	'dyfi/DYFIModule',
	'./Usb000ldeh'
], function (
	chai,

	DYFIMapPage,
	DYFIModule,
	Usb000ldeh
) {
	'use strict';
	var expect = chai.expect;

	var event = Usb000ldeh;
	var module = new DYFIModule({eventDetails: event});
	var module_info = {hash:'maps', title:'Maps', eventDetails:event, module:module};

	describe('DYFIMapPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(DYFIMapPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {

				var c = new DYFIMapPage(module_info);
				expect(c).to.be.an.instanceof(DYFIMapPage);
			});
		});

		describe('_setContentMarkup', function () {
			it('has such a method', function() {
				/* jshint -W030 */
				expect((new DYFIMapPage(module_info))._setContentMarkup).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		describe('_getUseMap', function () {
			it('has such a method', function() {
				/* jshint -W030 */
				expect((new DYFIMapPage(module_info))._getUseMap).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		// testing inheritance from EventModulePage
		describe('_initialize', function () {
			it('has such a method', function() {
				/* jshint -W030 */
				expect((new DYFIMapPage(module_info))._initialize).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		// just testing inheritance from EventModule.js
		describe('destroy()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new DYFIMapPage(module_info)).destroy).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

	});
});
