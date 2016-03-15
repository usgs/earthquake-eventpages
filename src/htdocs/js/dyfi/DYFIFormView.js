'use strict';

var Events = require('util/Events'),
    Formatter = require('core/Formatter'),
    LocationView = require('locationview/LocationView'),
    ModalView = require('mvc/ModalView'),
    QuestionView = require('questionview/QuestionView'),
    Util = require('util/Util'),
    View = require('mvc/View');


var DEFAULTS = {
  language: 'en', //English
  responseURL: '/dyfi/response.php'
};

var ID_INCREMENT = 0;

var DYFI_DISCLAIMER = '<p>' +
    '<strong>Privacy Act Statement</strong>' +
    ' You are not required to provide your personal contact information in' +
    ' order to submit your survey. However, if you do not provide contact' +
    ' information, we may be unable to contact you for additional information' +
    ' to verify your responses. If you do provide contact information, this' +
    ' information will only be used to initiate follow-up communications with' +
    ' you. The records for this collection will be maintained in the' +
    ' appropriate Privacy Act System of Records identified as Earthquake' +
    ' Hazards Program Earthquake Information. (INTERIOR/USGS-2) published' +
    ' at 74 FR 34033 (July 14,2009).' +
    '</p>' +
    '<p>' +
    '<strong>Paperwork Reduction Act Statement</strong>' +
    ' The Paperwork Reduction Act of 1995 (44 U.S.C. 3501 et. seq.) requires' +
    ' us to inform you that this information is being collected to supplement' +
    ' instrumental data and to promote public safety through better' +
    ' understanding of earthquakes. Response to this request is voluntary.' +
    ' Public reporting for this form is estimated to average 6 minutes per' +
    ' response, including the time for reviewing instructions and completing' +
    ' the form. A Federal agency may not conduct or sponsor, and a person is' +
    ' not required to respond to, a collection of information unless it' +
    ' displays a currently valid OMB Control Number. Comments regarding this' +
    ' collection of information should be directed to: Bureau Clearance' +
    ' officer, U.S. Geological Survey, 807 National Center, Reston, VA 20192.' +
    '</p>';

var DYFIFormView = function (options) {
  var _this,
      _initialize,

      _data,
      _event,
      _formatter,
      _questions = {};


  options = Util.extend({}, DEFAULTS, options || {});
  _this = View(options);


  _initialize = function () {
    _data = options.data;
    _event = options.event || null;
    _formatter = options.formatter || Formatter();
    _this.el.classList.add('dyfiform');
  };

  /**
   * Creates Location Questions.
   *    Location questions are not visible to users, instead a button is visible
   *    that calls a LocationView. Which when returns fills in the location
   *    questions.
   *
   * @params questionInfo {object}
   *    locationInfo: {object}
   *      label: {string}
   *      button: {string}
   *      buttonUpdate: {string}
   * @params container {dom element}
   * @params question {object}
   *    An object containing all questionviews.
   */
  _this.create_location_questions = function (questionInfo, container) {
    var section = document.createElement('section'),
        fieldset = section.appendChild(document.createElement('fieldset')),
        legend = fieldset.appendChild(document.createElement('legend')),
        display = fieldset.appendChild(document.createElement('div')),
        button = fieldset.appendChild(document.createElement('button')),
        curLoc = {},
        locationView = null;

    section.classList.add('question');
    legend.innerHTML = questionInfo.label;
    button.innerHTML = questionInfo.button;
    button.classList.add('location-button');

    // Add QuestionView-like objects to the list of questions
    _questions.ciim_mapLat = Events();
    _questions.ciim_mapLat.getAnswers = function () {
      return {value: curLoc.latitude};
    };

    _questions.ciim_mapLon = Events();
    _questions.ciim_mapLon.getAnswers = function () {
      return {value: curLoc.longitude};
    };

    _questions.ciim_mapConfidence = {
      getAnswers: function () {
        return {value: curLoc.confidence};
      }
    };

    _questions.ciim_mapAddress = {
      getAnswers: function () {
        return {value: curLoc.place};
      }
    };

    locationView = LocationView({
      callback: function (locationObject) {
        var markup = [],
            prettyLat = null,
            prettyLng = null;

        curLoc = locationObject;

        prettyLat = curLoc.latitude;
        if (prettyLat < 0.0) {
          prettyLat = (-1.0*prettyLat).toFixed(curLoc.confidence) + '&deg;S';
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

        display.classList.add('location-result', 'alert', 'success');

        display.innerHTML = '<span class="address">' +
            ((curLoc.place) ? (curLoc.place + '</span>') : '') +
            '<span class="coordinates">' +
            prettyLat + ', ' + prettyLng +
            ((curLoc.place) ? '' : '</span>');


        button.innerHTML = questionInfo.buttonUpdate;

        _questions.ciim_mapLat.trigger('change');
        _questions.ciim_mapLon.trigger('change');
      }
    });

    button.addEventListener('click', function () {
      locationView.show({initialLocation: curLoc});
    });

    // Append content to container
    container.appendChild(section);
  };

  /**
   * Creates a text question view.
   *    Creates a questionView specifically as an input type, or any optional
   *    type provided by the type element, normally a text-area.
   *
   * @param info {object}
   *    field: {object}
   *      label: {string}
   *      type: {string}
   *
   * @return {object}
   *    el: element
   *    getAnswers: function
   */
  _this.create_text_question_view = function (info) {
    var el = document.createElement(info.nodeName || 'section'),
        label = el.appendChild(document.createElement('label')),
        input = el.appendChild(document.createElement(info.type || 'input')),
        id = 'dyfi-text-input-' + (ID_INCREMENT++);

    el.classList.add('dyfi-text-input');
    el.classList.add('question');

    label.innerHTML = info.label;
    label.setAttribute('for', id);

    input.id = id;
    input.setAttribute('type', 'text');

    // A lightweight object to mimic the minimally required API for a
    // QuestionView-like object as needed for the DYFIFormView
    return {
      el: el,
      getAnswers: function () {
        return {value: input.value, label: info.label};
      }
    };
  };

  /**
   * Creates a set of text questions.
   *    see create_questions for general overview.
   *    The main difference is that this calls create_text_question_view
   *    to handle questions that use input/Text-Area as it's type.
   */
  _this.create_text_questions = function (questionInfo, container) {
    var field = null,
        view = null;

    for (field in questionInfo) {
      view = _this.create_text_question_view(questionInfo[field]);

      _questions[field] = view;
      container.appendChild(view.el);
    }
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
  _this.create_questions = function (questionInfo, container) {
    var field = null,
        view = null;

    for (field in questionInfo) {
      view = QuestionView(Util.extend(
          {el: document.createDocumentFragment()}, questionInfo[field]));

      _questions[field] = view;
      container.appendChild(view.el);
    }

  };

  /**
   * sets the text of the toggle control, which informs the user whether
   * they need to continue filling the form or not.
   */
  _this.create_toggle_control = function (info, control) {
  control.innerHTML = info.description;
  };

  _this.onSubmit = function () {

  };

  _this.onCancel = function () {

  };

  _this.render = function () {
    var el = _this.el,
        // Form Elements
        baseQuestionsEl,
        cancelButton,
        contactContainer,
        disclaimerEl,
        header,
        moreQuestionsEl,
        submitButton,
        buttons,
        toggleContainer,
        // data information
        baseQuestions = _data.baseQuestions,
        contactInfo = _data.contactInfo,
        eventTime = _data.eventTime,
        moreQuestions = _data.moreQuestions,
        locationInfo = _data.locationInfo,
        toggleInfo = _data.toggleInfo;

    header = el.appendChild(document.createElement('header'));
    baseQuestionsEl = el.appendChild(document.createElement('div'));
    baseQuestionsEl.classList.add('dyfi-required-questions');
    toggleContainer = el.appendChild(document.createElement('div'));
    toggleContainer.classList.add('dyfi-optional-callout', 'alert', 'info');
    moreQuestionsEl = el.appendChild(document.createElement('div'));
    moreQuestionsEl.classList.add('dyfi-optional-questions');
    buttons = el.appendChild(document.createElement('fieldset'));
    buttons.classList.add('dyfi-buttions');
    submitButton = buttons.appendChild(document.createElement('button'));
    submitButton.classList.add('dyfi-button-submit', 'green');
    cancelButton = buttons.appendChild(document.createElement('button'));
    cancelButton.classList.add('dyfi-button-cancel');
    contactContainer = document.createElement('div');
    contactContainer.classList.add('dyfi-contact-questions', 'alert');
    disclaimerEl = document.createElement('a');

    header.innerHTML = '<h3 class="felt-header">Felt Report</h3>' +
        '<div class="omb-number">OMB No. 1028-0048' +
        '<br/>Expires 05/31/2018' +
        '</div>';

    // Handle location question
    _this.create_location_questions(locationInfo, baseQuestionsEl);

    if (!_event) {
        _this.create_text_questions(eventTime, baseQuestionsEl);
    }

    // Loop over each base question and create a QuestionView
    _this.create_questions(baseQuestions, baseQuestionsEl);

      // Visual control to show/hide moreQuestionsEl
    _this.create_toggle_control(toggleInfo, toggleContainer);

    // Loop over each additional question and create a QuestionView
    _this.create_questions(moreQuestions, moreQuestionsEl);

    // Handle additional comments
    _this.create_text_questions(_data.comments, moreQuestionsEl);

    // Handle contact information
    contactContainer.innerHTML = '<legend>Contact Information' +
        ' <small>(optional)</small></legend>';
    _this.create_text_questions(contactInfo, contactContainer);
    moreQuestionsEl.appendChild(contactContainer);

    // Add disclaimer link
    disclaimerEl.className = 'dyfi-disclaimer';
    disclaimerEl.href = '/research/dyfi/disclaimer.php#DYFIFormDisclaimer';
    disclaimerEl.innerHTML = 'PRA - Privacy Statement';
    disclaimerEl.addEventListener('click', function (e) {
      var dialog = ModalView(DYFI_DISCLAIMER, {
        title: 'PRA - Privacy Statement',
        closable: false,
        buttons: [
          {
            text: 'OK',
            classes: ['green'],
            callback: function () {
              dialog.hide();
              dialog.destroy();
              dialog = null;
            }
          }
        ]
      }).show();
      e.preventDefault();
    });

    contactContainer.appendChild(disclaimerEl);

    submitButton.innerHTML = 'Submit';
    submitButton.addEventListener('click', _this.onSubmit());
    submitButton.setAttribute('disabled', 'disabled');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', _this.onCancel());

    // When location or felt response changes update submit button enabled
    _questions.ciim_mapLat.on('change', _this.updateSubmitEnabled);
    _questions.ciim_mapLon.on('change', _this.updateSubmitEnabled);
    _questions.fldSituation_felt.on('change', _this.updateSubmitEnabled);
    if (!_this.event) {
      _questions.ciim_time.el.addEventListener('change',
          _this.updateSubmitEnabled);
    }

    // TODO :: More interaction like progress meter.

  };

  /**
   * Checks if the required answers have been filled in, if they are
   * it enables the Submit button.
   */
  _this.updateSubmitEnabled = function () {
    var latAns = _questions.ciim_mapLat.getAnswers(),
        lonAns = _questions.ciim_mapLon.getAnswers(),
        feltAns = _questions.fldSituation_felt.getAnswers(),
        button = _this.el.querySelector('.dyfi-button-submit'),
        timeAns = {value: 'defined'};

    if (!_this.event) {
      // time is required
      timeAns = _questions.ciim_time.getAnswers();
    }

    // Check current form status. Enable/disable button
    if (latAns === null || typeof latAns.value === 'undefined' ||
        lonAns === null || typeof lonAns.value === 'undefined' ||
        feltAns === null || typeof feltAns.value === 'undefined' ||
        timeAns === null || timeAns.value === '') {
      button.setAttribute('disabled', 'disabled');
    } else {
      button.removeAttribute('disabled');
    }
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = DYFIFormView;
