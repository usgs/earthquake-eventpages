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


/**
 * Class: TextQuestionView
 * Creates a new TextQuestionView.
 *
 * @param options {Object}
 *     An object containing configuration options. See _DEFAULTS above for
 *     detailed documentation on what can be specified.
 */

var TextQuestionView = function (options) {
  var _this,
      _initialize,

      _input,
      _label;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (options) {
    var id,
        section;

    id = 'text-input-' + (++_ID_SEQUENCE);

    section = document.createElement('section');
    _label = section.appendChild(document.createElement('label'));
    _input = section.appendChild(document.createElement(options.type));

    section.classList.add('question');
    section.classList.add('text-input');

    _label.setAttribute('for', id);

    _input.id = id;
    if (options.type === 'input') {
      _input.setAttribute('type', 'text');
    }
    if (options.placeholder) {
      _input.setAttribute('placeholder', options.placeholder);
    }

    _label.innerHTML = options.label;
    _input.value = options.value;

    _this.el.appendChild(section);


    _input.addEventListener('change', _this.onChange);
  };


  /**
   * Free references
   *
   */
  _this.destroy = Util.compose(function () {
    _input.removeEventListener('change', _this.onChange);

    _input = null;
    _label = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Get answers object.
   *
   * @return {Object}
   */
  _this.getAnswers = function () {
    return {value: _input.value, label: _label.innerHTML};
  };

  /**
   * Triggers an event change when a text question changes.
   *
   */
  _this.onChange = function () {
    _this.trigger('change', _this);
  };

  /**
   * Sets an answer.
   *
   */
  _this.setAnswers = function (value) {
    _input.value = value;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = TextQuestionView;
