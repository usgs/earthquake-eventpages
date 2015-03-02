/* global EventDetails, EventConfig, OffCanvas */
'use strict';


var EventPage = require('base/UnknownEventPage');


var eventpage,
    offcanvas;

eventpage = new EventPage({
  eventDetails: EventDetails,
  eventConfig: EventConfig
});

offcanvas = OffCanvas.getOffCanvas();
eventpage.on('render', function () {
  offcanvas.hide();
});
