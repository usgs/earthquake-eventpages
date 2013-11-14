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

	// Lightweight classes that stub the API for modules and pages. Just used
	// for testing.

	var LightWeightPage = function () {
		this.getContent = function () { return document.createElement('div'); };
		this.destroy = function () {};
	};
	var LightWeightModule = function (stub) {
		var _stub = stub || 'stub_' + (new Date()).getTime();

		this.getStub = function () { return _stub; };
		this.getHeader = function () { return document.createElement('div'); };
		this.getFooter = function () { return document.createElement('div'); };
		this.render = function (hash, callback) {
			callback(this, new LightWeightPage());
		};
		this.getNavigationMarkup = function () {};
		this.destroy = function () {};
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
				expect(c._event).to.not.be.undefined;
				expect(c._modules).to.not.be.undefined;
				expect(c._maxCacheLength).to.not.be.undefined;
				expect(c._renderCache).to.not.be.undefined;
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

			it('hits the cache when appropriate', function () {
				var module1 = new LightWeightModule('module'),
				    module2 = new LightWeightModule('another'),
				    spy1 = sinon.spy(module1, 'render'),
				    spy2 = sinon.spy(module2, 'render');

				var eventPage = new EventPage({
					cacheLength: 2,
					modules: [module1, module2]
				});

				Events.trigger('hashchange', hashChangeEvent); // Prime the cache
				expect(spy1.callCount).to.equal(1);
				expect(spy2.callCount).to.equal(0);

				Events.trigger('hashchange', {newURL: '#another_section'});
				expect(spy1.callCount).to.equal(1);
				expect(spy2.callCount).to.equal(1);

				// It should not call render on the module1 again since it should be
				// cached already from previous rendering
				Events.trigger('hashchange', hashChangeEvent);
				expect(spy1.callCount).to.equal(1);
				expect(spy2.callCount).to.equal(1);

				eventPage.destroy();
			});

			it('honors cache size limits', function () {
				var module1 = new LightWeightModule('module'),
				    module2 = new LightWeightModule('another'),
				    spy1 = sinon.spy(module1, 'render'),
				    spy2 = sinon.spy(module2, 'render');

				var eventPage = new EventPage({
					cacheLength: 1,
					modules: [module1, module2]
				});

				Events.trigger('hashchange', hashChangeEvent); // Prime the cache
				expect(spy1.callCount).to.equal(1);
				expect(spy2.callCount).to.equal(0);

				Events.trigger('hashchange', {newURL: '#another_section'});
				expect(spy1.callCount).to.equal(1);
				expect(spy2.callCount).to.equal(1);

				// It should call render on the module1 again since the cache is so
				// small and module1's result should have been purged.
				Events.trigger('hashchange', hashChangeEvent);
				expect(spy1.callCount).to.equal(2);
				expect(spy2.callCount).to.equal(1);

				eventPage.destroy();
			});
		});

	});
});
