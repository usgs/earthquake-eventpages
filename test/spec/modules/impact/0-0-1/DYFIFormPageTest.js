/* global define, describe, it, beforeEach, afterEach */
define([
	'chai',
	'sinon',

	'util/Events',

	'impact/ImpactModule',
	'impact/DYFIFormPage',
	'./Usb000ldeh',
	'./nc72119970'
], function (
	chai,
	sinon,

	Events,

	ImpactModule,
	DYFIFormPage,

	Usb000ldeh,
	nc72119970
) {
	'use strict';
	var expect = chai.expect;

	describe('DYFIFormPage test suite.', function () {
		describe('Constructor', function () {
			it('Can be defined', function () {
				/* jshint -W030 */
				expect(DYFIFormPage).not.to.be.undefined;
				/* jshint +W030 */
			});

			it('Can be instantiated', function () {
				var c = new DYFIFormPage();
				expect(c).to.be.an.instanceof(DYFIFormPage);
			});
		});

		describe('_setContentMarkup', function () {
			it('has such a method', function() {
				expect((new DYFIFormPage())).to.respondTo('_setContentMarkup');
			});
		});

		// testing inheritance from EventModulePage
		describe('_initialize', function () {
			it('has such a method', function() {
				expect((new DYFIFormPage())).to.respondTo('_initialize');
			});
		});

		// just testing inheritance from EventModule
		describe('destroy', function () {
			it('has such a method', function () {
				expect((new DYFIFormPage())).to.respondTo('destroy');
			});
		});

		describe('_updateSubmitEnabled', function (done) {
			var form = new DYFIFormPage(),
			    getAnswers = function () { return {'value': true};};

			form._fetchDialog(done);

			function isDisabled () {
				var button = form._dialog._el.querySelector('.dyfi-button-submit');
				return button.hasAttribute('disabled');
			}

			it('submit button is properly enabled/disabled', function () {
				// Initially disabled
				/* jshint -W030 */
				expect(isDisabled()).to.be.true;
				/* jshint +W030 */

				// Stub the questions so it appears the requisite information has
				// been input by the user
				sinon.stub(form._questions.ciim_mapLat, 'getAnswers', getAnswers);
				sinon.stub(form._questions.ciim_mapLon, 'getAnswers', getAnswers);
				sinon.stub(form._questions.fldSituation_felt, 'getAnswers',
						getAnswers);

				form._updateSubmitEnabled();

				/* jshint -W030 */
				expect(isDisabled()).to.be.false;
				/* jshint +W030 */
			});
		});

		describe('Event Bindings...', function () {
			var form = null,
			    spy = null;

			beforeEach(function (done) {
				form = new DYFIFormPage();
				form._event.properties = {'code': 'unknown'};   //work around
				spy = sinon.spy(form, '_updateSubmitEnabled');
				form._fetchDialog(done);
			});

			afterEach(function () {
				spy.restore();
				form._dialog.hide();
			});

			// button clicks trigger locationView.show
			it('listens for clicks on show location button', function () {
				var clickEvent = document.createEvent('MouseEvents');
				var button = form._dialog._el.querySelector(
						'.dyfi-required-questions button');

				clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0);

				button.dispatchEvent(clickEvent);

				expect(spy.callCount).to.equal(1);
			});

			// lat/lon changes trigger form._updateSubmitEnabled
			it('listens for lat/lon changes', function () {
				var questions = form._questions;


				Events.prototype.trigger.call(questions.ciim_mapLat, 'change');
				// _updateSubmitEnabled is called once during _fetchDialog method so
				// start at 2
				expect(spy.callCount).to.equal(2);

				Events.prototype.trigger.call(questions.ciim_mapLon, 'change');
				expect(spy.callCount).to.equal(3);
			});

			// felt yes/no changes trigger form._updateSubmitEnabled
			it('listens for yes/no (felt) changes', function () {
				var questions = form._questions;

				questions.fldSituation_felt.trigger('change');
				// _updateSubmitEnabled is called once during _fetchDialog method so
				// start at 2
				expect(spy.callCount).to.equal(2);
			});
		});

		describe('onSubmit', function (){
			var event = Usb000ldeh;
			var curmodule = null;
			var module_info;
			var page;
			var eventData;
			var hidden_form;

			it('has such a method', function() {
					expect((new DYFIFormPage())).to.respondTo('_onSubmit');
			});
			curmodule = new ImpactModule({eventDetails: nc72119970});
			module_info = {hash:'tellus', title:'Tell Us!',
					eventDetails:event, module:curmodule};

			page = new DYFIFormPage(module_info);
			//form._fetchDialog(done);
			page._showForm();
			eventData = page._collectAnswers();

			it('always has default answers', function() {
				/* jshint -W030 */
				expect(eventData.code).to.exist;
				expect(eventData.network).to.exist;
				expect(eventData.dyficode).to.exist;
				expect(eventData.ciim_time).to.exist;
				expect(eventData.ciim_zip).to.exist;
				expect(eventData.ciim_city).to.exist;
				expect(eventData.ciim_region).to.exist;
				expect(eventData.ciim_country).to.exist;
				/* jshint +W030 */
			});
			hidden_form = page._createHiddenDYFIForm(eventData);
			it('creates a hidden form', function () {
				/* jshint -W030 */
				expect(hidden_form).to.not.be.undefined;
				/* jshint +W030 */
			});
			it('has a form with a dyfiIframe target', function () {
				/* jshint -W030 */
				expect(hidden_form.target).to.equal('dyfiIframe');
				/* jshint +W030 */
			});

		});

	});
});
