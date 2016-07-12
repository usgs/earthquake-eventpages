'use strict';


var BasicPinView = require('core/BasicPinView'),
    FiniteFaultModule = require('finite-fault/FiniteFaultModule'),
    Util = require('util/Util');


var _DEFAULTS = {
  module: FiniteFaultModule
};

var FiniteFaultPinView = function (options) {
  var _this;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);


  _this.getSlipImage = function (product) {
    var code,
        image,
        paths;

    code = product.get('properties').eventsourcecode;
    image = product.getContent('web/' + code + '_slip2.png');
    image = image || product.getContent('web1/' + code + '_slip2.png');
    image = image || product.getContent('web2/' + code + '_slip2.png');

    if (!image) {
      paths = product.get('contents');
      paths = paths ? paths.getIds() : {};
      paths = Object.keys(paths);

      paths.some(function (path) {
        if (path.indexOf('slip') !== -1) {
          image = product.getContent(path);
          return true;
        }
      });
    }

    return image;
  };

  /**
   * Render the content section of the pin. This loads the smaller version
   * of the finite-fault basemap.png
   *
   */
  _this.renderPinContent = function () {
    var image,
        markup;

    try {
      image = _this.getSlipImage(_this.model);

      markup = '<span>Cross-section of slip distribution</span>' +
          '<img src="' + image.get('url') + '"' +
          ' class="finite-fault-cross-section" ' +
          ' alt="Cross-section of slip distribution"/>';
    } catch (e) {
      markup = '<p class="alert error">Could not load cross-section of ' +
          'slip distribution</p>';
    }

    _this.content.innerHTML = markup;
  };


  options = null;
  return _this;
};


module.exports = FiniteFaultPinView;
