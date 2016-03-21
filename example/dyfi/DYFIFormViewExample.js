'use strict';

var DYFIFormView = require('dyfi/DYFIFormView'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (event) {
    var eventTime, form;
    //evenTime = event.time;
    event = null;
    eventTime = null;

    form = DYFIFormView({
      el: document.querySelector('#dyfiform-view-example')
      // language: null,
      // eventTime: null
    }).render();

  },
  error: function () {
    document.querySelector('#dyfiform-view-example').innerHTML = [
      '<p class="alert error">',
        'Failed to create a DYFI Form view.',
      '</p>'
    ].join('');
  }
});
