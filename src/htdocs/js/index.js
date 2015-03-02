/* global EventDetails, EventConfig, OffCanvas */
'use strict';


var EventPage = require('base/EventPage');


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
