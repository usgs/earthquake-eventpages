/* global EventConfig, EventDetails, OffCanvas */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    DYFIFormModule = require('dyfi/DYFIFormModule'),
    EventPage = require('core/EventPage');


var eventPage,
    eventParams,
    offcanvas;

eventParams = {
  event: CatalogEvent(EventDetails),
  config: EventConfig,
  el: document.querySelector('.page-content'),
  nav: document.querySelector('.site-sectionnav')
};

if (EventConfig.unknownEvent) {
  eventParams.modules = [[DYFIFormModule]];
}

eventPage = EventPage(eventParams);

offcanvas = OffCanvas.getOffCanvas();
eventPage.on('render', function () {
  offcanvas.hide();
});
