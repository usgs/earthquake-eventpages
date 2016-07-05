'use strict';


var MomentTensorPinView = require('moment-tensor/MomentTensorPinView'),
    Model = require('mvc/Model');


MomentTensorPinView({
  el: document.querySelector('.moment-tensor-pin-view-example'),
  model: Model({type: 'example', source: 'ex', code: 'example01'}),
  module: {ID: 'moment-tensor', TITLE: 'Moment Tensor'}
}).render();
