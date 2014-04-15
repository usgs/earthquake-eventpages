/* global define */
define([
	'require',

	'base/EventModulePage',

	'util/Util',
	'util/Xhr',

	'questionview/QuestionView',
	'locationview/LocationView'
], function (
	require,

	EventModulePage,

	Util,
	Xhr,

	QuestionView,
	LocationView
) {
	'use strict';

	var DEFAULTS = {
		language: 'en' // English
	};

	var ID_INCREMENT = 0;

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

	DYFIFormPage.prototype._onSubmit = function (/*event*//*, domElement*/) {
		// TODO ::
	};

	DYFIFormPage.prototype._renderQuestions = function (data) {
		var fragment = document.createDocumentFragment(),
		    baseQuestionsEl = fragment.appendChild(document.createElement('div')),
		    toggleContainer = fragment.appendChild(document.createElement('div')),
		    moreQuestionsEl = fragment.appendChild(document.createElement('div')),
		    submitButton = fragment.appendChild(document.createElement('button')),
		    locationInfo = data.locationInfo,
		    baseQuestions = data.baseQuestions,
		    toggleInfo = data.toggleInfo,
		    moreQuestions = data.moreQuestions,
		    contactInfo = data.contactInfo,
		    questions = {};

		// Handle location question
		__create_location_questions(locationInfo, baseQuestionsEl, questions);

		// Loop over each base question and create a QuestionView
		__create_questions(baseQuestions, baseQuestionsEl, questions);

		// Visual control to show/hide moreQuestionsEl
		__create_toggle_control(toggleInfo, toggleContainer, moreQuestionsEl);

		// Loop over each additional question and create a QuestionView
		__create_questions(moreQuestions, moreQuestionsEl, questions);

		// Handle additional comments and contact information
		__create_text_questions(contactInfo, moreQuestionsEl, questions);

		// Hold on to this for later it is now an object{field: view}
		this._questions = questions;

		// Add a submit button handler
		submitButton.addEventListener('click', (function (dyfiForm) {
			return function (ev) {
				dyfiForm._onSubmit(ev, this);
			};
		})(this));

		// TODO :: More interaction like toggle additional questions section
		//         and progress meter.

		// Put content in place
		this._content.innerHTML = '';
		this._content.appendChild(fragment);
	};


	var __create_location_questions = function (questionInfo, container,
			questions, showOptions) {
		var fragment = document.createDocumentFragment(),
		    label = fragment.appendChild(document.createElement('p')),
		    button = fragment.appendChild(document.createElement('button')),
		    display = fragment.appendChild(document.createElement('span')),
		    curLoc = {},
		    locationView = null;

		label.innerHTML = questionInfo.label;
		button.innerHTML = questionInfo.button;

		locationView = new LocationView({
			callback: function (locationObject) {
				var markup = [],
				    prettyLat = null,
				    prettyLng = null;

				curLoc = locationObject;

				prettyLat = curLoc.lattitude;
				if (prettyLat < 0.0) {
					prettyLng = (-1.0*prettyLat).toFixed(curLoc.confidence) + '&deg;S';
				} else {
					prettyLat = prettyLat.toFixed(curLoc.confidence) + '&deg;N';
				}

				prettyLng = curLoc.longitude;
				if (prettyLng < 0.0) {
					prettyLng = (-1.0*prettyLng).toFixed(curLoc.confidence) + '&deg;W';
				} else {
					prettyLng = prettyLng.toFixed(curLoc.confidence) + '&deg;E';
				}

				if (curLoc.place !== null) {
					markup.push(curLoc.place + '<br/>');
				}

				display.innerHTML = '' +
						((curLoc.place) ? (curLoc.place + '<br/>') : '') +
						prettyLat + ', ' + prettyLng;
			}
		});

		button.addEventListener('click', function () {
			locationView.show(showOptions || {});
		});

		// Add QuestionView-like objects to the list of questions
		questions.ciim_mapLat = {
			getAnswers: function () {
				return {value: curLoc.latitude};
			}
		};
		questions.ciim_mapLon = {
			getAnswers: function () {
				return {value: curLoc.longitude};
			}
		};
		questions.ciim_mapConfidence = {
			getAnswers: function () {
				return {value: curLoc.confidence};
			}
		};

		// Append content to container
		container.appendChild(fragment);
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

	};

	var __create_toggle_control = function (info, control, target) {
		var fragment = document.createDocumentFragment(),
		    button = fragment.appendChild(document.createElement('button')),
		    description = fragment.appendChild(document.createElement('div'));

		button.innerHTML = info.button;
		description.innerHTML = info.description;

		button.addEventListener('click', function () {
			target.classList.toggle('visible');
		});
	};

	var __create_text_questions = function (questionInfo, container, questions) {
		var field = null,
		    view = null;

		for (field in questionInfo) {
			view = __create_text_question_view(questionInfo[field]);

			questions[field] = view;
			container.appendChild(view.el);
		}
	};

	var __create_text_question_view = function (info) {
		var el = document.createElement(info.nodeName || 'div'),
		    label = el.appendChild(document.createElement('label')),
		    input = el.appendChild(document.createElement(info.type || 'input')),
		    id = 'dyfi-text-input-' + (ID_INCREMENT++);

		label.innerHTML = info.label;
		label.for = id;
		input.id = id;

		// A lightweight object to mimic the minimally required API for a
		// QuestionView-like object as needed for the DYFIFormPage
		return {
			el: el,
			getAnswers: function () {
				return {value: input.value, label: info.label};
			}
		};
	};

	return DYFIFormPage;
});