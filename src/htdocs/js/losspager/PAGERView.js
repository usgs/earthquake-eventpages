'use strict';

var PagerXmlParser = require('losspager/PagerXmlParser'),
    ProductView = require('core/ProductView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var _DEFAULTS = {
  errorMessage: 'Error loading PAGER view'
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
      _economicComments,
      _errorMessage,
      _exposureEl,
      _fatalityComments,
      _pagerInfo;

  options = Util.extend({}, _DEFAULTS, options || {});
  _this = ProductView(options);


  _initialize = function () {
    _errorMessage = options.errorMessage;
    _this.createScaffolding();
  };

  /**
   * Adds alert historgrams.
   */
  _this.renderAlerts = function () {
    var alertsMarkup,
        alertLevel,
        alertFatalPng,
        alertFatalPdf,
        alertEconPdf,
        alertEconPng,
        content;

    alertLevel = _this.model.getProperty('alertlevel');
    alertsMarkup = [];
    content = _this.model.getContent;

    if (alertLevel === 'pending') {
      alertsMarkup = [
        '<p class="info alert">',
          'Alert information for this event is currently under review and ',
          'will be available soon. Thank you for your patience.',
        '</p>'
      ];
      _this._alertEl.classList.remove('row');
    } else {
      alertFatalPdf = content('alertfatal.pdf');
      alertFatalPng = content('alertfatal_small.png') ||
          content('alertfatal.png');
      if (alertFatalPdf && alertFatalPng) {
        alertsMarkup.push(
          '<div class="column one-of-two">',
            '<h3>Estimated Fatalities</h3>',
            '<figure>',
              '<a href="', alertFatalPdf.get('url'), '">',
                '<img src="', alertFatalPng.get('url'), '" alt=""/>',
              '</a>',
              '<figcaption class="fatality-comments"></figcaption>',
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

      alertEconPdf = content('alertecon.pdf');
      alertEconPng = content('alertecon_small.png') ||
          content('alertecon.png');
      if (alertEconPdf && alertEconPng) {
        alertsMarkup.push(
          '<div class="column one-of-two">',
            '<h3>Estimated Economic Losses</h3>',
            '<figure>',
              '<a href="', alertEconPdf.get('url'), '">',
                '<img src="', alertEconPng.get('url'), '" alt=""/>',
              '</a>',
              '<figcaption class="economic-comments"></figcaption>',
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
    _fatalityComments = _this.el.querySelector('.fatality-comments');
    _economicComments = _this.el.querySelector('.economic-comments');
  };

  /**
   * Adds comments in alers sections the comments come from the parsed xml.
   */
  _this.renderAlertComments = function () {
    var comments,
        economicComment,
        fatalityComment;

    comments = _pagerInfo.comments.impact;

    if (comments.length === 2) {
      if (comments[0] !== '') {
        fatalityComment = comments[0];
        economicComment = comments[1];
      } else {
        fatalityComment = comments[1];
      }
    } else {
      fatalityComment = comments[0];
    }

    if (fatalityComment) {
      _fatalityComments.innerHTML = fatalityComment;
    }

    if (economicComment) {
      _economicComments.innerHTML = economicComment;
    }
  };

  /**
   * Adds the nearby cities list to the page. Cities have a very special sorting
   * algorithm. The first 11 cities are displayed by default and a control is
   * used to show/hide additional cities.
   */
  _this.renderCities = function () {
    var cities,
        city,
        i,
        len,
        markup;

    markup = [];
    cities = _pagerInfo.cities;
    len = cities.length;

    markup.push(
      '<h3>Selected Cities Exposed</h3>'
    );

    if (len > 11) {
      markup.push('<a href="javascript:void(null);" class="toggle">' +
          'Show/Hide Full City List</a>');
      _cityEl.addEventListener('click', _this.onCityClick);
    }

    markup.push(
      '<table class="pager-cities">' +
        '<thead>' +
          '<tr>' +
            '<th><abbr title="Modified Mercalli Intensity">MMI</abbr></th>' +
            '<th>City</th>' +
            '<th><abbr title="Population">Pop.</abbr></th>' +
          '</tr>' +
        '</thead>'
    );

    for (i = 0; i < len; i++) {
      city = cities[i];

      markup.push(
        '<tr class="' + ((i>10)?'city-additional':'') +'">' +
          '<td class="cities-mmi">' +
            '<span class="roman mmi ' + city.css + '">' + city.roman + '</span>' +
          '</td>' +
          '<td>' + city.name + '</td>' +
          '<td class="cities-population">' + city.populationDisplay + '</td>' +
        '</tr>'
      );
    }

    markup.push(
      '</tbody></table>' +
      '<span class="pager-disclaimer">' +
        'From GeoNames Database of Cities with 1,000 or more ' +
        'residents (k = x1,000)' +
      '</span>'
    );

    if (len === 0) {
      _cityEl.parentNode.removeChild(_cityEl);
      _cityEl = null;
    } else {
      _cityEl.innerHTML = markup.join('');
    }
  };

  /**
   * Adds the structure comment and secondary effects comments to the page.
   */
  _this.renderComments = function () {
    var comments = _pagerInfo.comments,
        markup = [];

    if (comments.hasOwnProperty('structure')) {
      markup.push(
        '<div class="wrapper">' +
          '<h3>Structure Information Summary</h3>' +
          '<p>' + comments.structure + '</p>' +
        '</div>'
      );
    }

    if (comments.hasOwnProperty('effects')) {
      markup.push(
        '<div class="wrapper">' +
          '<h3>Secondary Effects</h3>' +
          '<p>' + comments.effects + '</p>' +
        '</div>'
      );
    }

    if (markup.length) {
      _commentEl.innerHTML = markup.join('');
    } else {
      // If no comments, remove this section
      _commentEl.parentNode.removeChild(_commentEl);
      _commentEl = null;
    }
  };

  _this.renderExposures = function () {
    var exposure,
        exposures,
        i,
        len,
        markup;

    markup = [];
    exposures = _pagerInfo.exposures;
    len = exposures.length;

    if (len === 0) {
      _exposureEl.parentNode.removeChild(_exposureEl);
      _exposureEl = null;
      return;
    }

    markup.push(
      '<table class="pager-exposures">' +
        '<thead>' +
          '<tr>' +
            '<th><abbr title="Modified Mercalli Intensity">MMI</abbr></th>' +
            '<th><abbr title="Perceived Shaking">Shaking</abbr></th>' +
            '<th><abbr title="Population Exposure">Pop.</abbr></th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>'
      );

    // generate table row content
    for (i = 0; i < len; i++) {
      exposure = exposures[i];
      markup.push(_this.createExposureItem(exposure));
    }

    markup.push(
        '</tbody>' +
      '</table>' +
      '<span class="pager-disclaimer">' +
        '*Estimated exposure only includes population within ' +
        'map area (k = x1,000)' +
        '</br><a href="http://earthquake.usgs.gov/research/shakemap/#intmaps">'+
        'Modified Mercalli Intensity (MMI) scale</a>' +
      '</span>'
    );

    _exposureEl.innerHTML = markup.join('');
  };

  /**
   * Utility method to create exposure item markup.
   *
   * @param exposure {Object}
   *      The exposure level for which to create an element.
   *
   * @return {String}
   *      The markup.
   */
  _this.createExposureItem = function (exposure) {
    return '<tr>' +
      '<td class="exposure-mmi">' +
        '<span class="roman mmi ' + exposure.css + '">' +
        exposure.label + '</span>' +
      '</td>' +
      '<td>' + exposure.perc + '</td>' +
      '<td class="exposure-population">' + exposure.populationDisplay + '</td>' +
    '</tr>';
  };

  /**
   * Sets up basic layout of the Pager view and loads everything that can
   * be pulled from the model.
   */
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
    _pagerInfo = null;
    _fatalityComments = null;
    _exposureEl = null;
    _errorMessage = null;
    _economicComments = null;
    _commentEl = null;
    _cityEl = null;
    _alertEl = null;
    _initialize = null;
    _this = null;
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
   * Event handler for click events on city list toggle control.
   */
  _this.onCityClick = function (evt) {
    if (evt.target.classList.contains('toggle')) {
      _this.el.querySelector('.pager-cities').classList.toggle('show-additional');
    }
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
   * Event handler for click events on exposure MMI controls.
   */
  _this.onExposureClick = function (evt) {
    if (evt.target.classList.contains('mmi')) {
      evt.target.parentNode.classList.toggle('expanded');
    }
  };

  /**
   * This method is called when Xhr is successful and calles all methods
   * that render PAGER content.
   */
  _this.onSuccess = function (data, xhr) {
    _pagerInfo = PagerXmlParser.parse(xhr.responseXML);

    _this.renderAlertComments();
    _this.renderExposures();
    _this.renderCities();
    _this.renderComments();
  };

  /**
   * Called when the model changes. Initially sets a loading message
   */
  _this.render = function () {
    _this.renderAlerts();
    _this.fetchData();
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = PAGERView;
