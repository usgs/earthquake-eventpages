/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',

	'base/EventPage',
	'base/EventModule',

	'util/Events',
	'util/Util',

	'./usc000lnnb'
], function (
	chai,
	sinon,

	EventPage,
	EventModule,

	Events,
	Util,

	eventData
) {
	'use strict';
	var expect = chai.expect;

	var createEventPage = function (options) {
		return new EventPage(Util.extend({}, {
			defaultPage: 'mod1_page1',
			modules: [
				new EventModule({
					title: 'Module One',
					hash: 'mod1',
					pages: [
						{
							className: 'base/EventModulePage',
							options: {
								title: 'Page 1',
								hash: 'page1',
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								title: 'Page 1',
								hash: 'page1',
							}
						}
					]
				}),
				new EventModule({
					title: 'Module Two',
					hash: 'mod2',
					pages: [
						{
							className: 'base/EventModulePage',
							options: {
								title: 'Page 1',
								hash: 'page1',
							}
						},
						{
							className: 'base/EventModulePage',
							options: {
								title: 'Page 1',
								hash: 'page1',
							}
						}
					]
				})
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
				expect(c._eventDetails).to.not.be.undefined;
				/* jshint +W030 */

				c.destroy();
			});
		});

		describe('render(hashChangeEvent)', function () {
			var eventPage = null;

			var hashChangeEvent1 = {
				type: 'hashchange',
				newURL: '/?eventid=some_event#mod2_page1',
				oldURL: '/?eventid=some_event#mod1_page1'
			};

			var hashChangeEvent2 = {
				type: 'hashchange',
				newURL: '/?eventid=some_event#mod1_page1',
				oldURL: '/?eventid=some_event#mod2_page1'
			};

			beforeEach(function () {
				// It is important the current window hash is always empty when we start
				window.location.hash = '';
			});

			afterEach(function () {
				// Destroy the eventPage after each test if it was used
				if (eventPage && eventPage.destroy) {
					eventPage.destroy();
				}
			});

			it('selects the correct nav item during rendering', function (done) {
				// defaultPage = null so we don't try to render during initialization
				eventPage = createEventPage({defaultPage: null});

				Events.trigger('hashchange', hashChangeEvent1);

				expect(eventPage._navigation.querySelector('.current-page')
						.tagName).to.equal('STRONG');
				expect(eventPage._navigation.querySelector('.current-page')
						.innerHTML).to.equal('Page 1');

				eventPage.on('render', function () { done(); });
			});

			it('hits the cache when appropriate', function (done) {
				// defaultPage = null so we don't try to render during initialization
				eventPage = createEventPage({defaultPage: null});

				var spy = sinon.spy(eventPage, 'getModule'),
				    listener = null, changeCount = 0, hashChange = null;

				listener = function () {
					changeCount += 1;

					expect(spy.callCount).to.equal(Math.min(changeCount, 2));

					if (changeCount % 2 === 0) {
						hashChange = hashChangeEvent1;
					} else {
						hashChange = hashChangeEvent2;
					}

					if (changeCount < 5) {
						Events.trigger('hashchange', hashChange);
					} else {
						spy.restore();
						done();
					}
				};

				eventPage.on('render', listener);
				hashChange = hashChangeEvent1;
				Events.trigger('hashchange', hashChange);
			});

			it('honors cache size limits', function (done) {
				eventPage = createEventPage({defaultPage: null, maxCacheLength: 1});
				var listener = null, changeCount = 0, hashChange = null;

				listener = function () {
					changeCount += 1;

					expect(eventPage._cache.length).to.equal(1);

					if (changeCount % 2 === 0) {
						hashChange = hashChangeEvent1;
					} else {
						hashChange = hashChangeEvent2;
					}

					if (changeCount < 5) {
						Events.trigger('hashchange', hashChange);
					} else {
						done();
					}
				};

				eventPage.on('render', listener);
				hashChange = hashChangeEvent1;
				Events.trigger('hashchange', hashChange);
			});
		});

		describe('getAttribution', function () {
			it('can get attribution', function () {
				var eventPage = createEventPage({ eventDetails: eventData }),
				    attribution = eventPage._footer.querySelector('ol.contributors');
				expect(attribution.childNodes.length).to.not.equal(0);
			});
		});

	});
});
