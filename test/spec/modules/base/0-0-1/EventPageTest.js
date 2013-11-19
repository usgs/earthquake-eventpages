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

	var createEventPage = function (options) {
		return new EventPage(Util.extend({}, {
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
		}, options || {}));
	};

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
				newURL: '/?eventid=some_event#module_page',
				oldURL: '/?eventid=some_event'
			};

			beforeEach(function () {
				spy = sinon.spy(EventPage.prototype, 'render');
			});
			afterEach(function () {
				EventPage.prototype.render.restore();
			});

			it('selects the correct nav item during rendering', function () {
				var eventPage = createEventPage();

				Events.trigger('hashchange', hashChangeEvent);

				expect(eventPage._navigation.querySelector('.current-page')
						.getAttribute('href')).to.equal('#module_page');

				eventPage.destroy();
			});

			it('hits the cache when appropriate', function (done) {
				var eventPage = createEventPage();

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
				var eventPage = createEventPage({maxCacheLength: 1});

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
