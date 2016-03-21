'use strict';


var DYFIFormView = require('mvc/View'), // TODO :: Use actual DYFIFormView
    Events = require('util/Events'),
    ModalView = require('mvc/ModalView'),
    Model = require('mvc/Model'),
    Module = require('core/Module'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _ID,
    _TITLE,
    _hasContent,
    _parseMessageAsHtml,
    _parseMessageAsString;

_ID = 'tellus';
_TITLE = 'Tell Us!';


_parseMessageAsHtml = function (response) {
  var h;

  h = document.createElement('html');
  h.innerHTML = response;

  return h.querySelector('dl').outerHTML;
};

_parseMessageAsString = function (response) {
  var endIdx,
      startIdx;

  startIdx = response.indexOf('<dl>');
  endIdx = response.indexOf('</dl>');

  if (startIdx === -1 || endIdx === -1) {
    return null;
  }

  return response.substring(startIdx, endIdx) + '</dl>';
};

/**
 * Determines if this module has content. Scenario events do will not
 * get this module.
 *
 * @param eventPageModel
 *     The model use by the {EventPage} class.
 *
 * @return {Boolean}
 *     True if the module should be included. False otherwise.
 */
_hasContent = function (eventPageModel) {
  var config;

  config = eventPageModel.get('config');

  return config.hasOwnProperty('scenarioMode') ?
    (!config.scenarioMode) : true;
};

var _DEFAULTS = {
  DYFI_RESPONSE_URL: '/products/dyfi/response.json'
};


/**
 * Module for displaying the {DYFIFormView}. This module handles the modal
 * dialog in which the view is rendered. It communicates with the view through
 * the model provided to the view in order to get the form values when the
 * submit button is clicked. This module deals with form submission while the
 * view itself deals with user inputs.
 *
 * @param options {Object}
 *     Configuration options for this module. See _initialize method
 *     documentation for details.
 */
var DYFIFormModule = function (options) {
  var _this,
      _initialize,

      _formModel,
      _modal,
      _submitResult,
      _submitUrl,
      _view;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (options) {
    var config;

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    config = _this.model.get('config');
    _submitUrl = (config && config.DYFI_RESPONSE_URL) ?
        config.DYFI_RESPONSE_URL : options.DYFI_RESPONSE_URL;
    _submitResult = null;

    _this.content.addEventListener('click', _this.onContentClick);

    _formModel = Model({

    });

    _formModel.on('change', 'onFormChange', _this);

    _view = DYFIFormView({
      eventTime: '', // TODO :: Get actual event time off _this.model
      language: 'en'
      // TODO :: Also include eventid in some way?
    });
    // TODO :: Remove this once DYFIFormView is ready
    _view.render = function () {
      var blankLines = [];
      for (var i = 0; i < 1000; i++) {
        blankLines.push('<br/>');
      }
      _view.el.innerHTML = 'I am a form view!' + blankLines.join('');
    };

    _modal = ModalView(_view.el, {
      buttons: [
        {
          callback: _this.onSubmit,
          classes: ['green', 'dyfi-submit-button'],
          text: 'Submit'
        },
        {
          callback: _this.onCancel,
          classes: ['dyfi-cancel-button'],
          text: 'Cancel'
        }
      ],
      title: null // No title. View should render title and OMB number.
    });
  };


  _this.destroy = Util.compose(function () {
    _this.content.removeEventListener('click', _this.onContentClick);

    _formModel.off('change', 'onFormChange', _this);

    _formModel.destroy();
    _view.destroy();
    _modal.destroy();

    _formModel = null;
    _modal = null;
    _submitResult = null;
    _submitUrl = null;
    _view = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.hideForm = function () {
    _modal.hide();
  };

  _this.onCancel = function () {
    // Close the modal
    _this.hideForm();

    // Notify the EventPage this view would like to go back
    Events.trigger('back');

    // TODO :: Remove this once #368 is implemented
    window.location.hash = '#';
  };

  _this.onContentClick = function (evt) {
    if (evt.target && evt.target.classList.contains('show-form')) {
      _this.showForm();
    }
  };

  /**
   * Callback when the _formModel is changed. Checks to see if required
   * fields are complete and if so, enables submit button.
   *
   */
  _this.onFormChange = function () {
    var submitButton;

    submitButton = document.querySelector('.dyfi-submit-button');

    if (submitButton) {
      if (!_formModel.get('ciim_mapLat') ||
          !_formModel.get('ciim_mapLon') ||
          !_formModel.get('ciim_time') ||
          !_formModel.get('fldSituation_felt')) {
        // A required field is missing, disable submit button
        // TODO :: Enable this...
        // submitButton.setAttribute('disabled', 'disabled');
      } else {
        submitButton.removeAttribute('disabled');
      }
    }
  };

  _this.onSubmit = function () {
    var data;

    _submitResult = null;

    // TODO :: Remove this once a DYFIForm is ready
    data = Util.extend({
      'ciim_mapLat': 35.0,
      'ciim_mapLon': -118.0,
      'ciim_time': (new Date()).toUTCString(),
      'fldSituation_felt': 'no'
    }, _formModel.get());

    Xhr.ajax({
      method: 'POST',
      data: data,
      error: _this.onSubmitError,
      url: _submitUrl,
      success: _this.onSubmitSuccess
    });

    _modal.hide();
  };

  _this.onSubmitError = function (error/*, xhr*/) {
    _submitResult = {
      error: error
    };

    _this.render();
  };

  _this.onSubmitSuccess = function (response/*, xhr*/) {
    var message;

    try {
      message = _parseMessageAsHtml(response);
    } catch (e) {
      message = _parseMessageAsString(response);
    }

    if (message) {
      _submitResult = {
        success: message
      };
    } else {
      _submitResult = {
        error: 'Required entries not provided! Please re-submit the form ' +
            'after answering all required questions.'
      };
    }

    _this.render();
  };

  _this.render = function () {
    var buttonMarkup;

    buttonMarkup = '<button class="show-form">Show Form</button>';

    _this.header.innerHTML = '<a class="back-to-summary-link" ' +
        'href="#">Back to General</a>'; // TODO :: Should this go to impact summary?
    _this.footer.innerHTML = '';

    if (_submitResult && (_submitResult.error || _submitResult.success)) {
      if (_submitResult.error) {
        _this.content.innerHTML = '<p class="alert error">' +
            _submitResult.error + '</p>' + buttonMarkup;
      } else {
        _this.content.innerHTML = [
          '<h3>Questionnaire Complete</h3>',
          '<p class="alert success">',
            'Thank you for your contribution. ',
            'Your information will be processed shortly.',
          '</p>',
          _submitResult.success
        ].join('');
      }
    } else {
      _this.content.innerHTML = buttonMarkup;
      _this.showForm();
    }
  };

  _this.showForm = function () {
    _modal.show();

     // Ensure submit button status is currently up-to-date
    _this.onFormChange();

    // Render after modal is shown so content is in DOM
    _view.render();
  };


  _initialize(options);
  options = null;
  return _this;
};


DYFIFormModule.ID = _ID;
DYFIFormModule.TITLE = _TITLE;

DYFIFormModule.hasContent = _hasContent;


module.exports = DYFIFormModule;
