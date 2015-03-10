'use strict';

var EventModulePage = require('base/EventModulePage'),
    Events = require('util/Events'),
    L = require('leaflet'),
    LocationView = require('locationview/LocationView'),
    ModalView = require('mvc/ModalView'),
    QuestionView = require('questionview/QuestionView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


// TODO: remove this when loading leaflet using Util.loadScript
L.Icon.Default.imagePath = 'lib/leaflet/images';


var DEFAULTS = {
  language: 'en', // English
  responseURL: '/dyfi/response.php'
};

var ID_INCREMENT = 0;

var SUPPORTED_LANGUAGES = ['en'];
var FORM_VERSION = '1.3';
var _DYFIIFRAME = null;


var __create_location_questions = function (questionInfo, container,
    questions) {
  var section = document.createElement('section'),
      label = section.appendChild(document.createElement('label')),
      button = section.appendChild(document.createElement('button')),
      display = section.appendChild(document.createElement('div')),
      curLoc = {},
      locationView = null;

  section.classList.add('question');
  label.innerHTML = questionInfo.label;
  button.innerHTML = questionInfo.button;
  button.classList.add('location-button');

  // Add QuestionView-like objects to the list of questions
  questions.ciim_mapLat = Events();
  questions.ciim_mapLat.getAnswers = function () {
    return {value: curLoc.latitude};
  };

  questions.ciim_mapLon = Events();
  questions.ciim_mapLon.getAnswers = function () {
    return {value: curLoc.longitude};
  };

  questions.ciim_mapConfidence = {
    getAnswers: function () {
      return {value: curLoc.confidence};
    }
  };

  questions.ciim_mapAddress = {
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

      display.classList.add('location-result', 'alert', 'success');

      display.innerHTML = '<span class="address">' +
          ((curLoc.place) ? (curLoc.place + '</span>') : '') +
          '<span class="coordinates">' +
          prettyLat + ', ' + prettyLng +
          ((curLoc.place) ? '' : '</span>');


      button.innerHTML = questionInfo.buttonUpdate;

      questions.ciim_mapLat.trigger('change');
      questions.ciim_mapLon.trigger('change');
    }
  });

  button.addEventListener('click', function () {
    locationView.show({initialLocation: curLoc});
  });

  // Append content to container
  container.appendChild(section);
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
    view = QuestionView(Util.extend(
        {el: document.createDocumentFragment()}, questionInfo[field]));

    questions[field] = view;
    container.appendChild(view.el);
  }

};

var __create_toggle_control = function (info, control) {
  control.innerHTML = info.description;
};

var __create_text_question_view = function (info) {
  var el = document.createElement(info.nodeName || 'section'),
      label = el.appendChild(document.createElement('label')),
      input = el.appendChild(document.createElement(info.type || 'input')),
      id = 'dyfi-text-input-' + (ID_INCREMENT++);

  el.classList.add('dyfi-text-input');
  el.classList.add('question');

  label.innerHTML = info.label;
  label.setAttribute('for', id);

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

var __create_text_questions = function (questionInfo, container, questions) {
  var field = null,
      view = null;

  for (field in questionInfo) {
    view = __create_text_question_view(questionInfo[field]);

    questions[field] = view;
    container.appendChild(view.el);
  }
};

var DYFIFormPage = function (options) {
  this._options = Util.extend({}, DEFAULTS, options || {});

  if (this._options.hasOwnProperty('eventConfig') &&
      this._options.eventConfig.hasOwnProperty('DYFI_RESPONSE_URL')) {
    this._options.responseURL = this._options.eventConfig.DYFI_RESPONSE_URL;
  }

  this._dialog = null;

  if (SUPPORTED_LANGUAGES.indexOf(this._options.language) === -1) {
    this._options.language = DEFAULTS.language;
  }

  this._showForm = this._showForm.bind(this);

  this._updateSubmitEnabled = this._updateSubmitEnabled.bind(this);
  EventModulePage.call(this, this._options);
};

DYFIFormPage.prototype = Object.create(EventModulePage.prototype);


DYFIFormPage.prototype.onAdd = function () {
  if (this._dialog !== null && this._dialog !== 'pending') {
    this._dialog.show();
  }
};

DYFIFormPage.prototype.onRemove = function () {
  this._dialog.hide(true);
};


DYFIFormPage.prototype.destroy = function () {
  this._questions.ciim_mapLat.off('change', this._updateSubmitEnabled);
  this._questions.ciim_mapLon.off('change', this._updateSubmitEnabled);
  this._questions.fldSituation_felt.off('change', this._updateSubmitEnabled);
  if (!this._event) {
    this._questions.ciim_time.el.removeEventListener('change',
        this._updateSubmitEnabled);
  }

  if (this._dialog && this._dialog.destroy &&
      typeof this._dialog.destroy === 'function') {
    this._dialog.destroy();
  }

  if (this._dyfiHiddenForm) {
    this._dyfiHiddenForm.parentNode.removeChild(this._dyfiHiddenForm);
    this._dyfiHiddenForm = null;
  }

  this._dialog = null;
};

DYFIFormPage.prototype._setHeaderMarkup = function () {
  this._header.innerHTML = '<h2>Did you feel it? Tell Us!</h2>';
};

/**
 * Content is already generated in the _setContentMarkup method. This method
 * returns that created markup, however since this is a ModalView form of a
 * page, this page must manually show the form again.
 *
 */
DYFIFormPage.prototype.getContent = function () {
  this._showForm();
  return EventModulePage.prototype.getContent.apply(this, arguments);
};

DYFIFormPage.prototype._setContentMarkup = function () {
  // TODO :: Make this better.
  this._content.innerHTML = '<div class="dyfiform-content">' +
      'A dialog should automatically appear&hellip;</div>';
};

DYFIFormPage.prototype._showForm = function () {
  var content;

  if(_DYFIIFRAME) {
    content = this._content.querySelector('.dyfiform-content');
    content.innerHTML = '<p class="alert success">Thank you for submitting' +
        'your experience.</p>';
    return;
  }

  if (this._dialog === null) {
    this._fetchDialog(this._showForm);
  } else if (this._dialog === 'pending') {
    // Already fetching labels via XHR from previous call, but not ready yet.
    // Just wait until ready. XHR will attempt to open when ready.
  } else {
    // Show form if ready
    this._dialog.show();
  }
};

DYFIFormPage.prototype._hideForm = function () {
  this._dialog.hide();
  window.history.go(-1);
};

DYFIFormPage.prototype._updateSubmitEnabled = function () {
  var questions = this._questions,
      latAns = questions.ciim_mapLat.getAnswers(),
      lonAns = questions.ciim_mapLon.getAnswers(),
      feltAns = questions.fldSituation_felt.getAnswers(),
      button = this._dialog.el.querySelector('.dyfi-button-submit'),
      timeAns = {value: 'defined'};

  if (!this._event) {
    // time is required
    timeAns = questions.ciim_time.getAnswers();
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

DYFIFormPage.prototype._onSubmit = function (/*event*//*, domElement*/) {
  var eventData,
      contentdiv,
      iframe;

  eventData = this._collectAnswers();

  contentdiv = document.querySelector('.dyfiform-content');
  iframe = document.createElement('iframe');
  iframe.setAttribute('name', 'dyfiIframe');
  iframe.setAttribute('id', 'dyfiIframe');
  iframe.setAttribute('class', 'dyfiIframe');

  _DYFIIFRAME = iframe;

  contentdiv.innerHTML = '';
  contentdiv.appendChild(iframe);

  this._dyfiHiddenForm = this._createHiddenDYFIForm(eventData);
  document.body.appendChild(this._dyfiHiddenForm);
  this._dyfiHiddenForm.submit();

  this._dialog.hide();
};

DYFIFormPage.prototype._onCancel = function (/*event*//*, domElement*/) {
  this._hideForm();
};

  //Collect answers from questionViews into an object.
//Make certain properties required by response.php are included.
DYFIFormPage.prototype._collectAnswers = function() {
  var eventData = {},
      cnt,
      questions = this._questions,
      question_other,
      answers;

  //Use the event properties passed in.
  if (this._event) {
    //if there's a code,  use the time passed in.  Otherwise it's in a question.
    eventData.ciim_time = Math.floor(this._event.properties.time/1000);

    eventData.code = this._event.properties.code;
    eventData.network = this._event.properties.net;
    eventData.dyficode = ('dyfi' in this._event.properties.products ?
        this._event.properties.products.dyfi[0].code :
        'unknown');
  //or set event properties to unknown.
  } else {
    eventData.code = 'unknown';
    eventData.network = 'unknown';
    eventData.dyficode = 'unknown';
  }

  for (var question in questions) {
    answers = questions[question].getAnswers();
    if (answers instanceof Array) {
      eventData[question] = [];
      for(cnt = 0; cnt < answers.length; cnt++) {
        eventData[question].push(answers[cnt].value);
      }
    }
    else if (answers instanceof Object && answers.value !== undefined) {
      eventData[question] = answers.value;
      if(answers.value ==='other') {
        question_other = question + '_Other';
        eventData[question_other] = answers.otherValue;
      }
    }
    else {
      eventData[question] = '';
    }
  }

  //make certain we have required properties for response.php
  //if fldSituation_felt, ciim_mapLat, & ciim_mapLon are empty
  //we want response.php to fail.
  if (!eventData.hasOwnProperty('ciim_zip')) {
    eventData.ciim_zip ='';
  }
  if (!eventData.hasOwnProperty('ciim_city')) {
    eventData.ciim_city ='';
  }
  if (!eventData.hasOwnProperty('ciim_region')) {
    eventData.ciim_region ='';
  }
  if (!eventData.hasOwnProperty('ciim_country')) {
    eventData.ciim_country ='';
  }
  if (this._options.language) {
    eventData.language = this._options.language;
  }
  else {
    eventData.language = 'en';
  }
  //if d_text isn't an array,  get rid of it.
  if (eventData.hasOwnProperty('d_text') &&
      !(eventData.d_text instanceof Array)) {
    delete eventData.d_text;
  }

  return eventData;
};

DYFIFormPage.prototype._createInput = function(name, value) {
  var node = document.createElement('input');
  node.setAttribute('hidden', 'hidden');
  node.setAttribute('name', name);
  node.setAttribute('value', value);

  return node;
};

//Set up Hidden form to submit questions/answers.
DYFIFormPage.prototype._createHiddenDYFIForm = function(eventData) {
  var hiddenForm = document.createElement('form'),
      values,
      cnt;

  hiddenForm.name = 'frmCiim';
  hiddenForm.method = 'post';
  hiddenForm.appendChild(this._createInput('windowtype', 'enabled'));
  hiddenForm.action = this._options.responseURL;
  hiddenForm.target = 'dyfiIframe';
  hiddenForm.id = 'frmCiim';
  hiddenForm.style.display = 'none';

  //hiddenForm.appendChild(_createInput('ciim_time', eventData.timestamp));
  hiddenForm.appendChild(this._createInput('form_version', FORM_VERSION));
  hiddenForm.appendChild(this._createInput('ciim_report', 'Submit Form'));

  for (var data in eventData) {
    values = eventData[data];
    if (values instanceof Array) {
      for(cnt = 0; cnt < values.length; cnt++) {
        //there's got to be a better way, but for now I just append []'s.
        hiddenForm.appendChild(this._createInput(data+'[]', values[cnt]));
      }
    }
    else {
      hiddenForm.appendChild(this._createInput(data, values));
    }
  }

  return hiddenForm;
};

DYFIFormPage.prototype._fetchDialog = function (callback) {
  var _this = this;

  this._dialog = 'pending';

  // Fetch form text information (labels etc...) and then...
  Xhr.ajax({
    url: 'modules/impact/dyfi/' + this._options.language + '.json',
    success: function (data) {
      // ... create the modal dialog
      _this._createDialog(data);

      // ... and show it!
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    error: function () {
      // TODO :: Update container with error message
    }
  });
};

DYFIFormPage.prototype._createDialog = function (data) {
  this._dialog = new ModalView(this._renderQuestions(data), {
    title: '',
    classes: ['dyfi-form'],
    closable: false,
    buttons: [
      {
        text: data.submit.label,
        classes: ['dyfi-button-submit', 'green'],
        callback: this._onSubmit.bind(this)
      },
      {
        text: 'Cancel',
        classes: ['dyfi-button-cancel'],
        callback: this._onCancel.bind(this)
      }
    ]
  });

  this._updateSubmitEnabled();
};

DYFIFormPage.prototype._renderQuestions = function (data) {
  var fragment = document.createDocumentFragment(),
      header = fragment.appendChild(document.createElement('header')),
      baseQuestionsEl = fragment.appendChild(document.createElement('div')),
      toggleContainer = fragment.appendChild(document.createElement('div')),
      moreQuestionsEl = fragment.appendChild(document.createElement('div')),
      contactContainer = document.createElement('div'),
      disclaimerEl = document.createElement('a'),
      locationInfo = data.locationInfo,
      baseQuestions = data.baseQuestions,
      eventTime = data.eventTime,
      toggleInfo = data.toggleInfo,
      moreQuestions = data.moreQuestions,
      contactInfo = data.contactInfo,
      questions = {};

  baseQuestionsEl.classList.add('dyfi-required-questions');
  toggleContainer.classList.add('dyfi-optional-callout', 'alert');
  moreQuestionsEl.classList.add('dyfi-optional-questions');
  contactContainer.classList.add('dyfi-contact-questions', 'alert');

  header.innerHTML = '<h3 class="felt-header">Felt Report</h3>' +
      '<div class="omb-number">OMB No. 1028-0048' +
      '<br/>Expires 05/31/2015' +
      '</div>';

  // Handle location question
  __create_location_questions(locationInfo, baseQuestionsEl, questions);

  //TODO confirm this works with whatever scheme we come up to call the form with an unknown event.
  if (!this._event) {
      __create_text_questions(eventTime, baseQuestionsEl, questions);
  }

  // Loop over each base question and create a QuestionView
  __create_questions(baseQuestions, baseQuestionsEl, questions);

  // Visual control to show/hide moreQuestionsEl
  __create_toggle_control(toggleInfo, toggleContainer);

  // Loop over each additional question and create a QuestionView
  __create_questions(moreQuestions, moreQuestionsEl, questions);

  // Handle additional comments
  __create_text_questions(data.comments, moreQuestionsEl, questions);

  // Handle contact information
  contactContainer.innerHTML = '<legend>Contact Information' +
      '<span class="subheader"> (optional)</span></legend>';
  __create_text_questions(contactInfo, contactContainer, questions);
  moreQuestionsEl.appendChild(contactContainer);

  // Add disclaimer link
  disclaimerEl.className = 'dyfi-disclaimer';
  disclaimerEl.href = '/research/dyfi/disclaimer.php#DYFIFormDisclaimer';
  disclaimerEl.innerHTML = 'Disclaimers';
  contactContainer.appendChild(disclaimerEl);

  // Hold on to this for later it is now an object{field: view}
  this._questions = questions;


  // When location or felt response changes update submit button enabled
  this._questions.ciim_mapLat.on('change', this._updateSubmitEnabled);
  this._questions.ciim_mapLon.on('change', this._updateSubmitEnabled);
  this._questions.fldSituation_felt.on('change', this._updateSubmitEnabled);
  if (!this._event) {
    this._questions.ciim_time.el.addEventListener('change',
        this._updateSubmitEnabled);
  }

  // TODO :: More interaction like progress meter.


  return fragment;
};


module.exports = DYFIFormPage;
