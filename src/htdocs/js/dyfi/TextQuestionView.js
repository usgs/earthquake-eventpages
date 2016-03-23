'use strict';

var Util = require('util/Util'),
    View = require('mvc/View');


// Default values used by constructor.
var _DEFAULTS = {
  // label - The question being asked
  type: 'input',
  label: null,
  placeholder: '',
  value: null
};

var _ID_SEQUENCE = 0;

// ----------------------------------------------------------------------
// Initialization Methods
// ----------------------------------------------------------------------

/**
 * Class: TextQuestionView
 * Creates a new TextQuestionView.
 *
 * @param options {Object}
 *        An object containing configuration options. See _DEFAULTS above for
 *        detailed documentation on what can be specified.
 */

var TextQuestionView = function (options) {
  var _this,
      _initialize,

      _input,
      _label;

  _this = View(options);

  _initialize = function (options) {
    var id,
        input,
        label,
        placeholder,
        section,
        type;

    options = Util.extend({}, _DEFAULTS, options);

    type = options.type;
    _label = options.label;
    placeholder = options.placeholder;


    section = document.createElement('section');
    section.classList.add('question');
    section.classList.add('text-input');

    label = document.createElement('label');
    _input = document.createElement(options.type);

    id = 'text-input-' + (++_ID_SEQUENCE);

    label.innerHTML = _label;
    label.setAttribute('for', id);

    _input.id = id;
    _input.setAttribute('type', 'text');
    if (options.placeholder) {
      input.setAttribute('placeholder', options.placeholder);
    }

    _input.value = options.value;
    section.appendChild(label);
    section.appendChild(_input);

    _this.el.innerHTML = '';
    _this.el.appendChild(section);

    _input.addEventListener('change', _this.onChange);
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    _input.removeEventListener('change', _this.onChange);
    _input = null;
    _label = null;
    _this = null;
  }, _this.destroy);

  /**
   * Get Answers
   *  Returns {object}
   */
  _this.getAnswers = function () {
    return {value: _input.value, label: _label.value};
  };

  /**
   * Triggers an event change when a text question changes.
   */
  _this.onChange = function () {
    _this.trigger('change', _this);
  };

  /**
   * Sets an Answer.
   */
  _this.setAnswers = function (value) {
    _input.value = value;
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = TextQuestionView;
