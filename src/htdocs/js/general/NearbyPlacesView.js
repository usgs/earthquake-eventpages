'use strict';

var ContentView = require('core/ContentView'),
    Formatter = require('core/Formatter'),
    Util = require('util/Util');

var NearbyPlacesView = function (options) {
  var _this,
      _initialize,

      _formatter;

  options = options || {};
  _this = ContentView(options);

  _initialize = function (options) {
    _formatter = options.formatter || Formatter();
  };

  _this.onSuccess = function (data) {
    var i,
        len,
        markup;

    len = data.length;
    markup = [];

    _this.el.className = 'nearby-places';
    markup.push('<h3>Nearby Places</h3>');
    // Formats nearby places
    for (i = 0; i < len; i++) {
      markup.push('<li>' +
          data[i].distance + ' km ' +
          '(' + Math.round(_formatter.kmToMi(data[i].distance)) + ' mi) ' +
          data[i].direction +
          ' of ' + data[i].name +
          '</li>');
    }

    _this.el.innerHTML = '<ul class="no-style">' + markup.join('') + '</ul>';
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    _formatter = null;
    _this = null;
    _initialize = null;
  }, _this.destroy);

  _initialize(options);
  options = null;
  return _this;
};

module.exports = NearbyPlacesView;
