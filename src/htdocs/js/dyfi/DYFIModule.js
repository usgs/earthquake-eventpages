'use strict';


var DYFIFormModule = require('dyfi/DYFIFormModule'),
    DYFIView = require('dyfi/DYFIView'),
    ImpactSummaryModule = require('impact/ImpactSummaryModule'),
    Module = require('core/Module'),
    Util = require('util/Util');


var _ID,
    _TITLE,
    _TYPES;


_ID = 'dyfi';
_TITLE = 'Did You Feel It?';
_TYPES = ['dyfi'];


var _DEFAULTS = {

};


var DYFIModule = function (options) {
  var _this,
      _initialize,

      _dyfiView;


  options = Util.extend({}, _DEFAULTS, options);
  _this = Module(options);

  _initialize = function (/*options*/) {
    _this.ID = _ID;
    _this.TITLE = _TITLE;
  };


  _this.destroy = Util.compose(function () {
    if (_dyfiView) {
      _dyfiView.destroy();
    }

    _dyfiView = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.render = function () {
    _this.renderHeader();
    _this.renderContent();
    _this.renderFooter();
  };

  _this.renderContent = function () {
    var product;

    product = _this.getProduct('dyfi');

    if (!product) {
      _this.content.innerHTML = '<p class="alert error">No DYFI Found!</p>';
    } else {
      if (_dyfiView && _dyfiView.destroy) {
        _dyfiView.destroy();
        _dyfiView = null;
      }

      _dyfiView = DYFIView({
        el: _this.content,
        model: product
      });

      _dyfiView.render();
    }
  };

  _this.renderFooter = function () {
    var additionalFooter,
        product;

    _this.footer.innerHTML =[
      '<h3>For More Information</h3>',
      '<ul>',
        '<li>',
          '<a href="/data/dyfi/">',
            'Scientific Background for Did You Feel It?',
          '</a>',
        '</li>',
      '</ul>'
    ].join('');

    product = _this.getProduct('dyfi');
    if (product) {
      additionalFooter = _this.getProductFooter({
        product: product
      });

      if (additionalFooter) {
        _this.footer.appendChild(additionalFooter);
      }
    }
  };
  _this.renderHeader = function () {
    var product;

    _this.header.innerHTML = '<h3>' + _this.TITLE +
        ' - <a href="#' + DYFIFormModule.ID + '">Tell Us!</a></h3>';

    product = _this.getProduct('dyfi');

    if (product) {
      _this.header.appendChild(_this.getProductHeader({
        product: product,
        summaryModule: ImpactSummaryModule
      }));
    }
  };


  _initialize(options);
  options = null;
  return _this;
};


DYFIModule.ID = _ID;
DYFIModule.TITLE = _TITLE;
DYFIModule.TYPES = _TYPES;


module.exports = DYFIModule;
