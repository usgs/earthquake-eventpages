'use strict';


var ForecastView = require('oaf/ForecastView'),
    Formatter = require('core/Formatter'),
    Product = require('pdl/Product'),
    Util = require('util/Util');


var _DEFAULTS = {

};


var ForecastTextView = function (options) {
  var _this,
      _initialize,

      _catalogEvent,
      _formatter,
      _product;


  options = Util.extend({}, _DEFAULTS, options);
  _this = ForecastView(options);

  _initialize = function (options) {
    _this.el.classList.add('oaf-forecast-text-view');

    _catalogEvent = options.catalogEvent;
    _formatter = options.formatter || Formatter();
    _product = options.product || Product();
  };


  _this.getCommentary = function (forecast) {
    var awarenessTimeSpan,
        commentary,
        elevatedTimeSpan,
        feltTimeSpan,
        m3display,
        m5display,
        m6display,
        m7display,
        magDisplay,
        magnitude,
        mostAftershocksTimeSpan,
        place,
        summary,
        wcDisplay,
        weekFromIssue,
        weekInfo;

    if (_catalogEvent) {
      summary = _catalogEvent.getSummary() || {properties: {}};
      magnitude = _catalogEvent.getMagnitude();

      elevatedTimeSpan = (magnitude >= 6.0) ?
          'the next year or longer' :
          'the next month or longer';

      mostAftershocksTimeSpan = (magnitude >= 6.0) ?
          'the first few weeks' :
          'the first few days';

      magDisplay = _formatter.magnitude(magnitude);
      place = summary.properties.place;

      wcDisplay = _formatter.distance(
          2 * _product.getProperty('wcradius'), 'km');

      awarenessTimeSpan = (magnitude >= 6.0) ?
          'the coming months' :
          'the coming weeks';

      weekFromIssue = _formatter.datetime(604800000 +
          _product.get('updateTime') || 0);

      weekInfo = forecast.forecast[1];

      m3display = _this.getProbAndExp(weekInfo.bins[0]);
      m5display = _this.getProbAndExp(weekInfo.bins[1]);
      m6display = _this.getProbAndExp(weekInfo.bins[2]);
      m7display = _this.getProbAndExp(weekInfo.bins[3]);

      feltTimeSpan = (magnitude >= 6.0) ?
          'next month and next year' :
          'next week and next month';
    } else {
      // What are doing if no event ... ???
      elevatedTimeSpan = 'the next month or longer';
      mostAftershocksTimeSpan = 'the first few days';
      place = '&ndash;';
      wcDisplay = '&ndash;';
      awarenessTimeSpan = 'the coming weeks';
      weekFromIssue = _formatter.datetime(604800000 + (new Date()).getTime());

      m3display = {
        expectation: '&ndash;',
        probability: '&ndash;'
      };

      m5display = {
        expectation: '&ndash;',
        probability: '&ndash;'
      };

      m6display = {
        expectation: '&ndash;',
        probability: '&ndash;'
      };

      m7display = {
        expectation: '&ndash;',
        probability: '&ndash;'
      };

      feltTimeSpan = 'next week and next month';
    }

    commentary = document.createElement('article');
    commentary.innerHTML = [
      '<h2>What to Expect</h2>',
      '<p>',
        'It is normal for an earthquake of this size to cause an ',
        'increase in the number of earthquakes (called aftershocks) ',
        'in the area within ',
        elevatedTimeSpan, '. ',
        'Most of these aftershocks will likely occur within ',
        mostAftershocksTimeSpan, ' ',
        'and the number of aftershocks will drop off over time, but a ',
        'large aftershock can increase the numbers again, temporarily.',
      '</p>',
      '<p>',
        'The aftershocks will occur mostly in the area affected by the ',
        'magnitude ', magDisplay, ' ', place, ' ',
        'earthquake, approximately within ',
        wcDisplay, ' of ', place, '.',
      '</p>',
      '<p>',
        'When there are more earthquakes, the chance of a large ',
        'earthquake is greater and the chance of damage is greater. ',
        'The USGS advises everyone to remain aware of the possibility ',
        'of aftershocks in ', awarenessTimeSpan, ', ',
        'especially when in or around vulnerable structures such as ',
        'unreinforced masonry buildings.',
      '</p>',
      '<p>',
        'No one can predict the exact time or place of any earthquake, ',
        'including aftershocks. The USGS can forecast how many ',
        'earthquakes to expect, or the chance of having an earthquake ',
        'within a given time period.',
      '</p>',

      '<h2>Current Aftershock Forecast</h2>',
      '<p>',
        'The USGS estimates the chance of more aftershocks as follows.<br/>',
        'Within the next week until ', weekFromIssue,
      '</p>',
      '<ul>',
        '<li>',
          'the chance of an earthquake large enough to feel ',
          '(magnitude 3 or higher) is ',
          m3display.probability, ', and ', m3display.expectation, '.',
        '</li>',
        '<li>',
          'the chance of an earthquake of magnitude 5 or higher is ',
          m5display.probability, ', and ', m5display.expectation, '.',
        '</li>',
        '<li>',
          'the chance of an earthquake of magnitude 6 or higher is ',
          m6display.probability, ', and ', m6display.expectation, '.',
        '</li>',
        '<li>',
          'the chance of an earthquake of magnitude 7 or higher is ',
          m7display.probability, ', and ', m7display.expectation, '.',
        '</li>',
      '</ul>',
      '<p>',
        'The chance of earthquakes large enough to be felt or to cause ',
        'damage remains elevated for the ', feltTimeSpan, '.',
      '</p>',
      '<p>',
        'The USGS calculates this earthquake forecast using a statistical ',
        'analysis based on past earthquakes and the aftershocks recorded ',
        'for this sequence. The forecast changes as time passes due to ',
        'the decay in the frequency of aftershocks, larger aftershocks ',
        'that may trigger further earthquakes, and changes in forecast ',
        'modeling based on the earthquake data collected.',
      '</p>'
    ].join('');

    return commentary;
  };

  _this.getProbAndExp = function (info) {
    var expectation,
        probability;

    if (info.probability <= 0.01) {
      probability = '1 in 100';
    } else if (info.probability < 1.0) {
      probability = _formatter.number(
          info.probability * 100, 0, '&ndash', '%');
    } else {
      probability = '&gt; 99 %';
    }

    if (info.p95minimum + info.p95maximum) {
      expectation = 'it is most likely that ' +
          info.p95minimum + ' to ' + info.p95maximum +
          ' such earthquakes may occur' ;
    } else {
      expectation = 'such an earthquake is possible, but with low probability';
    }

    return {
      expectation: expectation,
      probability: probability
    };
  };

  _this.destroy = Util.compose(function () {
    _this.el.classList.remove('oaf-forcast-text-view');

    _catalogEvent = null;
    _formatter = null;
    _product = null;

    _initialize = null;
    _this = null;
  }, _this.destroy);

  _this.renderForecast = function () {
    _this.el.innerHTML = '';
    _this.el.appendChild(_this.getCommentary(_this.forecast));
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = ForecastTextView;
