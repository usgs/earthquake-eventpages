'use strict';


var BasicPinView = require('core/BasicPinView'),
    Model = require('mvc/Model');


BasicPinView({
  el: document.querySelector('.basic-pin-view-example'),
  model: Model({type: 'example', source: 'ex', code: 'example01'}),
  module: {ID: 'example', TITLE: 'Example Pin'}
}).render();
