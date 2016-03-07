/* global EventConfig, EventDetails, OffCanvas */
'use strict';

var CatalogEvent = require('pdl/CatalogEvent'),
    EventPage = require('core/EventPage');


var eventpage,
    offcanvas;

eventpage = new EventPage({
  event: CatalogEvent(EventDetails),
  config: EventConfig,
  el: document.querySelector('.page-content'),
  nav: document.querySelector('.site-sectionnav')
});

offcanvas = OffCanvas.getOffCanvas();
eventpage.on('render', function () {
  offcanvas.hide();
});
