'use strict';


var DYFIFormView = require('mvc/View'), // TODO :: Use actual DYFIFormView
    Events = require('util/Events'),
    ModalView = require('mvc/ModalView'),
    Module = require('core/Module'),
    Util = require('util/Util');


var _ID,
    _TITLE,
    _hasContent;

_ID = 'tellus';
_TITLE = 'DYFI? Tell Us!';

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
    config.scenarioMode : false;
};

var _DEFAULTS = {

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

      _modal,
      _view;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;

    _view = DYFIFormView({
      eventTime: '', // TODO :: Get actual event time off _this.model
      language: 'en'
      // TODO :: Also include eventid in some way?
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


  _this.destroy = Util.compose(function () {
    _view.destroy();
    _modal.destroy();

    _modal = null;
    _view = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.onCancel = function () {
    // Notify the EventPage this view would like to go back
    Events.trigger('back');

    // TODO :: Remove this once #368 is implemented
    window.location.hash = '#';
  };

  _this.onSubmit = function () {
    // TODO :: Submit form, on response, update _this.model and then render
  };

  _this.render = function () {
    _this.header.innerHTML = '<a class="back-to-summary-link" ' +
        'href="#">Back to General</a>'; // TODO :: Should this go to impact summary?
    _this.footer.innerHTML = '';

    if (_this.model.get('dyfi-result')) {
      // Already computed results, show them.
      // TODO
    } else {
      _this.content.innerHTML = '<button class="show-form">Show Form</button>';
      _this.showForm();
    }
  };

  _this.showForm = function () {
    _modal.show();
    _view.render(); // Render after show so content is in DOM
  };


  _initialize(options);
  options = null;
  return _this;
};


DYFIFormModule.ID = _ID;
DYFIFormModule.TITLE = _TITLE;

DYFIFormModule.hasContent = _hasContent;


module.exports = DYFIFormModule;
