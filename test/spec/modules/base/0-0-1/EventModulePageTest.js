/* global define, describe, it */
define([
	'chai',

	'base/EventModulePage'
], function (
	chai,

	EventModulePage
) {
	'use strict';
	var expect = chai.expect;
	
	describe('EventModulePage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(EventModulePage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				var c = new EventModulePage();
				expect(c).to.be.an.instanceof(EventModulePage);
			});
		});

		describe('getContent()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModulePage()).getContent).to.not.be.undefined;
				/* jshint +W030 */
			});

			it('returns the content', function () {
				var page = new EventModulePage();

				expect(page.getContent()).to.be.an.instanceOf(Object);
			});
		});

		describe('destroy()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModulePage()).destroy).to.not.be.undefined;
				/* jshint +W030 */
			});
		});
	});
});
