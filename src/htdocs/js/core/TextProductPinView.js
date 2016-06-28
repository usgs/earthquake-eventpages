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
    _title = _this.module.TITLE;

    // create TextProductView
    _this.textProductView = TextProductView({
      el: _this.content,
      model: _this.model
    });

    _this.el.classList.add('text-product-pin-view');
    _this.el.addEventListener('click', _onClick);
  };

  /**
   * delegates click event if "read more" link is clicked
   *
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  _onClick = function (e) {
    var target;

    target = e.target;
    if (target && target.className === 'pop-up') {
      _this.onClick();
      e.preventDefault();
    }
  };

  _this.onClick = function () {
    var el,
        dialog;

    el = _this.textProductView.el.innerHTML;

    dialog = ModalView(el, {
      title: _title,
      classes: ['text-product-pin-modal']
    });

    dialog.show();
  };

  _this.renderPinContent = function () {
    _this.textProductView.render();
  };

  // TODO, open model on header click
  _this.renderPinFooter = function () {
    _this.footer.innerHTML = '<a class="pop-up" ' +
        'href="#">click to view ' + _title + '</a>';
  };

  _initialize();
  options = null;
  return _this;
};


module.exports = TextProductPinView;
