/* global define */
define([
	'require',

	'base/EventModulePage',

	'util/Util',
	'util/Xhr',

	'questionview/QuestionView'
], function (
	require,

	EventModulePage,

	Util,
	Xhr,

	QuestionView
) {
	'use strict';

	var DEFAULTS = {
		language: 'en' // English
	};

	var SUPPORTED_LANGUAGES = ['en'];

	var DYFIFormPage = function (options) {
		this._options = Util.extend({}, DEFAULTS, options || {});

		if (SUPPORTED_LANGUAGES.indexOf(this._options.language) === -1) {
			this._options.language = DEFAULTS.language;
		}

		EventModulePage.call(this, this._options);
	};
	DYFIFormPage.prototype = Object.create(EventModulePage.prototype);

	DYFIFormPage.prototype._setContentMarkup = function () {
		var _this = this;

		// TODO :: Maybe show a loading screen?

		Xhr.ajax({
			url: require.toUrl('impact/dyfi/' + this._options.language + '.json'),
			success: function (data) {
				_this._renderQuestions(data);
			},
			error: function () {
				// TODO :: Update container with error message
			}
		});
	};

	DYFIFormPage.prototype._renderQuestions = function (data) {
		var fragment = document.createDocumentFragment(),
		    baseQuestionsEl = fragment.appendChild(document.createElement('div')),
		    moreQuestionsEl = fragment.appendChild(document.createElement('div')),
		    baseQuestions = data.baseQuestions,
		    moreQuestions = data.moreQuestions,
		    questions = {};

		// Handle location question
		// TODO

		// Loop over each base question and create a QuestionView
		__create_questions(baseQuestions, baseQuestionsEl, questions);

		// Loop over each additional question and create a QuestionView
		__create_questions(moreQuestions, moreQuestionsEl, questions);

		// Hold on to this for later it is now an object{field: view}
		this._questions = questions;

		// Add a submit button
		// TODO

		// TODO :: More interaction like toggle additional questions section
		//         and progress meter.

		// Put content in place
		this._content.innerHTML = '';
		this._content.appendChild(fragment);
	};

	/**
	 * Helper method to iterate over a hash of questionInfo creating a view
	 * for each question, appending the views content to the container, and
	 * holding on to a reference to that view on the question hash (keyed by the
	 * same field as in the questionInfo hash).
	 *
	 * @param questionInfo {Object}
	 *      An object of question information keyed by the field name
	 *      corresponding to that information as expected by the DYFI form
	 *      processing code.
	 * @param container {DOMElement} pass-by-reference
	 *      The container into which the view.el should be appended.
	 * @param questions {Object} pass-by-reference
	 *      The resulting hash of {field: QuestionView}
	 */
	var __create_questions = function (questionInfo, container, questions) {
		var field = null,
		    view = null;

		for (field in questionInfo) {
			view = new QuestionView(questionInfo[field]);

			questions[field] = view;
			container.appendChild(view.el);
		}
	}

	return DYFIFormPage;
});