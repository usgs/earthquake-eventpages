'use strict';

var Module = require('core/Module'),
    Util = require('util/Util');


var _ID,
    _TITLE,
    _TYPES;

_ID = 'impact';
_TITLE = 'Impact';
_TYPES = ['dyfi', 'shakemap', 'losspager'];


var _DEFAULTS = {

};


var ImpactSummaryModule = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function () {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };


  _this.destroy = Util.compose(function () {
    // TODO
  }, _this.destroy);

  /**
   * Create the DOM object representing the content of this module.
   *
   * TODO
   */
  _this.getContent = function () {
    var fragment;

    fragment = document.createDocumentFragment();

    // TODO :: Append DYFI summary
    // TODO :: Append ShakeMap summary
    // TODO :: Append LossPAGER summary

    return fragment;
  };

  _this.render = function () {
    _this.header.innerHTML = '<h2>Impact Summary</h2>';

    _this.content.innerHTML = '';
    _this.content.appendChild(_this.getContent());

    _this.footer.innerHTML = '';
  };


  _initialize(options);
  options = null;
  return _this;
};


ImpactSummaryModule.ID = _ID;
ImpactSummaryModule.TITLE = _TITLE;
ImpactSummaryModule.TYPES = _TYPES;


module.exports = ImpactSummaryModule;
