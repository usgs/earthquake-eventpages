'use strict';


var BasicPinView = require('core/BasicPinView'),
    Util = require('util/Util');


var _DEFAULTS;

_DEFAULTS = {
  badgeImage: 'images/logos/tsunami.jpg',
  module: {ID: '#', TITLE: 'Tsunami'}
};


/**
 * A pin view to link to the current tsunami advisories page.
 *
 */
var TsunamiPinView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = BasicPinView(options);

  /**
   * Creates a new pin view.
   *
   * @param options.badgeImage {String}
   *     A URL to an image to use.
   */
  _initialize = function (options) {
    _this.el.classList.add('tsunami-pin-view');
    _this.badgeImage = options.badgeImage;
  };


  /**
   * @return {String}
   *     The link to use when clicking on the pin.
   */
  _this.getLinkUrl = function () {
    return 'http://www.tsunami.gov/';
  };

  /**
   * Renders the pin content. Puts a badge with some text into the content.
   *
   */
  _this.renderPinContent = function () {
    _this.content.innerHTML = [
      '<figure class="pin-badge">',
        '<img src="', _this.badgeImage, '" alt="Tsunami Warning Center" ',
            'class="tsunami-pin-logo"/>',
      '</figure>',
      '<small class="disclaimer">',
        'To view any current tsunami advisories for this and other events, ',
        'please visit <a href="http://www.tsunami.gov/">',
        'http://www.tsunami.gov</a>.',
      '</small>'
    ].join('');
  };

  /**
   * Renders the pin footer. Puts a link to NOAA in the footer.
   *
   */
  _this.renderPinFooter = function () {
    _this.footer.innerHTML = [
      '<a href="', _this.getLinkUrl(), '">NOAA</a>'
    ].join('');
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = TsunamiPinView;
