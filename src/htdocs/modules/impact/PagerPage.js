'use strict';

var Attribution = require('base/Attribution'),
    PagerXmlParser = require('./PagerXmlParser'),
    ProductSummarizer = require('base/ProductSummarizer'),
    SummaryDetailsPage = require('base/SummaryDetailsPage'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var DEFAULTS = {
  renderCallback: null, // Function to call when async rendering is complete
  productTypes: ['losspager'],
  hash: 'pager'
};

var PagerPage = function (options) {
  options = Util.extend({}, DEFAULTS, options || {});
  this._renderCallback = options.renderCallback;
  SummaryDetailsPage.call(this, options);
};
PagerPage.prototype = Object.create(SummaryDetailsPage.prototype);


/**
 * Clean up event bindings.
 *
 */
PagerPage.prototype.destroy = function () {
  if (this._exposureEl) {
    this._exposureEl.removeEventListener('click', this._onExposureClick,
        false);
  }
  if (this._cityEl && this._cityEl.querySelector('.toggle') !== null) {
    this._cityEl.removeEventListener('click', this._onCityClick, false);
  }
};

/**
 * Set static markup and scaffold structure for remaining content.
 *
 * @see _renderPage
 */
PagerPage.prototype.getDetailsContent = function (product) {
  var _this = this,
      el = document.createElement('div'),
      contentEl,
      contents = product.contents,
      thumbnail;

  thumbnail = contents['exposure.png'];

  el.classList.add('losspager');
  el.innerHTML =
    '<small class="attribution">Data Source ' +
      Attribution.getContributorReference(product.source) +
      '</small>' +
    '<div class="alert-wrapper row"></div>' +
    '<div class="row pager-content">' +
      '<div class="column one-of-two">' +
        '<h3>Estimated Population Exposure to Earthquake Shaking</h3>' +
        '<div class="map-wrapper">' +
          (thumbnail ?
              '<figure>' +
                '<img src="' + thumbnail.url +
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

  // Store these for later. See _renderPage
  this._alertEl = el.querySelector('.alert-wrapper');
  this._exposureEl = el.querySelector('.exposure-wrapper');
  this._commentEl = el.querySelector('.comment-wrapper');
  this._cityEl = el.querySelector('.city-wrapper');

  // Can only display exposure map by default. Everything else relies on info
  // found in pager.xml, so must fetch/parse that asynchrounously.

  if (product.status.toUpperCase() === 'DELETE') {
    contentEl = el.querySelector('.pager-content');
    contentEl.innerHTML = '<p class="alert info">Product Deleted</p>';
    contentEl.classList.remove('row');
  } else if (contents['pager.xml']) {
    Xhr.ajax({
      url: contents['pager.xml'].url,
      success: function (responseText, xhr) {
        _this._pagerInfo = PagerXmlParser.parse(
            xhr.responseXML || responseText);

        _this._renderPage(product);
      },
      error: function (errorInfo) {
        _this._renderError(errorInfo);
      }
    });
  }

  return el;
};

/**
 * Sets up summary info for Shakemap events with 2 or more events
 */
PagerPage.prototype._getSummaryMarkup = function (product) {
  return ProductSummarizer.getLossPAGERSummary(product);
};

/**
 * Use disclaimer for footer information.
 *
 */
PagerPage.prototype._setFooterMarkup = function () {
  var links;

  links = document.createElement('section');
  links.innerHTML =
      '<h3>For More Information</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="/research/pager/">' +
            'Scientific Background on PAGER' +
          '</a>' +
        '</li>' +
      '<ul>';

  this._footer.appendChild(links);

  SummaryDetailsPage.prototype._setFooterMarkup.apply(this);
};

/**
 * Renders the components of the page that require pager.xml. This includes:
 *
 *  - alert histograms
 *  - exposure table
 *  - comments (structure/secondary effects)
 *  - nearby cities
 *
 * @param product {Object}
 *        the pager product being rendered.
 */
PagerPage.prototype._renderPage = function (product) {
  this._renderAlerts(product);
  this._renderExposures(product);
  this._renderComments(product);
  this._renderCities(product);

  if (this._renderCallback && typeof this._renderCallback === 'function') {
    this._renderCallback();
  }
};

/**
 * Renders an error on the page when pager.xml fails to load.
 *
 */
PagerPage.prototype._renderError = function (errorInfo) {
  this._content.innerHTML = '<p class="alert error">' +
      'An error occurred loading this page. Please try again later.</p>';

  if (this._renderCallback && typeof this._renderCallback === 'function') {
    this._renderCallback(errorInfo);
  }
};

/**
 * Adds alert historgrams and corresponding impact comments to page.
 * Historgrams are added based on descending alert level.
 *
 * @param product {Object}
 *        the pager product being rendered.
 */
PagerPage.prototype._renderAlerts = function (product) {
  var alerts = this._pagerInfo.alerts,
      comments = this._pagerInfo.comments.impact,
      contents = product.contents,
      properties = product.properties || {},
      fatalityComment = '',
      economicComment = '',
      alertsMarkup = [];

  if (properties.alertlevel === 'pending') {
    alertsMarkup = [
      '<p class="info alert">',
        'Alert information for this event is currently under review and will ',
        'be available soon. Thank you for your patience.',
      '</p>'
    ];
    this._alertEl.classList.remove('row');
  } else {
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

    if (alerts.fatality) {
      alertsMarkup.push(
        '<div class="column one-of-two">',
          '<h3>Estimated Fatalities</h3>',
          '<figure>',
            '<a href="', contents['alertfatal.pdf'].url, '">',
              '<img src="', contents['alertfatal.png'].url, '" alt=""/>',
            '</a>',
            ((fatalityComment !== '') ?
              '<figcaption>' + fatalityComment + '</figcaption>' : ''
            ),
          '</figure>',
        '</div>');
    }

    if (alerts.economic) {
      alertsMarkup.push(
        '<div class="column one-of-two">',
          '<h3>Estimated Economic Losses</h3>',
          '<figure>',
            '<a href="', contents['alertecon.pdf'].url, '">',
              '<img src="', contents['alertecon.png'].url, '" alt=""/>',
            '</a>',
            ((economicComment !== '') ?
              '<figcaption>' + economicComment + '</figcaption>' : ''
            ),
          '</figure>',
        '</div>');
    }
  }

  if (alertsMarkup.length === 0) {
    this._alertEl.parentNode.removeChild(this._alertEl);
  } else {
    this._alertEl.innerHTML = alertsMarkup.join('');
  }
};

/**
 * Adds exposure table information to page. Clicking on the MMI box for an
 * exposure level expands to show meta information about that exposure level.
 *
 * @param product {Object}
 *        the pager product being rendered.
 */
PagerPage.prototype._renderExposures = function (product) {
  var markup = [],
      exposures = this._pagerInfo.exposures,
      i = 0,
      len = exposures.length,
      properties = product.properties || {},
      exposure,
      mmi;

  if (len === 0) {
    this._exposureEl.parentNode.removeChild(this._exposureEl);
    this._exposureEl = null;
    return;
  }

  mmi = parseFloat(properties.maxmmi);

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
  for (; i < len; i++) {
    exposure = exposures[i];
    markup.push(this._createExposureItem(exposure));
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

  this._exposureEl.innerHTML = markup.join('');
};

/**
 * Adds the structure comment and secondary effects comments to the page.
 *
 * @param product {Object}
 *        the pager product being rendered.
 */
PagerPage.prototype._renderComments = function (/*product*/) {
  var comments = this._pagerInfo.comments,
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
    this._commentEl.innerHTML = markup.join('');
  } else {
    // If no comments, remove this section
    this._commentEl.parentNode.removeChild(this._commentEl);
    this._commentEl = null;
  }
};

/**
 * Adds the nearby cities list to the page. Cities have a very special sorting
 * algorithm. The first 11 cities are displayed by default and a control is
 * used to show/hide additional cities.
 *
 * @param product {Object}
 *        the pager product being rendered.
 */
PagerPage.prototype._renderCities = function (/*product*/) {
  var markup = [],
      cities = this._pagerInfo.cities,
      i = 0,
      len = cities.length,
      city;

  markup.push(
    '<h3>Selected Cities Exposed</h3>'
  );

  if (len > 11) {
    markup.push('<a href="javascript:void(null);" class="toggle">' +
        'Show/Hide Full City List</a>');
    this._cityEl.addEventListener('click', this._onCityClick);
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

  for (; i < len; i++) {
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
    this._cityEl.parentNode.removeChild(this._cityEl);
    this._cityEl = null;
  } else {
    this._cityEl.innerHTML = markup.join('');
  }
};

/**
 * Event handler for click events on exposure MMI controls. This is bound
 * to the container and uses event delegation.
 *
 * Note: Scope of "this" within this function is the clicked DOM element.
 */
PagerPage.prototype._onExposureClick = function (evt) {
  if (evt.target.classList.contains('mmi')) {
    evt.target.parentNode.classList.toggle('expanded');
  }
};

/**
 * Event handler for click events on city list toggle control. This is bound
 * to the container and uses event delegation.
 *
 * Note: Scope of "this" within this function is the clicked DOM element.
 */
PagerPage.prototype._onCityClick = function (evt) {
  if (evt.target.classList.contains('toggle')) {
    this.querySelector('.pager-cities').classList.toggle('show-additional');
  }
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
PagerPage.prototype._createExposureItem = function (exposure) {
  return '<tr>' +
    '<td class="exposure-mmi">' +
      '<span class="roman mmi ' + exposure.css + '">' +
      exposure.label + '</span>' +
    '</td>' +
    '<td>' + exposure.perc + '</td>' +
    '<td class="exposure-population">' + exposure.populationDisplay + '</td>' +
  '</tr>';
};


module.exports = PagerPage;
