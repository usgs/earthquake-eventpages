'use strict';


var BasicPinView = require('core/BasicPinView'),
    ModalView = require('mvc/ModalView'),
    TextProductView = require('core/TextProductView'),
    Util = require('util/Util');


var TextProductPinView = function (options) {
  var _this,
      _initialize,

      _onClick,
      _title;


  options = Util.extend({}, options);
  _this = BasicPinView(options);

  _initialize = function () {
    // create TextProductView
    _this.textProductView = TextProductView({
      el: _this.content,
      model: _this.model
    });

    _title = _this.module.TITLE;
    _this.el.classList.add('text-product-pin-view');

    // show modal when header is clicked
    _this.header.addEventListener('click', _onClick);
  };

  /**
   * delegates click event if "read more" link is clicked
   *
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  _onClick = function (e) {
    _this.onClick();
    e.preventDefault();
  };

  _this.onClick = function () {
    var dialog;

    dialog = ModalView(_this.textProductView.el.innerHTML, {
      title: _title,
      classes: ['text-product-pin-modal']
    });

    dialog.show();
  };

  _this.renderPinContent = function () {
    _this.textProductView.render();
  };

  _initialize();
  options = null;
  return _this;
};


module.exports = TextProductPinView;
