'use strict';

var FocalMechanismPinView = require('focal-mechanism/FocalMechanismPinView'),
    Product = require('pdl/Product');


var product;

product = Product({
  "indexid": "96074781",
  "indexTime": 1466734851557,
  "id": "urn:usgs-product:ci:focal-mechanism:ci37611456_fm1:1466734848800",
  "type": "focal-mechanism",
  "code": "ci37611456_fm1",
  "source": "ci",
  "updateTime": 1466734848800,
  "status": "UPDATE",
  "properties": {
    "beachball-source": "CI",
    "depth": "9.28",
    "evaluation-status": "preliminary",
    "eventParametersPublicID": "quakeml:service.scedc.caltech.edu/fdsnws/event/1/query?eventid=37611456",
    "eventsource": "ci",
    "eventsourcecode": "37611456",
    "eventtime": "2016-06-24T01:46:35.180Z",
    "latitude": "33.9916667",
    "longitude": "-118.5236667",
    "nodal-plane-1-dip": "78.0",
    "nodal-plane-1-rake": "-171.0",
    "nodal-plane-1-strike": "295.0",
    "nodal-plane-2-dip": "81.0",
    "nodal-plane-2-rake": "-12.0",
    "nodal-plane-2-strike": "203.0",
    "num-stations-used": "0",
    "original-eventsource": "ci",
    "original-eventsourcecode": "37611456",
    "quakeml-publicid": "quakeml:service.scedc.caltech.edu/fdsnws/event/1/query?mecid=3191533",
    "review-status": "automatic"
  },
  "preferredWeight": 156,
  "contents": {
    "ci37611456.cifm1.html": {
      "contentType": "text/html",
      "lastModified": 1466734847000,
      "length": 4013,
      "url": "/archive/product/focal-mechanism/ci37611456_fm1/ci/1466734848800/ci37611456.cifm1.html"
    },
    "ci37611456.cifm1.jpg": {
      "contentType": "image/jpeg",
      "lastModified": 1466734847000,
      "length": 627235,
      "url": "/archive/product/focal-mechanism/ci37611456_fm1/ci/1466734848800/ci37611456.cifm1.jpg"
    },
    "contents.xml": {
      "contentType": "application/xml",
      "lastModified": 1466734848000,
      "length": 365,
      "url": "/archive/product/focal-mechanism/ci37611456_fm1/ci/1466734848800/contents.xml"
    },
    "quakeml.xml": {
      "contentType": "application/xml",
      "lastModified": 1466734848000,
      "length": 3274,
      "url": "/archive/product/focal-mechanism/ci37611456_fm1/ci/1466734848800/quakeml.xml"
    }
  }
});

FocalMechanismPinView({
  el: document.querySelector('.focal-mechanism-pin-view-example'),
  model: product
}).render();
