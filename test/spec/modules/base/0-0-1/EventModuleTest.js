/* global define, describe, it */
define([
	'chai',

	'base/EventModule'
], function (
	chai,

	EventModule
) {
	'use strict';
	var expect = chai.expect;

	describe('EventModule test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(EventModule).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				var c = new EventModule();
				expect(c).to.be.an.instanceof(EventModule);
			});
		});

		describe('getStub()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModule()).getStub).to.not.be.undefined;
				/* jshint +W030 */
			});

			it('returns the module stub', function () {
				var stub = 'foo', m = new EventModule({stub: stub});
				expect(m.getStub()).to.equal(stub);
			});
		});

		describe('getHeader()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModule()).getHeaderMarkup).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		describe('getFooterMarkup()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModule()).getFooterMarkup).to.not.be.undefined;
				/* jshint +W030 */
			});
		});

		describe('destroy()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModule()).destroy).to.not.be.undefined;
				/* jshint +W030 */
			});
		});
	});
});
