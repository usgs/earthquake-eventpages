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

	var LightWeightPage = function (opts) {
		this._href = opts.href || 'lightweightpage';
		this._displayText = opts.displayText || 'LightWeightPage';
		this.render = function () {};
	};

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
				expect((new EventModule()).getHeader).to.not.be.undefined;
				/* jshint +W030 */
			});

			it('returns the header element', function () {
				var header = document.createElement('div'),
				    module = new EventModule({header: header});

				expect(module.getHeader()).to.equal(header);
			});
		});

		describe('getFooter()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModule()).getFooter).to.not.be.undefined;
				/* jshint +W030 */
			});

			it('returns the footer element', function () {
				var footer = document.createElement('div'),
				    module = new EventModule({footer: footer});

				expect(module.getFooter()).to.equal(footer);
			});
		});

		describe('render()', function () {
			it('has such a method', function () {
				/* jshint -W030 */
				expect((new EventModule()).render).to.not.be.undefined;
				/* jshint +W030 */
			});

			it('finds the correct page for which to render', function (done) {
				var hash = 'somepage';
				var goodPageOpts = {href: hash, displayText: 'good page'};
				var badPageOpts = {href: 'anotherpage', displayText: 'bad page'};
				var goodPage = new LightWeightPage(goodPageOpts);
				var badPage = new LightWeightPage(badPageOpts);
				var module = new EventModule({
					pages: [
						{
							classname: goodPage,
							options: goodPageOpts
						},
						{
							classname: badPage,
							options: badPageOpts
						}
					]
				});

				module.render(hash, function (module, page) {
					expect(page).to.deep.equal(goodPage);
					done();
				});
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
