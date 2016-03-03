'use strict';

var Util = require('util/Util'),
    View = require('mvc/View');

var _ID,
    _TITLE,
    _TYPES,

    _hasContent;


// Note: These should be overridden by each implementing sub-class.
_ID = 'module';
_TITLE = 'Default Module';
_TYPES = [];

_hasContent = function () {
  return true;
};

var _DEFAULTS = {

};


var Module = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  _initialize = function (/*options*/) {

  };


  _this.render = function () {
    // TODO :: Implement
    _this.el.innerHTML = [
      '<div class="module-header">',
        '<h3>Module Header</h3>',
      '</div>',
      '<div class="module-content">',
        '<h3>Module Content</h3>',
      '</div>',
      '<div class="module-footer">',
        '<h3>Module Footer</h3>',
      '</div>'
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


Module.ID = _ID;
Module.TITLE = _TITLE;
Module.TYPES = _TYPES;

Module.hasContent = _hasContent;


module.exports = Module;
