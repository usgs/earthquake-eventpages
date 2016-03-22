'use strict';

var PagerXmlParser = require('losspager/PagerXmlParser'),
    ProductView = require('core/ProductView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');

var _DEFAULTS;

_DEFAULTS = {
  errorMessage: 'Error loading PAGER view'
};

var _createHistogram = function (container, title, pdf, png, caption) {
  var figure,
      figureMarkup,
      header;

  header = container.appendChild(document.createElement('h3'));
  header.innerHTML = title;
  figureMarkup = [];

  if (pdf && png) {
    figure = container.appendChild(document.createElement('figure'));
    figureMarkup.push('<a href="' + pdf.get('url') + '">');
    figureMarkup.push('<img src="' + png.get('url') + '" alt=""/>');
    figureMarkup.push('</a>');
    if (caption) {
      figureMarkup.push('<figcaption>' + caption + '</figcaption>');
    }
    figure.innerHTML = figureMarkup.join('');
  } else {
    figure = container.appendChild(document.createElement('p'));
    figure.innerHTML = 'Alert information unavailable';
  }

  return container;
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

      _commentEl,
      _economicHistogramEl,
      _errorMessage,
      _exposureCityEl,
      _exposureCityTable,
      _exposureCityToggle,
      _exposureMapEl,
      _exposurePopulationEl,
      _fatalityHistogramEl,
      _pagerInfo,
      _pendingMessageEl;

  _this = ProductView(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options || {});
    _errorMessage = options.errorMessage;
    _this.createScaffolding();
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
      '<td class="exposure-perc">' + exposure.perc + '</td>' +
      '<td class="exposure-population">' + exposure.populationDisplay +
          '</td>' +
    '</tr>';
  };

  /**
   * Sets up basic layout of the Pager view and loads everything that can
   * be pulled from the model.
   */
  _this.createScaffolding = function () {
    _this.el.classList.add('losspager');
    _this.el.innerHTML =
      '<div class="alert-wrapper row">' +
        '<div class="column one-of-one pager-pending"></div>' +
        '<div class="column one-of-two fatality-histogram"></div>' +
        '<div class="column one-of-two economic-histogram"></div>' +
      '</div>' +
      '<div class="row pager-content">' +
        '<div class="column one-of-two">' +
          '<h3>Estimated Population Exposure to Earthquake Shaking</h3>' +
          '<div class="exposure-map"></div>' +
          '<div class="exposure-population"></div>' +
        '</div>' +
        '<div class="column one-of-two">' +
          '<div class="comment-wrapper"></div>' +
          '<div class="exposure-city">' +
            '<h3>Selected Cities Exposed</h3>' +
            '<a href="javascript:void(null);" class="toggle">' +
                'Show/Hide Full City List</a>' +
            '<table class="pager-cities"></table>' +
            '<span class="pager-disclaimer">' +
              'From GeoNames Database of Cities with 1,000 or more ' +
              'residents (k = x1,000)' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    _pendingMessageEl = _this.el.querySelector('.pager-pending');
    _fatalityHistogramEl = _this.el.querySelector('.fatality-histogram');
    _economicHistogramEl = _this.el.querySelector('.economic-histogram');

    _exposureMapEl = _this.el.querySelector('.exposure-map');
    _exposurePopulationEl = _this.el.querySelector('.exposure-population');

    _commentEl = _this.el.querySelector('.comment-wrapper');
    _exposureCityEl = _this.el.querySelector('.exposure-city');
    _exposureCityToggle = _exposureCityEl.querySelector('.toggle');
    _exposureCityTable = _exposureCityEl.querySelector('.pager-cities');

    _exposureCityToggle.addEventListener('click', _this.onCityClick);
  };

  /**
   * Destroy all the things.
   */
  _this.destroy = Util.compose(function () {
    _commentEl = null;
    _economicHistogramEl = null;
    _errorMessage = null;
    _exposureCityEl = null;
    _exposureCityTable = null;
    _exposureCityToggle = null;
    _exposureMapEl = null;
    _exposurePopulationEl = null;
    _fatalityHistogramEl = null;
    _pagerInfo = null;
    _pendingMessageEl = null;


    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Gets the data.
   */
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
   * Uses correct comments.
   *
   * @param commentType {String};
   *    String can be fatality or economic.
   */
  _this.getAlertComment = function (commentType) {
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

    if (commentType === 'fatality') {
      return fatalityComment;
    } else if (commentType === 'economic') {
      return economicComment;
    }
  };

  /**
   * Event handler for click events on city list toggle control.
   */
  _this.onCityClick = function () {
    _exposureCityTable.classList.toggle('show-additional');
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
   * that render PAGER content.
   */
  _this.onSuccess = function (data, xhr) {
    var xml;

    xml = (xhr ? xhr.responseXML : data);

    _pagerInfo = PagerXmlParser.parse(xml);
    _this.renderFatalityHistogram();
    _this.renderEconomicHistogram();
    _this.renderExposures();
    _this.renderCities();
    _this.renderComments();
  };

  /**
   * Called when the model changes. Initially sets a loading message
   */
  _this.render = function () {
    _this.renderPending();

    _this.renderExposureMap();
    _this.fetchData();
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

    if (len <= 11) {
      _exposureCityEl.style.display = 'none';
    }

    markup.push(
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
            '<span class="roman mmi ' + city.css + '">' +
              city.roman +
            '</span>' +
          '</td>' +
          '<td>' + city.name + '</td>' +
          '<td class="cities-population">' + city.populationDisplay + '</td>' +
        '</tr>'
      );
    }

    markup.push(
      '</tbody>'
    );

    if (len === 0) {
      _exposureCityEl.parentNode.removeChild(_exposureCityEl);
      _exposureCityEl = null;
    } else {
      _exposureCityTable.innerHTML = markup.join('');
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

  /**
   * Sends _createHistogram the params needed to render economic
   * histogram.
   */
  _this.renderEconomicHistogram = function () {
      var alertLevel,
          comment,
          pdf,
          png;

      alertLevel = _this.model.getProperty('alertLevel');
      comment = _this.getAlertComment('economic');
      png = _this.model.getContent('alertecon_small.png') ||
          _this.model.getContent('alertecon.png');
      pdf = _this.model.getContent('alertecon.pdf');

      if (alertLevel !== 'pending') {
        _createHistogram(_economicHistogramEl, 'Estimated Economic Losses',
          pdf, png, comment);
      }
  };

  /**
   * Creates markup for exposure map.
   */
  _this.renderExposureMap = function () {
    var content;

    content = _this.model.getContent('exposure.png');

    if (content) {
      _exposureMapEl.innerHTML = [
        '<figure>',
          '<img src="', content.get('url'), '" alt="Population Exposure Map"/>',
          '<figcaption>',
            'Population per ~1 sq. km. from LandScan',
          '</figcaption>',
        '</figure>'
      ].join('');
    } else {
      _exposureMapEl.innerHTML = '&ndash;';
    }
  };

  /**
   * Adds exposure table info to PAGER view.
   */
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
      _exposurePopulationEl.parentNode.removeChild(_exposurePopulationEl);
      _exposurePopulationEl = null;
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

    _exposurePopulationEl.innerHTML = markup.join('');
  };

  /**
   * Sends _createHistogram the params needed to render fatality
   * histogram.
   */
  _this.renderFatalityHistogram = function () {
      var alertLevel,
          comment,
          pdf,
          png;

      alertLevel = _this.model.getProperty('alertLevel');
      comment = _this.getAlertComment('fatality');
      png = _this.model.getContent('alertfatal_small.png') ||
          _this.model.getContent('alertfatal.png');
      pdf = _this.model.getContent('alertfatal.pdf');

      if (alertLevel !== 'pending') {
        _createHistogram(_fatalityHistogramEl, 'Estimated Fatalities',
          pdf, png, comment);
      }
  };

  /**
   * Adds pending markup if alertLevel is equal to pending.
   */
  _this.renderPending = function () {
    var alertLevel;

    alertLevel = _this.model.getProperty('alertLevel');

    if (alertLevel === 'pending') {
      _pendingMessageEl.innerHTML = [
        '<p class="info alert">',
          'Alert information for this event is currently under review and ',
          'will be available soon. Thank you for your patience.',
        '</p>'
      ].joing('');
    }
  };


  _initialize(options);
  options = null;
  return _this;
};

module.exports = PAGERView;
