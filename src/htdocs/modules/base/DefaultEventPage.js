'use strict';

var EventPage = require('./EventPage'),

    ScientificModule = require('scientific/ScientificModule'),
    SummaryModule = require('summary/SummaryModule'),
    ImpactModule = require('impact/ImpactModule');


var DefaultEventPage = function (options) {
  var eventConfig = options.eventConfig || null,
      eventDetails = options.eventDetails || {};
  
  options.defaultPage = options.defaultPage || 'general_summary';

  options.modules = options.modules || [
    new SummaryModule({
        'eventDetails': eventDetails,
        'eventConfig': eventConfig,
        'eventPage': this
    }),
    new ImpactModule({
      'eventDetails': eventDetails,
      'eventConfig': eventConfig,
      'eventPage': this
    }),
    new ScientificModule({
      'eventDetails': eventDetails,
      'eventConfig': eventConfig,
      'eventPage': this
    })
  ];

  EventPage.call(this, options);
};

DefaultEventPage.prototype = Object.create(EventPage.prototype);


module.exports = DefaultEventPage;
