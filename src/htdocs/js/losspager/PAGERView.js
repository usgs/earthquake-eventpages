'use strict';

var //PagerXmlParser = require('losspager/PagerXmlParser'),
    ProductView = require('core/ProductView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var _DEFAULTS = {
  //renderCallback: null, // Function to call when async rendering is complete
  productTypes: ['losspager'],
  hash: 'pager'
};


/**
 * View for losspager product.
 *
 * @param options {object}
 *    all options are passed to ProductView.
 */
var PAGERView = function (options) {
  var _this,
      _initialize,

      _alertEl,
      _cityEl,
      _commentEl,
      _exposureEl,
      _errorMessage;

  options = Util.extend({}, _DEFAULTS, options || {});
  _this = ProductView(options);


  _initialize = function () {
    _errorMessage = options.errorMessage;

    _this.createScaffolding();
  };

  _this.createScaffolding = function () {
    var exposurePng;

    exposurePng = _this.model.getContent('exposure.png');

    _this.el.classList.add('losspager');

    _this.el.innerHTML =
      '<div class="alert-wrapper row"></div>' +
      '<div class="row pager-content">' +
        '<div class="column one-of-two">' +
          '<h3>Estimated Population Exposure to Earthquake Shaking</h3>' +
          '<div class="map-wrapper">' +
            (exposurePng.get('url') ?
                '<figure>' +
                  '<img src="' + exposurePng.get('url') +
                      '" alt="Population Exposure Map"/>' +
                  '<figcaption>' +
                    'Population per ~1 sq. km. from LandScan' +
                  '</figcaption>' +
                '</figure>'
                : '&ndash;') +
          '</div>' +
          '<div class="exposure-wrapper"></div>' +
        '</div>' +
        '<div class="column one-of-two">' +
          '<div class="comment-wrapper"></div>' +
          '<div class="city-wrapper"></div>' +
        '</div>' +
      '</div>';

    _alertEl = _this.el.querySelector('.alert-wrapper');
    _exposureEl = _this.el.querySelector('.exposure-wrapper');
    _commentEl = _this.el.querySelector('.comment-wrapper');
    _cityEl = _this.el.querySelector('.city-wrapper');
  };

  /**
   * Destroy all the things.
   */
  _this.destroy = Util.compose(function () {
    _errorMessage = null;
    _this = null;
    _initialize = null;
  }, _this.destroy);

  _this.fetchData = function () {
    var content;

    content = _this.model.getContent('pager.xml');

    if(!content) {
      _this.onError();
      return;
    }

    Xhr.ajax({
      url: content.get('url'),
      success: _this.onSuccess,
      error: _this.onError
    });
  };




  /**
   * This method is called when there is a problem.
   *
   * @param errorMessage {String}
   *    A description of the error that occurred.
   */
  _this.onError = function () {
    _this.el.innerHTML = _errorMessage;
  };

  /**
   * This method is called when Xhr is successful and calles all methods
   * that render pager content.
   */
  _this.onSuccess = function (/*data, xhr*/) {
    //_this.getDetailsContent(PagerXmlParser.parse(xhr.responseXML));
    // _this.renderAlerts(data.product);
    // _this.renderExposures(data.product);
    // _this.renderComments(data.product);
    // _this.renderCities(data.product);
  };

  /**
   * Adds alert historgrams and corresponding impact comments to page.
   */
  _this.renderAlerts = function () {
    var alertsMarkup,
        alertLevel,
        alertFatalPng,
        alertFatalPdf,
        alertEconPdf,
        alertEconPng;

    alertLevel = _this.model.getProperty('alertlevel');
    alertsMarkup = [];

    // To see data
    console.log(_this.model.toJSON());
    console.log(_this.model.get('contents'));
    // end



    if (alertLevel === 'pending') {
      alertsMarkup = [
        '<p class="info alert">',
          'Alert information for this event is currently under review and ',
          'will be available soon. Thank you for your patience.',
        '</p>'
      ];
      _this._alertEl.classList.remove('row');
    } else {
      alertFatalPdf = _this.model.getContent('alertfatal.pdf');
      alertFatalPng = _this.model.getContent('alertfatal_small.png') ||
          _this.model.getContent('alertfatal.png');
      if (alertFatalPdf && alertFatalPng) {
        alertsMarkup.push(
          '<div class="column one-of-two">',
            '<h3>Estimated Fatalities</h3>',
            '<figure>',
              '<a href="', alertFatalPdf.get('url'), '">',
                '<img src="', alertFatalPng.get('url'), '" alt=""/>',
              '</a>',
            '</figure>',
          '</div>'
        );
      } else {
        alertsMarkup.push(
          '<div class="column one-of-two">',
            '<h3>Estimated Fatalities</h3>',
            '<p>',
              'Alert information unavaliabele',
            '</p>',
          '</div>'
        );
      }

      alertEconPdf = _this.model.getContent('alertecon.pdf');
      alertEconPng = _this.model.getContent('alertecon_small.png') ||
          _this.model.getContent('alertecon.png');
      if (alertEconPdf && alertEconPng) {
        alertsMarkup.push(
          '<div class="column one-of-two">',
            '<h3>Estimated Economic Losses</h3>',
            '<figure>',
              '<a href="', alertEconPdf.get('url'), '">',
                '<img src="', alertEconPng.get('url'), '" alt=""/>',
              '</a>',
            '</figure>',
          '</div>'
        );
      } else {
        alertsMarkup.push(
          '<div class="column one-of-two">',
            '<h3>Estimated Economic Losses</h3>',
            '<p>',
              'Alert information unavaliabele',
            '</p>',
          '</div>'
        );
      }
    }

    _alertEl.innerHTML = alertsMarkup.join('');
  };

  _this.renderAlertComments = function () {

  };

  /**
   * Called when the model changes. Initially sets a loading message
   *
   *
   */
  _this.render = function () {
    //_this.el.innerHTML = 'Loading content&hellip;';
    _this.renderAlerts();
    _this.fetchData();
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = PAGERView;
