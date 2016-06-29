'use strict';


var TsunamiPinView = require('general/TsunamiPinView');


TsunamiPinView({
  // The "badgeImage" option has a good default for event pages and is not
  // typically required. It is used here to demonstrate functionality and
  // is required only for the example page.
  badgeImage: '/images/logos/tsunami.jpg',
  el: document.querySelector('.tsunami-pin-view-example')
}).render();
