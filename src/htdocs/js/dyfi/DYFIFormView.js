'use strict';

var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter');

var DYFIFormView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = options || {};
  _this = ContentView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = DYFIFormView;
