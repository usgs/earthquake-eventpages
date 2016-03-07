'use strict';


var Content = require('pdl/Content'),
    ShakeMapInfoView = require('shakemap/ShakeMapInfoView');


var el,
    infoContent;


el = document.querySelector('#shakemapinfoview-example');
infoContent = Content({
  id: 'download/info.json',
  contentType: 'application/json',
  lastModified: new Date(),
  length: 2375,
  url: '/products/shakemap/info.json'
});

ShakeMapInfoView({
  el: el,
  model: infoContent
}).render();
