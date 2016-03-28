'use strict';

var Accordion = require('accordion/Accordion'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS = {
  classes: 'accordion-standard',
  destroyView: true,
  expanded: false,
  toggleElement: 'h3',
  toggleText: 'Show more'
};


/**
 * Wrap a view in an accordion.
 *
 * Any of these options can be changed later by updating this view's model.
 *
 * @param options {Object}
 * @param options.classes {String}
 *     passed to Accordion as classes option.
 * @param options.destroyView {Boolean}
 *     whether to destroy wrapped view when this view is destroyed.
 *     default true.
 * @param options.expanded {Boolean}
 *     whether accordion should be expanded by default.
 *     default false.
 * @param options.toggleElement {String}
 *     passed to Accordion as toggleElement option.
 *     default 'h3'.
 * @param options.toggleText {String}
 *     passed to Accordion as toggleText option.
 *     default 'Show more'.
 */
var AccordionView = function (options) {
  var _this,
      _initialize,

      _accordion;


  _this = View(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.model.set({
      classes: options.classes,
      destroyView: options.destroyView,
      expanded: options.expanded,
      toggleElement: options.toggleElement,
      toggleText: options.toggleText,
      view: options.view
    }, {silent: true});
  };


  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    if (_accordion) {
      // clean up previous render
      _accordion.destroy();
      _accordion = null;
    }

    if (_this.model.get('destroyView')) {
      _this.model.get('view').destroy();
    }

    _this.el.removeEventListener('click', _this.onClick);
    _this = null;
  }, _this.destroy);

  /**
   * Click handler called when accordion is clicked.
   */
  _this.onClick = function () {
    var view;

    // render view
    view = _this.model.get('view');
    view.render();

    // remove listener
    _this.el.removeEventListener('click', _this.onClick);
  };

  /**
   * Render accordion, and set up click handler to render wrapped view.
   */
  _this.render = function () {
    var classes,
        expanded,
        model,
        toggleElement,
        toggleText,
        view;

    if (_accordion) {
      // clean up previous render
      _accordion.destroy();
      _accordion = null;
      _this.el.removeEventListener('click', _this.onClick);
    }

    model = _this.model.get();
    classes = model.classes;
    expanded = model.expanded;
    toggleElement = model.toggleElement;
    toggleText = model.toggleText;
    view = model.view;

    if (!expanded) {
      classes = classes + ' accordion-closed';
    }

    // create accordion
    _accordion = Accordion({
      el: _this.el,
      accordions: [{
        classes: classes,
        content: view.el,
        toggleElement: toggleElement,
        toggleText: toggleText
      }]
    });

    if (expanded) {
      view.render();
    } else {
      _this.el.addEventListener('click', _this.onClick);
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = AccordionView;
