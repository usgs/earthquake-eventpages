'use strict';


var MomentTensorPinView = require('moment-tensor/MomentTensorPinView'),
    Product = require('pdl/Product');


var product;

product = Product({
  "indexid": "2993418",
  "indexTime": 1466943138461,
  "id": "urn:usgs-product:us:moment-tensor:us_200066x9_mww:1466943128040",
  "type": "moment-tensor",
  "code": "us_200066x9_mww",
  "source": "us",
  "updateTime": 1466943128040,
  "status": "UPDATE",
  "properties": {
    "beachball-source": "us",
    "depth": "15.5",
    "derived-depth": "15.5",
    "derived-eventtime": "2016-06-26T11:17:23.000Z",
    "derived-latitude": "39.3900",
    "derived-longitude": "73.3300",
    "derived-magnitude": "6.4",
    "derived-magnitude-type": "Mww",
    "evaluation-status": "preliminary",
    "eventParametersPublicID": "quakeml:us.anss.org/eventparameters/200066x9/1466943133",
    "eventsource": "us",
    "eventsourcecode": "200066x9",
    "eventtime": "2016-06-26T11:17:11.690Z",
    "latitude": "39.4867",
    "longitude": "73.3252",
    "n-axis-azimuth": "64",
    "n-axis-length": "3.33651E+17",
    "n-axis-plunge": "6",
    "nodal-plane-1-dip": "56",
    "nodal-plane-1-rake": "97",
    "nodal-plane-1-strike": "248",
    "nodal-plane-2-dip": "35",
    "nodal-plane-2-rake": "79",
    "nodal-plane-2-strike": "55",
    "p-axis-azimuth": "333",
    "p-axis-length": "-4.70947E+18",
    "p-axis-plunge": "10",
    "percent-double-couple": "0.8583",
    "quakeml-publicid": "quakeml:us.anss.org/focalmechanism/200066x9/mww",
    "review-status": "reviewed",
    "scalar-moment": "4.55E+18",
    "sourcetime-decaytime": "11",
    "sourcetime-duration": "22",
    "sourcetime-risetime": "11",
    "sourcetime-type": "triangle",
    "t-axis-azimuth": "184",
    "t-axis-length": "4.37582E+18",
    "t-axis-plunge": "78",
    "tensor-mpp": "-6.81E+17",
    "tensor-mrp": "-3.51E+17",
    "tensor-mrr": "4.034E+18",
    "tensor-mrt": "-1.623E+18",
    "tensor-mtp": "-1.993E+18",
    "tensor-mtt": "-3.353E+18"
  },
  "preferredWeight": 216,
  "contents": {
    "contents.xml": {
      "contentType": "application/xml",
      "lastModified": 1466943135000,
      "length": 195,
      "url": "/realtime/product/moment-tensor/us_200066x9_mww/us/1466943128040/contents.xml"
    },
    "quakeml.xml": {
      "contentType": "application/xml",
      "lastModified": 1466943128000,
      "length": 5692,
      "url": "/realtime/product/moment-tensor/us_200066x9_mww/us/1466943128040/quakeml.xml"
    }
  }
});

MomentTensorPinView({
  el: document.querySelector('.moment-tensor-pin-view-example'),
  model: product
}).render();
