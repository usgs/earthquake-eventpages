/* global chai, describe, it */
'use strict';


var Product = require('pdl/Product'),
    TextProductView = require('general/TextProductView');

var generalTextProduct = Product({
    contents: {
      '': {
        'contentType': 'text/plain',
        'length': 'some text'.length,
        'lastModified': 1234,
        'bytes': 'some text'
      }
    }
  });

var scitechTextProduct = Product({
  contents: {
    '': {
      'contentType': '1',
      'lastModified': 1455230870000,
      'length': 569,
      'bytes': '<h2>Subduction Zone Geometry Analysis</h2>' +
          '<p><strong>Most Likely Geometry: Strike = 194.89, Dip = 14.94 ' +
          '</strong></p> <figure class="left"> <img src="kur999_base.png" ' +
          'max-width="550" alt=""/> <figcaption> Basemap of subduction ' +
          'zone showing the area of the trench constrained in this example. ' +
          'Earthquake locations from the gCMT catalog and EHB catalog (gray ' +
          'circles, sized according to magnitude) are shown. Maroon ' +
          'rectangle indicates the area shown in cross section (c); all ' +
          'earthquakes within this area may be used to constrain trench ' +
          'geometry. </figcaption> </figure>'
    },
    'kur999_base.png': {
      contentType: 'image/png',
      lastModified: 1455229051000,
      length: 608735,
      url: '/products/scitech-text/usp000hvnu-1455229215593/admin/1455230870084/kur999_base.png'
    }
  }
});


var expect = chai.expect;


describe('general/TextProductView', function () {

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof TextProductView).to.equal('function');
    });
  });

  describe('render', function () {

    // create text product view
    var generalTextProductView = TextProductView({
      el: document.createElement('div'),
      model: generalTextProduct
    });

    generalTextProductView.render();

    it('displays bytes for text like product', function () {
      expect(generalTextProductView.el.innerHTML).to.equal('some text');
    });

    // create text product view
    var scitechTextProductView = TextProductView({
      el: document.createElement('div'),
      model: scitechTextProduct
    });

    scitechTextProductView.render();
    var el = scitechTextProductView.el.querySelector('img');

    it('replaces relative URLs with fully qualified URLs', function () {
      expect(el.getAttribute('src')).to.equal('/products/scitech-text/usp000hvnu-1455229215593/admin/1455230870084/kur999_base.png');
    });

  });
});
