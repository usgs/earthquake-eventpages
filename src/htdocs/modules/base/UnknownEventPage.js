'use strict';

var EventPage = require('./EventPage'),
    ImpactModule = require('impact/ImpactModule');


var UnknownEventPage = function (options) {
  options.defaultPage = 'impact_tellus';
  options.modules = options.modules || [
    new ImpactModule({
      'eventDetails': options.eventDetails || null,
      'eventConfig': options.eventConfig || {}
    })
  ];
  EventPage.call(this, options);
};

UnknownEventPage.prototype = Object.create(EventPage.prototype);


module.exports = UnknownEventPage;
