/* global define, describe, it */
define([
	'chai',

	'impact/ImpactModule'
], function (
	chai,

	DYFIModule
) {
	'use strict';
	var expect = chai.expect;

	describe('DYFIModule test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(DYFIModule).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				var c = new DYFIModule();
				expect(c).to.be.an.instanceof(DYFIModule);
			});
		});

		describe('destroy()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new DYFIModule()).destroy).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

	});
});