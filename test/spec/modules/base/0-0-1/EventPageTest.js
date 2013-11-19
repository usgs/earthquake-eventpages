/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',

	'base/EventPage',

	'util/Events',
	'util/Util'
], function (
	chai,
	sinon,

	EventPage,

	Events,
	Util
) {
	'use strict';
	var expect = chai.expect;

	describe('EventPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined.', function () {
				/* jshint -W030 */
				expect(EventPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				var c = new EventPage();
				expect(c).to.be.an.instanceof(EventPage);

				/* jshint -W030 */
				expect(c._container).to.not.be.undefined;
				expect(c._navigation).to.not.be.undefined;
				expect(c._modules).to.not.be.undefined;
				expect(c._event).to.not.be.undefined;
				/* jshint +W030 */

				c.destroy();
			});
		});

		describe('render(hashChangeEvent)', function () {
			var spy = null;
			var hashChangeEvent = {
				type: 'hashchange',
				newURL: '/eventid#module_page',
				oldURL: '/eventid'
			};

			beforeEach(function () {
				spy = sinon.spy(EventPage.prototype, 'render');
			});
			afterEach(function () {
				EventPage.prototype.render.restore();
			});

			it('is called during construction', function () {
				var eventPage = new EventPage();
				expect(spy.callCount).to.equal(1);
				eventPage.destroy();
			});

			it('is called on hashchange', function () {
				var eventPage = new EventPage();
				Events.trigger('hashchange', hashChangeEvent);
				expect(spy.callCount).to.equal(2);
				/* jshint -W030 */
				expect(spy.getCall(1).calledWithExactly(hashChangeEvent)).to.be.true;
				/* jshint +W030 */

				eventPage.destroy();
			});

			it('selects the correct nav item during rendering', function () {
				var eventPage = new EventPage();
				var link1 = eventPage._navigation.appendChild(
						document.createElement('a'));
				var link2 = eventPage._navigation.appendChild(
						document.createElement('a'));

				link1.href = '#module_page';
				link2.href = '/';

				/* jshint -W030 */
				expect(Util.hasClass(link1, 'current-page')).to.be.false;
				expect(Util.hasClass(link2, 'current-page')).to.be.false;
				/* jshing +W030 */

				Events.trigger('hashchange', hashChangeEvent);

				/* jshint -W030 */
				expect(Util.hasClass(link1, 'current-page')).to.be.true;
				expect(Util.hasClass(link2, 'current-page')).to.be.false;
				/* jshing +W030 */

				eventPage.destroy();
			});

			it('hits the cache when appropriate', function (done) {
				var eventPage = new EventPage({
					modules: [
						{
							className: 'base/EventModule',
							options: {
								stub: 'module',
								title: 'Module',
								pages: [
									{
										className: 'base/EventModulePage',
										options: {
											stub: 'page',
											title: 'Page'
										}
									}
								]
							}
						},
						{
							className: 'base/EventModule',
							options: {
								stub: 'something',
								title: 'Something',
								pages: [
									{
										className: 'base/EventModulePage',
										options: {
											stub: 'else',
											title: 'Else'
										}
									}
								]
							}
						}
					]
				});

				var stub = sinon.stub(eventPage, '_render', function () {
					var callCount = stub.callCount;

					if (callCount === 1) {
						expect(eventPage._cachedModules.length).to.equal(1);
						Events.trigger('hashchange', {newURL: '#something_else'});
					} else if (callCount === 2) {
						expect(eventPage._cachedModules.length).to.equal(2);
						Events.trigger('hashchange', hashChangeEvent);
					} else {
						expect(eventPage._cachedModules.length).to.equal(2);

						eventPage._render.restore();
						eventPage.destroy();

						done();
					}
				});

				Events.trigger('hashchange', hashChangeEvent);
			});

			it('honors cache size limits', function (done) {
				var eventPage = new EventPage({
					maxCacheLength: 1,
					modules: [
						{
							className: 'base/EventModule',
							options: {
								stub: 'module',
								title: 'Module',
								pages: [
									{
										className: 'base/EventModulePage',
										options: {
											stub: 'page',
											title: 'Page'
										}
									}
								]
							}
						},
						{
							className: 'base/EventModule',
							options: {
								stub: 'something',
								title: 'Something',
								pages: [
									{
										className: 'base/EventModulePage',
										options: {
											stub: 'else',
											title: 'Else'
										}
									}
								]
							}
						}
					]
				});

				var stub = sinon.stub(eventPage, '_render', function () {
					var callCount = stub.callCount;

					if (callCount === 1) {
						expect(eventPage._cachedModules.length).to.equal(1);
						Events.trigger('hashchange', {newURL: '#something_else'});
					} else if (callCount === 2) {
						expect(eventPage._cachedModules.length).to.equal(1);
						Events.trigger('hashchange', hashChangeEvent);
					} else {
						expect(eventPage._cachedModules.length).to.equal(1);

						eventPage._render.restore();
						eventPage.destroy();

						done();
					}
				});

				Events.trigger('hashchange', hashChangeEvent);
			});
		});

	});
});
