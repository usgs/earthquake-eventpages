'use strict';

var Module = require('core/Module'),
    Util = require('util/Util');


var _ID,
    _TITLE,

    _hasContent;


// Note: These should be overridden by each implementing sub-class.
_ID = 'shakemap';
_TITLE = 'ShakeMap';

_hasContent = function (eventPageModel) {
  var ev;

  ev = eventPageModel.get('event');
  if (ev !== null && ev.getProducts('shakemap').length > 0) {
    // only show this module if there is an event
    return true;
  }

  return false;
};

var _DEFAULTS = {

};


var ShakeMapModule = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };

  _this.render = function () {
    var shakemap;

    // TODO: support parameters for specific shakemap
    shakemap = _this.model.get('event').getPreferredProduct('shakemap');

    _this.header.innerHTML = '<h3>ShakeMap</h3>';
    _this.header.appendChild(_this.getProductHeader({
      product: shakemap,
      // TODO: make this the impact summary module
      summaryModule: Module
    }));

    _this.content.innerHTML = '<p>content goes here</p>';
    _this.footer.innerHTML = '<p>footer goes here</p>';
  };

  _this.destroy = Util.compose(function () {
    _this = null;
    _initialize = null;
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};


ShakeMapModule.ID = _ID;
ShakeMapModule.TITLE = _TITLE;

ShakeMapModule.hasContent = _hasContent;


module.exports = ShakeMapModule;
