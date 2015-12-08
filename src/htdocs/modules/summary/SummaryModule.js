'use strict';

var EventModule = require('base/EventModule'),
    Util = require('util/Util'),

    ExecutiveSummaryPage = require('./ExecutiveSummaryPage'),
    SummaryPage = require('./SummaryPage');


var DEFAULTS = {
  title: 'General',
  hash: 'general',
  cssUrl: 'modules/summary/index.css',
  pages: [

  /**
   * NOTE: pages that are bundled in the summary module must be added
   * to the "browserify:summary" target.
   */
    {
      factory: ExecutiveSummaryPage,
      options: {
        title: 'Executive Summary',
        hash: 'executive'
      },
      hasContent: function () {
        return true;
      },
      productTypes: [
        'origin',
        'dyfi', 'shakemap', 'losspager',
        'phase-data', 'moment-tensor', 'focal-mechanism'
      ]
    },

    {
      factory: SummaryPage,
      options: {
        title: 'Summary',
        hash: 'summary'
      },
      //Always include page.
      hasContent: function () {
        return true;
      },
      productTypes: ['origin', 'geoserve']
    },
    {
      className: 'summary/InteractiveMap',
      dependencyBundle: [
        'modules/summary/index.js',
        'lib/leaflet/leaflet.js'
      ],
      options: {
        title: 'Interactive Map',
        hash: 'map'
      }
    }
  ]
};

var SummaryModule = function (options) {
  options = Util.extend({}, DEFAULTS, options || {});
  if (options.eventConfig && options.eventConfig.KML_STUB) {
    this._kmlUrl = options.eventConfig.KML_STUB.replace('%s',
        options.eventDetails.id);
  }
  EventModule.call(this, Util.extend({}, DEFAULTS, options || {}));
};

SummaryModule.prototype = Object.create(EventModule.prototype);


/**
 * Suppress module header.
 */
SummaryModule.prototype.getHeaderMarkup = function () {
  return '';
};

SummaryModule.prototype.getNavigationItems = function (hash) {
  var markUp = EventModule.prototype.getNavigationItems.call(this, hash);

  if ( this._kmlUrl ) {
    markUp.push('<a href="' + this._kmlUrl + '">Google Earth KML</a>');
  }

  return markUp;
};


module.exports = SummaryModule;
