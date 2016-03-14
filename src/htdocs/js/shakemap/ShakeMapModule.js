'use strict';

var Module = require('core/Module'),
    ShakeMapView = require('shakemap/ShakeMapView'),
    Util = require('util/Util');


var _ID,
    _TITLE,
    _TYPES;


// Note: These should be overridden by each implementing sub-class.
_ID = 'shakemap';
_TITLE = 'ShakeMap';
_TYPES = ['shakemap'];


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
    var product;

    product = _this.getProduct('shakemap');

    _this.header.innerHTML = '<h3>ShakeMap</h3>';
    if (!product) {
      _this.content.innerHTML = '<p class="alert warning">No ShakeMap Found</p>';
    } else {
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        // TODO: make this the impact summary module
        summaryModule: Module
      }));

      // Load content from ShakeMapView
      ShakeMapView({
        el: _this.content,
        model: product
      }).render();

    }
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
ShakeMapModule.TYPES = _TYPES;


module.exports = ShakeMapModule;
