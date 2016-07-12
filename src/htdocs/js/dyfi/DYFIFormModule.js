'use strict';


var DYFIFormView = require('dyfi/DYFIFormView'),
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
_TITLE = 'Felt Report - Tell Us!';


/**
 * Helper method to parse a raw response using HTML DOM manipulation. This
 * is the most reliable parsing method, but may not be as supported across
 * browsers.
 *
 * @param response {String}
 *     An HTML string from which to parse a response.
 *
 * @return {String}
 *     The parsed message.
 *
 * @throws {Error}
 *     If the response does not represent valid HTML. Of if the response does
 *     not include a description list tag (<dl>).
 */
_parseMessageAsHtml = function (response) {
  var h;

  h = document.createElement('html');
  h.innerHTML = response;

  return h.querySelector('dl').outerHTML;
};

/**
 * Helper method to parse a raw response using String manipulation. This is a
 * fallback approach when DOM parsing fails.
 *
 * @param response {String}
 *     An HTML string from which to parse a response.
 *
 * @return {String}
 *     The parsed message or null if no message is found.
 */
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

  return config.hasOwnProperty('SCENARIO_MODE') ?
    (!config.SCENARIO_MODE) : true;
};

var _DEFAULTS = {
  DYFI_RESPONSE_URL: '/products/dyfi/response.html',
  FORM_VERSION: '1.5'
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
      _formVersion,
      _modal,
      _submitButton,
      _submitResult,
      _submitUrl,
      _view;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  /**
   * Constructor. Initializes a new DYFIModule.
   *
   * @param options {Object}
   *     Configuration options for this module. In addition to what can be
   *     provided a generic module, these may also include:
   * @param options.FORM_VERSION {String}
   *     A version string identifier for this form.
   */
  _initialize = function (options) {
    var catalogEvent,
        config,
        eventTimestamp;

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    config = _this.model.get('config');
    _submitUrl = (config && config.DYFI_RESPONSE_URL) ?
        config.DYFI_RESPONSE_URL : options.DYFI_RESPONSE_URL;
    _submitResult = null;

    _formVersion = options.FORM_VERSION;

    _this.content.addEventListener('click', _this.onContentClick);

    catalogEvent = _this.model.get('event');

    if (catalogEvent) {
      eventTimestamp = catalogEvent.getTime();
    }

    _formModel = Model({
      eventTime: eventTimestamp ? eventTimestamp.toUTCString() : '',
      language: 'en'
      // TODO :: Also include eventid in some way?
    });

    _formModel.on('change', 'onFormChange', _this);

    _view = DYFIFormView({
      model: _formModel
    });

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


  /**
   * Frees resources associated with this module.
   *
   */
  _this.destroy = Util.compose(function () {
    _this.content.removeEventListener('click', _this.onContentClick);
    _formModel.off('change', 'onFormChange', _this);

    _modal.hide();
    _modal.destroy();
    _view.destroy(); // NB: Destroy view before destroying model
    _formModel.destroy();

    _formModel = null;
    _formVersion = null;
    _modal = null;
    _submitResult = null;
    _submitUrl = null;
    _view = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Callback when user clicks the cancel button. Form is hidden and browser
   * is navigated back to some other event page content.
   *
   */
  _this.onCancel = function () {
    _modal.hide();

    // Notify the EventPage this view would like to go back
    Events.trigger('back');
  };

  /**
   * Callback to handel re-showing the form when a button is clicked on the
   * page in the background.
   *
   * @param evt {Event}
   *     The event that triggered this callback.
   */
  _this.onContentClick = function (evt) {
    if (evt.target && evt.target.classList.contains('show-form')) {
      _this.showForm();
    }
  };

  /**
   * Callback when the _formModel is changed. Checks to see if required
   * fields are complete and if so, enables submit button; otherwise disables
   * the button.
   *
   */
  _this.onFormChange = function () {
    if (_submitButton) {
      if (!_formModel.get('ciim_mapLat') ||
          !_formModel.get('ciim_mapLon') ||
          !_formModel.get('ciim_time') ||
          !_formModel.get('fldSituation_felt')) {
        // A required field is missing, disable submit button
        _submitButton.setAttribute('disabled', 'disabled');
      } else {
        _submitButton.removeAttribute('disabled');
      }
    }
  };

  /**
   * Callback when the submit button is clicked on the form. This method
   * augments the form data with some internally required information, then
   * submits the request using AJAX via CORS.
   *
   */
  _this.onSubmit = function () {
    var data,
        ev;

    _submitResult = null;

    ev = _this.model.get('event');

    data = Util.extend({
      eventid: ev ? ev.getEventId() : null,
      form_version: _formVersion,
      ciim_report: 'Submit Form'
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

  /**
   * Callback when the submit Xhr fails. Note, this is only executed if an
   * HTTP status code accompanies the response. Updates the result object and
   * calls the render method.
   *
   * @param error {Mixed}
   *     See Xhr#ajax:error
   * @param xhr {XMLHttpRequest}
   *     The XHR that caused the error.
   */
  _this.onSubmitError = function (error/*, xhr*/) {
    _submitResult = {
      error: error
    };

    _this.render();
  };

  /**
   * Callback when the submit Xhr succeeds. Note, this may execute even if the
   * form was not processed if the response returns an HTTP 2XX status. Updates
   * the result object and calls the render method.
   *
   * @param response {String}
   *     The response message to parse.
   * @param xhr {XMLHttpRequest}
   *     The XHR that submitted the request.
   */
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

  /**
   * Called show the form or when it is submitted. Depending on the current
   * state of the result object, displays the result message or shows the form
   * itself.
   *
   */
  _this.render = function () {
    var buttonMarkup;

    buttonMarkup = '<button class="show-form">Show Form</button>';

    _this.header.innerHTML = '<h3>' + _this.TITLE + '</h3>';
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

  /**
   * Shows the modal form. Once shown, lets updates the submit button state
   * (disabled or not), and then allows the sub-view to render.
   *
   */
  _this.showForm = function () {
    _modal.show();
    _submitButton = document.querySelector('.dyfi-submit-button');

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
