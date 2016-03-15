'use strict';

var DYFIFormView = require('dyfi/DYFIFormView'),
    Xhr = require('util/Xhr');

Xhr.ajax({
  url: '/products/dyfi/en.json',
  success: function (data) {

    DYFIFormView({
      el: document.querySelector('#dyfiform-view-example'),
      data: data
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
